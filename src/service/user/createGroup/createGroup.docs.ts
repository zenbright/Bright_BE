/**
 * @swagger
 * /utils/user/createGroup:
 *   post:
 *     summary: Create a new group 
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "userCredId": "userCredId",
*            "invitedUsers": ["userCredId", "userCredId"],
 *         }
 *     responses:
 *       200:
 *         description: Create a new group success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Deleted Successfully"
 *       404:
 *         description: User not found
 *         schema:
 *           type: string
 *           example: "User not found"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/