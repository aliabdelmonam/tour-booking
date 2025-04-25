import express from "express";
import { createTour } from "../controllers/tourController.js";

const tourRouter = express.Router();

tourRouter.route("/").post(createTour);

export default tourRouter;
