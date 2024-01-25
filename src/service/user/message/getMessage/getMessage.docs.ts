/**
 * @swagger
 * /chat/getMessage/{msgId}:
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
