/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: API endpoints for managing reviews
 */

/**
 * @swagger
 * /review/create_review:
 *   post:
 *     tags:
 *       - Reviews
 *     summary: Create a new review
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - review
 *               - rating
 *               - user_id
 *             properties:
 *               review:
 *                 type: string
 *                 example: "Amazing tour!"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *               tour_id:
 *                 type: string
 *                 format: uuid
 *                 example: 680e604bcdd2a9384470c395
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: 65f5c4d4f2a5f18a3b91f88b
 *     responses:
 *       201:
 *         description: Review successfully created
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /review/get_all_reviews:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of all reviews
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /review/get_Review_ById/{review_id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get a review by its ID
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the review to fetch
 *     responses:
 *       200:
 *         description: Review fetched successfully
 *       400:
 *         description: Invalid review ID
 */

/**
 * @swagger
 * /review/get_Reviews_ByUserId/{user_id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get all reviews written by a user
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: Reviews fetched successfully
 *       404:
 *         description: No reviews found for this user
 */

/**
 * @swagger
 * /review/delete_UserReviews/{user_id}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete all reviews by a user
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: All user reviews deleted successfully
 *       404:
 *         description: No reviews found for this user
 */

/**
 * @swagger
 * /review/delete_Review/{review_id}:
 *   delete:
 *     tags:
 *       - Reviews
 *     summary: Delete a review by its ID
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the review
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *       404:
 *         description: No review found with this ID
 */

/**
 * @swagger
 * /review/update_Review/{review_id}:
 *   patch:
 *     tags:
 *       - Reviews
 *     summary: Update a review by its ID
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the review to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               review_body:
 *                 type: string
 *                 example: "Updated review text"
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 4
 *     responses:
 *       200:
 *         description: Review updated successfully
 *       404:
 *         description: No review found with this ID
 */

/**
 * @swagger
 * /review/get_Avg_Rating_ByTourId/{tour_id}:
 *   get:
 *     tags:
 *       - Reviews
 *     summary: Get the average rating for a tour
 *     parameters:
 *       - in: path
 *         name: tour_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the tour
 *     responses:
 *       200:
 *         description: Average rating retrieved successfully
 *       404:
 *         description: No reviews found for this tour
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Review:
 *       type: object
 *       required:
 *         - review
 *         - rating
 *         - tour_id
 *         - user_id
 *       properties:
 *         _id:
 *           type: string
 *         review:
 *           type: string
 *           example: This tour was absolutely fantastic!
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           example: 4.5
 *         tour_id:
 *           type: string
 *           description: ID of the tour being reviewed
 *         user_id:
 *           type: string
 *           description: ID of the user who wrote the review
 */
