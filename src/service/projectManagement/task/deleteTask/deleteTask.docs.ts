/**
 * @swagger
 * /project-management/task:
 *   delete:
 *     summary: Delete a task
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "taskId": "657d5709097a6b09c695829e",
 *         }
 *     responses:
 *       200:
 *         description: Delete a task success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Deleted Successfully"
 *       400:
 *         description: Invalid or missing task
 *         schema:
 *           type: string
 *           example: "Invalid or missing task"
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
