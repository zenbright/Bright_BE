/**
 * @swagger
 * /project-management/tasks/{projectId}:
 *   get:
 *     summary: Read all tasks 
 *     tags:
 *       - Project Management
 *     parameters:
 *      - name: projectId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: "656c3048eabd6d1ac3d767ad"
 *        description: The ID of the group
 *     responses:
 *       200:
 *         description: Read all tasks success
 *         schema:
 *           type: object
 *           example:
 *             success: true
 *             payload: "Read Successfully"
 *       500:
 *         description: When a server exception occurs
 *         schema:
 *           type: string
 *           example: "Internal server error"
*/