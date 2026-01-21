import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';

const OrderHistory = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/getAllOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(res.data.orders);
      } catch (err) {
        console.error('Error fetching orders:', err.message);
      }
    };
    fetchOrders();
    const interval = setInterval(fetchOrders, 10000); // Fetch every 10 seconds

  return () => clearInterval(interval); // Clean up on unmoun
  }, []);


  const handleStatusChange = async (id, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/updateOrderStatus/${id}`, { status: newStatus }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Update status locally in UI
      setOrders((prevOrders) =>
        prevOrders.map((order) =>
          order._id === id ? { ...order, status: newStatus } : order
        )
      );
      toast.success('Status Updated Sucessfully')
    } catch (error) {
      console.error('Failed to update status:', error.message);
    }
  };

  const filteredOrders = orders.filter((order) =>
    order.serviceId?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Order History</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Order History
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        {/* Search + Button */}
        <div className="p-4 mt-4 flex justify-between items-center">
          <div className="relative w-full max-w-md text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full dark:text-gray-100 px-4 py-2"
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
          <div className="bg-white border dark:border-gray-600 dark:bg-[rgba(37,33,57,1)] p-4 shadow-md overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">Date</th>
                  <th className="px-4 py-2 font-semibold">Link</th>
                  <th className="px-4 py-2 font-semibold">OrderId</th>
                  <th className="px-4 py-2 font-semibold">Charge</th>
                  <th className="px-4 py-2 font-semibold">Start Count</th>
                  <th className="px-4 py-2 font-semibold">Quantity</th>
                  <th className="px-4 py-2 font-semibold">Service</th>
                  <th className="px-4 py-2 font-semibold">Remains</th>
                  <th className="px-4 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.length === 0 ? (
                  <tr>
                    <td className="px-4 py-4 text-center" colSpan={9}>
                      No orders found.
                    </td>
                  </tr>
                ) : (
                  filteredOrders.map((order, idx) => (
                    <tr key={order._id}>
                      <td className="px-4 py-2">0{idx + 1}</td>
                      <td className="px-4 py-2">{new Date(order.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{order.link}</td>
                      <td className="px-4 py-2">{order._id}</td>
                      <td className="px-4 py-2">${order.charge.toFixed(2)}</td>
                      <td className="px-4 py-2">-</td>
                      <td className="px-4 py-2">{order.quantity}</td>
                      <td className="px-4 py-2">{order.serviceId?.name}</td>
                      <td className="px-4 py-2">-</td>
                      <td className="px-4 py-2">
                        <span
                          className={`
      inline-block px-3 py-1 rounded-full text-xs font-semibold
      ${order.status === 'Approved'
                              ? 'bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100'
                              : order.status === 'Pending'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-600 dark:text-yellow-100'
                                : 'bg-red-100 text-red-800 dark:bg-red-600 dark:text-red-100'
                            }
    `}
                        >
                          {order.status}
                        </span>
                      </td>


                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
