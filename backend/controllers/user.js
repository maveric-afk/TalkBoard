const nodemailer=require('nodemailer')
const Brevo=require('@getbrevo/brevo')
const bcrypt=require('bcrypt')
const {setUser,getUser}=require('../auth/jwt')
const userModel=require('../models/usermodel');
const dotenv=require('dotenv')
dotenv.config();

const apiInstance = new Brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  Brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

const sendmail=async(to,sub,msg)=>{
    try {
        const sendSmtpMail={
        sender:{email:'guptachirag965@gmail.com',name:"Talkboard"},
        to:[{email:to}],
        subject:sub,
        htmlContent:msg
    }
    const data=await apiInstance.sendTransacEmail(sendSmtpMail);
    console.log('Email sent: ',data.messageId || data)
    } catch (error) {
        console.error('Email failed',error)
    }
}

async function handleSendOtp(req,res) {
    const body=req.body;
     const otp=Math.floor(Math.random()*9999) + 1000;
  await sendmail(body.email,'Otp Verification for Your TalkBoard Account'
    ,`<h2>Dear ${body.username}</h2><br>

Your One-Time Password (OTP) is<br><br> <h1><b>${otp}</b></h1>.
Please use this code to complete your verification.
This OTP is valid for the next 2 minutes.

If you didn't request this, please ignore this email.
<br><br>
Best regards,<br>
<b>TalkBoard</b><br>
Chirag Gupta`)

return res.json({otp:otp});
}

async function handleUserSignup(req,res) {
    const body=req.body;
    const hashedPassword=await bcrypt.hash(body.password,10);
    await userModel.create({
        Name:body.username,
        Email:body.email,
        Password:hashedPassword,
        Age:body.age
    });
    return res.json({success:"Account created"})
}

async function handleUserSignin(req,res) {
    const body=req.body;
    const user=await userModel.find({Email:body.email});
    if(!user[0]){
        return res.json({error:"No user found"})
    }
    const comparepassword=await bcrypt.compare(body.password,user[0].Password);

    if(!comparepassword){
        return res.json({error:"Wrong Credentials"})
    }

    const token=setUser(user[0]);
    res.cookie('token',token,{
  httpOnly: true,     
  secure: true,       
  sameSite: "none",    
  maxAge: 1000 * 60 * 60 * 24,
});

return res.json({success:"Logged in"})
}


async function handleGetUser(req,res) {
 const token=req.cookies?.token;
 if(!token){
    return res.json({error:"Not logged in"})
 }   
 const user=getUser(token);
 if(!user){
    return res.json({error:"Not logged in"})
 }
 const userdata=await userModel.find({_id:user.Id});
 return res.json({user:userdata[0],token:token})
}


async function handleUserLogout(req,res) {
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:"Not logged in"})
    }
   res.cookie('token','',{
    httpOnly: true,
    secure: true,
    sameSite: "none",
    expires: new Date(0)
  });

  return res.json({success:'Logged out'})
}


module.exports={handleUserSignup,handleSendOtp,handleUserSignin,handleGetUser,handleUserLogout}