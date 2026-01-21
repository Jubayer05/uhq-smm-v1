import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../../../axiosInstance'; // adjust the path based on your file structure
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

const RefundRequests = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refundData, setRefundData] = useState([]);
  const [search, setSearch] = useState('');

  const fetchRefunds = async () => {
    try {
      const res = await axiosInstance.get('/vendor/getAllRefunds');
      setRefundData(res.data.refunds);
    } catch (err) {
      toast.error('Failed to fetch refund requests');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
  try {
    const res = await axiosInstance.put(`/vendor/updateRefundStatus/${id}`, {
      status: newStatus,
    });

    if (res.data.success) {
      toast.success('Refund status updated');
      fetchRefunds(); // refresh the table
    } else {
      toast.error(res.data.message || 'Failed to update status');
    }
  } catch (err) {
    console.error('Error updating refund status:', err.message);
    toast.error('Server error');
  }
};


  useEffect(() => {
    fetchRefunds();
  }, []);

  const filteredData = refundData.filter((entry) =>
    entry.orderId?.toLowerCase().includes(search.toLowerCase())
  );



  const handleDeleteRefund = async (id) => {
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
      const res = await axiosInstance.delete(`/vendor/deleteRefund/${id}`);
      if (res.data.success) {
        setRefundData((prev) => prev.filter((item) => item._id !== id));
        toast.success('Refund request deleted successfully');
      } else {
        toast.error(res.data.message || 'Failed to delete refund request');
      }
    } catch (error) {
      console.error('Delete Error:', error.message);
      toast.error('Error deleting refund request');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Refund Requests</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Refund Requests
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
              placeholder="Search by Order ID"
              className="w-full dark:text-gray-100 px-4 dark:bg-gray-900 py-3"
              style={{ paddingLeft: '40px', color: "gray" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Refund Requests</h1>
              <button
                className="flex items-center dark:text-white px-4 py-2 rounded cursor-pointer transition text-md"
                onClick={() => alert('Export triggered')}
              >
                Export
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5 5-5M12 15V3" />
                </svg>
              </button>
            </div>

            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-200 uppercase">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">OrderId</th>
                  <th className="px-4 py-3">User</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Reason</th>
                  <th className="px-4 py-3">Date</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredData.length === 0 ? (
                  <tr>
                    <td className="px-4 py-2" colSpan="8">No refund requests found.</td>
                  </tr>
                ) : (
                  filteredData.map((refund, i) => (
                    <tr key={refund._id}>
                      <td className="px-4 py-2">#0{i + 1}</td>
                      <td className="px-4 py-2">{refund.orderId}</td>
                      <td className="px-4 py-2">{refund.user?.name || 'N/A'}</td>
                      <td className="px-4 py-2">${refund.amount}</td>
                      <td className="px-4 py-2">{refund.reason}</td>
                      <td className="px-4 py-2">{new Date(refund.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">
                        <select
                          value={refund.status}
                          onChange={(e) => handleStatusChange(refund._id, e.target.value)}
                          className={`text-xs font-semibold rounded px-6 py-1
    dark:bg-gray-800 dark:text-white
    ${refund.status === 'Approved' ? 'bg-green-200 text-green-800 dark:bg-green-600'
                              : refund.status === 'Rejected' ? 'bg-red-200 text-red-800 dark:bg-red-600'
                                : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-600'}
  `}
                        >
                          <option value="Pending">Pending</option>
                          <option value="Approved">Approved</option>
                          <option value="Rejected">Rejected</option>
                        </select>

                      </td>
                      <td className="px-4 py-2 flex items-center space-x-3">
                        <button className="text-green-500 hover:text-green-700">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button
                          className="text-red-500 hover:text-red-700"
                          onClick={() => handleDeleteRefund(refund._id)}
                        >
                          <FiTrash2 className="w-4 h-4" />
                        </button>

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

export default RefundRequests;
