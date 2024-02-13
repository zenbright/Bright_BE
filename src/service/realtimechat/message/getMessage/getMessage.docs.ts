/**
 * @swagger
 * /chat/message/{msgId}:
 *   get:
 *     summary: Get a message from a group
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *      - name: msgId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: "65b20ed75905ffc41c65290f"
 *        description: The ID of the message to be gotten
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
