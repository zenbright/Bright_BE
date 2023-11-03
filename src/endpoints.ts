import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import PasswordChangeRoute from './service/passwordChange/passwordChange.route';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute, PasswordChangeRoute]);

export default router;