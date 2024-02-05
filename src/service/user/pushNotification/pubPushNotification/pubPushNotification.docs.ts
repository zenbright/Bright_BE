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
 *           "title": "PUSH TITLE",
 *           "message": "Hello, this is a push notification!",
 *           "deviceToken": "fT_PId2sYBr3ZVKDPhL8GH:APA91bEwhjGu0BER5ZkJ_hrrus5-sCuyVEwRimlx3gB5zD_J-rJVA4LzavT23Xea2eOGaSCJmE3bq0y66rOMPVph8Qt0avMZic01Xt4_s3ojC-iEKLWMnIy-1JL-pxpybFLjD8mDsx48",
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