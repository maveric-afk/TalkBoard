const mongoose=require('mongoose');
const userModel=require('./usermodel')

const roomSchema=new mongoose.Schema({
    Thumbnail:{
        type:String,
    },
    RoomName:{
        type:String,
        required:true,
        unique:true
    },
    RoomId:{
        type:String,
        required:true,
        unique:true,
    },
    RoomAdmin:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        required:true,
    },
    Type:{
        type:'String',
        required:true,
        default:"Public"
    },
    Participants:[
        {
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
        }
    ],
    Chats:[
        {
            SentBy:{
                 type:mongoose.Schema.Types.ObjectId,
                 ref:'users'
            },
            Message:{
                type:String,
                required:true
            }
        }
    ]
},{timestamps:true});

const roomModel=mongoose.model('room',roomSchema);

module.exports=roomModel;