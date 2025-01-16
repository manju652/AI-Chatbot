import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
// import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import {app , server} from './socket/socket.js';

import connectToMongoDB from './DB/connectToMongoDB.js';


const PORT = process.env.PORT || 7000;

dotenv.config();
app.use(express.json());// a middleware to parse the incoming requests wih JSON payloads (from req.body)
app.use(cookieParser());//a middleware in order to access the cookies 
// app.use(cors());




//middleware for routing purpose
app.use('/api/auth' , authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);


// app.get('/' , (req,res) =>{
//     //this is the root directory (route) which is http://localhost:PORT/ here PORT = 5000
//     res.send("Hello world");
// })

server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
    }
);