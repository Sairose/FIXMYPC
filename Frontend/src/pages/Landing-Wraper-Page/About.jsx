import React from 'react'
import CustomButton from '../../components/UI/CustomButton.jsx';

const About = () => {
    return (
        <>
            <div id="about"
                className="about_us w-full h-screen pt-[48px] md:pt-0 px-[60px] md:px-[120px] bg-white flex flex-col md:gap-10 md:flex-row md:items-center md:justify-between ">
                <div className="about_left">
                    <img className='w-full h-[350px] object-cover md:w-[350px] md:h-[400px] lg:w-[414px] lg:h-[518px]'
                        src="./images/AboutImg.jpg" alt="" />
                </div>
                <div className="about_right w-full h-[300px]  md:w-[497px] md:h-[518px] md:pt-[3rem] lg:pt-0 flex gap-4  flex-col lg:justify-between">
                    <h3 className='font-normal text-[18px] md:text-[24px] font-Poppins text-[#05B878]'>About Us</h3>
                    <h2 className='font-semibold text-[20px] md:text[28px] lg:text-[34px] font-Source-Serif'>
                        Easy To Use Application That Connects Client And Computer Technicial
                    </h2>
                    <p className='font-Poppins text-[16px] md:text-[18px] lg:text-[20px]'>
                        A platform that  gives work to technician  who is free  and provides client to  connect with technician to repare their computer A platform that  gives work to technician  who is free  and provides client to  connect with technician to repare their computer¸
                    </p>
                    <CustomButton data="Read More" />
                </div>
            </div>
        </>
    )
}

export default About
