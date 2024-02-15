/**
 * @swagger
 * /project-management/project:
 *   delete:
 *     summary: Delete project
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "projectId": "657c6477b08288d49bc92109",
 *         }
 *     responses:
 *       200:
 *         description: Delete project success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Deleted Successfully"
 *       400:
 *         description: Invalid or missing project
 *         schema:
 *           type: string
 *           example: "Invalid or missing project"
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