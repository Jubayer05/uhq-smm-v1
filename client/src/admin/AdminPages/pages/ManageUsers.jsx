import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Link, useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import Dummy from '../images/Dummy.jpg';
import Swal from 'sweetalert2';


import { toast } from 'react-toastify';
import axiosInstance from '../../../axiosInstance';

const ManageUsers = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {

      try {
        const res = await axiosInstance.get('/auth/getUsers');
        setUsers(res.data.users);
      } catch (err) {
        console.error('Error fetching users:', err.response?.data || err.message);
      }
    };

    fetchUsers();
  }, []);

  // ✅ DELETE user
  const handleDelete = async (userId) => {
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
      await axiosInstance.delete(`/admin/userdetail/delete/${userId}`);

      setUsers(users.filter((user) => user._id !== userId));
      toast.success('User deleted successfully!');

    } catch (err) {
      console.error('Error deleting user:', err.response?.data || err.message);
toast.error('Failed to delete user.');

    }
  };

  // ✅ UPDATE user status
  const handleStatusUpdate = async (userId, newStatus) => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axiosInstance.put(
        `/admin/userdetail/update/${userId}/status`,
        { status: newStatus },
       
      );

      const updatedUsers = users.map((user) =>
        user._id === userId ? { ...user, status: newStatus } : user
      );
      setUsers(updatedUsers);
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
            <h1 className="text-gray-400 mb-1">Dashboard / Manage Users</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Manage Users
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
              style={{ paddingLeft: '40px', color:"gray" }}
              
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
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">User Details</h1>
              <button
                className="flex items-center dark:text-white px-4 py-2 rounded cursor-pointer transition text-md"
                onClick={() => toast.info('Export triggered')}
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
                  <th className="px-4 py-3">IMAGE</th>
                  <th className="px-4 py-3">NAME</th>
                  <th className="px-4 py-3">EMAIL</th>
                  <th className="px-4 py-3">BALANCE</th>
                  <th className="px-4 py-3">T.ORDERS</th>
                  <th className="px-4 py-3">STATUS</th>
                  <th className="px-4 py-3">ACTIONS</th>
                </tr>
              </thead>
            <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
  {users.map((user, i) => (
    <tr key={user._id}>
      <td className="px-4 py-2">#0{i + 1}</td>
      <td className="px-4 py-2">
        <img
          src={Dummy}
          alt="User"
          className="w-10 h-10 rounded-full object-cover"
        />
      </td>
      <td className="px-4 py-2">{user.name}</td>
      <td className="px-4 py-2">{user.email}</td>
      
      {/* ✅ Show balance (totalSpent) */}
      <td className="px-4 py-2">
        ${user.totalSpent?.toFixed(2) || 0}
      </td>
      
      {/* ✅ Show total orders */}
      <td className="px-4 py-2">
        {user.totalOrders || 0}
      </td>
      
      <td className="px-4 py-2">
        <select
          value={user.status}
          onChange={(e) => handleStatusUpdate(user._id, e.target.value)}
          className={`text-xs rounded px-6 py-1 border transition-colors duration-300
            ${user.status === 'Active'
              ? 'bg-green-200 text-green-800 border-green-400 dark:bg-green-900 dark:text-green-100 dark:border-green-600'
              : 'bg-yellow-200 text-yellow-800 border-yellow-400 dark:bg-yellow-600 dark:text-yellow-100 dark:border-yellow-600'
            }`}
        >
          <option value="Active">Active</option>
          <option value="Inactive">InActive</option>
        </select>
      </td>

      <td className="px-4 py-2 space-x-2">
        <Link to={`/admin/user-detail/${user._id}`}>
          <button
            title="View"
            className="text-blue-600 cursor-pointer hover:text-blue-800"
          >
            <i className="fas fa-eye"></i>
          </button>
        </Link>
        <button
          title="Toggle Status"
          className="text-green-600 cursor-pointer hover:text-green-800"
          onClick={() =>
            handleStatusUpdate(
              user._id,
              user.status === 'Active' ? 'InActive' : 'Active'
            )
          }
        >
          <i className="fas fa-edit"></i>
        </button>
        <button
          title="Delete"
          className="text-red-600 cursor-pointer hover:text-red-800"
          onClick={() => handleDelete(user._id)}
        >
          <i className="fas fa-trash-alt"></i>
        </button>
      </td>
    </tr>
  ))}
</tbody>

            </table>
            {users.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No users found.</p>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
