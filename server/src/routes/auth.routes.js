import { register, login } from "../controllers/auth.controller.js";
import { protect } from "../middleware/auth.middleware.js";
import {Router} from "express"

const router= Router();
router.post('/register',register);
router.post('/login',login);
router.get('/me',protect,(req,res)=>{
    res.status(200).json({
        message:"Acces granted",
        user:{
            id:req.user._id,
            name:req.user.name,
            email:req.user.email
        }
    })
})
export default router;