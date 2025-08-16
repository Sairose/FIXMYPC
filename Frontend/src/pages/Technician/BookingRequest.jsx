// import React, { useEffect, useState } from 'react';
// import { useAuth } from '../../context/AuthContext';
// import axios from '../../api/axios';
// import { useSocket } from '../../context/SocketContext';

// const BookingRequests = () => {
//   const { user } = useAuth();
//   const socket = useSocket();
//   const [requests, setRequests] = useState([]);

//   useEffect(() => {
//     socket.current.emit('join_technician_room', user._id);

//     const fetchPending = async () => {
//       const res = await axios.get('/api/bookings/technician');
//       setRequests(res.data.filter(b => b.status === 'pending'));
//     };
//     fetchPending();

//     socket.current.on('new_booking', (data) => {
//       setRequests((prev) => [...prev, data]);
//     });

//     return () => {
//       socket.current.off('new_booking');
//     };
//   }, [user._id, socket]);

//   const respond = async (bookingId, action) => {
//     try {
//       await axios.put(`/api/bookings/${bookingId}`, { status: action });
//       socket.current.emit('booking_response', { bookingId, action });
//       setRequests((prev) => prev.filter((r) => r._id !== bookingId));
//     } catch (err) {
//       console.error(err);
//       alert('Failed to respond to booking');
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="font-bold text-lg mb-4">Booking Requests</h2>
//       {requests.length === 0 && <p>No pending booking requests</p>}
//       {requests.map((req) => (
//         <div key={req._id} className="border p-3 mb-2 rounded shadow">
//           <p><strong>Client:</strong> {req.clientId.firstName} {req.clientId.lastName}</p>
//           <button className="bg-green-500 text-white px-2 py-1 mr-2 rounded" onClick={() => respond(req._id, 'accepted')}>Accept</button>
//           <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => respond(req._id, 'declined')}>Decline</button>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default BookingRequests;


import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import { useSocket } from '../../context/SocketContext';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const BookingRequests = () => {
  const { user } = useAuth();
  const socket = useSocket();
  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.current.emit('join_technician_room', user._id);

    const fetchPending = async () => {
      const res = await axios.get('/api/bookings/technician');
      setRequests(res.data.filter(b => b.status === 'pending'));
    };
    fetchPending();

    socket.current.on('new_booking', (data) => {
      setRequests((prev) => [...prev, data]);
    });

    return () => {
      socket.current.off('new_booking');
    };
  }, [user._id, socket]);

  const respond = async (bookingId, action) => {
    try {
      await axios.put(`/api/bookings/${bookingId}`, { status: action });
      socket.current.emit('booking_response', { bookingId, action });
      setRequests((prev) => prev.filter((r) => r._id !== bookingId));
    } catch (err) {
      console.error(err);
      // alert('Failed to respond to booking');
      toast('Failed to respond to booking');
    }
  };

  const handleViewClientReview = (clientId) => {
    navigate(`/user/${clientId}/reviews`);
  };

  return (
    <>
      <ToastContainer />
      <div className="p-4">
        <h2 className="font-bold text-lg mb-4">Booking Requests</h2>
        {requests.length === 0 && <p>No pending booking requests</p>}
        {requests.map((req) => (
          <div key={req._id} className="border p-3 mb-2 rounded shadow">
            <p><strong>Client:</strong> {req.clientId.firstName} {req.clientId.lastName}</p>

            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-500 text-white px-2 py-1 rounded"
                onClick={() => respond(req._id, 'accepted')}
              >
                Accept
              </button>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded"
                onClick={() => respond(req._id, 'declined')}
              >
                Decline
              </button>
              <button
                className="bg-gray-300 text-black px-2 py-1 rounded"
                onClick={() => handleViewClientReview(req.clientId._id)}
              >
                View Reviews
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BookingRequests;
