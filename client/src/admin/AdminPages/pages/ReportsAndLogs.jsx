import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation, NavLink } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import axiosInstance from '../../../axiosInstance';

const ReportsAndLogs = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activityData, setActivityData] = useState([]); // ✅ state for logs
  const [loading, setLoading] = useState(true);

  const tabs = [
    { name: 'Activity Logs', path: '/admin/report-logs' },
    { name: 'System Errors', path: '/admin/system-errors' },
    { name: 'Order Reports', path: '/admin/order-reports' },
    { name: 'Security Logs', path: '/admin/security-logs' },
  ];

  // ✅ Fetch logs from server
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const res = await axiosInstance.get('/admin/getActivityLogs'); // Adjust if endpoint is different
        setActivityData(res.data.logs || []);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Reports and Logs / Activity Logs</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Reports and Logs
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

        {/* Tab Navigation */}
        <div className="px-4 pt-4">
          <div className="flex space-x-8 text-sm font-medium relative">
            {tabs.map((tab) => (
              <NavLink
                key={tab.name}
                to={tab.path}
                className={({ isActive }) =>
                  `pb-2 relative ${
                    isActive
                      ? 'text-pink-500 font-medium'
                      : 'text-black dark:text-white hover:text-pink-400'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {tab.name}
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 h-1 w-full bg-pink-500 rounded-full" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
          <div className="border-b border-[#2e3650] mt-2"></div>
        </div>

        {/* Table Section */}
        <div className="p-4">
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between px-2 mt-4 mb-4">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Activity Logs</h1>
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
              <div className="text-center py-10 text-gray-500 dark:text-gray-400">Loading...</div>
            ) : (
              <table className="min-w-full text-left text-sm">
                <thead className="border-b border-gray-200 dark:border-gray-700 dark:bg-gray-900 text-gray-700 dark:text-gray-200 uppercase">
                  <tr>
                    <th className="px-4 py-3">#</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Actor</th>
                    <th className="px-4 py-3">Action</th>
                    <th className="px-4 py-3">Affected Item</th>
                    <th className="px-4 py-3">IP Address</th>
                    <th className="px-4 py-3">Date & Time</th>
                  </tr>
                </thead>
                <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                  {activityData.map((entry, i) => (
                    <tr key={entry._id || i}>
                      <td className="px-4 py-2">#0{i + 1}</td>
                      <td className="px-4 py-2">{entry.type || '—'}</td>
                      <td className="px-4 py-2">{entry.actor || entry.user?.name || '—'}</td>
                      <td className="px-4 py-2">{entry.action || entry.event}</td>
                      <td className="px-4 py-2">{entry.affectedItem || '—'}</td>
                      <td className="px-4 py-2">{entry.ipAddress || '—'}</td>
                      <td className="px-4 py-2">{entry.dateTime || entry.createdAt}</td>
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

export default ReportsAndLogs;
