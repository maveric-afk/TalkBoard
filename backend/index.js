const express=require('express')
const cors=require('cors');
const cookieParser = require('cookie-parser');
const {connectToDB}=require('./connection')
const userRouter=require('./Routes/userroute')
const roomRouter=require('./Routes/roomroute')
const dotenv=require('dotenv');
const {Server}=require('socket.io')
const http=require('http')
const multer=require('multer')
const cloudinary=require('cloudinary').v2;
const fs=require('fs')
const { loggedinOnly } = require('./middlewares/authenticate');
const { handleCreateRoom } = require('./controllers/room');
const { getUser } = require('./auth/jwt');
const roomModel = require('./models/roommodel');

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
app.use('/uploads',express.static('uploads'));
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

cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret:process.env.CLOUDINARY_API_SECRET
})

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});

const upload=multer({storage:storage})

const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    credentials: true,
  }
});

io.use((socket, next) => {
  const token = socket.handshake.auth.token;
  if(!token){
next(new Error('Not logged in')) 
 }
  const user=getUser(token);
  if(!user){
 next(new Error('Not logged in')) 
 }
  socket.user=user;
  next()
});

io.on('connection',(socket)=>{
    console.log(`Socket:- ${socket.id} Joined`);

    socket.on('create-room',({roomcode,msg})=>{
        socket.join(roomcode);
        console.log(msg);
    })

    // socket.on('disconnect',async (msg)=>{
    //     const user=socket.user;
    //     await roomModel.deleteMany({RoomAdmin:user.Id});
    // })
})

app.use('/api/user',userRouter)
app.use('/api/room',loggedinOnly,roomRouter)

app.post('/api/room',loggedinOnly,upload.single('thumbnail'),async(req,res)=>{
    console.log(req.body)
     const result = await cloudinary.uploader.upload(req.file.path, {
      folder: 'talkboard_uploads',
    });

    fs.unlinkSync(req.file.path);

    req.file.path = result.secure_url;

    await handleCreateRoom(req, res);
})

server.listen(PORT,()=>{
    console.log(`Server is running at PORT ${PORT}`)
})