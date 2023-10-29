import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../../config"
const GoogleStrategy = passportGoogle.Strategy;
import userCredentials from '../../../models/userCredentials';
import userInfo from '../../../models/userInfo';
import mongoose from "mongoose";

passport.serializeUser((user:any, done) => {
  done(null, user);
});

passport.deserializeUser((user:any, done) => {
  done(null, user);
});

passport.use('google',
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://127.0.0.1:4000/auth/google/redirect",
    },
    async (accessToken, refreshToken , profile, done) => {
      try{
        const userCred = await userCredentials.findOne({ account: profile.id });

        // If user doesn't exist creates a new user. (similar to sign up)
        if(userCred) {
          const userDataMongo = await userInfo.findOne({ _id: userCred.userId });
          if (userDataMongo) {
            return done(null, userDataMongo);
          } else {
            // Handle the case where userInfo.findOne returned null
            return done(new Error('User data not found'));
          }
        }

        if (!userCred) {
          const newUserInfo = new userInfo({
            fullname: profile.name?.familyName + ' ' + profile.name?.givenName,
            email: {
              address: profile.emails && profile.emails[0] ? profile.emails[0].value : '',
              isVerified: profile.emails && profile.emails[0] ? true : false,
            },
            social: {
              google: profile.profileUrl
            },
            profileImage: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
            userCredentialId: new mongoose.Types.ObjectId(),
          });

          const newCredential = new userCredentials({
            account: profile.id,
            password: profile.id,
            userId: newUserInfo._id,
            provider: 'google',
          });

          await Promise.all([newUserInfo.save(), newCredential.save()]);
          return done(null, newUserInfo);
        }
      } catch (error) {
        console.error(error); // Log the error
        return done(new Error('Internal Server Error')); // Return an error response
     }
    }
  )
);

