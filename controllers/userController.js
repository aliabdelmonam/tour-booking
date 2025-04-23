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
