import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import axiosInstance from '../../../axiosInstance';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import 'react-toastify/dist/ReactToastify.css';

const BroadCastMessages = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    audience: '',
    users: ''
  });

  const [messages, setMessages] = useState([]);



  const fetchMessages = async () => {
    try {
      const res = await axiosInstance.get('/admin/getAllMessages');
      if (res.data.success) {
        setMessages(res.data.messages);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch messages');
    }
  };
  useEffect(() => {
    (async () => {
      await fetchMessages();
    })();
  }, []);

  const handleEditClick = (msg) => {
    setIsEdit(true);
    setEditId(msg._id);
    setFormData({
      title: msg.title,
      description: msg.description,
      audience: msg.audience,
      users: msg.users,
    });
    setShowModal(true);
  };



  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

const handleSendMessage = async () => {
  const { title, description, audience, users } = formData;

  if (!title || !description || !audience || !users) {
    toast.error('Please fill in all fields');
    return;
  }

  try {
    if (isEdit) {
      const res = await axiosInstance.put(`/admin/updateMessage/${editId}`, formData);
      if (res.data.success) {
        toast.success('Message updated successfully');
      } else {
        toast.error(res.data.message || 'Failed to update message');
      }
    } else {
      const res = await axiosInstance.post('/admin/addMessage', formData);
      if (res.data.success) {
        toast.success('Message sent successfully');
      } else {
        toast.error(res.data.message || 'Failed to send message');
      }
    }

    setShowModal(false);
    setFormData({ title: '', description: '', audience: '', users: '' });
    setIsEdit(false);
    setEditId(null);
    await fetchMessages();
  } catch (error) {
    console.error(error);
    toast.error('Something went wrong');
  }
};




  const handleDeleteMessage = async (id) => {
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
      const res = await axiosInstance.delete(`/admin/deleteMessage/${id}`);
      if (res.data.success) {
        setMessages((prev) => prev.filter((item) => item._id !== id));
        toast.success('Message deleted successfully');
      } else {
        toast.error(res.data.message || 'Failed to delete Message');
      }
    } catch (error) {
      console.error('Failed to delete Message:', error.message);
      toast.error('Error deleting Child Panel');
    }
  };



  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Broadcast Messages</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Broadcast Messages
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

        {/* Add New Message Button */}
        <div className="p-4 flex lg:justify-end justify-start items-center">
          <button
            onClick={() => {
    setFormData({ title: '', description: '', audience: '', users: '' }); // ✅ Clear form
    setIsEdit(false);  // ✅ Make sure it's not in edit mode
    setEditId(null);   // ✅ Clear the editId
    setShowModal(true); // ✅ Open modal
  }}
            className="px-9 py-3 cursor-pointer text-gray-900 dark:text-white border-gray-400 rounded-4xl transition flex items-center space-x-2 gradient-border-dark"
            style={{
              background: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%)',
              borderImage: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%) 1',
            }}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Message</span>
          </button>
        </div>

        {/* Table */}
        <div className="p-4">
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between px-2 mt-4 mb-4">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Broadcast Messages</h1>
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
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Audience</th>
                  <th className="px-4 py-3">Users</th>
                  <th className="px-4 py-3">Message</th>
                  <th className="px-4 py-3">Sent On</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {messages.map((msg, i) => (
                  <tr key={msg._id}>
                    <td className="px-4 py-2">#0{i + 1}</td>
                    <td className="px-4 py-2">{msg.title}</td>
                    <td className="px-4 py-2">{msg.audience}</td>
                    <td className="px-4 py-2">{msg.users}</td>
                    <td className="px-4 py-2">{msg.description}</td>
                    <td className="px-4 py-2">{new Date(msg.createdAt).toLocaleDateString()}</td>
                    <td className="px-4 py-2 flex items-center space-x-3">
                      <button className="text-green-500 hover:text-green-700" onClick={() => handleEditClick(msg)}>
                        <FiEdit className="w-4 h-4" />
                      </button>

                      <button className="text-red-500 hover:text-red-700" onClick={() => handleDeleteMessage(msg._id)}>
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-70 px-4">
            <div className="w-full max-w-4xl max-h-[90vh] p-6 shadow-lg relative overflow-y-auto rounded-lg text-black bg-white dark:text-white dark:bg-[rgba(37,26,65,1)]">

              <div className="flex justify-end">
                <button onClick={() => setShowModal(false)} className="text-3xl text-gray-600 hover:text-pink-500 dark:text-gray-300 transition">
                  &times;
                </button>
              </div>

              <h2 className="text-xl font-light mb-6 text-gray-800 dark:text-white">Add New Message</h2>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                   style={{border: '1px solid gray', color: 'gray'}}
                    onChange={handleChange}
                    placeholder="Enter title"
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Message</label>
                  <textarea
                    rows="4"
                    name="description"
                    value={formData.description}
                   style={{border: '1px solid gray', color: 'gray'}}
                    onChange={handleChange}
                    placeholder="Type your message..."
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Target Audience</label>
                  <select
                    name="audience"
                    value={formData.audience}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded"
                  >
                    <option value="">Select audience</option>
                    <option value="All">All Users</option>
                    <option value="Custom">Custom Roles</option>
                    <option value="Specific">Select Users</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Select Users</label>
                  <input
                    type="text"
                    name="users"
                    value={formData.users}
                    onChange={handleChange}
                   style={{border: '1px solid gray', color: 'gray'}}
                    placeholder="Usernames/emails (comma-separated)"
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] text-black dark:text-white border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
              </div>

              <div className="flex flex-col sm:flex-row justify-start gap-4 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="w-full sm:w-auto px-6 sm:px-28 py-2 bg-gray-200 dark:bg-[#2d2744] text-black dark:text-white rounded-4xl hover:bg-gray-300 dark:hover:bg-[#3c325a] transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendMessage}
                  className="w-full sm:w-auto px-6 sm:px-28 py-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-4xl hover:opacity-90 transition"
                >
                  Send
                </button>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BroadCastMessages;
