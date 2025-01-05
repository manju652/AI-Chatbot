import express from 'express';
import { login, logout, signup } from '../controllers/auth.controller.js';


const router = express.Router();
/* inorder write each route functionality like the below we import each functionality from controller 
router.get('/login', (req,res) =>{
    res.send("login is succesfull");
})
*/

//when we go to http://localhost:5000/api/auth/login  then it will login route will be displayed
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);




export default router;
    
