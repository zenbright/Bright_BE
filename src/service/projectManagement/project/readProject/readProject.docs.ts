/**
 * @swagger
 * /project-management/project/read:
 *   get:
 *     summary: Read a new project 
 *     tags:
 *       - Project Management
 *     responses:
 *       200:
 *         description: Read a new project success
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