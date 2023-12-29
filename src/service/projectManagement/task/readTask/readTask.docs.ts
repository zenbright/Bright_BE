/**
 * @swagger
 * /project-management/task/read:
 *   get:
 *     summary: Read a new task 
 *     tags:
 *       - Project Management
 *     responses:
 *       200:
 *         description: Read a new task success
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