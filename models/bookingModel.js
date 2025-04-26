import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema({
  tour: {
    type: mongoose.Schema.ObjectId,
    ref: "Tour",
    required: [true, "A booking must belong to a tour"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "A booking must belong to a user"],
  },
  price: {
    type: Number,
    required: [true, "A booking must have a price"],
    min: [0, "Price must be a positive number"],
  },
  paid: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensure a user can only have one booking per tour
bookingSchema.index({ tour: 1, user: 1 }, { unique: true });

const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
