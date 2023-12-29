/**
 * @swagger
 * /project-management/checklistitem/read:
 *   get:
 *     summary: Read a new ChecklistItem 
 *     tags:
 *       - Project Management
 *     responses:
 *       200:
 *         description: Read a new ChecklistItem success
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