import prisma  from "../config/db.js";
import bcrypt from "bcryptjs";

import { signToken } from "../utils/jwt.js";

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
        res.status(200).json({message:"login success. proceed to send otp.", userId:id})
       

    }
    catch(error){
        console.error("Error in login:", error);
    }

}
















