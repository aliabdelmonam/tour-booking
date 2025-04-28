/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Manage users (sign up, login, and admin actions)
 */

/**
 * @swagger
 * /users/signup:
 *   post:
 *     summary: Create a new user account
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - passwordConfirm
 *               - residence
 *               - nationality
 *               - dateOdBirth
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 8
 *               passwordConfirm:
 *                 type: string
 *               residence:
 *                 type: string
 *               nationality:
 *                 type: string
 *               dateOdBirth:
 *                 type: string
 *                 description: Date format (YYYY-MM-DD)
 *     responses:
 *       201:
 *         description: User successfully created and token sent
 *       400:
 *         description: Invalid input data or user already exists
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Incorrect email or password
 */

/**
 * @swagger
 * /users/account:
 *   get:
 *     summary: Get the current logged-in user's account details
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved user account
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       403:
 *         description: Forbidden (not an admin)
 *
 *   post:
 *     summary: Create a new user (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - passwordConfirm
 *               - residence
 *               - nationality
 *               - dateOdBirth
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *                 minLength: 8
 *               passwordConfirm:
 *                 type: string
 *               residence:
 *                 type: string
 *               nationality:
 *                 type: string
 *               dateOdBirth:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 *       400:
 *         description: Bad request
 */

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User found
 *       404:
 *         description: User not found
 *
 *   patch:
 *     summary: Update a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *     requestBody:
 *       description: User fields to update
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               bio:
 *                 type: string
 *               residence:
 *                 type: string
 *               nationality:
 *                 type: string
 *     responses:
 *       200:
 *         description: Successfully updated user
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Deactivate a user by ID (Admin only)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: MongoDB User ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User successfully deactivated
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - dateOdBirth
 *         - nationality
 *         - residence
 *         - email
 *         - password
 *         - passwordConfirm
 *       properties:
 *         _id:
 *           type: string
 *         name:
 *           type: string
 *           example: John Doe
 *         bio:
 *           type: string
 *           example: Passionate traveler and photographer.
 *         dateOdBirth:
 *           type: string
 *           example: 1995-06-15
 *         nationality:
 *           type: string
 *           example: American
 *         residence:
 *           type: string
 *           example: New York, USA
 *         email:
 *           type: string
 *           format: email
 *           example: johndoe@example.com
 *         role:
 *           type: string
 *           enum: [user, guide, admin]
 *           default: user
 *         password:
 *           type: string
 *           format: password
 *           example: StrongPass123
 *         passwordConfirm:
 *           type: string
 *           format: password
 *           example: StrongPass123
 *         active:
 *           type: boolean
 *           default: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */
