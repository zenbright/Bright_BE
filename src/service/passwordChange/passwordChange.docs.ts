/**
 * @swagger
 * /auth/Bright/passwordChange:
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
 *           "code": ""
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
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
