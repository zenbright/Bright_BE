/**
 * @swagger
 * /projectManagement/updateTask:
 *   put:
 *     summary: Update a new Task 
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "taskId": "657d5709097a6b09c695829e",
 *           "name": "YO",
 *           "description": "DO THIS!!",
 *           "status": "Completed",
 *           "checklist": [""],
 *           "assignedMembers": ["654b5224aac8570c61b5e7cf"],
 *           "dueDate": "2024-10-22 12:11:59",
 *           "belongedMonth": "Oct-2024",
 *         }
 *     responses:
 *       200:
 *         description: Update a new Task success
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