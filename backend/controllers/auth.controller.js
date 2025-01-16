import bcrypt from 'bcryptjs';
import User from "../models/user.model.js";
import generateTokenCookie from '../utils/generateToken.js';

export const signup = async (req,res) =>{

    /*
        after signup the data will be
            {
                "fullName" :"Nageswar",
                "username" : "Nageswar__",
                "password" : "27692nv",
                "confirmPassword" : "27692nv",
                "gender" : "male"
            }
    */
    try {
        const {fullName , username , password , confirmPassword,gender} = req.body;

        if(password != confirmPassword){
            return res.status(400).json({error:"Passwords donnot match"});
        }
        
        const user = await User.findOne({username});

        //if user already existed (signed up) in database
        if(user){
            return res.status(400).json({error:"User already existed in DB"});
        }
        //now we have to hash the password before saving it into DB
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt)


        //for profile pic we  take it from api = https://avatar-placeholder.iran.liara.run/
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        const newUser = new User({
            fullName,
            username,
            password : hashedPassword,
            gender,
            profilePic : gender === "male" ? boyProfilePic : girlProfilePic
        })

        if(newUser){
            //here we have to create json webtoken
            generateTokenCookie(newUser._id , res);
            await newUser.save();

            res.status(201).json({
                _id:newUser._id,
                fullName:newUser.fullName,
                username:newUser.username,
                profilePic:newUser.profilePic
            })
        }
        else{
            return res.status(400).json({error:"Invalid user data"});
        }
        

    } catch (error) {
        console.log("Error due to signup" , error.message);
        res.status(400).json({error : "Internal server error"});
    }
}

export const login = async(req,res) =>{
    
    try {
        const{username , password} = req.body;
        const user = await User.findOne({username});
        const isPasswordCorrect = await bcrypt.compare(password , user?.password || "");//if the user doesnot existed then there is no pssword existed this will throw error  so if user does not existed we return an ""(empty string as password)
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error : "Invalid username or password"});
        }

        generateTokenCookie(user._id , res);

        res.status(200).json({
            _id:user._id,
            fullName:user.fullName,
            username:user.username,
            profilePic:user.profilePic,
        });

    } catch (error) {
        console.log("Error due to Login" , error.message);
        res.status(400).json({error : "Internal server error"});
    }
    
    
}

export const logout = (req,res) =>{
    try {

        res.cookie("jwt" , "" , {
            maxAge: 0
        })

        res.status(200).json({message:"Logout successfully!"});
        
    } catch (error) {
        console.log("Error due to Logout" , error.message);
        res.status(400).json({error : "Internal server error"});
    }
}



