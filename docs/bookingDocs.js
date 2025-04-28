/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: API endpoints for managing bookings
 */

/**
 * @swagger
 * /api/v1/bookings:
 *   post:
 *     summary: Create a new booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tour
 *               - user
 *               - price
 *             properties:
 *               tour:
 *                 type: string
 *                 description: ID of the tour
 *               user:
 *                 type: string
 *                 description: ID of the user
 *               price:
 *                 type: number
 *                 description: Price of the booking
 *     responses:
 *       201:
 *         description: Booking created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input
 */


/**
 * @swagger
 * /api/v1/bookings/{id}:
 *   delete:
 *     summary: Delete a booking
 *     tags: [Bookings]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       204:
 *         description: Booking deleted successfully
 *       404:
 *         description: Booking not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Booking:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         tour:
 *           type: string
 *         user:
 *           type: string
 *         price:
 *           type: number
 *         paid:
 *           type: boolean
 *         createdAt:
 *           type: string
 *           format: date-time
 */
