import jwt from 'jsonwebtoken';

export const signToken = (payload)=>{
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3days"});

};


export const verifyToken = (token) => {
  return jwt.verify(token, process.env.JWT_SECRET);
};



