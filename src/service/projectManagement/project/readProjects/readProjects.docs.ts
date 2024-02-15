/**
 * @swagger
 * /project-management/projects:
 *   get:
 *     summary: Read all projects 
 *     tags:
 *       - Project Management
 *     responses:
 *       200:
 *         description: Read all projects success
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