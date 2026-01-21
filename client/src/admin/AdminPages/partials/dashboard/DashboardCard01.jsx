import React from "react";

const Dashboard01 = () => {
  return (
    <div className="flex flex-col bg-[#FFFFFF] dark:bg-[rgba(37,33,57,1)] shadow-md p-6 w-full border border-[#FFFFFF] dark:border-[#FFFFFF]">
      {/* Title and Balance */}
      <div className="flex flex-col mb-4 pl-4">
        <p className="text-lg text-gray-700 mb-3 font-light dark:text-white">Total Users</p>
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">1,234</h2>
      </div>

      {/* Percentage Growth */}
      <div className="flex flex-col mb-2 pl-4">
        <div className="text-green-500 text-sm">
          <span>&#8593; +12%</span>
        </div>
        <p className="text-xs mt-2 text-gray-600 dark:text-gray-400">Since last month</p>
      </div>
    </div>
  );
};

export default Dashboard01;
