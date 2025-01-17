import path from "path";
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';


import authRoutes from './routes/auth.routes.js';
import messageRoutes from './routes/message.routes.js';
import userRoutes from './routes/user.routes.js';
import {app , server} from './socket/socket.js';

import connectToMongoDB from './DB/connectToMongoDB.js';



dotenv.config();

const __dirname = path.resolve();

const PORT = process.env.PORT || 5000;
app.use(express.json());// a middleware to parse the incoming requests wih JSON payloads (from req.body)
app.use(cookieParser());//a middleware in order to access the cookies 




//middleware for routing purpose
app.use('/api/auth' , authRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});


// app.get('/' , (req,res) =>{
//     //this is the root directory (route) which is http://localhost:PORT/ here PORT = 5000
//     res.send("Hello world");
// })

server.listen(PORT,() => {
    connectToMongoDB();
    console.log(`server is running on port ${PORT}`);
    }
);