/**
 * @swagger
 * /auth/git:
 *   post:
 *      summary: Login with Github account
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: body
 *         in: body
 *         description: Code taken from github oAuth
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
 *             payload: {},
 *           }
 *       401:
 *         description: Invalid Access Token
 *         schema:
 *           type: string
 *           example: "Request failed with status code 401"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
