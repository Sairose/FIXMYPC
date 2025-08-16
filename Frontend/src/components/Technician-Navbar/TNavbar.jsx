import { NavLink, useNavigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext";

const TNavBar = () => {
  const { logout,user } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // clears localStorage and user state
    // Optionally: also clear cookies if you set any manually
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    navigate('/'); // redirect to landing page
  };

  
  return (
    <div className='w-full h-[103px] px-[120px] flex justify-between items-center bg-[#2A3794] text-white'>
      <div className="left">
        <h1 className='text-[24px] font-normal font-Reggae'>FIXMYPC</h1>
      </div>
      <div className="right font-Poppins font-[16px] flex gap-10" >
        <NavLink to={`/technician/dashboard`} className="hover:text-[#05B878] duration-300" >Home</NavLink>
        <NavLink to={`/technician/dashboard/booking-requests`} className="hover:text-[#05B878] duration-300" >BookRequest</NavLink>
        <NavLink to={`/technician/dashboard/booked`} className="hover:text-[#05B878] duration-300">Booked</NavLink>
        <NavLink to={`/technician/reviews/${user._id}`} className="hover:text-[#05B878] duration-300">Review&Rating</NavLink>
        <NavLink to={`/technician/dashboard/setting`} className="hover:text-[#05B878] duration-300">Profile</NavLink>
        <button onClick={handleLogout} className="hover:text-[#05B878] duration-300">Logout</button>

      </div>
    </div>
  )
}

export default TNavBar
