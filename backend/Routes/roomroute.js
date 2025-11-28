const express=require('express')
const {handleGetAllRooms,handleCreateRoom}=require('../controllers/room')
const router=express.Router();

router.get('/all',handleGetAllRooms);
router.post('/',handleCreateRoom)

module.exports=router;