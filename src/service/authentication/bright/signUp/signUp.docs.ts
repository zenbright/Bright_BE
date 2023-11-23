/**
 * @swagger
 * /auth/bright/signup:
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
 *           example: {
 *             account: 'account2',
 *             password: 'password',
 *             fullname: 'kim',
 *             email: 'kim@gmail.com',
 *             dayOfBirth: '2003-06-17T12:00:00'
 *           }
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