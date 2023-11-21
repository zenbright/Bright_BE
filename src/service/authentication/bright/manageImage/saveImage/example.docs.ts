/**
 * @swagger
 * /setting/profile/avatar/{action}:
 *   post:
 *     summary: Upload or get profile image.
 *     tags:
 *       - User
 *     parameters:
 *       - name: action
 *         in: path
 *         description: GET hoặc SET
 *         required: true
 *         schema:
 *           type: string
 *           enum: [get, set]
 *       - name: email
 *         in: formData
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *               description: The email address of the user.
 *       - name: image
 *         in: formData
 *         description: The image file to upload (PNG, JPG, or JPEG).
 *         required: false
 *         type: file
 *         format: Binary
 *       - name: imageURI
 *         in: formData
 *         description: The image link to upload (PNG, JPG, or JPEG).
 *         required: false
 *         type: string
 *     responses:
 *       200:
 *         description: Success
 *         schema:
 *           type: object
 *           example: {
 *             success: true,
 *             payload: "SET/GET success",
 *           }
 *       403:
 *         description: When data cannot be processed
 *         schema:
 *           type: object
 *           properties:
 *             success:
 *               type: boolean
 *             errors:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/ValidatorErrorItem'
 *           example: {
 *             success: false,
 *             errors: [
 *               {
 *                 msg: "Your account is not available, had been deleted, or deactivated",
 *                 param: 'accountNotAvailable',
 *               },
 *             ]
 *           }
 *       500:
 *         description: When the server encounters an exception
 *         schema:
 *           type: string
 *           example: "Internal server error"
 */
