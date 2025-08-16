
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../api/axios';
// import { FaTrash } from 'react-icons/fa';
// import { useSocket } from '../../context/SocketContext';
// import ReviewModal from '../../components/Review-Model/ReviewModel';  // Added

// const CBooked = () => {
//   const [bookings, setBookings] = useState([]);
//   const [showReviewModal, setShowReviewModal] = useState(false);  // Added
//   const [selectedBooking, setSelectedBooking] = useState(null);   // Added
//   const navigate = useNavigate();
//   const socket = useSocket();

//   useEffect(() => {
//     const fetchBookings = async () => {
//       try {
//         const response = await axios.get('/api/bookings/client');
//         setBookings(response.data);
//       } catch (error) {
//         console.error('Error fetching bookings:', error);
//       }
//     };
//     fetchBookings();
//   }, []);

//   useEffect(() => {
//     if (!socket?.current) return;

//     const handleBookingResponse = ({ bookingId, action }) => {
//       if (action === 'canceled') {
//         setBookings((prev) => prev.filter((b) => b._id !== bookingId));
//       } else if (['declined', 'accepted', 'completed'].includes(action)) {
//         setBookings((prev) =>
//           prev.map((b) => (b._id === bookingId ? { ...b, status: action } : b))
//         );
//       }
//     };

//     socket.current.on('booking_response', handleBookingResponse);

//     return () => {
//       socket.current.off('booking_response', handleBookingResponse);
//     };
//   }, [socket]);

//   const handleCancel = async (bookingId) => {
//     try {
//       await axios.delete(`/api/bookings/${bookingId}`);
//       socket.current?.emit('booking_response', {
//         bookingId,
//         action: 'canceled',
//       });
//       setBookings((prev) => prev.filter((b) => b._id !== bookingId));
//     } catch (error) {
//       console.error('Error deleting booking:', error);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">My Bookings</h2>
//       {bookings.length === 0 && <p>No bookings found.</p>}
//       {bookings.map((booking) => (
//         <div key={booking._id} className="border p-4 rounded mb-4">
//           <p>Technician: {booking.technicianId?.name}</p>
//           <p>Status: {booking.status}</p>

//           {booking.status === 'pending' && (
//             <button
//               onClick={() => handleCancel(booking._id)}
//               className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
//             >
//               <FaTrash className="inline mr-1" /> Cancel
//             </button>
//           )}

//           {booking.status === 'accepted' && (
//             <button
//               onClick={() =>
//                 navigate('/chat', {
//                   state: {
//                     receiverId: booking.technicianId?._id,
//                     bookingId: booking._id,
//                     partnerName: booking.technicianId?.name,
//                   },
//                 })
//               }
//               className="ml-2 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
//             >
//               Chat
//             </button>
//           )}

//           {booking.status === 'completed' && (
//             <>
//               <p className="text-green-600 font-semibold">Completed</p>
//               <button
//                 className="mt-2 px-3 py-1 text-sm text-blue-600 underline"
//                 onClick={() => {
//                   setSelectedBooking(booking);
//                   setShowReviewModal(true);
//                 }}
//               >
//                 Give Review
//               </button>
//             </>
//           )}
//         </div>
//       ))}

//       {showReviewModal && selectedBooking && (
//         <ReviewModal
//           bookingId={selectedBooking._id}
//           to={selectedBooking.technicianId?._id}
//           role="client"
//           onClose={(submitted) => {
//             if (submitted) alert("Review submitted successfully!");
//             setShowReviewModal(false);
//             setSelectedBooking(null);
//           }}
//         />
//       )}
//     </div>
//   );
// };

// export default CBooked;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { FaTrash } from 'react-icons/fa';
import { useSocket } from '../../context/SocketContext';
import ReviewModal from '../../components/Review-Model/ReviewModel';

const CBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState([]); // NEW
  const navigate = useNavigate();
  const socket = useSocket();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('/api/bookings/client');
        setBookings(response.data);
        // Extract reviewed bookings
        const reviewed = response.data
          .filter((b) => b.review && b.review.fromRole === 'client')
          .map((b) => b._id);
        setSubmittedReviews(reviewed);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    if (!socket?.current) return;

    const handleBookingResponse = ({ bookingId, action }) => {
      if (action === 'canceled') {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
      } else if (['declined', 'accepted', 'completed'].includes(action)) {
        setBookings((prev) =>
          prev.map((b) => (b._id === bookingId ? { ...b, status: action } : b))
        );
      }
    };

    socket.current.on('booking_response', handleBookingResponse);

    return () => {
      socket.current.off('booking_response', handleBookingResponse);
    };
  }, [socket]);

  const handleCancel = async (bookingId) => {
    try {
      await axios.delete(`/api/bookings/${bookingId}`);
      socket.current?.emit('booking_response', {
        bookingId,
        action: 'canceled',
      });
      setBookings((prev) => prev.filter((b) => b._id !== bookingId));
    } catch (error) {
      console.error('Error deleting booking:', error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">My Bookings</h2>
      {bookings.length === 0 && <p>No bookings found.</p>}
      {bookings.map((booking) => (
        <div key={booking._id} className="border p-4 rounded mb-4">
          <p>Technician: {booking.technicianId?.name}</p>
          <p>Status: {booking.status}</p>

          {booking.status === 'pending' && (
            <button
              onClick={() => handleCancel(booking._id)}
              className="px-3 py-1 text-sm text-white bg-red-500 rounded hover:bg-red-600"
            >
              <FaTrash className="inline mr-1" /> Cancel
            </button>
          )}

          {booking.status === 'accepted' && (
            <button
              onClick={() =>
                navigate('/chat', {
                  state: {
                    receiverId: booking.technicianId?._id,
                    bookingId: booking._id,
                    partnerName: booking.technicianId?.name,
                  },
                })
              }
              className="ml-2 px-3 py-1 text-sm text-white bg-blue-500 rounded hover:bg-blue-600"
            >
              Chat
            </button>
          )}

          {booking.status === 'completed' && (
            <>
              <p className="text-green-600 font-semibold">Completed</p>
              {!submittedReviews.includes(booking._id) ? (
                <button
                  className="mt-2 px-3 py-1 text-sm text-blue-600 underline"
                  onClick={() => {
                    setSelectedBooking(booking);
                    setShowReviewModal(true);
                  }}
                >
                  Give Review
                </button>
              ) : (
                <p className="text-gray-500 mt-2 italic">Review already submitted</p>
              )}
            </>
          )}
        </div>
      ))}

      {showReviewModal && selectedBooking && (
        <ReviewModal
          bookingId={selectedBooking._id}
          to={selectedBooking.technicianId?._id}
          role="client"
          onClose={(submitted) => {
            if (submitted) {
              alert("Review submitted successfully!");
              setSubmittedReviews((prev) => [...prev, selectedBooking._id]);
            }
            setShowReviewModal(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default CBooked;