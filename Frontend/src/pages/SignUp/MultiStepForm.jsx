import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../api/axios'; // Adjust the path as necessary
import { toast, ToastContainer } from 'react-toastify';

const MultiStepForm = () => {
  // currentStep tracks which step the user is on
  const [currentStep, setCurrentStep] = useState(1);

  // use navigate 
  const navigate = useNavigate();


  // validation that no input field should be empty + custom rules
  const validateStep = () => {
    if (currentStep === 1) {
      const { firstName, lastName } = formData;
      const nameRegex = /^[A-Za-z]+$/; // Only alphabets

      if (!firstName || !lastName) {
        toast("Please fill in all required fields.");
        return false;
      }

      if (!nameRegex.test(firstName)) {
        toast("Enter correct first name (letters only).");
        return false;
      }

      if (!nameRegex.test(lastName)) {
        toast("Enter correct last name (letters only).");
        return false;
      }

      if( firstName.length <= 2 || lastName.length <= 2) {
        toast("First and last names must be at least 2 characters long.");
        return false;
      }

      return true;
    }

    if (currentStep === 2) {
      const { email, password, confirmPassword } = formData;
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

      if (!email || !password || !confirmPassword) {
        toast("Please fill in all required fields.");
        return false;
      }

      if (!emailRegex.test(email)) {
        toast("Enter a valid email address.");
        return false;
      }

      if (password !== confirmPassword) {
        toast("Passwords do not match.");
        return false;
      }

      return true;
    }

    if (currentStep === 3) {
      const { file, role } = formData;

      if (!file || !role) {
        toast("Please upload a file and select a role.");
        return false;
      }

      return true;
    }

    return false;
  };




  // formData holds all the form input values
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
    file: null,
  });

  // handleChange updates the formData state when input values change
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    // If the field is a file input, use files[0]
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'file' ? files[0] : value,
    }));
  };

  // Handles next button click
  const handleNext = () => {
    if (!validateStep()) {
      return;
    }
    setCurrentStep((prev) => prev + 1);
  };

  // Handles back button click
  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  // Final form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('/api/auth/signup', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true
      });

      if (result.status === 201) {
        // alert("Registration Successful!");
        toast("Registration Successful!");
        const role = result.data.user.role;

        // Clear form
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
          role: '',
          file: null,
        });

        // Redirect based on role
        if (role === 'client') {
          navigate('/client/dashboard');
        } else if (role === 'technician') {
          navigate('/technician/dashboard');
        } else {
          navigate('/login'); // fallback
        }
      }
    } catch (err) {
      console.error(err);
      // alert(err?.response?.data?.message || "Registration Failed!");
      toast(err?.response?.data?.message || "Registration Failed!");
    }
  };


  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg">
          <h2 className="font-Source-Serif font-semibold text-2xl mb-4 text-center">Registration Form</h2>

          {/* Step 1: Basic Info */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div>
                <label className="font-Poppins text-[20px] block mb-1">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="font-Poppins text-xl block mb-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Credentials */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <div>
                <label className="font-Poppins text-xl block mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="font-Poppins text-xl block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div>
                <label className="font-Poppins text-xl block mb-1">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {/* Step 3: File + Role */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <div>
                <label className="font-Poppins text-xl block mb-1">Upload Profile Image</label>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full"
                />
              </div>

              <div>
                <label className="font-Poppins text-xl block mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-md"
                  required
                >
                  <option value="">Select Role</option>
                  <option value="client">Client</option>
                  <option value="technician">Technician</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handleBack}
                  className="bg-gray-500 text-white px-4 py-2 rounded-md"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded-md"
                >
                  Submit
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default MultiStepForm;
