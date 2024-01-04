import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "../../../config"
const GoogleStrategy = passportGoogle.Strategy;
import userCredentials from '../../../models/userCredentials';
import userInfo from '../../../models/userInfo';
import mongoose from "mongoose";
import { CAUTION, PROVIDER } from '../../utils/constants';

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
      userProfileURL: 'https://www.googleapis.com/oauth2/v3/userinfo',
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken , profile, done) => {
      try{
        // Check if user already exists in database
        const userCred = await userCredentials.findOne({ account: profile.id });
        
        // set exp time for token
        const currentDate = new Date()
        const expireDate = new Date(currentDate);
        expireDate.setDate(expireDate.getDate() + 30);

        // If user cred found
        if(userCred) {
          userCred.refreshToken = refreshToken;
          await userCred.save();
          console.log(accessToken);
          return done(null, profile);
        } else {
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
            password: CAUTION.DO_NOT_USE,
            userId: newUserInfo._id,
            refreshToken: refreshToken,
            refreshTokenExpires: expireDate,
            provider: PROVIDER.GOOGLE,
          });

          newUserInfo.userCredentialId = newCredential._id;

          console.log(accessToken);
          await Promise.all([newUserInfo.save(), newCredential.save()]);
          return done(null, profile);
        }
      } catch (error) {
        console.error(error); // Log the error
        return done(new Error('Internal Server Error')); // Return an error response
     }
    }
  )
);

export default passport;