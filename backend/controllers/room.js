const { getUser } = require('../auth/jwt');
const roomModel=require('../models/roommodel')

async function handleGetAllRooms(req,res) {
    const allRooms=await roomModel.find({});
    return res.json({rooms:allRooms});
}

async function handleCreateRoom(req,res) {
    const body=req.body;
    const file=req.file;
    const token=req.cookies?.token;
    if(!token){
        return res.json({error:"Not logged in"});
    }
    const user=getUser(token);
    if(!user){
        return res.json({error:"Not logged in"});
    }

    const room=await roomModel.create({
        Thumbnail:file.path,
        RoomName:body.roomname,
        RoomId:body.roomcode,
        Type:body.roomtype,
        RoomAdmin:user.Id,  
    })

    return res.json({success:"Room Created",room:room})
}

module.exports={
    handleGetAllRooms,handleCreateRoom
}