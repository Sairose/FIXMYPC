import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const NavBar = ({data}) => {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () => {
    setOpenNav(!openNav)
  }
  return (
    <div id="navbar" className='w-full h-[103px] px-10 flex justify-between items-center bg-[#2A3794] text-white md:px-[120px]'>
      <div className="left">
        <h1 className='text-[24px] font-normal font-Reggae md:ml-0' >FIXMYPC</h1>
      </div>
      <div
        className={`right font-Poppins font-[16px] flex flex-col items-center gap-6 absolute left-4 right-4 top-[103px] 
        bg-gradient-to-br from-[#2A3794] to-[#1B255E] rounded-2xl shadow-lg transition-all duration-500 ease-in-out
        transform ${openNav ? "translate-y-0 opacity-100 scale-100" : "-translate-y-10 opacity-0 scale-95"}
        p-6 z-50 md:relative md:top-0 md:flex-row md:gap-0 md:bg-none md:from-transparent md:to-transparent
        md:shadow-none md:rounded-none 
        md:opacity-100 md:translate-y-0 md:scale-100 md:w-auto md:block md:p-0
      `}
      >
        
        <a href="#home" className="hover:text-[#05B878] duration-300 md:ml-10">Home</a>
        <a href="#about" className="hover:text-[#05B878] duration-300 md:ml-10">About</a>
        <a href="#footer" className="hover:text-[#05B878] duration-300 md:ml-10">Footer</a>
      </div>


      <RxHamburgerMenu className='text-xl hover:cursor-pointer hover:text-[#05B878] duration-300 md:hidden md:mr-0'
        onClick={handleNav}
      />
    </div>
  )
}

export default NavBar
