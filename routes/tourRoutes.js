import express from "express";
import { createTour } from "../controllers/tourController.js";
import { restrictTo, tokenAuth } from "../middlewares/auth.js";

const tourRouter = express.Router();

tourRouter.use(tokenAuth, restrictTo("admin"));
tourRouter.route("/").post(createTour);

export default tourRouter;
