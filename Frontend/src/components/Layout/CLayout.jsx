// import React from 'react';
// import CNavBar from '../Client-Navbar/CNavbar';
// import { Outlet } from 'react-router-dom'; //  Only import Outlet, not createBrowserRouter

// const CLayout = () => {
//   return (
//     <>
//       <CNavBar />
//       <Outlet />
//     </>
//   );
// };

// export default CLayout;


import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';
import CNavbar from '../Client-Navbar/CNavbar';

const CLayout = () => {
  const { user } = useAuth();
  const socket = useSocket();

  useEffect(() => {
    if (!user?._id || !socket?.current) return;

    // Join room with client's ID
    socket.current.emit('join_client_room', user._id);

    // Listen for booking status updates
    socket.current.on('booking_status', (data) => {
      alert(`Your booking was ${data.status}`);
      // optionally: refresh bookings, or show toast
    });

    // Cleanup on unmount
    return () => {
      socket.current.off('booking_status');
    };
  }, [user, socket]);

  return (
    <div>
      <CNavbar/>
      <Outlet />
    </div>
  );
};

export default CLayout;
