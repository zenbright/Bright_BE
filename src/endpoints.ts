import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import LogInRoute from './service/login/login.route';
import SignInRoute from './service/signup/signup.route';
const router = Router();

router.use('/auth', [GitAuthRoute]);
router.use('/auth', [LogInRoute]);
router.use('/auth', [SignInRoute]);

export default router;