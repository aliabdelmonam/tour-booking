import mongoose from "mongoose";
import User from "./userModel.js"; // Assuming we have a User model
import Tour from "./tourModel.js"; // Assuming we have a Tour model

const discountSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  type: { type: String, enum: ["percentage", "fixed"], required: true },
  value: { type: Number, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },

  // Discount eligibility
  discountType: {
    type: String,
    enum: ["public", "user-specific", "tour-specific", "user-and-tour-specific"],
    default: "public",
  },

  // Only required if user-specific
  eligibleUsers: [{ type: mongoose.Schema.ObjectId, ref: "User" }],

  // Only required if tour-specific
  applicableTours: [{ type: mongoose.Schema.ObjectId, ref: "Tour" }],

  usageLimit: { type: Number, default: null },
  usageCount: { type: Number, default: 0 },
});

// Pre-save middleware to validate users and tours
discountSchema.pre("save", async function (next) {
  if (this.discountType === "user-specific" && this.eligibleUsers.length > 0) {
    const users = await User.find({ _id: { $in: this.eligibleUsers } });
    if (users.length !== this.eligibleUsers.length) {
      return next(new Error("One or more eligible users do not exist in the database"));
    }
  }

  if (this.discountType === "tour-specific" && this.applicableTours.length > 0) {
    const tours = await Tour.find({ _id: { $in: this.applicableTours } });
    if (tours.length !== this.applicableTours.length) {
      return next(new Error("One or more applicable tours do not exist in the database"));
    }
  }

  next();
});

const Discount = mongoose.model("Discount", discountSchema);

export default Discount;