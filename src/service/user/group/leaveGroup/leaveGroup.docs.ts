/**
 * @swagger
 * /chat/leaveGroup:
 *   put:
 *     summary: Leave a group
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "userCredId": "654de4a54a26432a6383a293",
 *            "groupId": "655481db98d3e616d89d755c",
 *         }
 *     responses:
 *       200:
 *         description: Leave a group success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Deleted Successfully"
 *       404:
 *         description: Group or User not found
 *         schema:
 *           type: string
 *           example: "Group or User not found"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/