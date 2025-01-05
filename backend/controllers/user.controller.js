import User from "../models/user.model.js";

export const getUsersForSidebar = async (req,res) =>{
    try {
        const loggedInUserId = req.user._id;
        const filteredUsers = await User.find({ _id: { $ne : loggedInUserId}}).select('-password')  //meaning we are finding ever userId except(not equal to) the loggedInUserId and also we are ignoring password to display cause we donot need them in sidebar

        res.status(200).json(filteredUsers);

    } 
    catch (error) {

        console.log("error in getUserSidebar: ",error.message);
        res.status(400).json({error : "Internal Server error "})
    }
}