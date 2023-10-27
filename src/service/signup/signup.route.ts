import { Router } from 'express';
import * as SignUpControllr from './signup.controller';
import * as IPSpamChecker from '../middleware/api.limiter';

const router = Router();

router.post('/signup',
    IPSpamChecker.checkIpSpamServer('/auth/signup'), // Check IP spam
    // TODO: Validate request body
    SignUpControllr.signup // Handle request
);

export default router;