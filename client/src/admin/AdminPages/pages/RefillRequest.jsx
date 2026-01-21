import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance'; // ✅ Correct import

const RefillRequest = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUserOrders = async () => {
      try {
        const usersRes = await axiosInstance.get('/auth/getUsers');
        const users = usersRes.data.users;
        setUsers(users);

        const allOrders = [];

        for (const user of users) {
          try {
            const ordersRes = await axiosInstance.get(`/vendor/getOrders/${user._id}`);
            const userOrders = ordersRes.data.orders.map((order) => ({
              ...order,
              userName: user.name,
              userId: user._id,
              status: order.status,
            }));
            allOrders.push(...userOrders);
          } catch (err) {
            console.error(`Failed to fetch orders for ${user.name}`, err.message);
          }
        }

        setOrders(allOrders);
      } catch (err) {
        console.error('Error fetching users or orders:', err.message);
        toast.error('Failed to load orders.');
      }
    };

    fetchAllUserOrders();
  }, []);

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await axiosInstance.put(`/vendor/updateOrderStatus/${orderId}`, {
        status: newStatus,
      });

      const updatedOrders = orders.map((order) =>
        order._id === orderId ? { ...order, status: newStatus } : order
      );

      setOrders(updatedOrders);
      toast.success('Order status updated successfully!');
    } catch (err) {
      console.error('Error updating order status:', err.response?.data || err.message);
      toast.error('Failed to update order status.');
    }
  };


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Refill History</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Refill History
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        {/* Search Input */}
        <div className="p-4 flex justify-between items-center">
          <div className="relative w-full text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search"
              className="w-full dark:text-gray-100 px-4 dark:bg-gray-900 py-3"
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
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between px-2 mt-4 mb-4">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Refill History</h1>
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
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3"
                  />
                </svg>
              </button>
            </div>

            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-200 uppercase">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">RegisteredOn</th>
                  <th className="px-4 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order, i) => (
                  <tr key={order._id}>
                    <td className="px-4 py-2">#0{i + 1}</td>
                    <td className="px-4 py-2">{order.userName || 'N/A'}</td>
                    <td className="px-4 py-2">{order.serviceId?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className={`px-6 py-1 text-xs rounded font-semibold outline-none ${order.status === 'Approved'
                            ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'
                            : order.status === 'Pending'
                              ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                              : 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'
                          }`}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancel">Cancel</option>
                      </select>



                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {orders.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No orders found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefillRequest;
