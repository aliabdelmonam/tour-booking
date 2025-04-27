import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  login,
  signUp,
} from "../controllers/userController.js";
import { retriveIdAfterTokenAuth, tokenAuth } from "../middlewares/auth.js";

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signUp);

// Make <auth.tokenAuth> a Middleware for all routes down below
userRouter.use(tokenAuth);
userRouter.get("/account", retriveIdAfterTokenAuth, getUser);

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser);

export default userRouter;
