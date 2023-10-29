import { Router } from 'express';
import * as IPSpamChecker from '../../middleware/api.limiter';
import * as APIValidator from '../../middleware/api.validator';
import passport from "passport";

const router = Router();

router.get('/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get("/google/redirect", passport.authenticate("google"));
//   , (req, res) => {
//   res.redirect("/profile");
// });


// Login with GitHub
router.post('/googles',
    IPSpamChecker.checkIpSpamServer('/auth/googles'), // Check IP spam
    APIValidator.loginWithGitHubValidator, // Validate request body
);

export default router;