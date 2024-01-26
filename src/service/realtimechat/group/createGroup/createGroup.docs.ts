/**
 * @swagger
 * /chat/createGroup:
 *   post:
 *     summary: Create a new group 
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "userCredId": "654de4a54a26432a6383a293",
*            "invitedUsers": ["654b5224aac8570c61b5e7cf", "6545c64a5f02b55dbe204fa8"],
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