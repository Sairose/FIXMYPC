import React, { useEffect, useState } from 'react';
import axios from '../../api/axios';
import TechnicianCard from '../../components/TechnicianCard';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import { toast, ToastContainer } from 'react-toastify';

const BookTechnician = () => {
  const [techs, setTechs] = useState([]);
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    const fetchTechs = async () => {
      const res = await axios.get('/api/auth/technicians');
      setTechs(res.data);
    };
    fetchTechs();
  }, []);

  const book = async (techId) => {
    try {
      const res = await axios.get('/api/bookings/client');
      const hasActiveBooking = res.data.some(b => ['pending', 'accepted'].includes(b.status));
      if (hasActiveBooking) {
        // alert('You already have an active booking.');
        toast('You already have an active booking.');
        return;
      }

      const bookingRes = await axios.post('/api/bookings', {
        clientId: user._id,
        technicianId: techId,
        status: 'pending',
      });

      socket.current.emit('booking_request', bookingRes.data);
      // alert('Booking request sent!');
      toast('Booking request sent!');
    } catch (err) {
      console.error(err);
      // alert('Error booking technician');
      toast('Error booking technician');
    }
  };

  return (
    <>
      <ToastContainer/>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 px-[10px] lg:px-[120px] py-[60px]">
        {techs.map((tech) => (
          <TechnicianCard key={tech._id} tech={tech} onBook={book} />
        ))}
      </div>
    </>
  );
};

export default BookTechnician;
