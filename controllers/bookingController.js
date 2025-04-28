import Booking from "../models/bookingModel.js";
import Tour from "../models/tourModel.js";
import { updateDiscountUsage } from "./discountController.js";

// Simple function to create a booking object
export const createBooking = async (req, res) => {
  try {
    const { tourId, user } = req.body;
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({
        status: "fail",
        message: "Tour not found",
      });
    }

    if (tour.originalPrice !== tour.finalPrice) {
      updateDiscountUsage();
    }

    // Create a new booking
    const newBooking = await Booking.create({
      tour,
      user,
      price: tour.finalPrice,
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
