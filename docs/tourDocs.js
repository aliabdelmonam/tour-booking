/**
 * @swagger
 * tags:
 *   - name: Tours
 *     description: API for managing tours
 */

/**
 * @swagger
 * /tours:
 *   post:
 *     summary: Create a new tour
 *     description: Only admins can create a new tour. Authentication and authorization are required.
 *     tags: [Tours]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Name of the tour
 *                 example: "Safari Adventure"
 *               description:
 *                 type: string
 *                 description: Detailed description of the tour
 *                 example: "An exciting 7-day safari experience in Africa."
 *               startingDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the tour
 *                 example: "2025-08-01"
 *               duration:
 *                 type: number
 *                 description: Duration of the tour in days
 *                 example: 7
 *               maxUsers:
 *                 type: number
 *                 description: Maximum number of participants
 *                 example: 20
 *               ratingsAverage:
 *                 type: number
 *                 description: Average rating of the tour
 *                 example: 4.7
 *               originalPrice:
 *                 type: number
 *                 description: Original price of the tour
 *                 example: 1200
 *               finalPrice:
 *                 type: number
 *                 description: Discounted final price
 *                 example: 999
 *               discountCode:
 *                 type: string
 *                 description: Associated discount ID
 *                 example: "disc_6528abcxyz"
 *               guide:
 *                 type: string
 *                 description: Guide ID (must be a valid MongoDB ObjectId)
 *                 example: "6528d54ee5b5c8e34cc199fe"
 *             required:
 *               - name
 *               - description
 *               - startingDate
 *               - duration
 *               - maxUsers
 *               - originalPrice
 *               - finalPrice
 *               - discountCode
 *               - guide
 *     responses:
 *       201:
 *         description: Tour created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: object
 *                   properties:
 *                     tour:
 *                       $ref: '#/components/schemas/Tour'
 *       400:
 *         description: Invalid input or validation error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: fail
 *                 message:
 *                   type: string
 *                   example: "Tour validation failed"
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Tour:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: "6528d54ee5b5c8e34cc199fe"
 *         name:
 *           type: string
 *           example: "Safari Adventure"
 *         description:
 *           type: string
 *           example: "An exciting 7-day safari experience in Africa."
 *         startingDate:
 *           type: string
 *           format: date
 *           example: "2025-08-01"
 *         duration:
 *           type: number
 *           example: 7
 *         maxUsers:
 *           type: number
 *           example: 20
 *         ratingsAverage:
 *           type: number
 *           example: 4.7
 *         originalPrice:
 *           type: number
 *           example: 1200
 *         finalPrice:
 *           type: number
 *           example: 999
 *         discountCode:
 *           type: string
 *           example: "disc_6528abcxyz"
 *         guide:
 *           type: string
 *           example: "6528d54ee5b5c8e34cc199fe"
 */
