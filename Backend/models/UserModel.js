import mongoose from 'mongoose';
import { ROLE_ADMIN, ROLE_CLIENT, ROLE_TECHNICIAN } from '../constant/role.js';

const userSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String },
    role: {
        type: String,
        enum: ['client', 'technician', 'admin'],
        default: 'client'
    },
    location: {
        city: String,
        lat: Number,
        lng: Number
    }
}, { timestamps: true }
)

const User = mongoose.model('user', userSchema);

export default User;