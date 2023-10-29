/**
 * @swagger
 * /auth/google/redirect:
 *   get:
 *     summary: Callback after Google OAuth authentication
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: code
 *         in: query
 *         required: true
 *         description: Google OAuth authorization code
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User successfully authenticated
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               payload: "Access token"
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: "Internal server error"
 */
