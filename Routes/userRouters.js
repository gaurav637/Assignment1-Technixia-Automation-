import {Router} from "express";
import {RegisterUser} from "../controller/signup.js";
import {loginUser} from "../controller/signin.js";
import {logoutUser} from "../controller/logout.js";
import {forgetPassword} from "../controller/resetPassword.js";
import {allUserData} from "../controller/allUser.js";
import {getSingleUser} from "../controller/getUserByUsername.js"
import {verifyToken} from "../middleware/authMiddleware.js";
const router = Router();

router.get('/register' , (req,res)=> {
    return res.render('signup');
});

router.get('/login' , (req,res)=> {
    return res.render('signin');
});

router.get('/resetPassword',(req,res) => {
    return res.render('reset');
});

router.post('/register' ,RegisterUser );
router.post('/login',loginUser);
router.get('/logout',logoutUser);
router.put('/resetPassword', forgetPassword);
router.get('/all-users',verifyToken,allUserData);
router.get('/single-user',verifyToken,getSingleUser);

export default router;