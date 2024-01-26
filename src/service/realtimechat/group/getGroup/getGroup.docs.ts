/**
 * @swagger
 * /chat/getGroup/{groupId}:
 *   get:
 *     summary: Get a group from a group
 *     tags:
 *       - Real-time chat feature
 *     parameters:
 *      - name: groupId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: "65b20ed75905ffc41c65290f"
 *        description: The ID of the group to be gotten
 *     responses:
 *       200:
 *         description: Get a group from a group success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Got Successfully"
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
