import React, { useEffect, useState } from "react";
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import UserImage from '../images/UserDetailImage.svg';
import { useParams } from "react-router-dom";
import axios from 'axios';
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const ViewOrderDetail = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/getsingleorder/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrder(response.data.order);
      } catch (error) {
        toast.error("Failed to fetch order data");
        console.error(error);
      }
    };

    fetchOrder();
  }, [id]);

  if (!order) return <div className="p-6 text-gray-800 dark:text-white">Loading order data...</div>;

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">
              Dashboard / Order Management / View Order
            </h1>
            <div className="mb-4 mt-5 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Order Detail
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="px-4 py-4">
          <div className="bg-white dark:bg-[#1F1F2E] p-6 shadow-xl w-full border border-gray-300 dark:border-gray-600 rounded-lg">
            <h2 className="text-gray-800 dark:text-white text-lg font-semibold mb-6">
              Order Detail
            </h2>

            <div className="flex items-center space-x-4 mb-6">
              <img src={UserImage} alt="User" className="w-64 h-48 rounded-md object-cover" />
            </div>

            <div className="grid grid-cols-3 gap-4 text-sm text-gray-800 dark:text-white">
              <div className="text-gray-500 dark:text-gray-400">User Name</div>
              <div className="col-span-2">{order.user?.name || 'N/A'}</div>

              <div className="text-gray-500 dark:text-gray-400">Email</div>
              <div className="col-span-2">{order.user?.email || 'N/A'}</div>

              <div className="text-gray-500 dark:text-gray-400">Service</div>
              <div className="col-span-2">{order.serviceId?.name || 'N/A'}</div>

              <div className="text-gray-500 dark:text-gray-400">Category</div>
              <div className="col-span-2">{order.categoryId?.name || 'N/A'}</div>

              <div className="text-gray-500 dark:text-gray-400">Link</div>
              <div className="col-span-2">
                <Link to={order.Link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                  {order.link}
                </Link>
              </div>

              <div className="text-gray-500 dark:text-gray-400">Quantity</div>
              <div className="col-span-2">{order.quantity}</div>

              <div className="text-gray-500 dark:text-gray-400">Charge</div>
              <div className="col-span-2">{order.charge}</div>

              <div className="text-gray-500 dark:text-gray-400">Status</div>
              <div className="col-span-2">{order.status}</div>

              <div className="text-gray-500 dark:text-gray-400">Created At</div>
              <div className="col-span-2">{new Date(order.createdAt).toLocaleString()}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewOrderDetail;
