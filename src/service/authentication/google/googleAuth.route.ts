import { Router } from 'express';
import * as GoogleAuthService from './googleAuth.service';
import * as IPSpamChecker from '../../middleware/api.limiter';
import * as APIValidator from '../../middleware/api.validator';
import passport from "passport";

const router = Router();

router.get("/login", (req, res) => {
  if (req.user) {
    res.redirect("/profile");
  }
  res.render("login");
});

router.get("/logout", (req, res) => {
  req.logout((err) => {
    if(err) console.log(err);
    res.redirect("/");
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

// Login with GitHub
router.post('/googles',
    IPSpamChecker.checkIpSpamServer('/auth/google'), // Check IP spam
    APIValidator.loginWithGitHubValidator, // Validate request body
    GoogleAuthService.loginWithGoogle // Handle request
);

export default router;