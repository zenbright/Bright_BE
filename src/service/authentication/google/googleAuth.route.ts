import { Router } from 'express';
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

router.get('/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get("/google/redirect", passport.authenticate("google"), (req, res) => {
  res.redirect("/profile");
});

// router.get("/google/redirect", passport.authenticate('google',{
//   successRedirect: '/auth/protected',
//   failureRedirect: '/auth/google/fail',
// }
// ));

router.get('/protected',(req, res) => {
  res.send("hi")
})
router.get('/google/fail', (req, res) => {
  res.send("nyo")
})

// Login with GitHub
router.post('/googles',
    IPSpamChecker.checkIpSpamServer('/auth/googles'), // Check IP spam
    APIValidator.loginWithGitHubValidator, // Validate request body
);

export default router;