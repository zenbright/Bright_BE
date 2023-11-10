/**
 * @swagger
 * /utils/user/verifyEmail:
 *   post:
 *      summary: Email Verification
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
 *         description: Email Verification success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       400:
 *          description: When the email is invalid
 *          schema:
 *           type: string
 *           example: "INVALID EMAIL ADDRESS"
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
