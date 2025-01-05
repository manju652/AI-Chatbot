import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    participants:[
        //in this array each object 
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    ] ,
    messages:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
            default:[],
        },
    ]
} , {timestamps : true});

const Conversation =  mongoose.model("Conversations" , conversationSchema);

export default Conversation;