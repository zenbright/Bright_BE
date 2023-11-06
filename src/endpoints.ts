import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import ManageImageRoute from './service/authentication/bright/manageImage/manageImage.route';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute, ManageImageRoute]);

export default router;