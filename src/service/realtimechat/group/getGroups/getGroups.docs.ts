/**
 * @swagger
 * /chat/groups:
 *   get:
 *     summary: Get all groups
 *     tags:
 *       - Real-time chat feature
 *     responses:
 *       200:
 *         description: Get all groups success
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
