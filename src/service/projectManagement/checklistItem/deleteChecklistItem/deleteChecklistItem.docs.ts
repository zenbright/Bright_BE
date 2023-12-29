/**
 * @swagger
 * /project-management/checklistitem/delete:
 *   post:
 *     summary: Delete a new ChecklistItem 
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "taskId": "657d5632444b2fa800911be5",
 *           "itemId": "657d6badf601c86b8d2c1df7",
 *         }
 *     responses:
 *       200:
 *         description: Delete a new ChecklistItem success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Deleted Successfully"
 *       404:
 *         description: Task not found
 *         schema:
 *           type: string
 *           example: "Task not found"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/