import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

//custom import
import { connectDB } from './config/db.js';
import userRoutes from './routes/userRoute.js';
import bookingRoutes from './routes/bookingRoute.js';
import reviewRoutes from './routes/reviewRoute.js';
import messageRoutes from './routes/messageRoute.js';
import adminRoutes from './routes/adminRoute.js';
import http from 'http'
import { setupSocket } from './socket/socket.js';
import { auth } from './middlewares/authMiddleware.js';
import { isAdmin } from './middlewares/roleBasedAuth.js';
import path from 'path';

//db connection
connectDB();

//to access data from env file
dotenv.config();

//initializing app
const app = express();
const server = http.createServer(app);
const io = setupSocket(server);
const _dirname = path.resolve();


//cors 
app.use(cors({
  // origin: 'http://localhost:5173',
  origin: 'https://fixmypc-u4qb.onrender.com',
  credentials: true
}));

//to handle incoming json data
app.use(express.json());

//routes
app.use('/api/auth', userRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/messages', messageRoutes);
app.use('/api/admin',auth, isAdmin, adminRoutes);

// serve images from public
app.use(express.static(path.join(_dirname, "Frontend", "public")));
app.use(express.static(path.join(_dirname, "/Frontend/dist")));
app.get('/*splat',(req, res)=>{
  res.sendFile(path.resolve(_dirname, "Frontend", "dist", "index.html"));
})

server.listen(process.env.PORT, ()=>{
    console.log(`server is running on prot ${process.env.PORT}`);
})