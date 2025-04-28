import express from "express";
import * as bookingController from "../controllers/bookingController.js";
import { restrictTo, tokenAuth } from "../middlewares/auth.js";

const router = express.Router();

// Route to create a booking
// Admins/Guides can create a booking, But Only Admin can update or delete a booking
router.use(tokenAuth);
router.post("/", restrictTo("admin", "guide"), bookingController.createBooking);

// Route to delete a booking
router.delete("/:id", restrictTo("admin"), bookingController.deleteBooking);

export default router;
