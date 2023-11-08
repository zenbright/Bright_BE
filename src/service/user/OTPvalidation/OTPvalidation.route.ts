import { Router } from 'express';
import * as OTPvalidationController from './OTPvalidation.controller';
import { IPSpamChecker, APIValidator } from '../../..';

const router = Router();

router.post('/validate-otp',
    IPSpamChecker.checkIpSpamServer('/auth/validate-otp'), 
    // APIValidator.loginWithGitHubValidator, 
    OTPvalidationController.OTPvalidationController, 
);

export default router;