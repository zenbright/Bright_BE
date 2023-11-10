/**
 * @swagger
 * /utils/user/sendOTP:
 *   post:
 *      summary: Send OTP
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "email": "0617@gmail.com",
 *         }
 *      responses:
 *       200:
 *         description: Sent OTP successfully
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       403:
 *          description: When the email is not verified
 *          schema:
 *           type: string
 *           example: "EMAIL NOT VERIFIED"
 *       404:
 *          description: When the user doesn't exist
 *          schema:
 *           type: string
 *           example: "USER DOES NOT EXIST"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "INTERNAL SERVER ERROR"
 */
