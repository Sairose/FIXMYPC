import { RxHamburgerMenu } from "react-icons/rx";
import { useState } from "react";

const NavBar = () => {
  const [openNav, setOpenNav] = useState(false);

  const handleNav = () =>{
    setOpenNav(!openNav)
  }
  return (
    <div id="navbar" className='w-full h-[103px] px-[60px] md:px-[120px] flex justify-between items-center bg-[#2A3794] text-white'>
      <div className="left">
        <h1 className='text-[24px] font-normal font-Reggae'>FIXMYPC</h1>
      </div>
      <div className={`right font-Poppins font-[16px] flex flex-col absolute top-[100px] md:relative md:top-0 right-15 md:flex-row 
        ${openNav ? 'block': 'hidden'} border-2 border-white md:border-none py-5 md:py-0 px-10 md:px-0 md:block
      `
      } >
        <a href="#home" className="hover:text-[#05B878] duration-300 md:ml-10">Home</a>
        <a href="#about" className="hover:text-[#05B878] duration-300 md:ml-10">About</a>
        <a href="#footer" className="hover:text-[#05B878] duration-300 md:ml-10">Footer</a>
      </div>
        <RxHamburgerMenu className='text-xl hover:cursor-pointer hover:text-[#05B878] duration-300 md:hidden' 
         onClick={handleNav}
        />
    </div>
  )
}

export default NavBar
