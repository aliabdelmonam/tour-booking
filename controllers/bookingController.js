import Booking from "../models/bookingModel.js";

// Simple function to create a booking object
export const createBooking = async (req, res) => {
  try {
    const { tour, user, price } = req.body;

    // Create a new booking
    const newBooking = await Booking.create({
      tour,
      user,
      price,
      paid: true,
    });

    res.status(201).json({
      status: "success",
      data: {
        booking: newBooking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Function to delete a booking
export const deleteBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;

    if (!bookingId) {
      return res.status(400).json({
        status: "fail",
        message: "Booking ID is required",
      });
    }

    const booking = await Booking.findByIdAndDelete(bookingId);

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "No booking found with that ID",
      });
    }

    res.status(204).json({
      status: "success",
      data: null,
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

// Function to update a booking
export const updateBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updateData = req.body;

    // Restrict updatable fields to price and paid
    const allowedUpdates = ["price", "paid"];
    const updates = Object.keys(updateData);
    const isValidUpdate = updates.every((update) =>
      allowedUpdates.includes(update),
    );

    if (!isValidUpdate) {
      return res.status(400).json({
        status: "fail",
        message: "Invalid updates. Only price and paid can be updated.",
      });
    }

    const booking = await Booking.findByIdAndUpdate(bookingId, updateData, {
      new: true,
      runValidators: true,
    });

    if (!booking) {
      return res.status(404).json({
        status: "fail",
        message: "No booking found with that ID",
      });
    }

    res.status(200).json({
      status: "success",
      data: {
        booking,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
