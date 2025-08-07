import express from "express"
import cors from "cors";
import passport from "../src/config/passport.js"
import cookieParser from "cookie-parser"
import session from 'express-session';
import authRoutes from "../src/routes/authRoutes.js"

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
// Session for Passport (required)
app.use(session({
  secret: process.env.JWT_SECRET,
  resave: false,
  saveUninitialized: false,
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth/user",authRoutes)
  

export default app;
