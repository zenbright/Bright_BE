import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import UserProfileImageRoute from './service/user/crudProfileImage/manageImage.route';
import UserSearchRoute from './service/user/searchUser/searchUser.route';
import UserPasswordChangeRoute from './service/user/passwordChange/passwordChange.route';
import UserAccountDeleteRoute from './service/user/deleteAccount/deleteAccount.route';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute]);
router.use("/utils/user", [UserSearchRoute, UserPasswordChangeRoute, UserAccountDeleteRoute, UserProfileImageRoute]);

export default router;
