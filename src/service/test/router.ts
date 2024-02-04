import { Router } from 'express';
import * as getUser from './testUser'
import { ROLE } from '../utils/constants';
import { verifyJWT, verifyRoles } from '../middleware/authMiddleware';

const router = Router();

router.use(verifyJWT);
router.get('/', verifyRoles(ROLE) ,getUser.getAllUser);

export default router;