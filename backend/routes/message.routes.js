import express from 'express';
import { sendMessage ,getMessages} from '../controllers/message.controller.js';
import protectedRoutes from '../middleWare/protectRoutes.js';

const router = express.Router();
//router.post("/send/:id" , protectedRoutes in middleWare for authorization purpose(user verification) before posting it to data base 
router.get("/:id" ,protectedRoutes,getMessages);

router.post("/send/:id" ,protectedRoutes,sendMessage);

export default router;