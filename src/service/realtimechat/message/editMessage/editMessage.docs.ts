/**
 * @swagger
 * /chat/message/{groupId}/{msgId}:
 *   put:
 *     summary: Edit a message from a group
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *       - name: groupId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "656c3048eabd6d1ac3d767ad"
 *         description: The ID of the group
 *       - name: msgId
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         example: "65b20ed75905ffc41c65290f"
 *         description: The ID of the message to be edited
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             updatedText:
 *               type: string
 *               example: "UPDATED!"
 *     responses:
 *       200:
 *         description: Edit a message from a group success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 payload:
 *                   type: string
 *                   example: "Edited Successfully"
 *       404:
 *         description: Group or User not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Group or User not found"
 *       500:
 *         description: When a server exception occurs
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */
