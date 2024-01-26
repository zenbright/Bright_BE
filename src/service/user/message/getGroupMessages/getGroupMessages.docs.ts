/**
 * @swagger
 * /chat/getGroupMessages/{groupId}:
 *   get:
 *     summary: Get messages from a group
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
 *     responses:
 *       200:
 *         description: Get a message from a group success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Got Successfully"
 *       404:
 *         description: Message not found
 *         schema:
 *           type: string
 *           example: "Message not found"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
