import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import axiosInstance from '../../../axiosInstance';
import { toast } from 'react-toastify';

const Payment = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [funds, setFunds] = useState([]);

  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const res = await axiosInstance.get('/funds/getAllFunds');
        setFunds(res.data); // No need to filter manually
      } catch (error) {
        console.error('Error fetching funds:', error);
      }
    };

    fetchFunds();
  }, []);

  const handleStatusChange = async (id, newStatus) => {
  try {
    await axiosInstance.put(`/funds/updateFundStatus/${id}`, { status: newStatus });

    // Update local state to reflect change
    setFunds((prevFunds) =>
      prevFunds.map((fund) =>
        fund._id === id ? { ...fund, status: newStatus } : fund
      )
    );
    toast.success('Funds Updated Successfully')
  } catch (error) {
    console.error('Failed to update status:', error);
    toast.error('Error updating status');
  }
};





  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Manual Payment</h1>
            <div className="mb-4  sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Manual Payment
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        {/* Search */}
        <div className="p-4 flex justify-between items-center">
          <div className="relative w-full text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search"
              className="w-full dark:text-gray-100 px-4 dark:bg-gray-900 py-3"
              style={{ paddingLeft: '40px', color: "gray" }}
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-300"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between px-2 mt-4 mb-4">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Payment Details</h1>
              <button
                className="flex items-center dark:text-white px-4 py-2 rounded cursor-pointer transition text-md"
                onClick={() => alert('Export triggered')}
              >
                Export
                <svg
                  className="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
              </button>
            </div>

            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-200 uppercase">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Name</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Method</th>
                  <th className="px-4 py-3">Screenshot</th>
                  <th className="px-4 py-3">Registered On</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {funds.map((fund, index) => (
                  <tr key={fund._id}>
                    <td className="px-4 py-2">#0{index + 1}</td>
                    <td className="px-4 py-2">{fund.user?.name || 'N/A'}</td>
                    <td className="px-4 py-2">${fund.amount}</td>
                    <td className="px-4 py-2">{fund.method}</td>
                    <td className="px-4 py-2">
                      <a
                        href={fund.screenshot || '#'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:underline"
                      >
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      {fund.createdAt ? new Date(fund.createdAt).toLocaleDateString() : 'N/A'}
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={fund.status}
                        onChange={(e) => handleStatusChange(fund._id, e.target.value)}
                        className={`px-6 py-1 rounded text-xs font-semibold
      ${fund.status === 'Approved' ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100' :
                            fund.status === 'Pending' ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100' :
                              fund.status === 'Refunded' ? 'bg-blue-200 text-blue-800 dark:bg-blue-700 dark:text-blue-100' :
                                'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'}
    `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancel">Cancel</option>
                        <option value="Refunded">Refunded</option>
                      </select>
                    </td>

                  </tr>
                ))}
                {funds.length === 0 && (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-400">
                      No payment history found.
                    </td>
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

export default Payment;
