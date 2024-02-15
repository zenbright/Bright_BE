/**
 * @swagger
 * /project-management/tasks:
 *   get:
 *     summary: Read all tasks 
 *     tags:
 *       - Project Management
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