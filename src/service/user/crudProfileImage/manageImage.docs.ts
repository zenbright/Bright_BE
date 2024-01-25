/**
 * @swagger
 * /utils/user/profileImage/{action}:
 *   post:
 *     summary: Upload new or get profile image.
 *     tags:
 *       - User
 *     parameters:
 *       - name: action
 *         in: path
 *         description: GET or SAVE
 *         required: true
 *         schema:
 *           type: string
 *           enum: [get, save]
 *       - name: userId
 *         in: formData
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             userId:
 *               type: string
 *               description: ID of the user.
 *       - name: imageFile
 *         in: formData
 *         description: The image file to upload (PNG, JPG, or JPEG).
 *         required: false
 *         type: file
 *         format: Binary
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "SAVE/GET success",
 *           }
 *       500:
 *         description: When the server encounters an exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
