import passport from "passport";
import passportGoogle from "passport-google-oauth2";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../../config"
const GoogleStrategy = passportGoogle.Strategy;
import User from "../../../models/googleUser"


// passport.deserializeUser(async (id, done) => {
//   const user = await User.findById(id);
//   done(null, user);
// });

passport.use('google',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:4000/auth/google/redirect",
      //passReqToCallback: true,
    },
    async (accessToken, refreshToken, profile, done) => {
      const user = await User.findOne({ googleId: profile.id });
      
      // If user doesn't exist creates a new user. (similar to sign up)
      if (!user) {
        const newUser = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
          // we are using optional chaining because profile.emails may be undefined.
        });
        if (newUser) {
          done(null, newUser);
        }
      } else {
        done(null, user);
      }
    }
  )
);

passport.serializeUser((user:any, done) => {
  done(null, user);
});

passport.deserializeUser((user:any , done) => {
  done(null, user)
})