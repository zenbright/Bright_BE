import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import { UserSearch, UserPasswordChange, UserAccountDelete } from './service/user';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute]);
router.use("/utils/user", [UserSearch, UserPasswordChange, UserAccountDelete]);

export default router;
