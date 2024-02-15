/**
 * @swagger
 * /project-management/project:
 *   put:
 *     summary: Update a new Project 
 *     tags:
 *       - Project Management
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         properties:
 *         example: {
 *           "projectId": "657c6477b08288d49bc92109",
 *           "name": "Design APIs with Blah",
 *           "description": "Don't forget the structure.",
 *         }
 *     responses:
 *       200:
 *         description: Update a new Project success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Updated Successfully"
 *       404:
 *         description: Project not found
 *         schema:
 *           type: string
 *           example: "Project not found"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/