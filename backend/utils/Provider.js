import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import { User } from "../models/User.js";

export const connectPassport = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALL_BACKURL,
      },
      async function (accessToken, refreshToken, profile, done) {
        // Database connection
        const user = await User.findOne({
          googleId: profile.id,
        });

        // console.log(user);

        if (!user) {
          const newUser = await User.create({
            name: profile.displayName,
            photo: profile.photos[0].value,
            googleId: profile.id,
            email: profile.emails[0].value,
          });

          return done(null, newUser);
        } else {
          return done(null, user);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);

    done(null, user);
  });
};
