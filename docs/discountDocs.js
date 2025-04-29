/**
 * @swagger
 * components:
 *   schemas:
 *     Discount:
 *       type: object
 *       required:
 *         - code
 *         - type
 *         - value
 *         - startDate
 *         - endDate
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated ID of the discount
 *         code:
 *           type: string
 *           description: Unique discount code
 *         type:
 *           type: string
 *           enum: [percentage, fixed]
 *           description: Type of discount (percentage or fixed amount)
 *         value:
 *           type: number
 *           description: Discount value (percentage or fixed amount)
 *         startDate:
 *           type: string
 *           format: date
 *           description: Start date of the discount
 *         endDate:
 *           type: string
 *           format: date
 *           description: End date of the discount
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Date when the discount was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the discount was last updated
 *         discountType:
 *           type: string
 *           enum: [public, user-specific, tour-specific]
 *           description: Type of discount eligibility
 *         eligibleUsers:
 *           type: array
 *           items:
 *             type: string
 *           description: List of user IDs eligible for this discount
 *         applicableTours:
 *           type: array
 *           items:
 *             type: string
 *           description: List of tour IDs this discount can be applied to
 *         usageLimit:
 *           type: number
 *           description: Maximum number of times this discount can be used
 *         usageCount:
 *           type: number
 *           description: Number of times this discount has been used
 */

/**
 * @swagger
 * /discounts:
 *   post:
 *     summary: Create a new discount (Admin only)
 *     description: Creates a new discount code. **This endpoint is restricted to admin users only.**
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - type
 *               - value
 *               - startDate
 *               - endDate
 *             properties:
 *               code:
 *                 type: string
 *                 description: Unique discount code
 *                 example: "SUMMER2025"
 *               type:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 description: Type of discount
 *                 example: "percentage"
 *               value:
 *                 type: number
 *                 description: Discount value (percentage or amount)
 *                 example: 15
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Start date of the discount
 *                 example: "2025-05-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: End date of the discount
 *                 example: "2025-08-31"
 *               discountType:
 *                 type: string
 *                 enum: [public, user-specific, tour-specific]
 *                 description: Type of discount eligibility
 *                 example: "public"
 *               eligibleUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs of users eligible for this discount
 *                 example: []
 *               applicableTours:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: IDs of tours this discount can be applied to
 *                 example: []
 *               usageLimit:
 *                 type: number
 *                 description: Maximum number of times the discount can be used
 *                 example: 100
 *     responses:
 *       201:
 *         description: Discount created successfully
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
 *                     discount:
 *                       $ref: '#/components/schemas/Discount'
 *       400:
 *         description: Invalid input or validation error
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not authorized (admin access required)
 *
 *   get:
 *     summary: Get all discounts (Admin only)
 *     description: Retrieves a list of all discounts. **This endpoint is restricted to admin users only.**
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of discounts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   description: Number of discounts returned
 *                 data:
 *                   type: object
 *                   properties:
 *                     discounts:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Discount'
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not authorized (admin access required)
 */

/**
 * @swagger
 * /discounts/{id}:
 *   get:
 *     summary: Get a discount by ID (Admin only)
 *     description: Retrieves a specific discount by its ID. **This endpoint is restricted to admin users only.**
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Discount found
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
 *                     discount:
 *                       $ref: '#/components/schemas/Discount'
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not authorized (admin access required)
 *       404:
 *         description: Discount not found
 *
 *   patch:
 *     summary: Update a discount by ID (Admin only)
 *     description: Updates a specific discount by its ID. **This endpoint is restricted to admin users only.**
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *                 description: Updated discount code
 *               type:
 *                 type: string
 *                 enum: [percentage, fixed]
 *                 description: Updated discount type
 *               value:
 *                 type: number
 *                 description: Updated discount value
 *               startDate:
 *                 type: string
 *                 format: date
 *                 description: Updated start date
 *               endDate:
 *                 type: string
 *                 format: date
 *                 description: Updated end date
 *               discountType:
 *                 type: string
 *                 enum: [public, user-specific, tour-specific]
 *                 description: Updated discount eligibility type
 *               eligibleUsers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of eligible user IDs
 *               applicableTours:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Updated list of applicable tour IDs
 *               usageLimit:
 *                 type: number
 *                 description: Updated usage limit
 *     responses:
 *       200:
 *         description: Discount updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 discount:
 *                   type: object
 *                   properties:
 *                     discount:
 *                       $ref: '#/components/schemas/Discount'
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not authorized (admin access required)
 *       404:
 *         description: Discount not found
 *
 *   delete:
 *     summary: Delete a discount by ID (Admin only)
 *     description: Deactivates a discount by setting its end date to current date. **This endpoint is restricted to admin users only.**
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Discount ID
 *     responses:
 *       200:
 *         description: Discount deactivated successfully
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
 *                     discount:
 *                       $ref: '#/components/schemas/Discount'
 *       401:
 *         description: Unauthorized - Not authenticated
 *       403:
 *         description: Forbidden - Not authorized (admin access required)
 *       404:
 *         description: Discount not found
 */

/**
 * @swagger
 * /discounts/validate:
 *   post:
 *     summary: Validate a discount code
 *     description: Checks if a discount code is valid for a specific tour and user
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - discountCode
 *               - tourId
 *               - userId
 *             properties:
 *               discountCode:
 *                 type: string
 *                 description: Discount code to validate
 *                 example: "SUMMER2025"
 *               tourId:
 *                 type: string
 *                 description: ID of the tour to apply the discount to
 *                 example: "615df2f5a65c4b40d0619812"
 *               userId:
 *                 type: string
 *                 description: ID of the user applying the discount
 *                 example: "615df2f5a65c4b40d0619813"
 *     responses:
 *       200:
 *         description: Discount validated successfully
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
 *                     discount:
 *                       $ref: '#/components/schemas/Discount'
 *                     isValid:
 *                       type: boolean
 *                       example: true
 *       400:
 *         description: Invalid discount code or validation error
 *       401:
 *         description: Unauthorized - Not authenticated
 */

/**
 * @swagger
 * /discounts/apply:
 *   post:
 *     summary: Apply a discount to a tour
 *     description: Applies a discount code to a tour and calculates the discounted price
 *     tags: [Discounts]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - discountCode
 *               - tourId
 *               - userId
 *             properties:
 *               discountCode:
 *                 type: string
 *                 description: Discount code to apply
 *                 example: "SUMMER2025"
 *               tourId:
 *                 type: string
 *                 description: ID of the tour
 *                 example: "615df2f5a65c4b40d0619812"
 *               userId:
 *                 type: string
 *                 description: ID of the user
 *                 example: "615df2f5a65c4b40d0619813"
 *     responses:
 *       200:
 *         description: Discount applied successfully
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
 *                       type: object
 *                       description: Tour details
 *                     originalPrice:
 *                       type: number
 *                       description: Original price of the tour
 *                       example: 1000
 *                     discountedPrice:
 *                       type: number
 *                       description: Price after discount application
 *                       example: 850
 *                     discount:
 *                       $ref: '#/components/schemas/Discount'
 *                     savings:
 *                       type: number
 *                       description: Amount saved due to discount
 *                       example: 150
 *       400:
 *         description: Invalid discount code or validation error
 *       401:
 *         description: Unauthorized - Not authenticated
 */