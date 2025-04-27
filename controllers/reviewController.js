import mongoose from "mongoose";
import Review from "../models/reviewModel.js";

export async function createReview(req, res) {
    /*
        this function just creating a review in the database
        Returned Values:
        status: "Success" or "fail"
        data: the review object if it was successfully created
        message: the error message if it was not successfully created
    */ 
    try {
        const { review, rating, user_id } = req.body;
        // validate if user with user_id has already booked this tour with tour_id
        /*
            const tour = await Tour.findById(tour_id);
            if (!tour) {
                return res.status(404).json({
                    status: "fail",
                    message: "No tour found with this id",
                });
            }
        */ 
        const newReview = await Review.create({ review, rating, user_id });
        res.status(201).json({
            status: "Successfully Create Review",
            data: { review: newReview },
        });
    } catch (err) {
        console.log(err); // for Debugging
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
}

export async function getAllReviews(req, res) {
    /*
        this function returns all the reviews in the database
        Returned Values:
        status: "Success" or "fail"
        results: the number of reviews in the database
        data: review object containing all the reviews in the database
    */ 
    try {
        const reviews = await Review.find();
        res.status(200).json({
            status: "Success",
            results: reviews.length,
            data: { reviews },
        });
    } catch (err) {
        console.log(err); // for Debugging
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
}

export async function getReviewByReviewId(req, res) {
    /*
        This function returns a review in the database by its ID
        http://localhost:8080/api/v1/review/get_Reviews_ById/review_id
    */
    try {
        const { review_id } = req.params;

        // Validate the review_id
        if (!mongoose.Types.ObjectId.isValid(review_id)) {
            return res.status(400).json({
                status: "fail",
                message: "Invalid review ID format",
            });
        }

        const review = await Review.findById(review_id);
        if (!review) {
            return res.status(404).json({
                status: "fail",
                message: "No review found with this ID",
            });
        }

        res.status(200).json({
            status: "Success",
            data: { review },
        });
    } catch (err) {
        console.log(err); // For debugging
        res.status(400).json({
            status: "fail",
            message: err.message,
        });
    }
}

export async function getReviewsByUserId(req, res) {
    /*
        this function returns all the reviews in the database for a specific user
    http://localhost:8080/api/v1/review/get_Reviews_ByUserId/user_id
    */ 
    try{
        const {user_id} = req.params;
        const reviews = await Review.find({user_id:user_id});
        if (!reviews.length) {
            return res.status(404).json({
                status: "Success",
                data: { reviews: [] },
                message: "No reviews found for this user"
            });
        }

        res.status(200).json({
            status: "Success",
            results: reviews.length,
            data: { reviews },
        });
    }
    catch(err){
        console.log(err); // for Debugging
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}

/*  Uncommented when we have tour module
export async function getReviewsByTourId(req, res) {
    /*
        this function returns all the reviews in the database for a specific user
    http://localhost:8080/api/v1/review/get_Reviews_ByTourId/tour_id
    */ 
   /*
    try{
        const {tour_id} = req.params;
        const reviews = await Review.find({tour:tour_id});
        if (!reviews.length) {
            return res.status(404).json({
                status: "fail",
                message: "No reviews found for this user"
            });
        }

        res.status(200).json({
            status: "Success",
            results: reviews.length,
            data: { reviews },
        });
    }
    catch(err){
        console.log(err); // for Debugging
        res.status(400).json({
            status: "fail",
            message: err.message
        });
    }
}
*/

export async function deleteUserReviews(req,res){
    /*
    this function deletes all the reviews in the database for a specific user
    http://localhost:8080/api/v1/review/delete_UserReview/user_id
    */
    try{
        const { user_id } = req.params;
        const review =  await Review.deleteMany({user_id:user_id});
        if (review.deletedCount === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No reviews found for this user"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Reviews deleted successfully"
        });
    } catch(error){
        console.log(error); // for Debugging
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
}

export async function deleteReviewByReviewId(req,res){
     /*
    this function deletes a review in the database by its ID
    http://localhost:8080/api/v1/review/delete_Review/review_id
    */
    try{
        const { review_id } = req.params;
        const review =  await Review.deleteOne({_id:review_id});
        if (review.deletedCount === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No review found with this id"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Review deleted successfully"
        });
    } catch(error){
        console.log(error); // for Debugging
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }
    
}

export async function updateReviewByReviewId(req,res){
    /*
    this function updates a review in the database by its ID
    http://localhost:8080/api/v1/review/update_Review/review_id
    */ 
    try{
        const { review_id } = req.params;
        const { review_body,rating } = req.body;
        const review =  await Review.updateOne({_id:review_id}, { $set:{
            review: review_body,
            rating: rating
        }  });
        if (review.modifiedCount === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No review found with this id"
            });
        }
        res.status(200).json({
            status: "Success",
            message: "Review updated successfully"
        });
    } 
    catch(error){
        console.log(error); // for Debugging
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }


}


export async function getAvgRatingByTourId(req,res){

    /*
    this function returns the average rating of a tour by its ID
    http://localhost:8080/api/v1/review/get_Avg_Rating_ByTourId/tour_id
    */
    try{
        const { tour_id } = req.params;
        const reviews =  await Review.aggregate([
            {
                $match: { tour: mongoose.Types.ObjectId(tour_id) }
            },
            {
                $group: {
                    _id: null,
                    avgRating: { $avg: "$rating" }
                }
            }
        ]);
        if (reviews.length === 0) {
            return res.status(404).json({
                status: "fail",
                message: "No review found with this id"
            });
        }
        res.status(200).json({
            status: "Success",
            data: { avgRating: reviews[0].avgRating }
        });
    } catch(error){
        console.log(error); // for Debugging
        res.status(400).json({
            status: "fail",
            message: error.message
        });
    }

}
