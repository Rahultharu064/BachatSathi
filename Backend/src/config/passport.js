import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import prisma from './db.js';

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.Redirect_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = String(profile.emails?.[0]?.value || '').trim().toLowerCase();
        if (!email) return done(new Error('Google account has no email'), null);

        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
          // Store empty password so normal login clearly redirects to Google sign-in
          user = await prisma.user.create({
            data: {
              email,
              name: profile.displayName || 'Google User',
              password: '',
              role: 'User',
            },
          });
        }

        return done(null, user);
      } catch (error) {
        console.error('Google OAuth error:', error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;
