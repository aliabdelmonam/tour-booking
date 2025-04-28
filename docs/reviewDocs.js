/**
 * @swagger
 * tags:
 *   - name: Reviews
 *     description: Tour review management
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
 *         - user_id
 *         - tour_id
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ID
 *         review:
 *           type: string
 *           description: Review content
 *         rating:
 *           type: number
 *           minimum: 1
 *           maximum: 5
 *           description: Rating from 1-5
 *         user_id:
 *           type: string
 *           description: ID of the user who created the review
 *         tour_id:
 *           type: string
 *           description: ID of the tour being reviewed
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Creation timestamp
 *       example:
 *         _id: 60d21b4667d0d8992e610c85
 *         review: "Excellent tour experience! The guide was very knowledgeable."
 *         rating: 5
 *         user_id: 60d21b4667d0d8992e610c80
 *         tour_id: 60d21b4667d0d8992e610c82
 *         createdAt: "2023-01-15T12:00:00Z"
 */

/**
 * @swagger
 * /review/create_review:
 *   post:
 *     summary: Create a new review
 *     description: Create a new review for a tour that the user has booked
 *     tags: [Reviews]
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
 *               - tour_id
 *             properties:
 *               review:
 *                 type: string
 *                 description: Review content
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Rating from 1-5
 *               user_id:
 *                 type: string
 *                 description: ID of the user creating the review
 *               tour_id:
 *                 type: string
 *                 description: ID of the tour being reviewed
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Successfully Create Review
 *                 data:
 *                   type: object
 *                   properties:
 *                     review:
 *                       $ref: '#/components/schemas/Review'
 *       400:
 *         description: Bad request - Invalid data
 *       404:
 *         description: User not found, tour not found, or user hasn't booked this tour
 *       500:
 *         description: Failed to create review in Pinecone
 */

/**
 * @swagger
 * /review/get_all_reviews:
 *   get:
 *     summary: Get all reviews
 *     description: Retrieve all reviews in the system
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 results:
 *                   type: integer
 *                   description: Number of reviews returned
 *                 data:
 *                   type: object
 *                   properties:
 *                     reviews:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /review/get_Review_ById/{review_id}:
 *   get:
 *     summary: Get review by ID
 *     description: Retrieve a review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to retrieve
 *     responses:
 *       200:
 *         description: Review found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: object
 *                   properties:
 *                     review:
 *                       $ref: '#/components/schemas/Review'
 *       400:
 *         description: Invalid review ID format
 *       404:
 *         description: No review found with this ID
 */

/**
 * @swagger
 * /review/get_Reviews_ByUserId/{user_id}:
 *   get:
 *     summary: Get reviews by user ID
 *     description: Retrieve all reviews created by a specific user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose reviews to retrieve
 *     responses:
 *       200:
 *         description: Reviews found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 results:
 *                   type: integer
 *                   description: Number of reviews returned
 *                 data:
 *                   type: object
 *                   properties:
 *                     reviews:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Review'
 *       404:
 *         description: No reviews found for this user
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /review/delete_UserReviews/{user_id}:
 *   delete:
 *     summary: Delete all reviews by a user
 *     description: Delete all reviews created by a specific user
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: user_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user whose reviews to delete
 *     responses:
 *       200:
 *         description: Reviews deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Reviews deleted successfully
 *       404:
 *         description: No reviews found for this user
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /review/delete_Review/{review_id}:
 *   delete:
 *     summary: Delete review by ID
 *     description: Delete a specific review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the review to delete
 *     responses:
 *       200:
 *         description: Review deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Review deleted successfully
 *       404:
 *         description: No review found with this ID
 *       400:
 *         description: Error occurred
 */

/**
 * @swagger
 * /review/update_Review/{review_id}:
 *   patch:
 *     summary: Update review by ID
 *     description: Update a specific review by its ID
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: review_id
 *         required: true
 *         schema:
 *           type: string
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
 *                 description: Updated review content
 *               rating:
 *                 type: number
 *                 minimum: 1
 *                 maximum: 5
 *                 description: Updated rating from 1-5
 *     responses:
 *       200:
 *         description: Review updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: Success
 *                 message:
 *                   type: string
 *                   example: Review updated successfully
 *       404:
 *         description: No review found with this ID
 *       400:
 *         description: Error occurred
 */