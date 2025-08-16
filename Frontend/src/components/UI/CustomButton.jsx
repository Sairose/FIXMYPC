import React from 'react'

const Button = ({data}) => {
    return (
        <>
            <button
                className="w-[100px] h-[40px] lg:w-[150px] lg:h-[50px] px-2 py-2 sm:px-0 sm:py-0 border rounded-[30px] bg-[#05B878] text-white hover:cursor-pointer hover:translate-x-[-10px] hover:translate-y-[-10px] duration-300 ease-in"
            >{data}</button>
        </>
    )
}

export default Button
