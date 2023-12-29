/**
 * @swagger
 * /project-management/project/create:
 *   post:
 *     summary: Create a new Project 
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "name": "Design APIs",
 *           "description": "Don't forget docs, route, controller, service structure.",
 *           "groupId": "656c3048eabd6d1ac3d767ad",
 *         }
 *     responses:
 *       200:
 *         description: Create a new Project success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Created Successfully"
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