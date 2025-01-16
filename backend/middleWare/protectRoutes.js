//this is used for authorization purpose(authenticate users in secure and stateless manner)
import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoutes = async(req,res,next) =>{
    try {
        //we have to get the cookies in order verify the user
        const token = req.cookies.jwt;
        if(!token){
            res.status(401).json({error:"Unauthorized - No token provided"});
        }
        const decoded = jwt.verify(token , process.env.JWT_SECRET);

        if(!decoded){
            res.status(401).json({error:"Unauthorized - No token provided"});
        }

        const user = await User.findById(decoded.userId).select("-password");
        if(!user){
            res.status(401).json({error:"User not found"});
        }

        //now after all checks below is the authenticated user
        req.user = user;
        
        next(); //after above all steps completed the next() function is called and executed which is sendMessage in message.routes.js

    } catch (error) {
        console.log("Error in protectRoutes middleware :" , error.message);
        res.status(500).json({error:"Internl server error"});
    }
}

export default protectRoutes;