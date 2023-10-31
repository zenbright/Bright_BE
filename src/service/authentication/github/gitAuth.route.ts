import { Router } from 'express';
import * as gitAuthController from './gitAuth.controller';
import * as IPSpamChecker from '../../middleware/api.limiter';
import * as APIValidator from '../../middleware/api.validator';

const router = Router();

// Login with GitHub
router.post('/git',
    IPSpamChecker.checkIpSpamServer('/auth/git'), // Check IP spam
    APIValidator.loginWithGitHubValidator, // Validate request body
    gitAuthController.loginWithGitHub, // Handle request
);

export default router;