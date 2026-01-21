import React, { useState } from 'react';

import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import FilterButton from '../components/DropdownFilter';
import Datepicker from '../components/Datepicker';
import DashboardCard01 from '../partials/dashboard/DashboardCard01';
import DashboardCard02 from '../partials/dashboard/DashboardCard02';
import DashboardCard03 from '../partials/dashboard/DashboardCard03';
import DashboardCard04 from '../partials/dashboard/DashboardCard04';
import Dashboard003 from '../partials/dashboard/DasboardCard003';
import DashboardCard10 from '../partials/dashboard/DashboardCard10';
import DashboardCard06 from '../partials/dashboard/DashboardCard06';

function Dashboard({setToken}) {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">

      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      {/* Content area */}
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">

        {/*  Site header */}
        <Header setToken={setToken} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard</h1>

            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Dashboard
              </h1>
              <Datepicker align="left" />
            </div>



            {/* Row 1: My Balance + Total Orders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <DashboardCard01 /> {/* My Balance */}
              <DashboardCard02 /> {/* Total Orders */}
              <DashboardCard03 /> {/* Spent Balance */}
            </div>
            <div className='mt-8 ml-2 text-xl font-semibold'>
              <h1>User Activity</h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <DashboardCard04 /> {/* Full width moved to the front */}
              <Dashboard003 />
            </div>

            <div className='mt-8 ml-2 text-xl font-semibold'>
              <h1>Service Usage</h1>
            </div>
            {/* Row 4: Order History and Order Categories */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8">
              <DashboardCard10 /> {/* Full width moved to the front */}
              <DashboardCard06 />
            </div>
          </div>
        </main>


      </div>
    </div>
  );
}

export default Dashboard;