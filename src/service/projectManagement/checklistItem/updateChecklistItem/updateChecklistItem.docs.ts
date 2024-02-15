/**
 * @swagger
 * /project-management/checklistitem:
 *   put:
 *     summary: Update an existing Checklist Item 
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "taskId": "657d6badf601c86b8d2c1df7",
 *           "itemId": "657d6badf601c86b8d2c1df7",
 *           "name": "DO THIS!",
 *           "completed": "true",
 *         }
 *     responses:
 *       200:
 *         description: Update an existing Checklist Item success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Updated Successfully"
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