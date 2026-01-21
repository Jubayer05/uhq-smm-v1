import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import axios from 'axios';

const Subscriptions = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchSubs = async () => {
      try {
        const res = await axios.get(
           `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/getAllSubscriptions`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (res.data.success) {
          setSubscriptions(res.data.plans || []); // using `plans` based on your response
        }
      } catch (err) {
        console.error('Error fetching subscriptions:', err);
      }
    };
    fetchSubs();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Subscriptions</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Subscriptions
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        {/* Search Bar */}
        <div className="p-4 mt-4 flex justify-between items-center">
          <div className="relative w-full max-w-md text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search"
              className="w-full dark:text-gray-100 px-4 py-2"
              style={{ paddingLeft: '40px', color: 'gray' }}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          <div className="bg-white border-gray-200 border dark:bg-[rgba(37,33,57,1)] p-4 shadow-md overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3">Plan Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Features</th>
                  <th className="px-4 py-3">Deposit Bonus</th>
                  <th className="px-4 py-3">Expiry</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {subscriptions.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-center" colSpan={7}>
                      No subscriptions found.
                    </td>
                  </tr>
                ) : (
                  subscriptions.map((sub, i) => {
                    const created = new Date(sub.createdAt);
                    const expiry = new Date(created);
                    expiry.setDate(created.getDate() + 30);

                    return (
                      <tr key={sub._id}>
                        <td className="px-4 py-2">#{i + 1}</td>
                        <td className="px-4 py-2">{created.toLocaleString()}</td>
                        <td className="px-4 py-2">{sub.name}</td>
                        <td className="px-4 py-2">${sub.price.toFixed(2)}</td>
                        <td className="px-4 py-2">
                          {sub.features?.split(',').length || 0}
                        </td>
                        <td className="px-4 py-2">{sub.depositBonus || '-'}</td>
                        <td className="px-4 py-2">{expiry.toLocaleDateString()}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
