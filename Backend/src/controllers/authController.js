import prisma  from "../config/db.js";
import bcrypt from "bcryptjs";

import { signToken } from "../utils/jwt.js";
import { generateOTP, verifyOTPMatch } from "../utils/otpUtils.js";
import  {sendMail}  from "../config/mailer.js"

export const Userregister = async (req , res)=>{
     const {name, email, password,role}= req.body;
    try {
       
        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{name,email,password:hashedPassword,role}
        })

        // generate token 
const token=signToken({id:user.id,role:user.role})
//set token in cookie
res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:"strict",
    maxAge:  48 * 60 * 60 * 1000 // 48 hours
})
        res.status(201).json({user });

    }
    catch(error){
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } }); // <-- FIXED
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "invalid credentials" });
    }
    res.status(200).json({ message: "login success. proceed to send otp.", userId: user.id });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}


export const sendOtp=async(req,res)=>{
    const {email}=req.body
    try{
        const user=await prisma.user.findUnique({where:{email}});
        if(!user){
            return res.status(404).json({message:"user not found"})
            }
          const { otp, hashedOtp, expiresAt } = generateOTP(); // ✅ use hashedOtp

await prisma.OTP.upsert({
  where: { userId: user.id },
  update: { otp: hashedOtp, expiresAt },             
  create: { userId: user.id, otp: hashedOtp, expiresAt },
});

          await sendMail({
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is ${otp}. It will expire at ${expiresAt.toLocaleString()}.`,
            html: `<p>Your OTP code is <strong>${otp}</strong>.</p><p>It will expire at <strong>${expiresAt.toLocaleString()}</strong>.</p>`,
          }) // send otp via email 
          res.status(200).json({message:"otp sent successfully"})
    }
    catch(error){
         res.status(500).json({ message: 'Error sending OTP', error });
    }
};



export const verifyOtp = async (req, res) => {
  const { otp, userId } = req.body;

  try {
    const otpRecord = await prisma.OTP.findUnique({
      where: { userId },
    });

    if (!otpRecord || otpRecord.expiresAt < new Date()) {
      return res.status(401).json({ message: "Invalid or expired OTP" });
    }

    const isValid = await verifyOTPMatch(otp, otpRecord.otp); // hash compare
    if (!isValid) {
      return res.status(401).json({ message: "Incorrect OTP" });
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const token = signToken({ id: user.id, role: user.role });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "OTP verified. Logged in." });

  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ message: "Error verifying OTP", error: error.message });
  }
};



export const resendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    // 1. Find the user
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 2. Check existing OTP record
    const existingOtp = await prisma.oTP.findUnique({ where: { userId: user.id } });

    // 3. If OTP exists, enforce cooldown (60 seconds)
    if (existingOtp) {
      const lastSentTime = new Date(existingOtp.updatedAt || existingOtp.createdAt);
      const now = new Date();
      const secondsSinceLastOtp = (now - lastSentTime) / 1000;

      if (secondsSinceLastOtp < 60) {
        return res.status(429).json({
          message: `Please wait ${Math.ceil(60 - secondsSinceLastOtp)} seconds before resending OTP.`,
        });
      }
    }

    
const { otp, hashedOtp, expiresAt } = generateOTP();

await prisma.oTP.upsert({
  where: { userId: user.id },
  update: { otp: hashedOtp, expiresAt },
  create: { userId: user.id, otp: hashedOtp, expiresAt },
});


    // 6. Send OTP email
    await sendMail({
      to: email,
      subject: "Your OTP Code (Resent)",
      text: `Your new OTP code is ${otp}. It will expire at ${expiresAt.toLocaleString()}.`,
      html: `<p>Your new OTP code is <strong>${otp}</strong>.</p><p>It will expire at <strong>${expiresAt.toLocaleString()}</strong>.</p>`,
    });

    res.status(200).json({ message: "OTP resent successfully" });

  } catch (error) {
    console.error("Error in resendOtp:", error);
    res.status(500).json({ message: "Internal server error", error });
  }
};



export const loginwithGoogle= async(req , res)=>{
    try{
        const token =signToken({id : req.user.id,role:req.user.role});
        res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.status(200).json({message:"logged in successfully"})

    }catch(error){
        res.status(500).json({ message: 'Error logging in with Google', error });
    }

}























