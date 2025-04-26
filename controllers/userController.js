import User from "../models/userModel.js";

export async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);

    newUser.password = undefined;
    // This is no need to remove `passwordConfirm` as it is removed in encyption Hook
    // But I am doing it for the sake of clarity.
    newUser.passwordConfirm = undefined;

    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (err) {
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
      return res.status(404).json({
        status: "fail",
        message: "No user found with that ID",
      });
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
