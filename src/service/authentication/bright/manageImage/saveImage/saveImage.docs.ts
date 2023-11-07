/**
 * @swagger
 * /auth/saveImage:
 *   post:
 *      summary: Save Image
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "userInfoId": "",
 *           "imageFile": "",
 *         }
 *      responses:
 *       200:
 *         description: Save Image success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       404:
 *          description: When the user doesn't exist
 *          schema:
 *          type: string
 *          example: "User does not exist"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
