/**
 * @swagger
 * tags:
 *   - name: Semantic Search
 *     description: Semantic search operations
 */

/**
 * @swagger
 * /semantic_search:
 *   get:
 *     summary: Perform semantic search
 *     description: Search across content using semantic search capabilities powered by Pinecone
 *     tags: [Semantic Search]
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The search query text
 *       - in: query
 *         name: type
 *         required: false
 *         schema:
 *           type: string
 *           enum: [review, tour, user]
 *         description: Filter results by content type (optional)
 *     responses:
 *       200:
 *         description: Successful search
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier of the result
 *                       score:
 *                         type: number
 *                         format: float
 *                         description: Relevance score of the result
 *                       metadata:
 *                         type: object
 *                         description: Additional metadata for the result
 *       400:
 *         description: Bad request - missing required parameters
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
 *                   example: Search query is required
 *       500:
 *         description: Server error during search operation
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
 *                   example: Failed to perform semantic search
 *                 error:
 *                   type: string
 */