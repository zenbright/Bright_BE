import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import PasswordChangeRoute from './service/passwordChange/passwordChange.route';
import SearchUserRoute from './service/authentication/bright/searchUser/searchUser.route';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute, PasswordChangeRoute, SearchUserRoute]);
router.use("/", [DeleteAccountRoute]);

export default router;
