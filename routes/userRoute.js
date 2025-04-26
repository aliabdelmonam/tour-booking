import express from "express";
import {
  createUser,
  getAllUsers,
  getUser,
  login,
  signUp,
} from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.route("/login").post(login);
userRouter.route("/signup").post(signUp);
userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getUser);

export default userRouter;
