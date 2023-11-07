/**
 * @swagger
 * /utils/user/deleteAccount:
 *   post:
 *     summary: Delete account
 *     tags:
 *       - Authentication
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "account": "account",
*            "provider": "bright",
 *         }
 *     responses:
 *       200:
 *         description: Delete account success
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