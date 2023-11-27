/**
 * @swagger
 * /utils/user/changePassword:
 *   put:
 *      summary: General Account Password Change
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "account": "account",
 *           "newPassword": "newPassword",
 *         }
 *      responses:
 *       200:
 *         description: General Account Password Change success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       404:
 *          description: When the user account not found
 *          schema:
 *           type: string
 *           example: "USER ACCOUNT NOT FOUND"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "INTERNAL SERVER ERROR"
 */
