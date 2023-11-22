import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import UserSearchRoute from './service/user/searchUser/searchUser.route';
import UserPasswordChangeRoute from './service/user/passwordChange/passwordChange.route';
import UserAccountDeleteRoute from './service/user/deleteAccount/deleteAccount.route';
import GoogleAuthRoute from './service/authentication/google/googleAuth.route'
import route from './service/test/router';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute, GoogleAuthRoute]);
router.use("/utils/user", [UserSearchRoute, UserPasswordChangeRoute, UserAccountDeleteRoute]);
router.use('/test', route)

export default router;
