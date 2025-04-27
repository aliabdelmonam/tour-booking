import { promisify } from "util";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
export async function tokenAuth(req, res, next) {
  try {
    // 1) Getting tokens and check if it's exist
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      throw new Error("You are not logged in! Please login to get access");
    }
    // 2) Validate the token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      throw new Error("The User no long exist");
    }
    console.log("currentUser", currentUser);

    // ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    // We don't need `locals` unless using some Engines like EJS, PUG, etc
    // But it's a good practice to use it
    res.locals.user = currentUser;
    next();
  } catch (err) {
    console.log("ERROR in Authorization Token Middleware...\n", err);
    res.status(401).json({
      status: "You are not logged in! Please login to get access",
      message: err.message,
    });
  }
}

export async function retriveIdAfterTokenAuth(req, res, next) {
  req.params.id = req.user._id || req.user.id;
  next();
}
