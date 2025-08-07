import prisma  from "../config/db.js";
import bcrypt from "bcryptjs";

import { signToken } from "../utils/jwt.js";
import { generateOTP } from "../utils/otpUtils.js";

export const Userregister = async (req , res)=>{
    try {
        const {username, email, password,role}= req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const existingUser = await prisma.user.findUnique({where: {email}});
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data:{username,email,password:hashedPassword}
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
        res.status(201).json({user });u

    }
    catch(error){
        console.error("Error in registration:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


export const loginUser= async(req,res)=>{
     const {email,password}=req.body;
    try{
        const user=await prisma.user.findUnique({where:email});
        if(!user || !(await bcrypt.compare(password,user.password))){
            return res.status(401).json({message:"invalid credentials"});
        }
        res.status(200).json({message:"login success. proceed to send otp.", userId:user.id})


       

    }
    catch(error){
        console.error("Error in login:", error);
    }

}

export const sendOtp=async(req,res)=>{
    const {email}=req.body
    try{
        const user=await prisma.user.findUnique({where:email})
        if(!user){
            return res.status(404).json({message:"user not found"})
            }
          const {otp,expiresAt}=generateOTP();

          await prisma.oTP.upsert({
            where:{userId:user.id},
            update:{otp,expiresAt},
            create:{userId:user.id,otp,expiresAt},
          });
          await sendOtpEmail(email,otp) // send otp via email 
          res.status(200).json({message:"otp sent successfully"})
    }
    catch(error){
         res.status(500).json({ message: 'Error sending OTP', error });
    }
};

export const verifyOtp = async (req, res) => {
    const {otp, userId}= req.body
    try{
        const otpRecord=await prisma.oTP.findUnique({where:{email}});
        if(!otpRecord || otpRecord.expiresAt< Date.now()){
            return res.status(401).json({message:"invalid otp or expired"})

    }

    const isValid=await verifyOtp(otp,otpRecord.otp);
    if(!isValid){
        return res.status(401).json({message:"incorrect  otp"})
    }
    const token =signToken({id:user.id,role:user.role});
    res.cookie({
         httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000
    })
    res.status(200).json({message:"otp.verified. logged in"})

 }
 catch(error){
    res.status(500).json({ message: 'Error verifying OTP', error });
 }
}


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





















