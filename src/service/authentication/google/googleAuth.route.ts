import { Router, Request, Response } from "express";
import { IPSpamChecker, APIValidator } from '../../..';
import passport from "passport";

const router = Router();

router.get(
  "/google",
  IPSpamChecker.checkIpSpamServer("/auth/google"), // Check IP spam
  passport.authenticate("google", {
    scope: ["email", "profile"],
    prompt: "select_account",
  }),
);

router.get("/google/redirect", passport.authenticate("google", {
  successRedirect: "http://localhost:5173/",
  //failureRedirect: "/bright-backend/api/auth/failed"
}));

router.get("/success", (req, res) => {
  if(req.user) {
    res.status(200).json({
      success: true,
      message: "successful",
      user: req.user
      // cookies: req.cookies
    })
  }
});

router.get("/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// Logout route
router.get('/google/logout', (req, res) => {
  req.logout({}, (err: any) => {
    if (err) {
      // Handle error if needed
      console.error(err);
      res.status(500).send('Error during logout');
      return;
    }

    // Redirect upon successful logout
    res.redirect('http://localhost:4000/');
  });
});

export default router;
