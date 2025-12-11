import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
            callbackURL: `${process.env.BACKEND_ORIGIN || "http://localhost:5000"}/api/auth/google/callback`,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const email = profile.emails?.[0].value;
                const name = profile.displayName;
                const googleId = profile.id;

                if (!email) return done(new Error("No email from Google"));

                let user = await User.findOne({ email });

                if (!user) {
                    // Create new user
                    user = await User.create({
                        name,
                        email,
                        verified: true, // Google verified
                        googleId,
                    });
                } else {
                    // Link googleId if missing
                    if (!user.googleId) {
                        user.googleId = googleId;
                        // Also ensure verified is true if they logged in with Google (trusted provider)
                        if (!user.verified) user.verified = true;
                        await user.save();
                    }
                }

                return done(null, user);
            } catch (err) {
                return done(err, undefined);
            }
        }
    )
);

export default passport;
