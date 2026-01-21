import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../../../axiosInstance';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';


const Affiliate = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [affiliateData, setAffiliateData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data on mount
  useEffect(() => {
    const fetchAffiliates = async () => {
      try {

        const res = await axiosInstance.get('/admin/getAllAffiliates');
        if (res.data.success) {
          setAffiliateData(res.data.affiliates);
        }
      } catch (error) {
        console.error('Failed to fetch affiliates:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAffiliates();
  }, []);

  const handleDeleteAffiliate = async (id) => {
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
      const res = await axiosInstance.delete(`/admin/deleteAffiliate/${id}`);
      if (res.data.success) {
        setAffiliateData((prev) => prev.filter((item) => item._id !== id));
        toast.success('Affiliate deleted successfully');
      } else {
        toast.error(res.data.message || 'Failed to delete affiliate');
      }
    } catch (error) {
      console.error('Failed to delete affiliate:', error.message);
      toast.error('Error deleting affiliate');
    }
  };

  const handleStatusChange = async (affiliateId, newStatus) => {
    try {
      const res = await axiosInstance.put(
        `/admin/updateAffiliateStatus/${affiliateId}`,
        { status: newStatus }
      );
      if (res.data.success) {
        setAffiliateData((prev) =>
          prev.map((aff) =>
            aff._id === affiliateId ? { ...aff, status: newStatus } : aff
          )
        );
        toast.success(`Status updated to ${newStatus}`);
      } else {
        toast.error(res.data.message || 'Failed to update status');
      }
    } catch (error) {
      console.error('Status update failed:', error.message);
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
            <h1 className="text-gray-400 mb-1">Dashboard / Affiliate System</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Affiliate System
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
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Affiliate System</h1>
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

            {loading ? (
              <div className="text-center py-6 text-gray-600 dark:text-gray-300">Loading affiliates...</div>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-200 uppercase">
                  <tr>
                    <th className="px-4 py-3">ID</th>
                    <th className="px-4 py-3">User</th>
                    <th className="px-4 py-3">Referral Code</th>
                    <th className="px-4 py-3">Referrals</th>
                    <th className="px-4 py-3">Total Earned</th>
                    <th className="px-4 py-3">Commission</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                  {affiliateData.map((item, index) => (
                    <tr key={item._id}>
                      <td className="px-4 py-2">#0{index + 1}</td>
                      <td className="px-4 py-2">{item.user?.name || 'N/A'}</td>
                      <td className="px-4 py-2">{item.referralCode}</td>
                      <td className="px-4 py-2">{item.referrals}</td>
                      <td className="px-4 py-2">${item.totalEarned}</td>
                      <td className="px-4 py-2">{item.commission}%</td>
                      <td className="px-4 py-2">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item._id, e.target.value)}
                          className={`text-sm rounded px-8 py-1 border transition-colors duration-300
      ${item.status === 'Completed'
                              ? 'bg-green-200 text-green-800 border-green-400 dark:bg-green-900 dark:text-green-300 dark:border-green-600'
                              : 'bg-yellow-200 text-yellow-800 border-yellow-400 dark:bg-yellow-900 dark:text-yellow-300 dark:border-yellow-600'
                            }`}
                        >
                          <option value="Processing">Processing</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </td>

                      <td className="px-4 py-2 space-x-3 flex items-center">
                        <button className="text-green-600 hover:text-green-700">
                          <FiEdit className="w-4 h-4" />
                        </button>
                        <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteAffiliate(item._id)}>
                          <FiTrash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
