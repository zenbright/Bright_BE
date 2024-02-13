/**
 * @swagger
 * /auth/bright/refresh:
 *   get:
 *     summary: Refresh Access Token
 *     description: Refresh the access token using the refresh token stored in cookies.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: New access token generated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 roles:
 *                   type: string
 *                   description: User roles associated with the refreshed access token.
 *                 accessToken:
 *                   type: string
 *                   description: New access token generated.
 *       401:
 *         description: Unauthorized - JWT cookie not found.
 *       403:
 *         description: Forbidden - Invalid or expired refresh token or mismatched account.
 *       404:
 *         description: Not Found - User credentials not found for the provided refresh token.
 *       500:
 *         description: Internal server error.
 */