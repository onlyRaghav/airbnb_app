import jwt, { decode } from "jsonwebtoken"
import User from "../models/user.model.js"

export const protect = async (req,res,next)=>{
    try{
        let token;
        // 1.Check Authorization header
        if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
            token= req.headers.authorization.split(" ")[1];
        }

        if(!token){
            res.status(401).json({
                message:"Not authorized, token missing"
            });
        }
        // 2.Verify token
        const decoded= jwt.verify(token,process.env.JWT_SECRET_KEY);
        // 3.Attach user (without password)
        const user= await User.findById(decoded.id);
        if(!user){
            res.status(401).json({
                message:"User not found"
            })
        }
        req.user=user;
        next();
    }catch(err){
        console.error("Auth middleware error:",err);
        res.status(401).json({
            message:"Not Authorized, token invalid"
        });
    }
}