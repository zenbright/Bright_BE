/**
 * @swagger
 * /chat/join/group:
 *   put:
 *     summary: Join group
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "userCredId": "654de4a54a26432a6383a293",
 *           "groupId": "655481db98d3e616d89d755c",
 *         }
 *     responses:
 *       200:
 *         description: Join group success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Joined Successfully"
 *       400:
 *         description: User is already in the group
 *         schema:
 *           type: string
 *           example: "User is already in the group"
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