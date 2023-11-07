import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import SearchUserRoute from './service/authentication/bright/searchUser/searchUser.route';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute, SearchUserRoute]);

export default router;