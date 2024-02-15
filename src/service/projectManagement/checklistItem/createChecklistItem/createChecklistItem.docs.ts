/**
 * @swagger
 * /project-management/checklistitem:
 *   post:
 *     summary: Create a new Checklist Item 
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "taskId": "657d5632444b2fa800911be5",
 *           "name": "Design APIs",
 *         }
 *     responses:
 *       200:
 *         description: Create a new Checklist Item success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Created Successfully"
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