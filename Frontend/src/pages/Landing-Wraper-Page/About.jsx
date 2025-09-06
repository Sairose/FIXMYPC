import React from 'react'
import CustomButton from '../../components/UI/CustomButton.jsx';

const About = () => {
    return (
        <>
            <div id="about"
                className="about_us w-full h-screen pt-[48px] px-10 bg-white flex flex-col  md:pt-0 md:px-[120px] md:gap-10 md:flex-row md:items-center md:justify-between ">
                <div className="about_left">
                    <img className='w-full h-[250px] object-cover md:w-[350px] md:h-[400px] lg:w-[414px] lg:h-[518px]'
                        src="./images/AboutImg.jpg" alt="" />
                </div>
                <div className="about_right w-full h-[300px] flex gap-4 flex-col md:w-[497px] md:h-[518px] md:pt-[3rem] lg:pt-0 lg:justify-between">
                    <h3 className='font-normal text-[18px] font-Poppins text-[#05B878] md:text-[24px]'>About Us</h3>
                    <h2 className='font-semibold text-[20px] font-Source-Serif md:text[28px] lg:text-[34px] '>
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
