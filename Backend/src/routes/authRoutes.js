
import express from "express"
import passport from "../config/passport.js"
import { Userregister, loginUser,sendOtp,verifyOtp} from "../controllers/authController.js"
import { authenticatemiddleware } from "../midddlewares/authMiddleware.js"
import { ipWhitelistMiddleware, loginRateLimiter} from "../midddlewares/rateLimiter.js"

const router = express.Router()

router.post("/signup",Userregister);
router.post('/login',ipWhitelistMiddleware,loginRateLimiter,loginUser);
router.post("/sendotp",sendOtp);
router.post("/verifyotp",verifyOtp);

//Google auth 
router.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
router.get('/google/callback', passport.authenticate('google', { failureMessage:"denied access" }), (req, res) => {
  // Successful authentication, redirect to the home page or dashboard.
  res.status(200).json({message:"login success",user:req.user});
  
});


export default router;

