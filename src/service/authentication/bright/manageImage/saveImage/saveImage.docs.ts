/**
 * @swagger
 * /auth/saveImage:
 *   post:
 *      summary: Save Image
 *      tags:
 *       - Authentication
 *      parameters:
 *       - name: userInfoId
 *         in: formData
 *         required: true
 *         properties:
 *         example: "654de4a54a26432a6383a293"
 *       - name: image
 *         in: formData
 *         description: The image file to upload (PNG, JPG, or JPEG).
 *         required: true
 *         type: file
 *         format: binary
 *      responses:
 *       200:
 *         description: Save Image success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "Access token",
 *           }
 *       404:
 *          description: When the user doesn't exist
 *          schema:
 *          type: string
 *          example: "User does not exist"
 *       500:
 *         description: When got server exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
