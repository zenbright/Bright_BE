/**
 * @swagger
 * /utils/user/deleteMessage/{groupId}/{msgId}:
 *   delete:
 *     summary: Delete a message from a group
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *      - name: groupId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: "656c3048eabd6d1ac3d767ad"
 *        description: The ID of the group
 *
 *      - name: msgId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: "65b20ed75905ffc41c65290f"
 *        description: The ID of the message to be deleted
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
