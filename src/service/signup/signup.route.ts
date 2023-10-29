import { Router } from 'express';
import * as SignUpController from './signup.controller';
import * as IPSpamChecker from '../middleware/api.limiter';

const router = Router();

router.post('/signup/post',
    // IPSpamChecker.checkIpSpamServer('/auth/signup'), // Check IP spam
    // TODO: Validate request body
    SignUpController.signupController // Handle request
);

export default router;