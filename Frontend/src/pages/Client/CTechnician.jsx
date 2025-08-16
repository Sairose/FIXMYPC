import React from 'react'

const CTechnician = () => {
  return (
    <>
      <div>
        <div className="search">
          <h2>Filter</h2>
        </div>
        <div className="technician-card px-[120px] py-[40px]">
          <div className="child-card w-[222px] h-[285px] flex flex-col gap-2">
              <div className="top w-full h-full flex flex-col justify-between items-center p-[12px] border border-[#2A3794] rounded-[5px]">
                  <img className='w-[160px] h-[160px] border rounded-[50%] border-[#2A3794]'
                  src="./images/AboutImg.jpg" alt="" />
                  <div className="detail">
                    <p>Sairose Shrestha</p>
                    <p>Skill: PC repair</p>
                    <p>rating: 5.4</p>

                  </div>
              </div>
              <div className="bottom flex justify-between">
                  <button className='w-[105px] h-[40px] text-white font-Poppins text-[16px] bg-[#05B878] border rounded-[5px]'>Book</button>
                  <button className='w-[105px] h-[40px] text-[#FF5733] font-Poppins text-[16px] bg-none border rounded-[5px]
                    border-[#FF5733]
                  '>Book</button>
              </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CTechnician
