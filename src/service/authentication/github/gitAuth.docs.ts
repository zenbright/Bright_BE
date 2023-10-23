/**
 * @swagger
 * /auth/git:
 *   post:
 *      summary: Login with Github
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
 *         description: Login with Github success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 *       502:
 *         description: When got too many requests
 *         schema:
 *           type: string
 *           example: "Too many requests"
 */
