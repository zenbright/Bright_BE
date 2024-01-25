/**
 * @swagger
 * /chat/deleteGroup:
 *   post:
 *     summary: Delete group
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "groupId": "655481db98d3e616d89d755c",
 *         }
 *     responses:
 *       200:
 *         description: Delete group success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Deleted Successfully"
 *       404:
 *         description: Group not found
 *         schema:
 *           type: string
 *           example: "Group not found"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/