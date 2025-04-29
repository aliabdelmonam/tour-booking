import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import axios from "axios";
import tour from "../models/tourModel.js";
// ---------------

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_DURATION,
  });

const createAndSendToken = (realUser, statusCode, req, res) => {
  const user = { ...realUser };
  const token = signToken(realUser._id);

  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() +
        process.env.JWT_COOKIE_EXPIRES_DURATION * 24 * 60 * 60 * 1000,
    ),
    httpOnly: true,
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
  });
  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: { user },
  });
};

export async function signUp(req, res, next) {
  try {
    if (await User.findOne({ email: req.body.email })) {
      throw new Error("This email is already existed try to login instead");
    }

    // SECURITY: So that the user don't provide a Rule For himself
    const newUser = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      passwordConfirm: req.body.passwordConfirm,
      bio: req.body.bio,
      dateOdBirth: req.body.dateOdBirth,
      nationality: req.body.nationality,
      residence: req.body.residence
    });

    const { name, dateOdBirth, nationality, residence, email } = req.body;
    try {
        const mongoId = newUser._id.toString();
        // console.log("guide Name",guideName.name);
        await axios.post("http://localhost:8000/upsert_user", {
        name: name,
        dateOdBirth: dateOdBirth,
        nationality: nationality,
        residence: residence,
        email: email,
        user_id: mongoId
      });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
          status: "fail",
          message: "Failed to create user in Pinecone",
      });
  }
    createAndSendToken(newUser, 201, req, res);
  } catch (err) {
    console.log("ERROR in signUp...\n", err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body;

    // 1) Check if email and password exist
    if (!email || !password) {
      throw new Error("Please provide email and password");
    }
    // 2) Check if the user exist && password is correct
    const user = await User.findOne({ email }).select("+password"); // Query return promises
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error("Incorrect email or password");
    }

    // 3) If every thing ok, send token to the client
    createAndSendToken(user, 200, req, res);
    
    const tours = await tour.find();
    tours.forEach(async (singleTour) => {
      singleTour.discountCode = "";
      singleTour.finalPrice = singleTour.originalPrice;
      await singleTour.save();
    });
    
    
  } catch (err) {
    console.log("ERROR in login...\n", err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

export async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    newUser.password = undefined;
    // This is no need to remove `passwordConfirm` as it is removed in encryption Hook
    // But I am doing it for the sake of clarity.
    newUser.passwordConfirm = undefined;

    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  }catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

export async function getAllUsers(req, res) {
  try {
    const users = await User.find(); // Find all users
    res.status(200).json({
      status: "success",
      results: users.length, // How many users
      data: { users }, // Return array of users
    });
  } catch (err) {
    console.log("ERROR in getAllUsers...\n", err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

export async function getUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      throw new Error("No user found with that ID");
    }
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.log("ERROR in getUser...\n", err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
      runValidators: true,
    });

    if (!user) {
      throw new Error("No user found with that ID");
    }

    user.password = undefined;
    user.passwordConfirm = undefined;

    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (err) {
    console.log("ERROR in updateUser...\n", err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

export async function deleteUser(req, res) {
  try {
    // NOTE: We don't want to delete the user from the database
    // We just want to set the active field to false
    // So that we can use it later if we want to
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { active: false },
      {
        new: true, // return the updated document
        runValidators: false,
      },
    );
    if (!user) {
      throw new Error("No user found with that ID");
    }

    res.status(204).json({
      // 204 = No Content
      status: "success",
      data: null,
    });
  } catch (err) {
    console.log("ERROR in deleteUser...\n", err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}
export async function searchUsersByName(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      throw new Error("Please provide a name to search for");
    }

    const users = await User.find({
      name: { $regex: name, $options: "i" },
    });

    res.status(200).json({
      status: "success",
      results: users.length,
      data: { users },
    });
  } catch (err) {
    console.log("ERROR in searchUsersByName...\n", err);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
}

