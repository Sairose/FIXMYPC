import React from 'react'

const Home = () => {
    return (
        <div id="home"
            className="h-[calc(100vh-100px)] w-[100%] bg-[#2A3794] text-white flex justify-between items-center px-[120px]">
            <div className="hero-left w-[534px] flex flex-col gap-5">
                <h2 className="font-Source-Serif font-semibold text-[48px] leading-14">Welcome To Freelencing Website</h2>
                <p className="font-Poppins text-[20px] "
                >Hi this  is  the best website for hiring freelencer , getting clients , chat in real time</p>

            </div>
            <div className="hero-right">
                <img src="../../images/hero-image.png" alt="Error"
                    className="w-[534px] h-[357px] "
                />
            </div>
        </div>
    )
}

export  {Home}
