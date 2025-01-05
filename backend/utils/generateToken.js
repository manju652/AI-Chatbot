import jwt  from 'jsonwebtoken';

const generateTokenCookie = (userId , res) =>{
    /* 
        The jwt.sign method creates a secure token with:
        A payload ({ userId }).
        A secret key (JWT_SECRET).
        An expiration time (15 days).
        This token can authenticate users in a secure and stateless manner.
    */
   
    const token =  jwt.sign({userId} , process.env.JWT_SECRET , {
        expiresIn:"15d"
    })

    res.cookie('jwt' , token , {
        maxAge:15*24*60*60*1000, // IN MILLISECONDS
        httpOnly:true ,//prevents xxs attacks cross-site scripting attacks(basically code is not formatted  in javascript)
        sameSite :"strict",//CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !== "development",
    });
};

export default generateTokenCookie;