import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { useLocation } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import axiosInstance from '../../../axiosInstance';
import { toast } from 'react-toastify';


const Providers = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [providers, setProviders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({
    providerName: '',
    apiUrl: '',
    apiKey: '',
    syncAutomatically: 'Yes',
    status: '',
  });



  const handleAddProvider = async () => {
  try {
    const response = await axiosInstance.post('/admin/addProvider', {
      name: form.providerName,
      apiurl: form.apiUrl,
      apikey: form.apiKey,
      balance: 1500,
      syncservices: form.syncAutomatically,
      status: form.status || 'Pending',
    });

    if (response.data.success) {
      toast.success('✅ Provider added successfully!');
      setShowModal(false);
      setForm({
        providerName: '',
        apiUrl: '',
        apiKey: '',
        syncAutomatically: 'Yes',
        status: '',
      });
    } else {
      toast.error('Failed to add provider: ' + response.data.message);
    }
  } catch (error) {
    console.error('Error adding provider:', error);
    toast.error('Something went wrong. Please try again.');
  }
};

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await axiosInstance.get('/admin/getAllProviders');
        if (response.data.success) {
          setProviders(response.data.data);
        } else {
          console.error('Failed to fetch providers:', response.data.message);
        }
      } catch (err) {
        console.error('Error fetching providers:', err);
      }
      finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

const updateProviderStatus = async (id, newStatus) => {
  try {
    const response = await axiosInstance.put(`/admin/updateProviderStatus/${id}`, {
      status: newStatus,
    });

    if (response.data.success) {
      const updatedProvider = response.data.provider;

      setProviders((prevProviders) =>
        prevProviders.map((provider) =>
          provider._id === id ? updatedProvider : provider
        )
      );
    } else {
      console.error('Failed to update status:', response.data.message);
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};



  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-600 dark:text-gray-400 mb-1">
              Dashboard / Providers
            </h1>

            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-white font-extralight mb-4 sm:mb-0">
                Providers
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

        <div className="p-4 flex lg:justify-end justify-start items-center">
          <button
            onClick={() => setShowModal(true)}
            className="px-9 py-3 cursor-pointer text-gray-900 dark:text-white border-gray-400 rounded-4xl transition flex items-center space-x-2 gradient-border-dark"
            style={{
              background: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%)',
              borderImage: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%) 1',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add New Provider</span>
          </button>
        </div>

        <div className="p-4">
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            <div className="flex items-center justify-between px-2 mt-4 mb-4">
              <h1 className="text-2xl text-gray-800 dark:text-gray-100">Providers</h1>
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

            {loading ? (
              <div className="text-center py-6 text-gray-600 dark:text-gray-300">Loading Providers...</div>
            ) : (

            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Provider Name</th>
                  <th className="px-4 py-3">API URL</th>
                  <th className="px-4 py-3">Balance</th>
                  <th className="px-4 py-3">Last Checked</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {providers.map((provider, index) => (
                  <tr key={provider._id}>
                    <td className="px-4 py-2">#0{(index + 1)}</td>
                    <td className="px-4 py-2">{provider.name}</td>
                    <td className="px-4 py-2">{provider.apiurl}</td>
                    <td className="px-4 py-2">${provider.balance}</td>
                    <td className="px-4 py-2">
                      {`${Math.floor(
                        (Date.now() - new Date(provider.createdAt).getTime()) / 60000
                      )} mins ago`}
                    </td>
                    <td className="px-4 py-2">
                      <select
                        value={provider.status}
                        onChange={(e) => updateProviderStatus(provider._id, e.target.value)}
                        className={`px-5 py-1 text-xs rounded border dark:bg-[#2d2744] border-gray-300 dark:border-gray-600 ${provider.status === 'Active'
                            ? 'bg-green-200 text-green-800 dark:bg-green-700 dark:text-green-100'
                            : provider.status === 'Pending'
                              ? 'bg-yellow-200 text-yellow-800 dark:bg-yellow-700 dark:text-yellow-100'
                              : 'bg-red-200 text-red-800 dark:bg-red-700 dark:text-red-100'
                          }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Pending">Pending</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>

                    <td className="px-4 py-2">
                      <button className="text-blue-500 hover:underline">View</button>
                    </td>
                  </tr>
                ))}

              </tbody>
            </table>
)}
          </div>
        </div>
            

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-30 mt-6 flex items-center justify-center bg-opacity-70 px-4">
            <div className="w-full max-w-4xl p-6 shadow-lg relative rounded-lg text-black bg-white dark:text-white dark:bg-[rgba(37,26,65,1)] max-h-[90vh] overflow-y-auto">
              <button onClick={() => setShowModal(false)} className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-pink-500 dark:text-gray-300 cursor-pointer transition">
                &times;
              </button>

              <h2 className="text-xl font-light mb-6 text-gray-800 dark:text-white">Add New Provider</h2>

              <div className="space-y-4 text-sm">
                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Provider Name</label>
                  <input
                    type="text"
                    value={form.providerName}
                   style={{border: '1px solid gray', color: 'gray'}}
                    onChange={(e) => setForm({ ...form, providerName: e.target.value })}
                    placeholder="e.g., AlphaProvider"
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">API URL</label>
                  <input
                    type="text"
                    value={form.apiUrl}
                    onChange={(e) => setForm({ ...form, apiUrl: e.target.value })}
                   style={{border: '1px solid gray', color: 'gray'}}
                    placeholder="https://api.example.com"
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">API Key</label>
                  <input
                    type="text"
                    value={form.apiKey}
                    onChange={(e) => setForm({ ...form, apiKey: e.target.value })}
                   style={{border: '1px solid gray', color: 'gray'}}

                    placeholder="Enter API key"
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Sync Services Automatically</label>
                  <select
                    value={form.syncAutomatically}
                   style={{border: '1px solid gray', color: 'gray'}}
                    onChange={(e) => setForm({ ...form, syncAutomatically: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] border border-gray-300 dark:border-gray-600 rounded"
                  >
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1 text-gray-700 dark:text-gray-300">Status</label>
                  <input
                    type="text"
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    placeholder="Active / Pending / Inactive"
                   style={{border: '1px solid gray', color: 'gray'}}
                    className="w-full px-4 py-2 bg-gray-100 dark:bg-[#2d2744] border border-gray-300 dark:border-gray-600 rounded"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-start">
                <button onClick={handleAddProvider} className="w-full sm:w-auto px-6 sm:px-28 py-2 text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-3xl cursor-pointer text-sm sm:text-base hover:opacity-90 transition">
                  Test Connection
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Providers;
