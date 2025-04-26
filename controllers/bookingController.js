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
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "Booking ID is required",
      });
    }

    const booking = await Booking.findByIdAndDelete(id);

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
    const { id, price, paid } = req.body;

    if (!id) {
      return res.status(400).json({
        status: "fail",
        message: "Booking ID is required",
      });
    }

    // Restrict updatable fields to price and paid
    const updateData = { price, paid };
    const updates = Object.keys(updateData).filter(
      (key) => updateData[key] !== undefined,
    );

    if (updates.length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "No valid fields provided for update",
      });
    }

    const booking = await Booking.findByIdAndUpdate(id, updateData, {
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

// Main handler to route requests based on request body
export const handleBookingRequest = async (req, res) => {
  const { id, tour, user, price, paid } = req.body;

  if (id && (price !== undefined || paid !== undefined)) {
    // Update booking if id and at least one updatable field are provided
    return updateBooking(req, res);
  }
  if (id) {
    // Delete booking if only id is provided
    return deleteBooking(req, res);
  }
  if (tour && user && price !== undefined) {
    // Create booking if tour, user, and price are provided
    return createBooking(req, res);
  }
  // If none of the above conditions match, return an error
  return res.status(400).json({
    status: "fail",
    message:
      "Invalid request body. Provide appropriate fields for create, update, or delete.",
  });
};
