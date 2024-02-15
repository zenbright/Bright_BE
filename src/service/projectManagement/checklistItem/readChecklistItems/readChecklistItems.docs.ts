/**
 * @swagger
 * /project-management/checklistitem:
 *   get:
 *     summary: Read all Checklist Items 
 *     tags:
 *       - Project Management
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