import React from 'react'

const Home = () => {
    return (
        <div id="home"
            className="h-[calc(100vh-100px)] w-[100%] px-[10px] bg-[#2A3794] text-white flex flex-col gap-10 items-center lg:justify-between 
            lg:px-[120px] lg:flex-row">
            <div className="hero-left w-full pt-20 flex flex-col gap-5 lg:pt-0 lg:w-[534px]">
                <h2 className="font-Source-Serif font-semibold text-[30px] md:text-[48px] lg:leading-14">Welcome To Freelencing Website</h2>
                <p className="font-Poppins text-[16px] md:text-[18px] lg:text-[20px]"
                >Hi this  is  the best website for hiring freelencer , getting clients , chat in real time</p>

            </div>
            <div className="hero-right">
                <img src="../../images/hero-image.png" alt="Error"
                    className="w-[400px] h[400px] object-cover md:w-[450px] lg:w-[534px] lg:h-[357px] "
                />
            </div>
        </div>
    )
}

export  {Home}
