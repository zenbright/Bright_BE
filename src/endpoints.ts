import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import GoogleAuthRoute from './service/authentication/google/googleAuth.route'
const router = Router();

router.use('/auth', [GitAuthRoute]);
router.use('/googleAuth', [GoogleAuthRoute]);

export default router;