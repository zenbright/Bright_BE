import { Router } from 'express';
import GitAuthRoute from './service/authentication/github/gitAuth.route';
import BrightAuthRoute from './service/authentication/bright/brightAuth.route';
import DeleteAccountRoute from './service/authentication/bright/brightAuth.route';

const router = Router();

router.use('/auth', [GitAuthRoute, BrightAuthRoute, DeleteAccountRoute]);

export default router;