import express from "express";
import protectedRoutes from "../middleWare/protectRoutes.js";
import { getUsersForSidebar } from "../controllers/user.controller.js";

const router = express.Router();

router.get('/' , protectedRoutes , getUsersForSidebar);

export default router;