import express from "express"
import cors from "cors";
import passport from "../src/config/passport.js"
import cookieParser from "cookie-parser"
import session from 'express-session';
import authRoutes from "../src/routes/authRoutes.js"

const app = express();
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : ['http://localhost:5173', 'http://127.0.0.1:5173'],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
}));
app.use(express.json());
app.use(cookieParser());
// Session for Passport (required)
app.use(session({
  secret: process.env.JWT_SECRET || 'dev_secret',
  resave: false,
  saveUninitialized: false,
}));
// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api/auth",authRoutes)
  

export default app;
