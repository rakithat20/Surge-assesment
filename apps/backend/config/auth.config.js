// config/auth.js
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import UserModel from "../models/user.model.js";
import { error } from "console";
import dotenv from "dotenv";
dotenv.config();

const userModel = new UserModel();

export const configurePassport = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await userModel.findById(id);

      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          let user = await userModel.findByEmail(profile.emails[0].value);
          if (!user) {
            // User does not exist, create a new one
            user = await userModel.create({
              email: profile.emails[0].value,
              username: profile.displayName.replace(/\s/g, "").toLowerCase(),
              fullName: profile.displayName,
              googleId: profile.id,
            });
          } else if (!user.googleId) {
            // If the user exists but does not have Google linked, update
            user = await userModel.linkGoogleAccount(
              { email: profile.emails[0].value },
              { googleId: profile.id }
            );
          }
          return done(null, user);
        } catch (error) {
          console.error("Error during Google login:", error);
          return done(error, null);
        }
      }
    )
  );
};
