import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import axios from '../../api/axios';
import { toast, ToastContainer } from 'react-toastify';

const CSetting = () => {
  const { user, login } = useAuth();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    image: null,
    imagePreview: '',
  });


  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        password: '',
        image: null,
        imagePreview: user.image || '',
      });
    }
  }, [user]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData((prev) => ({
      ...prev,
      image: file,
      imagePreview: file ? URL.createObjectURL(file) : '',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedData = new FormData();
      updatedData.append('firstName', formData.firstName);
      updatedData.append('lastName', formData.lastName);
      updatedData.append('email', formData.email);
      if (formData.password) updatedData.append('password', formData.password);
      if (formData.image) updatedData.append('image', formData.image);

      const res = await axios.put('/auth/update-profile', updatedData, {
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      login(res.data);
      // alert('Profile updated successfully!');
      toast('Profile updated successfully!');
    } catch (error) {
      console.error(error);
      // alert('Failed to update profile.');
      toast('Failed to update profile.');
    }
  };


  return (
    <>
      <ToastContainer/>
      <div className="h-auto w-full bg-[#2A3794] flex items-center justify-center p-6 sm:h-[calc(100vh-103px)]">
        <form
          onSubmit={handleSubmit}
          className="bg-[#ffffff] text-[#000000] w-full max-w-4xl p-10 rounded-xl shadow-xl flex flex-col gap-8"
        >
          <h2 className="text-3xl font-bold text-center text-[#2A3794]">Profile</h2>

          <div className="flex flex-wrap gap-6">
            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="firstName" className="mb-1 font-medium">First Name</label>
              <input
                className="border border-[#2A3794] rounded-lg px-4 py-2 outline-none"
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="lastName" className="mb-1 font-medium">Last Name</label>
              <input
                className="border border-[#2A3794] rounded-lg px-4 py-2 outline-none"
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="email" className="mb-1 font-medium">Email</label>
              <input
                className="border border-[#2A3794] rounded-lg px-4 py-2 outline-none"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="password" className="mb-1 font-medium">New Password</label>
              <input
                className="border border-[#2A3794] rounded-lg px-4 py-2 outline-none"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter new password"
              />
            </div>

            <div className="flex flex-col w-full md:w-[48%]">
              <label htmlFor="image" className="mb-1 font-medium">Profile Image</label>
              <div className="flex items-center gap-4">
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="w-14 h-14 rounded-full object-cover border"
                  />
                )}
                <input
                  className="text-sm file:text-white file:bg-[#2A3794] file:px-3 file:py-2 file:rounded-lg file:border-none file:cursor-pointer"
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-[#2A3794] text-white px-8 py-2 rounded-full hover:bg-[#1f2e7c] transition duration-300"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CSetting;
