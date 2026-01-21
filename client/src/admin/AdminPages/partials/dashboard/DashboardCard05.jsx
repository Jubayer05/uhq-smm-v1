import React, { useState } from 'react';

function DashboardCard05() {
  // State for Link and Quantity inputs
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(10); // Starting with the minimum value 10

  // Handlers for input fields
  const handleLinkChange = (event) => {
    setLink(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <div className="flex flex-col col-span-full sm:col-span-6 bg-white dark:bg-[var(--color-dark-gray)] shadow-xs rounded-xl p-4 space-y-4 border border-gray-200 dark:border-blue-700">
      {/* Top Buttons */}
      <div className="flex space-x-2">
        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 bg-violet-600 text-white rounded-md shadow hover:bg-violet-700 transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 3h18v18H3V3z"/></svg>
          New Order
        </button>
        <button className="flex items-center gap-2 dark:hover:bg-violet-600 dark:hover:text-white cursor-pointer px-4 py-2 border border-violet-600 text-violet-600 rounded-md hover:bg-violet-50 dark:hover:bg-gray-700 transition">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M4 4h16v16H4V4z"/></svg>
          AddFunds
        </button>
      </div>

      {/* Search */}
      <div>
        <input
          type="search"
          placeholder="Search"
          className="w-full rounded-md border border-gray-300 dark:border-blue-900 bg-gray-50 dark:bg-gray-800 text-black dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Category</label>
        <select
          className="w-full rounded-md border border-gray-300 dark:border-blue-900 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          value=""
          onChange={() => {}}
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="groceries">Groceries</option>
          <option value="furniture">Furniture</option>
        </select>
      </div>

      {/* Sort Buttons */}
      <div className="flex space-x-2">
        <button className="px-3 py-1 border dark:hover:bg-violet-500 dark:hover:text-white cursor-pointer border-violet-600 text-violet-600 rounded-md hover:bg-violet-50 dark:hover:bg-gray-700 transition">
          By Popular
        </button>
        <button className="px-3 py-1 border dark:hover:bg-violet-500 dark:hover:text-white cursor-pointer border-violet-600 text-violet-600 rounded-md hover:bg-violet-50 dark:hover:bg-gray-700 transition">
          By Price
        </button>
        <button className="px-3 py-1 border border-violet-600 text-violet-600 rounded-md hover:bg-violet-50 dark:hover:bg-gray-700 transition">
          ↓
        </button>
      </div>

      {/* Service */}
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Service</label>
        <select
          className="w-full rounded-md border border-gray-300 dark:border-blue-900 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          value=""
          onChange={() => {}}
        >
          <option value="">Select Service</option>
          <option value="delivery">Delivery</option>
          <option value="installation">Installation</option>
          <option value="repair">Repair</option>
        </select>
      </div>

      {/* Average Time Section */}
      <div>
        <h4 className="font-semibold mb-1">Average time <span title="Average time might vary">⚠️</span></h4>
        <div className="bg-gray-300 dark:bg-gray-800 dark:border-blue-900 rounded-md p-2 text-gray-900 dark:text-gray-100">
          Not Enough Data
        </div>
      </div>

      {/* Link Input */}
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Link</label>
        <input
          type="text"
          className="w-full rounded-md border border-gray-300 dark:border-blue-900 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          placeholder="Enter URL"
          value={link} // Binding the input to the state
          onChange={handleLinkChange} // Handling the change event
        />
      </div>

      {/* Quantity Input */}
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">Quantity</label>
        <input
          type="number"
          className="w-full rounded-md border border-gray-300 dark:border-blue-900 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
          placeholder="10"
          min={10}
          max={1000000}
          value={quantity} // Binding the input to the state
          onChange={handleQuantityChange} // Handling the change event
        />
        <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          Min: 10 – Max: 1000000
        </div>
      </div>

      {/* Charge Section */}
      <div>
        <label className="block font-semibold text-gray-700 dark:text-gray-300 mb-1">
          Charge (Your rank-based discount has been applied - 1%)
        </label>
        <div className="bg-gray-300 dark:bg-violet-600 rounded-md p-2 text-gray-900 dark:text-gray-100 w-fit">
          $ 2.24
        </div>
      </div>

      {/* Submit Button */}
      <button className="w-full py-2 border border-violet-600 text-violet-600 rounded-md hover:bg-violet-500 hover:text-white dark:hover:text-white dark:hover:bg-violet-700 cursor-pointer transition">
        Submit
      </button>
    </div>
  );
}

export default DashboardCard05;
