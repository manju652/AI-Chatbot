import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketId  , io} from "../socket/socket.js";

export const sendMessage = async(req,res) =>{
    // res.send("message is sended");
    // console.log("Message send Successfully!" , req.params.id);

    try {
        const {message} = req.body;
        const {id :receiverId} = req.params;
        //const senderId = req.userId but it will not work because we have todo authorization in message.routes.js for this we use middleware
        //after authorization now we can acces the userId
        console.log(req.body);
        console.log(req.params);
        console.log(req.user);
        const senderId = req.user._id; //this is coming from protectRoutes 

        let conversation = await Conversation.findOne({
            participants :{$all : [senderId ,receiverId ]},
        });
        //if there is no conversation(first time chatting) we have to create one
        if(!conversation){
            conversation = await Conversation.create({
                participants:[senderId , receiverId],
            })
        }

        const newMessage = new Message({
            senderId,
            receiverId,
            message,
        });

        if(newMessage){
            conversation.messages.push(newMessage._id);
        }

        
        //after pushing we have save them to DB but hte below steps takes time as they execute one by one
        // await conversation.save();
        // await newMessage.save();

        //to execute / save both of them in parallel we use
        await Promise.all([conversation.save() , newMessage.save()]);


        //we will add Socket io functionality here

        const receiverSocketId = getReceiverSocketId(receiverId);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}
        


        res.status(200).json(newMessage);

    } 
    catch (error) {
        console.log("Error in sendMessage : " , error.message);
        res.status(400).json({ error : "Internal server error"});
    }
}

export const getMessages = async(req,res) =>{
    try {
        const {id : userToChatId} = req.params;
        const senderId = req.user._id;

        const conversation = await Conversation.findOne({
            participants : {$all : [senderId , userToChatId]},
        }).populate("messages"); //inorder to get the messages from Messagemodel  but is not refernce but actual messages

        if(!conversation){
            return res.status(200).json([]);
        }

        const messages = conversation.messages;
        res.status(200).json(messages);

    } 
    catch (error) {
        console.log("Error in getMessages controller: " , error.message);
        res.status(500).json({ error : "Internal server error"});
    }
}