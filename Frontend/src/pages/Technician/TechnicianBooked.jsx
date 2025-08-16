

// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../../api/axios';
// import { FaTrash } from 'react-icons/fa';
// import { useSocket } from '../../context/SocketContext';
// import ReviewModal from '../../components/Review-Model/ReviewModel';

// const TechnicianBooked = () => {
//   const [bookings, setBookings] = useState([]);
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const navigate = useNavigate();
//   const socket = useSocket();

//   const fetchBookings = async () => {
//     try {
//       const res = await axios.get('/api/bookings/technician');
//       setBookings(res.data);
//     } catch (err) {
//       console.error('Failed to fetch bookings:', err);
//     }
//   };

//   const markAsCompleted = async (bookingId) => {
//     try {
//       await axios.put(`/api/bookings/${bookingId}`, {
//         status: 'completed',
//       });

//       socket.current?.emit('booking_response', {
//         bookingId,
//         action: 'completed',
//       });

//       setBookings((prev) =>
//         prev.map((b) => (b._id === bookingId ? { ...b, status: 'completed' } : b))
//       );
//     } catch (err) {
//       console.error('Failed to mark completed:', err);
//     }
//   };

//   const openChat = (booking) => {
//     navigate('/chat', {
//       state: {
//         receiverId: booking.clientId._id,
//         bookingId: booking._id,
//         partnerName: `${booking.clientId.firstName} ${booking.clientId.lastName}`,
//       },
//     });
//   };

//   useEffect(() => {
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

//   return (
//     <div className="p-4">
//       <h2 className="text-2xl font-bold mb-4">Accepted Bookings</h2>
//       <ul className="space-y-4">
//         {bookings
//           .filter((b) => b.status !== 'pending')
//           .map((booking) => (
//             <li key={booking._id} className="border p-4 rounded-lg shadow">
//               <p>
//                 <strong>Client:</strong> {booking.clientId?.firstName} {booking.clientId?.lastName}
//               </p>
//               <p>
//                 <strong>Status:</strong> {booking.status}
//               </p>

//               {booking.status === 'accepted' && (
//                 <>
//                   <button
//                     className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded"
//                     onClick={() => markAsCompleted(booking._id)}
//                   >
//                     Mark as Completed
//                   </button>
//                   <button
//                     className="mt-2 mr-2 px-4 py-2 bg-green-500 text-white rounded"
//                     onClick={() => openChat(booking)}
//                   >
//                     Chat
//                   </button>
//                 </>
//               )}

//               {booking.status === 'completed' && (
//                 <>
//                   <span className="inline-block mt-2 px-4 py-1 bg-green-200 text-green-800 rounded">
//                     Completed
//                   </span>
//                   <button
//                     className="ml-4 mt-2 px-3 py-2 text-blue-600 underline"
//                     onClick={() => {
//                       setSelectedBooking(booking);
//                       setShowReviewModal(true);
//                     }}
//                   >
//                     Give Review
//                   </button>
//                 </>
//               )}
//             </li>
//           ))}
//       </ul>

//       {showReviewModal && selectedBooking && (
//         <ReviewModal
//           bookingId={selectedBooking._id}
//           to={selectedBooking.clientId?._id}
//           role="technician"
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

// export default TechnicianBooked;


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { FaTrash } from 'react-icons/fa';
import { useSocket } from '../../context/SocketContext';
import ReviewModal from '../../components/Review-Model/ReviewModel';

const TechnicianBooked = () => {
  const [bookings, setBookings] = useState([]);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [submittedReviews, setSubmittedReviews] = useState(new Set());
  const navigate = useNavigate();
  const socket = useSocket();

  const fetchBookings = async () => {
    try {
      const res = await axios.get('/api/bookings/technician');
      setBookings(res.data);

      const reviewRes = await axios.get('/api/reviews/given');
      const reviewedBookingIds = new Set(reviewRes.data.map(r => r.bookingId));
      setSubmittedReviews(reviewedBookingIds);
    } catch (err) {
      console.error('Failed to fetch bookings or reviews:', err);
    }
  };

  const markAsCompleted = async (bookingId) => {
    try {
      await axios.put(`/api/bookings/${bookingId}`, {
        status: 'completed',
      });

      socket.current?.emit('booking_response', {
        bookingId,
        action: 'completed',
      });

      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, status: 'completed' } : b))
      );
    } catch (err) {
      console.error('Failed to mark completed:', err);
    }
  };

  const openChat = (booking) => {
    navigate('/chat', {
      state: {
        receiverId: booking.clientId._id,
        bookingId: booking._id,
        partnerName: `${booking.clientId.firstName} ${booking.clientId.lastName}`,
      },
    });
  };

  useEffect(() => {
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

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Accepted Bookings</h2>
      <ul className="space-y-4">
        {bookings
          .filter((b) => b.status !== 'pending')
          .map((booking) => (
            <li key={booking._id} className="border p-4 rounded-lg shadow">
              <p>
                <strong>Client:</strong> {booking.clientId?.firstName} {booking.clientId?.lastName}
              </p>
              <p>
                <strong>Status:</strong> {booking.status}
              </p>

              {booking.status === 'accepted' && (
                <>
                  <button
                    className="mt-2 mr-2 px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => markAsCompleted(booking._id)}
                  >
                    Mark as Completed
                  </button>
                  <button
                    className="mt-2 mr-2 px-4 py-2 bg-green-500 text-white rounded"
                    onClick={() => openChat(booking)}
                  >
                    Chat
                  </button>
                </>
              )}

              {booking.status === 'completed' && (
                <>
                  <span className="inline-block mt-2 px-4 py-1 bg-green-200 text-green-800 rounded">
                    Completed
                  </span>
                  {!submittedReviews.has(booking._id) && (
                    <button
                      className="ml-4 mt-2 px-3 py-2 text-blue-600 underline"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowReviewModal(true);
                      }}
                    >
                      Give Review
                    </button>
                  )}
                </>
              )}
            </li>
          ))}
      </ul>

      {showReviewModal && selectedBooking && (
        <ReviewModal
          bookingId={selectedBooking._id}
          to={selectedBooking.clientId?._id}
          role="technician"
          onClose={(submitted) => {
            if (submitted) {
              alert("Review submitted successfully!");
              setSubmittedReviews((prev) => new Set(prev.add(selectedBooking._id)));
            }
            setShowReviewModal(false);
            setSelectedBooking(null);
          }}
        />
      )}
    </div>
  );
};

export default TechnicianBooked;
