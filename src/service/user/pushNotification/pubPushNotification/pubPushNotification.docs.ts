/**
 * @swagger
 * /utils/user/push-notification:
 *   post:
 *     summary: Push Notification
 *     tags:
 *       - user
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "message": "Hello, this is a push notification!",
 *           "deviceToken": "device123",
 *         }
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