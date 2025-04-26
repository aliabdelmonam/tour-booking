import express from "express";
import * as bookingController from "../controllers/bookingController.js";

const router = express.Router();

// Route to create a booking
router.post("/", bookingController.createBooking);

// Route to update a booking
router.patch("/:id", bookingController.updateBooking);

// Route to delete a booking
router.delete("/:id", bookingController.deleteBooking);

export default router;
