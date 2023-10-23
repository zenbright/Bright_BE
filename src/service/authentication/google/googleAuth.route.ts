import { Router } from 'express';
import * as GoogleAuthService from './googleAuth.service';
import * as IPSpamChecker from '../../middleware/api.limiter';
import * as APIValidator from '../../middleware/api.validator';

const router = Router();

// Login with GitHub
router.post('/google',
    IPSpamChecker.checkIpSpamServer('/googleAuth/google'), // Check IP spam
    APIValidator.loginWithGitHubValidator, // Validate request body
    GoogleAuthService.loginWithGoogle // Handle request
);

export default router;