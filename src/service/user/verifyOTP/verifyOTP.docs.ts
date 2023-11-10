/**
 * @swagger
 * /utils/user/verifyOTP:
 *   post:
 *      summary: Verify OTP
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
 *         description: OTP verified successfully
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       400:
 *          description: When OTP is expired or invalid
 *          schema:
 *           type: string
 *           example: "OTP is expired or invalid"
 *       404:
 *          description: When user credential or OTP is not found
 *          schema:
 *           type: string
 *           example: "user credential or OTP does not exist"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
