const express=require('express');
const {handleUserSignup,handleSendOtp,handleUserSignin,handleGetUser,handleUserLogout}=require('../controllers/user');
const { loggedinOnly } = require('../middlewares/authenticate');
const router=express.Router();

router.get('/',loggedinOnly,handleGetUser)
router.get('/logout',handleUserLogout)

router.post('/sendotp',handleSendOtp);
router.post('/signup',handleUserSignup);
router.post('/signin',handleUserSignin)

module.exports=router