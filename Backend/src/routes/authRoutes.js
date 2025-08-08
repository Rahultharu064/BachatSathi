
import express from "express"
import passport from "../config/passport.js"
import { Userregister, loginUser, sendOtp, verifyOtp, resendOtp, logoutUser, loginwithGoogle, testOtp, getDashboard, forgotPassword, verifyResetOtp, resetPassword} from "../controllers/authController.js"
import { authenticatemiddleware } from "../midddlewares/authMiddleware.js"
import { ipWhitelistMiddleware, loginRateLimiter} from "../midddlewares/rateLimiter.js"

const router = express.Router()

router.post("/signup",Userregister);
// Removed rate limiter and IP whitelist to prevent unintended login failures
router.post('/login', loginUser);
router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp);
router.post("/resendotp",resendOtp);
router.post("/forgotpassword",forgotPassword);
router.post("/verifyresetotp",verifyResetOtp);
router.post("/resetpassword",resetPassword);
router.get("/dashboard",getDashboard)
router.post('/logout', logoutUser);

router.get('/test-otp', testOtp); // Test endpoint for debugging

// Google auth routes
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}));
router.get('/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login', failureMessage: "Google authentication failed" }), 
  loginwithGoogle
);

export default router;

