const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    Name:{
        type:String,
        required:true,
    },
    Email:{
        type:String,
        required:true,
        unique:true,
    },
    Password:{
        type:String,
        required:true
    },
    Boards:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'boards'
        }
    ],
    Rooms:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'rooms'
        }
    ],
    ProfileImg:{
        type:String
    },
    Age:{
        type:Number,
        required:true,
    },
    Role:{
        type:String,
        required:true,
        default:'Normal'
    },
    Friends:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'users'
        }
    ]
},{timestamps:true});

const userModel=mongoose.model('user',userSchema);

module.exports=userModel