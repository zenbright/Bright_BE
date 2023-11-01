/**
 * @swagger
 * /auth/Bright/signup:
 *   post:
 *     summary: General Sign Up
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           example:
 *             code: ""
 *     responses:
 *       200:
 *         description: General Sign Up success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Access token"
 *       400:
 *         description: When the user already exists
 *         schema:
 *           type: string
 *           example: "User already exists"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/