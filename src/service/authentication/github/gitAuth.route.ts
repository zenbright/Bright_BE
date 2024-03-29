import { Router } from 'express';
import * as gitAuthController from './gitAuth.controller';
import { IPSpamChecker, APIValidator } from '../../..';

const router = Router();

// Login with GitHub
router.post('/git',
    IPSpamChecker.checkIpSpamServer('/auth/git'), // Check IP spam
    APIValidator.loginWithGitHubValidator, // Validate request body
    gitAuthController.loginWithGitHubController, // Handle request
);

export default router;