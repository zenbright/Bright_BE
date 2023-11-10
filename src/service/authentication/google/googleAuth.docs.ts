/**
 * @swagger
 * /auth/google/redirect:
 *   get:
 *      summary: Login with Google
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: code
 *         in: query
 *         required: true
 *         schema:
 *           type: string    
 *         properties:
 *         example: {
 *           "code": ""
 *         }
 *      responses:
 *       200:
 *         description: Login with Google success
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
 */
