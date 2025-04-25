import mongoose from "mongoose";
import { validateEmail, validatePassword } from "../utils/validate.js";
import { hashPasswordHook } from "../middlewares/mogooseHooks.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell use your name"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide email address"],
    lowercase: true,
    validate: {
      // This only works on SAVING and CREATING and not in updating.
      validator: (val) => validateEmail(val),
      message: "Please provide a valid email address",
    },
  },
  role: {
    type: String,
    enum: ["user", "guide", "admin"],
    default: "user",
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minLength: 8,
    validate: {
      // This only works on SAVING and CREATING and not in updating.
      validator: (val) => validatePassword(val),
      message:
        "Passwords Should be at least 8 characters long, with at least one letter and one digit",
    },

    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      // This only works on SAVING and CREATING and not in updating.
      validator: function (e) {
        return e === this.password;
      },
      message: "Passwords are not the same",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

userSchema.pre("save", hashPasswordHook);

const User = mongoose.model("User", userSchema);


export { User as default };