/**
 * @swagger
 * /utils/user/deleteMessage:
 *   put:
 *     summary: Delete a message from a group
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *            "groupId": "655481db98d3e616d89d755c",
 *            "messageId": "655481db98d3e616d89d755c",
 *         }
 *     responses:
 *       200:
 *         description: Delete a message from a group success
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