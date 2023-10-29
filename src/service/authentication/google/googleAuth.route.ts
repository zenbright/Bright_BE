import { Router } from 'express';
import * as IPSpamChecker from '../../middleware/api.limiter';
import * as APIValidator from '../../middleware/api.validator';
import passport from "passport";

const router = Router();

router.get('/google',
  IPSpamChecker.checkIpSpamServer('/auth/google'), // Check IP spam
  APIValidator.loginWithGitHubValidator, // Validate request body
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get("/google/redirect", passport.authenticate("google"));

export default router;