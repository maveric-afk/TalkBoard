const express=require('express');
const {handleUserSignup,handleSendOtp,handleUserSignin}=require('../controllers/user')
const router=express.Router();

router.post('/sendotp',handleSendOtp);
router.post('/signup',handleUserSignup);
router.post('/signin',handleUserSignin)

module.exports=router