const express=require('express')
const {handleGetAllRooms}=require('../controllers/room')
const router=express.Router();

router.get('/all',handleGetAllRooms);

module.exports=router;