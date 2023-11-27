/**
 * @swagger
 * /utils/user/searchUser:
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
 *           "searchPhrase": "Quo",
 *         }
 *      responses:
 *       200:
 *         description: Search User success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Quoc Doan, Quoc Huu, ...",
 *           }
 *       400:
 *          description: Invalid Search Phrase
 *          schema:
 *           type: string
 *           example: "No search"
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
