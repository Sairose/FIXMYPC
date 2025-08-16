import React from 'react'

const Footer = () => {
  return (
    <>
      <div id='footer'
        className="footer w-full px-[120px] py-10 bg-[#2A3794] text-white flex flex-col md:flex-row md:justify-between md:items-center ">
        <div className="left-footer flex justify-center gap-[5rem] lg:gap-10">
          <div className="child-left1 flex flex-col gap-[9px]">
            <h2>Explore</h2>
            <p>Home</p>
            <p>About</p>
          </div>
          <div className="child-left2 flex flex-col gap-[9px]">
            <h2>Contact Us</h2>
            <p>Email</p>
            <p>Phone Number</p>
            <p>Query Us</p>
          </div>
          
        </div>
        <div className="right-footer flex justify-center items-center mt-10 lg:mt-0 gap-10">
          <a href="www.facebook.com"><img 
            className='w-[30px] lg:w-[40px] border-none rounded-full'
          src="./images/fb.png" alt="" /></a>
          <a href=""><img 
            className='w-[30px] lg:w-[40px] border-none rounded-full'
          src="./images/insta.png" alt="" /></a>
          <a href=""><img 
            className='w-[30px] lg:w-[40px] border-none rounded-full'
          src="./images/tiktok.png" alt="" /></a>
        </div>
      </div>
    </>
  )
}

export default Footer
