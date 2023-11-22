import { Router } from 'express';
import * as getUser from './testUser'
import { Request, Response, NextFunction } from 'express';
import { verifyJWT, verifyRoles } from '../middleware/authMiddleware';

const router = Router();

router.use(verifyJWT);
router.get('/', verifyRoles(['Admin', 'Developer', 'User']) ,getUser.getAllUser);

export default router;