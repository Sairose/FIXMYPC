import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
    const { login } = useAuth();
    const [inputData, setInputData] = useState({
        email: "",
        password: "",
        role: "client"
    });
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setInputData((prev) => {
            return { ...prev, [name]: value }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const result = await axios.post('/api/auth/login', inputData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (result.status === 200) {
                login(result.data.user);
                // alert("Login Successful!");
                toast("Login Successful!");

                const role = result.data.user.role;

                if (role === 'client') navigate('/client/dashboard');
                else if (role === 'technician') navigate('/technician/dashboard');
                // else if (role === 'admin') navigate('/adminDashboard');
            }

        } catch (error) {
            // Show alert with the message from backend
            const message =
                error.response?.data?.message || "Login failed. Please try again.";
            // alert(message);
            toast(message);
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="main-container w-full h-screen bg-[#F3F4F6] flex items-center justify-center">
                <div className="flex flex-col items-center justify-center gap-6">
                    <form onSubmit={handleSubmit} className='w-[411px] px-[22px] py-[14px] bg-[#FFFFFF] rounded-[5px] flex flex-col gap-[24px]'>
                        <h2 className='font-Source-Serif font-semibold text-2xl text-center'>Login</h2>

                        <div className='flex flex-col gap-2'>
                            <label className='font-Poppins text-xl' htmlFor="email">Enter Your Email</label>
                            <input className='h-[46px] w-full border border-[#000000] rounded-2xl outline-none bg-[#ffffff] px-2'
                                type="email"
                                name='email'
                                onChange={handleInputChange}
                                value={inputData.email}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-Poppins text-xl' htmlFor="password">Enter Your Password</label>
                            <input className='h-[46px] w-full border border-[#000000] rounded-2xl outline-none bg-[#ffffff] px-2'
                                type="password"
                                name='password'
                                onChange={handleInputChange}
                                value={inputData.password}
                            />
                        </div>

                        <div className='flex flex-col gap-2'>
                            <label className='font-Poppins text-xl' htmlFor="role">Select Role</label>
                            <select className='h-[46px] w-full border border-[#000000] rounded-2xl outline-none bg-[#ffffff] px-2'
                                onChange={handleInputChange}
                                name='role'
                                value={inputData.role}
                            >
                                <option value="client">Client</option>
                                <option value="technician">Technician</option>
                            </select>
                        </div>

                        <div className='w-full flex justify-center'>
                            <button className='w-[118px] h-[46px] border rounded-[30px] bg-[#165DFB] text-white cursor-pointer' type="submit">Login</button>
                        </div>
                    </form>

                    <div className='text-center'>
                        <h4 className='text-[16px]'>Don't Have An Account?</h4>
                        <button className='text-[#165DFB] underline mt-1' onClick={() => navigate('/signup')}>
                            Sign Up
                        </button>
                    </div>
                </div>
            </div>



        </>
    )
}

export default Login
