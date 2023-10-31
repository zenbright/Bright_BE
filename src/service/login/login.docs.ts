/**
 * @swagger
 * /auth/Bright/login:
 *   post:
 *      summary: General Log In
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "code": ""
 *         }
 *      responses:
 *       200:
 *         description: General Log In success
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
