/**
 * @swagger
 * /project-management/checklistitem/{taskId}:
 *   get:
 *     summary: Read all Checklist Items 
 *     tags:
 *       - Project Management
 *     parameters:
 *      - name: taskId
 *        in: path
 *        required: true
 *        schema:
 *          type: string
 *        example: "656c3048eabd6d1ac3d767ad"
 *        description: The ID of the task
 *     responses:
 *       200:
 *         description: Read all Checklist Items success
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