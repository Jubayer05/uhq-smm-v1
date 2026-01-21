import React from 'react';

function DashboardCard10() {
  const services = [
    { name: 'Instagram', width: 'w-[100%]' },
    { name: 'Service B', width: 'w-[90%]' },
    { name: 'Service C', width: 'w-[80%]' },
    { name: 'Service D', width: 'w-[65%]' },
    { name: 'Service E', width: 'w-[50%]' },
  ];

  return (
    <div className="bg-white dark:bg-[#141126] text-gray-900 dark:text-white p-6 rounded-xl shadow-lg w-full max-w-lg border border-gray-200 dark:border-gray-500">
      <div className="mb-4 text-lg text-gray-800 dark:text-gray-100">Top Services</div>
      <div className="text-3xl mb-4 font-semibold text-gray-900 dark:text-white">+10%</div>
      <p className="text-md mb-4 text-gray-600 dark:text-gray-400">
        Last 30 Days <span className="text-green-600 dark:text-green-500">+10%</span>
      </p>

      {services.map((service, index) => (
        <div key={index} className="mb-4 flex items-center justify-between space-y-3">
          <span className="text-sm text-gray-700 dark:text-gray-300 w-24">{service.name}</span>
          <div className="flex-1 h-6 bg-gray-200 dark:bg-[#2a2a40]">
            <div
              className={`h-6 ${service.width}`}
              style={{ background: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%)' }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default DashboardCard10;
