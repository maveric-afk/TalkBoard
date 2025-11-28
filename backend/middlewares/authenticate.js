const { getUser,setUser } = require("../auth/jwt");


function loggedinOnly(req,res,next){
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:'Not logged in'});
    }
    const user=getUser(token);
    if(!user){
         return res.json({error:'Not logged in'});
    }
    next();
}

module.exports={
    loggedinOnly
}