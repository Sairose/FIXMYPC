import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config();

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export {connectDB};