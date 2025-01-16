import express from 'express';
import { sendMessage ,getMessages} from '../controllers/message.controller.js';
import protectRoutes from '../middleWare/protectRoutes.js';

const router = express.Router();
//router.post("/send/:id" , protectRoutes in middleWare for authorization purpose(user verification) before posting it to data base 
router.get("/:id" ,protectRoutes,getMessages);

router.post("/send/:id" ,protectRoutes,sendMessage);

export default router;