/**
 * @swagger
 * /auth/bright/logout:
 *   get:
 *     summary: Logout with Bright
 *     description: Invalidate the refresh token and clear the JWT cookie to log the user out.
 *     tags:
 *       - Authentication
 *     responses:
 *       200:
 *         description: User successfully logged out.
 *       401:
 *         description: Unauthorized - JWT cookie not found.
 *       500:
 *         description: Internal server error.
 */