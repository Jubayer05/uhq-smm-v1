import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useLocation, Link } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import axios from "axios";

const AddFunds = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/funds/getAllFunds`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFunds(res.data);
      } catch (err) {
        console.error("Error fetching funds:", err);
      }
    };

    fetchFunds();
    const interval = setInterval(fetchFunds, 10000); // Fetch every 10 seconds

    return () => clearInterval(interval); // Clean up on unmoun
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Funds</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Funds
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        {/* Search and Add Button */}
        <div className="p-4 flex justify-between items-center">
          <div className="relative w-full max-w-md text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search"
              className="w-full dark:text-gray-100 px-4 py-2"
              style={{ paddingLeft: '40px', color: "gray" }}
            />
            <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300"
              fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          <Link to='/vendor/add-funds'>
            <button
              className="ml-4 px-6 py-1 md:px-9 md:py-3 border z-[1000] cursor-pointer text-sm md:text-base text-gray-600 dark:text-white border-gray-100 rounded transition flex items-center space-x-2 gradient-border-dark"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span className=" sm:inline">Add Funds</span>
            </button>
          </Link>

        </div>

        {/* Funds Table */}
        <div className="p-4">
          <div className="bg-white border-gray-200 border dark:bg-[rgba(37,33,57,1)] p-4 shadow-md overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Charge</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {funds.length > 0 ? (
                  funds.map((fund, index) => (
                    <tr key={fund._id}>
                      <td className="px-4 py-2">#0{index + 1}</td>
                      <td className="px-4 py-2">{new Date(fund.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{fund.method}</td>
                      <td className="px-4 py-2">{fund.amount}</td>
                      <td className="px-4 py-2">
                        <span
                          className={`
      inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${fund.status === 'Approved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                              : fund.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'
                                : fund.status === 'Refunded'
                                  ? 'bg-yellow-100 text-blue-800 dark:bg-blue-600 dark:text-blue-100'
                                  : fund.status === 'Cancel'
                                ? 'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100'
                                : ""
                                  
                            }
    `}
                        >
                          {fund.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">No funds found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AddFunds;
