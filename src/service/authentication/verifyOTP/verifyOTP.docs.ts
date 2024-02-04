/**
 * @swagger
 * /auth/verifyOTP:
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
 *           "userCredId": "abc",
 *           "userTypedOTP": "1234"
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
 *           example: "OTP EXPIRED OR INVALID"
 *       404:
 *          description: When user credential or OTP is not found
 *          schema:
 *           type: string
 *           example: "USER CREDENTIAL OR OTP DOES NOT EXIST"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "INTERNAL SERVER ERROR"
 */
