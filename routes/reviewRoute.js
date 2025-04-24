import express from "express";
import { createReview ,getAllReviews,getReviewsByUserId,deleteUserReviews,deleteReviewByReviewId
    ,updateReviewByReviewId} from "../controllers/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.route("/create_review").post(createReview);
reviewRouter.route("/get_all_reviews").get(getAllReviews);
reviewRouter.route("/get_Reviews_ByUserId/:user_id").get(getReviewsByUserId);
// reviewRouter.route("/get_Reviews_ByTourId/:tour_id").get(getReviewsByTourId);
reviewRouter.route("/delete_UserReviews/:user_id").delete(deleteUserReviews);
reviewRouter.route("/delete_Review/:review_id").delete(deleteReviewByReviewId);
reviewRouter.route("/update_Review/:review_id").patch(updateReviewByReviewId);
export default reviewRouter;
