const express=require('express')
const cors=require('cors');
const cookieParser = require('cookie-parser');
const {connectToDB}=require('./connection')
const app=express();
const PORT=8000;

connectToDB('mongodb://127.0.0.1:27017/talkboard')
.then((res)=>{
    console.log(`MongoDB connected successfully`)
})
.catch((e)=>{
    console.log(e)
})

app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.use(cors())
app.use(cookieParser());


app.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})