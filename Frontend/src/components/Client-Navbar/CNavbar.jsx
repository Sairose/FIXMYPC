// import { NavLink, useNavigate } from "react-router-dom"
// import { useAuth } from "../../context/AuthContext";

// const CNavBar = () => {
//   const { logout,user } = useAuth();

  
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     logout(); // clears localStorage and user state
//     // Optionally: also clear cookies if you set any manually
//     document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//     navigate('/'); // redirect to landing page
//   };

  
//   return (
//     <div className='w-full h-[103px] px-[120px] flex justify-between items-center bg-[#2A3794] text-white'>
//       <div className="left">
//         <h1 className='text-[24px] font-normal font-Reggae'>FIXMYPC</h1>
//       </div>
//       <div className="right font-Poppins font-[16px] flex gap-10" >
//         <NavLink to={`/client/dashboard`} className="hover:text-[#05B878] duration-300">Home</NavLink>
//         <NavLink to={`/client/dashboard/technician`} className="hover:text-[#05B878] duration-300">Technician</NavLink>
//         <NavLink to={`/client/dashboard/booked`} className="hover:text-[#05B878] duration-300" >Booked</NavLink>
//         <NavLink to={`/client/reviews/${user._id}`} className="hover:text-[#05B878] duration-300" >Review&Rating</NavLink>
//         <NavLink to={`/client/dashboard/setting`} className="hover:text-[#05B878] duration-300">Profile</NavLink>
//         <button onClick={handleLogout} className="hover:text-[#05B878] duration-300">Logout</button>

//       </div>
//     </div>
//   )
// }

// export default CNavBar


import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const CNavBar = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [openNav, setOpenNav] = useState(false);

  const handleLogout = () => {
    logout();
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/');
    setOpenNav(false); // close menu on logout
  };

  const handleNav = () => setOpenNav(!openNav);

  // Close menu after clicking link
  const handleLinkClick = () => {
    setOpenNav(false);
  };

  return (
    <div className='w-full h-[103px] flex justify-between items-center bg-[#2A3794] text-white px-[60px] lg:px-[120px]'>
      <div className="left">
        <h1 className='text-[24px] font-normal font-Reggae'>FIXMYPC</h1>
      </div>

      {/* Links */}
      <div className={`
        right font-Poppins font-[16px] flex flex-col items-center gap-6 
        absolute left-4 right-4 top-[103px] 
        bg-gradient-to-br from-[#2A3794] to-[#1B255E] rounded-2xl shadow-lg 
        transition-all duration-500 ease-in-out
        transform ${openNav ? "translate-y-0 opacity-100 scale-100" : "-translate-y-10 opacity-0 scale-95"}
        p-6 z-50
        lg:relative lg:flex-row lg:gap-10 lg:bg-none lg:from-transparent lg:to-transparent 
        lg:shadow-none lg:rounded-none lg:opacity-100 lg:translate-y-0 lg:scale-100 lg:left-auto lg:right-auto lg:top-auto lg:p-0
      `}>
        <NavLink to={`/client/dashboard`} onClick={handleLinkClick} className="hover:text-[#05B878] duration-300">Home</NavLink>
        <NavLink to={`/client/dashboard/technician`} onClick={handleLinkClick} className="hover:text-[#05B878] duration-300">Technician</NavLink>
        <NavLink to={`/client/dashboard/booked`} onClick={handleLinkClick} className="hover:text-[#05B878] duration-300">Booked</NavLink>
        <NavLink to={`/client/reviews/${user._id}`} onClick={handleLinkClick} className="hover:text-[#05B878] duration-300">Review&Rating</NavLink>
        <NavLink to={`/client/dashboard/setting`} onClick={handleLinkClick} className="hover:text-[#05B878] duration-300">Profile</NavLink>
        <button onClick={handleLogout} className="hover:text-[#05B878] duration-300">Logout</button>
      </div>

      {/* Hamburger */}
      <RxHamburgerMenu 
        className='text-xl hover:cursor-pointer hover:text-[#05B878] duration-300 lg:hidden'
        onClick={handleNav}
      />
    </div>
  );
};

export default CNavBar;
