const express=require('express')
const cors=require('cors');
const cookieParser = require('cookie-parser');
const {connectToDB}=require('./connection')
const userRouter=require('./Routes/userroute')
const roomRouter=require('./Routes/roomroute')
const dotenv=require('dotenv');
const {Server}=require('socket.io')
const http=require('http')
const cloudinary=require('cloudinary').v2;
const fs=require('fs')
const { loggedinOnly } = require('./middlewares/authenticate');

const app=express();
const server=http.createServer(app);
const PORT=8000;

dotenv.config();

connectToDB('mongodb://127.0.0.1:27017/talkboard')
.then((res)=>{
    console.log(`MongoDB connected successfully`)
})
.catch((e)=>{
    console.log(e)
})


app.use(express.json())
app.use(express.urlencoded({extended:false}));
const allowedOrigins=[
    'http://localhost:5173',
    'http://localhost:5174',
]
app.use(cors(
    {
    origin: allowedOrigins,
    credentials: true, 
  }
));
app.use(cookieParser());

const io=new Server(server,cors({
    origin: allowedOrigins,
    credentials: true,
}))

app.use('/api/user',userRouter)
app.use('/api/room',loggedinOnly,roomRouter)

server.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})