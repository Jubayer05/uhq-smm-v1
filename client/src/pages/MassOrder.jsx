import React, { useState, useEffect } from "react";
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link } from "react-router-dom";
import Datepicker from '../components/Datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';


const MassOrder = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [inputValue, setInputValue] = useState(""); // empty initially to show placeholder

  const handleChange = (e) => {
    setInputValue(e.target.value);


  };

useEffect(() => {
  const updateServiceFromStorage = () => {
    const savedService = localStorage.getItem('selectedService');
    if (savedService) {
      const serviceObj = JSON.parse(savedService);
      setInputValue(serviceObj._id + ' | ');
    }
  };

  // Call initially on component mount
  updateServiceFromStorage();

  // Re-run when window/tab gains focus
  window.addEventListener('focus', updateServiceFromStorage);

  return () => {
    window.removeEventListener('focus', updateServiceFromStorage);
  };
}, []);


const handleSubmit = async () => {
  if (!inputValue) {
    toast.error("Please fill the input field!");
    return;
  }

  const parts = inputValue.split('|');
  if (parts.length < 3) {
    toast.error("Please enter data in the format: ServiceId | Quantity | Link");
    return;
  }

  const serviceId = parts[0].trim();
  const quantity = parseInt(parts[1].trim());
  const link = parts[2].trim();

  if (!serviceId || !quantity || !link) {
    toast.error("All fields (ServiceId, Quantity, Link) must be provided.");
    return;
  }

  try {
    const token = localStorage.getItem('authToken');
    const response = await axios.post(
      `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/addMassOrder`,
      { serviceId, quantity, link },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.data.success) {
      toast.success("Mass order placed successfully!");
      setInputValue(serviceId + ' | '); // reset keeping serviceId
    } else {
      toast.error(response.data.message || "Something went wrong");
    }
  } catch (error) {
    console.error('Error:', error);
    toast.error(error.response?.data?.message || "Failed to place mass order");
  }
};



  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 dark:border-blue-700">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Bulk Order</h1>

            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Bulk Order
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <main className="grow">
          <div className="flex flex-col px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            {/* MassOrder form */}
            <div className="flex flex-col w-full dark:bg-[rgba(37,33,57,1)] bg-white shadow-xs p-6 min-h-[650px] border border-gray-200 dark:border-[#FFFFFF] rounded-md">
              <h1 className="mt-4 text-gray-800 font-light dark:text-white text-2xl">
                Mass Order
              </h1>

              <h2 className="dark:text-gray-100 text-gray-900 font-light mt-8">Amount</h2>

              <input
                className="mt-2 border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 p-4 resize-y focus:outline-none focus:ring-2 focus:ring-violet-500 transition rounded-md"
                value={inputValue}
                onChange={handleChange} style={{ border: "1px solid black", color: 'gray'}}
                placeholder="ServiceId | Quantity | link"
              />

              {/* Submit Button */}
              <button onClick={handleSubmit} className="lg:w-md w-full mt-6 py-2 border border-violet-600 rounded-4xl dark:gradient-border bg-violet-500 text-white hover:text-white dark:hover:text-white dark:hover:bg-violet-700 cursor-pointer transition">
                Submit
              </button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
};

export default MassOrder;
