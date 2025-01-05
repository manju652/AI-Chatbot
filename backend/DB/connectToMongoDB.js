import mongoose from "mongoose";

const connectToMongoDB  = async () =>{
    try {        
        await mongoose.connect(process.env.MongoDB_URI);
        console.log("Mongo DB connected successfully");
    } catch (error) {
        console.log("Error in connection to DB : " , error.message);
    }
}

export default connectToMongoDB;