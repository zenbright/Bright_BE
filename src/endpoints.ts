import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
const router = Router();

router.use('/auth', [GitAuthRoute]);

export default router;