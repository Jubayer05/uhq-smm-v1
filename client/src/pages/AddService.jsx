import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import ServiceImage from '../images/SerImage.svg'

const AddService = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-100  dark:bg-[var(--color-dark-gray)]  border-gray-200 dark:border-blue-700">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
                 <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
                   <h1 className="text-gray-400 mb-1">Dashboard / AddServices</h1>
                   <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                     <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                      Add Services
                     </h1>
                     <Datepicker align="left" />
                   </div>
                 </div>
               </main>
       

        <div className="bg-white p-16 my-8 mx-4 border-gray-200 border dark:bg-[rgba(37,33,57,1)]">
          <div>
            <img src={ServiceImage} alt="" className='mx-auto' />
          </div>
          <h2 className="text-xl md:text-4xl text-center text-gray-900 dark:text-[#FFFFFF] font-light mb-6">
            For Service Adding Request Send message On Telegram like indicated below
          </h2>
          <div className="mt-24 flex justify-center">
            <a
              href="https://t.me/vipstore"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="
    w-full sm:w-auto
    mt-6 
    px-6 py-2 sm:px-8 sm:py-3 
    border border-violet-600 
    text-violet-600 
    rounded-3xl
    dark:gradient-border 
    hover:bg-violet-500 hover:text-white 
    dark:hover:text-white dark:hover:bg-violet-700 
    cursor-pointer transition
  "
              >
                Send Request
              </button>

            </a>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddService;
