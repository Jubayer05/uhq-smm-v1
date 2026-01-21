import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import { toast } from 'react-toastify';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../../../axiosInstance'; // ✅ your custom axios instance
import Swal from 'sweetalert2';

const Subscriptions = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const response = await axiosInstance.get('/vendor/getAllSubscriptions');
        if (response.data.success) {
          setSubscriptions(response.data.plans); // array now
        }
      } catch (err) {
        console.error('Error fetching subscriptions:', err.message);
      }
    };

    fetchSubscription();
  }, []);


const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  });

  if (!result.isConfirmed) return;

  try {
    await axiosInstance.delete(`/vendor/deleteSubscription/${id}`);

    setSubscriptions((prev) => prev.filter((sub) => sub._id !== id));

    toast.success('Subscription deleted successfully!');
  } catch (err) {
    console.error('Error deleting subscription:', err.response?.data || err.message);
    toast.error('Failed to delete subscription.');
  }
};


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Subscriptions</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Subscriptions
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="p-4 flex justify-between items-center">
          <div className="relative w-full text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search"
              className="w-full dark:text-gray-100 px-4 dark:bg-gray-900 py-3"
              style={{ paddingLeft: '40px',  color: "gray"  }}
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

        <div className="p-4">
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between px-2 mt-4 mb-4">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Your Subscription</h1>
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
                  <th className="px-4 py-3">Username</th>
                  <th className="px-4 py-3">Plan Name</th>
                  <th className="px-4 py-3">Price</th>
                  <th className="px-4 py-3">Billing</th>
                  <th className="px-4 py-3">Discount</th>
                  <th className="px-4 py-3">Deposit Bonus</th>
                  <th className="px-4 py-3">Created At</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {subscriptions.length > 0 ? (
                  subscriptions.map((sub, i) => (
                    <tr key={sub._id}>
                      <td className="px-4 py-2">#0{i + 1}</td>
                      <td className="px-4 py-2">{sub.user?.name || 'N/A'}</td>
                      <td className="px-4 py-2">{sub.name}</td>
                      <td className="px-4 py-2">${sub.price}</td>
                      <td className="px-4 py-2">{sub.billingCycle}</td>
                      <td className="px-4 py-2">{sub.discount}%</td>
                      <td className="px-4 py-2">{sub.depositBonus}%</td>
                      <td className="px-4 py-2">{new Date(sub.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2 flex items-center space-x-3">
                        <button className="text-green-500 hover:text-green-700"><FiEdit /></button>
                        <button className="text-red-500 hover:text-red-700"  onClick={() => handleDelete(sub._id)}><FiTrash2 /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-6">No subscriptions found.</td>
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

export default Subscriptions;
