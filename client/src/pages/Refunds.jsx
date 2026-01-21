import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';

const Refunds = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [refunds, setRefunds] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reason, setReason] = useState('');

  const token = localStorage.getItem('authToken');

  const fetchRefunds = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/getAllRefunds`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setRefunds(res.data.refunds);
    } catch (err) {
      toast.error('Failed to fetch refunds');
    }
  }
useEffect(() => {
  fetchRefunds();
  const interval = setInterval(fetchRefunds, 10000); // Poll every 10s
  return () => clearInterval(interval); // Clean up
}, []);


 
  const filteredRefunds = refunds.filter(refund =>
    refund.orderId?.toLowerCase().includes(search.toLowerCase())
  );



  const handleRefundSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ set loading true before request

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/addRefund`,
        {
          orderId: selectedOrder.orderId,
          reason,
          amount: selectedOrder.charge,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.data.success) {
        toast.success('Refund requested successfully');
        fetchRefunds(); // Refresh list
        setShowModal(false);
        setReason('');
        setSelectedOrder({ orderId: '', charge: '', reason: '' });
      } else {
        toast.error('Failed to submit refund');
      }
    } catch (err) {
      toast.error('Error: ' + err.message);
    } finally {
      setLoading(false); // ✅ stop loading here
    }
  };


  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


<main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Refunds</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Refunds
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>
        <div className="p-4 flex justify-between items-center">
          <div className="relative w-full max-w-md text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search by Order ID"
              className="w-full dark:text-gray-100 px-4 py-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '40px', color:"gray" }}
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

          <button
            className="ml-4 px-4 py-1 md:px-9 md:py-3 border cursor-pointer text-gray-600 dark:text-white border-gray-400 rounded transition flex items-center space-x-2 gradient-border-dark"
            onClick={() => {
              setShowModal(true);
              setSelectedOrder({ orderId: '', charge: '', reason: '' }); // For manual entry
            }}
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
            <span className="text-sm md:text-base">Add Refund</span>
          </button>

        </div>

        <div className="p-4">
          <div className="bg-white border-gray-200 border dark:bg-[rgba(37,33,57,1)] p-4 shadow-md overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                <tr>
                  <th className="px-4 py-2 font-semibold">ID</th>
                  <th className="px-4 py-2 font-semibold">Date</th>
                  <th className="px-4 py-2 font-semibold">Order ID</th>
                  <th className="px-4 py-2 font-semibold">Refunded Amount</th>
                  <th className="px-4 py-2 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className='text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700'>
                {filteredRefunds.length === 0 ? (
                  <tr>
                    <td className="px-4 py-2" colSpan="5">No refund requests found.</td>
                  </tr>
                ) : (
                  filteredRefunds.map((refund, index) => (
                    <tr key={refund._id}>
                      <td className="px-4 py-2">#0{index + 1}</td>
                      <td className="px-4 py-2">{new Date(refund.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{refund.orderId}</td>
                      <td className="px-4 py-2">${refund.amount}</td>
                      <td className="px-4 py-2">
  <span
    className={`px-3 py-1 rounded-full text-xs font-semibold
      ${refund.status === 'Approved' 
        ? 'bg-green-200 text-green-800 dark:bg-green-600 dark:text-white'
        : refund.status === 'Rejected' 
        ? 'bg-red-200 text-red-800 dark:bg-red-600 dark:text-white'
        : 'bg-yellow-200 text-yellow-800 dark:bg-yellow-600 dark:text-white'}
    `}
  >
    {refund.status}
  </span>
</td>

                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {showModal && selectedOrder && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-60 px-4">
            <div className="w-full max-w-4xl max-h-[90vh] p-6 shadow-lg relative overflow-y-auto rounded text-black bg-white dark:text-white dark:bg-[rgba(37,26,65,1)]">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-pink-500 dark:text-gray-300"
              >
                &times;
              </button>

              <h2 className="text-xl font-semibold mb-4">Request Refund</h2>

              <form className="space-y-4 text-sm" onSubmit={handleRefundSubmit}>
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Order ID</label>
                  <input
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                    type="text"
                    value={selectedOrder.orderId}
                    onChange={(e) =>
                      setSelectedOrder((prev) => ({ ...prev, orderId: e.target.value }))
                    }

                  />

                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Refund Amount</label>
                  <input
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                    type="number"
                    value={selectedOrder.charge}
                    onChange={(e) =>
                      setSelectedOrder((prev) => ({ ...prev, charge: e.target.value }))
                    }
                  />

                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Reason</label>
                  <textarea
                    rows="4"
                    value={reason}
                    onChange={(e) => setReason(e.target.value)}
                    placeholder="Write your reason for requesting refund..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded resize-none"
                  />
                </div>

                <div className="text-right">
                  <button
                    type="submit"
                    disabled={loading}
                    className={`px-16 py-2 mt-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full ${loading ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                  >
                    {loading ? 'Submitting...' : 'Submit Refund'}
                  </button>

                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Refunds;
