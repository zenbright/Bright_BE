/**
 * @swagger
 * /projectManagement/createTask:
 *   post:
 *     summary: Create a new Task 
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "projectId": "657d533e2111ced2c36c0131",
 *           "name": "Create a file.",
 *           "description": "Don't forget docs, route, controller, service structure.",
 *           "assignedMembers": ["654b5224aac8570c61b5e7cf", "6545c64a5f02b55dbe204fa8"],
 *           "dueDate": "2024-11-22 12:11:59",
 *           "belongedMonth": "Dec-2024",
 *         }
 *     responses:
 *       200:
 *         description: Create a new Task success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Created Successfully"
 *       400:
 *         description: Invalid value
 *         schema:
 *           type: string
 *           example: "Invalid value"
 *       404:
 *         description: Group not found
 *         schema:
 *           type: string
 *           example: "Group not found"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/