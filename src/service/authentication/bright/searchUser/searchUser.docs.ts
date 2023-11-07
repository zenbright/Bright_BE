/**
 * @swagger
 * /auth/searchUser:
 *   post:
 *      summary: Search User 
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "account": "account",
 *           "fullname": "Quoc",
 *         }
 *      responses:
 *       200:
 *         description: Search User success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       400:
 *          description: Invalid User Account or Fullname
 *          schema:
 *           type: string
 *           example: "Invalid User Account or Fullname."
 *       404:
 *          description: When the user doesn't exist
 *          schema:
 *           type: string
 *           example: "User does not exist"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
