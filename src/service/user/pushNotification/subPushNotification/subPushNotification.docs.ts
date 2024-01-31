/**
 * @swagger
 * /utils/user/push-notification:
 *   get:
 *     summary: Push Notification
 *     tags:
 *       - user
 *     responses:
 *       200:
 *         description: Push Notification success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Deleted Successfully"
 *       400:
 *         description: Invalid or missing account
 *         schema:
 *           type: string
 *           example: "Invalid or missing account"
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