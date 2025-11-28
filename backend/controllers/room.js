const roomModel=require('../models/roommodel')

async function handleGetAllRooms(req,res) {
    const allRooms=await roomModel.find({});
    return res.json({rooms:allRooms});
}

async function handleCreateRoom(req,res) {
    
}

module.exports={
    handleGetAllRooms,handleCreateRoom
}