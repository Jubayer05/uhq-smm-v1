import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import Dummy from '../images/Dummy.jpg';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import axiosInstance from '../../../axiosInstance';

const ManageOrders = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchAllUserOrders = async () => {
      try {
        const usersRes = await axiosInstance.get('/auth/getUsers');
        const users = usersRes.data.users;

        const allOrders = [];

        for (const user of users) {
          try {
            const ordersRes = await axiosInstance.get(`/vendor/getOrders/${user._id}`);
            const userOrders = ordersRes.data.orders.map((order) => ({
              ...order,
              userName: user.name,
              isMass: false, // ✅ explicitly mark normal orders
            }));
            allOrders.push(...userOrders);
          } catch (err) {
            console.error(`Failed to fetch orders for ${user.name}`, err.message);
          }
        }

        // Fetch Mass Orders
        try {
          const massRes = await axiosInstance.get('/vendor/getAllMassOrders');
          const massOrders = massRes.data.massOrders.map((order) => ({
            ...order,
            userName: order.user?.name || 'N/A',
            isMass: true, // ✅ explicitly mark mass orders
          }));

          setOrders([...allOrders, ...massOrders]);
        } catch (err) {
          console.error('Error fetching mass orders:', err.message);
          toast.error('Failed to load mass orders.');
        }
      } catch (err) {
        console.error('Error fetching users or orders:', err.message);
        toast.error('Failed to load orders.');
      }
    };

    fetchAllUserOrders();
  }, []);

  const handleDelete = async (Id, isMassOrder) => {
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
      const url = isMassOrder
        ? `/vendor/deleteMassOrder/${Id}`
        : `/vendor/deleteOrder/${Id}`;

      await axiosInstance.delete(url);
      setOrders(orders.filter((order) => order._id !== Id));
      toast.success('Order deleted successfully!');
    } catch (err) {
      console.error('Error deleting Order:', err.response?.data || err.message);
      toast.error('Failed to delete order.');
    }
  };

  const handleStatusUpdate = async (Id, newStatus, isMassOrder) => {
    try {
      const url = isMassOrder
        ? `/vendor/updateMassOrderStatus/${Id}`
        : `/vendor/updateOrderStatus/${Id}`;

      await axiosInstance.put(url, { status: newStatus });

      const updatedOrders = orders.map((order) =>
        order._id === Id ? { ...order, status: newStatus } : order
      );
      setOrders(updatedOrders);
      toast.success('Status updated successfully!');
    } catch (err) {
      console.error('Error updating status:', err.response?.data || err.message);
      toast.error('Failed to update status.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Order Management</h1>
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Order Management
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
              style={{ paddingLeft: '40px', color: "gray" }}

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

        <div className="p-4">
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between px-2 mt-4 mb-4">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Order Details</h1>
            </div>

            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-200 uppercase">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Image</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Service</th>
                  <th className="px-4 py-3">Quantity</th>
                  <th className="px-4 py-3">Link</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order, i) => (
                  <tr key={order._id}>
                    <td className="px-4 py-2">#0{i + 1}</td>
                    <td className="px-4 py-2">
                      <img src={Dummy} alt="Order" className="w-10 h-10 rounded-full object-cover" />
                    </td>
                    <td className="px-4 py-2">{order.userName || 'N/A'}</td>
                    <td className="px-4 py-2">{order.serviceId?.name || 'N/A'}</td>
                    <td className="px-4 py-2">{order.quantity}</td>
                    <td className="px-4 py-2">
                      <a href={order.link} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusUpdate(order._id, e.target.value, order.isMass)
                        }
                        className={`text-sm rounded border px-2 py-1 w-32 text-center focus:outline-none
      ${order.status === 'Approved'
                            ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'
                            : order.status === 'Pending'
                              ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                              : 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'
                          }
    `}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Cancel">Cancel</option>
                      </select>
                    </td>

                    <td className="px-4 py-2 space-x-2">
                      <Link to={`/admin/order-detail/${order._id}`}>
                        <button title="View" className="text-blue-600 cursor-pointer hover:text-blue-800">
                          <i className="fas fa-eye"></i>
                        </button>
                      </Link>
                      <button
                        title="Toggle Status"
                        className="text-green-600 cursor-pointer hover:text-green-800"
                        onClick={() =>
                          handleStatusUpdate(
                            order._id,
                            order.status === 'Approved' ? 'Pending' : 'Approved',
                            order.isMass
                          )
                        }
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                      <button
                        title="Delete"
                        className="text-red-600 cursor-pointer hover:text-red-800"
                        onClick={() => handleDelete(order._id, order.isMass)}
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
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

export default ManageOrders;
