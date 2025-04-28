import express from "express";
import {
  createTour,
  getAllTours,
  getTour,
  deleteTour
} from "../controllers/tourController.js";
import { restrictTo, tokenAuth } from "../middlewares/auth.js";

const tourRouter = express.Router();

// Apply authentication middleware to all routes below
tourRouter.use(tokenAuth);

// Public Routes (only tokenAuth needed)
tourRouter
  .route("/")
  .get(getAllTours);        // GET all tours

tourRouter
  .route("/:id")
  .get(getTour);            // GET one tour


tourRouter.use(restrictTo("admin")); // Only admins can create and delete

tourRouter
  .route("/")
  .post(createTour);        // POST create a tour

tourRouter
  .route("/:id")
  .delete(deleteTour);      // DELETE a tour

export default tourRouter;

