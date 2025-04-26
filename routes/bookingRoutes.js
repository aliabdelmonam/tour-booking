import express from 'express';
import * as bookingController from '../controllers/bookingController.js';

const router = express.Router();

// Single POST route to handle all booking actions
router.post('/', bookingController.handleBookingRequest);

export default router;