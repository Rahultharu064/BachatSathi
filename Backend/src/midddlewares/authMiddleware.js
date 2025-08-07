import jwt from "jsonwebtoken"

export const authenticatemiddleware= async(req , res)=>{
    const token =req.cookies.token;
    if(!token) return res.status(401).json({msg:"Unauthorized: no token"});

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decoded;
        next();

    }
    catch(error){
        return res.status(500).json({msg:"Error authenticating user"})
    }
}