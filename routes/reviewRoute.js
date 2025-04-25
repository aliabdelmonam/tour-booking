import express from "express";
import * as reviewController from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.route("/create_review").post(reviewController.createReview);
reviewRouter.route("/get_all_reviews").get(reviewController.getAllReviews);
reviewRouter.route("/get_Review_ById/:review_id").get(reviewController.getReviewByReviewId);
reviewRouter.route("/get_Reviews_ByUserId/:user_id").get(reviewController.getReviewsByUserId);
// reviewRouter.route("/get_Reviews_ByTourId/:tour_id").get(getReviewsByTourId);
reviewRouter.route("/delete_UserReviews/:user_id").delete(reviewController.deleteUserReviews);
reviewRouter.route("/delete_Review/:review_id").delete(reviewController.deleteReviewByReviewId);
reviewRouter.route("/update_Review/:review_id").patch(reviewController.updateReviewByReviewId);

export default reviewRouter;
