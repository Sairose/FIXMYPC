import { Server } from "socket.io";
import { Booking } from "../models/bookingModel.js";
import { Message } from "../models/messageModel.js";

const setupSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173',
            credentials: true,
        }
    });

    io.on('connection', (socket) => {
        console.log(`Socket connected: ${socket.id}`);

        socket.on('join_technician_room', (techId) => {
            socket.join(`tech_${techId}`);
            console.log(`Socket ${socket.id} joined tech_${techId}`);
        });

        socket.on('join_client_room', (clientId) => {
            socket.join(`client_${clientId}`);
            console.log(`Socket ${socket.id} joined client_${clientId}`);
        });

        socket.on('booking_request', (data) => {
            io.to(`tech_${data.technicianId}`).emit('new_booking', data);
        });

        socket.on('booking_response', async ({ bookingId, action }) => {
            try {
                const booking = await Booking.findById(bookingId).lean();
                if (booking && booking.clientId && booking.technicianId) {
                    // Notify both technician and client
                    io.to(`client_${booking.clientId.toString()}`).emit('booking_response', { bookingId, action });
                    io.to(`tech_${booking.technicianId.toString()}`).emit('booking_response', { bookingId, action });
                }
            } catch (error) {
                console.error('Error in booking_response:', error);
            }
        });

        socket.on('booking_action', ({ bookingId, action }) => {
            // Send to client room
            Booking.findById(bookingId).then((booking) => {
                if (booking && booking.clientId) {
                    io.to(`client_${booking.clientId}`).emit('booking_response', {
                        bookingId,
                        action,
                    });
                }
            });
        });

        
        socket.on('new_message', ({ bookingId, message, senderId, receiverId }) => {
            if (bookingId && message && senderId && receiverId) {
                // Just broadcast the already-saved message
                const payload = { bookingId, message, senderId, receiverId };
                io.to(`chat_${bookingId}`).emit('chat_' + bookingId, payload);
            }
        });

        socket.on('join_room', (roomId) => {
            socket.join(roomId);
            console.log(`${socket.id} joined room ${roomId}`);
        });

        // Add leave_room handler here
        socket.on('leave_room', (roomId) => {
            socket.leave(roomId);
            console.log(`${socket.id} left room ${roomId}`);
        });

        socket.on('disconnect', () => {
            console.log(`Socket disconnected: ${socket.id}`);
        });
    });

    return io;
};

export { setupSocket };
