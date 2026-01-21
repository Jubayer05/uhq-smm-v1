import React, { useState, useEffect, useRef } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import Choose from '../images/Choose.svg'
import { FaEdit, FaTrash } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import axios from 'axios';
import axiosInstance from '../../../axiosInstance';

const ServiceAndCategories = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [services, setServices] = useState([]);
  const [categories, setCategories] = useState([])
  const [serviceData, setServiceData] = useState({
    name: '',
    amount: '',
    min: '',
    max: '',
    type: 'Default',
    status: '',
    categoryId: ''

  });
  const [editId, setEditId] = useState(null);
  
  const [selectedFileName, setSelectedFileName] = useState('');


  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) return;

    fetchServices();
    fetchCategories(); // fetch categories on mount
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/getAllCategories');
      setCategories(response.data.categories); // Assuming API returns categories array
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error("Error fetching categories");
    }
    finally {
        setLoading(false);
      }
  };


  const fetchServices = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/admin/getAllServices');
      setServices(response.data.services);
    } catch (error) {
      console.error('Error fetching services:', error);
      toast.error("Error fetching services")
    }
    finally {
        setLoading(false);
      }
    
  };


  const handleChange = (e) => {
    setServiceData({ ...serviceData, [e.target.name]: e.target.value });
  };

  const handleModalSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');
      const url = editId
        ? `/admin/updateService/${editId}`
        : '/admin/addService';

      const method = editId ? 'put' : 'post';

      const response = await axiosInstance({
        method,
        url,
        data: serviceData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("Submitting serviceData:", serviceData)

      if (response.data.success) {
        if (editId) {
          toast.success('Service Updated successfully!');
          setServices((prev) =>
            prev.map((item) => (item._id === editId ? response.data.service : item))
          );
        } else {
          toast.success('Service Added successfully!');
          setServices((prev) => [...prev, response.data.service]);
        }
        setIsModalOpen(false);
        setServiceData({ name: '', amount: '', min: '', max: '', type: 'Default', status: '', categoryId: '' });
        setEditId(null);
      } else {
        toast.error(response.data.message || 'Failed to add service');

      }
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong!');
    }
  };

  const handleEdit = (service) => {
    setEditId(service._id);
    setServiceData(service);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
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
    {
      try {
        const token = localStorage.getItem('authToken');
        await axiosInstance.delete(`/admin/deleteService/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchServices();
        toast.success('Service Deleted Successfully')
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Error deleting service');

      }
    }
  };

  const triggerFileInput = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setSelectedFileName(selected?.name || '');
  };


  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload');// replace with your upload preset

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dscbxlcva/image/upload', // replace with your cloud name
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName || !description || !file) {
      toast.info('Please fill all fields and upload an image.');
      return;
    }

    try {
      setLoading(true);

      // Step 1: Upload image to Cloudinary
      const imageUrl = await uploadToCloudinary();

      // Step 2: Send category data to your backend
      const payload = {
        name: categoryName,
        description,
        status,
        image: imageUrl, // use Cloudinary URL
      };

      const token = localStorage.getItem('authToken');

      const response = await axiosInstance.post(
        '/admin/addCategory',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 && response.data.category._id) {
        toast.success('Category added successfully!');


        setServiceData((prev) => ({
          ...prev,
          category: response.data.category._id,
        }));
        setCategoryName('');
        setDescription('');
        setStatus('active');
        setFile(null);
        setSelectedFileName('');
        setIsCategoryModalOpen(false);
      }
    } catch (err) {
      console.error('Error:', err);
      toast.error('Failed to add category.');
    } finally {
      setLoading(false);
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
              Dashboard / Services & Categories
            </h1>

            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-white font-extralight mb-4 sm:mb-0">
                Services & Categories
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

        <div className="p-4 mt-2 flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
          {/* Category Select */}
          <div className="relative w-full md:w-48 dark:text-gray-100">
            <select className="w-full appearance-none bg-transparent border dark:bg-gray-900 border-gray-500 pl-8 pr-3 py-2 rounded-sm focus:outline-none">
              <option>All Categories</option>
              <option>Instagram</option>
              <option>YouTube</option>
              <option>Facebook</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0 w-full md:w-auto">
            <button
              onClick={() => {
                setEditId(null);
                setServiceData({ name: '', amount: '', min: '', max: '', type: 'Default', status: 'active' });
                setIsModalOpen(true);
              }}
              className="w-full sm:w-auto px-6 py-2 border cursor-pointer text-gray-700 dark:text-white border-gray-400 rounded-4xl flex items-center justify-center space-x-2 gradient-border-dark"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Services</span>
            </button>

            <button
              className="w-full sm:w-auto px-6 py-2 cursor-pointer text-gray-900 dark:text-white border-gray-600 rounded-4xl flex items-center justify-center space-x-2"
              style={{
                background: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%)',
                borderImage: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%) 1',
              }}
              onClick={() => setIsCategoryModalOpen(true)}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Categories</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="p-4">
          <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-700 p-4 shadow-md overflow-x-auto">
            {loading ? (
              <div className="text-center py-6 text-gray-600 dark:text-gray-300">Loading Services...</div>
            ) : (
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:bg-gray-900 dark:border-gray-700 text-gray-700 dark:text-gray-200 uppercase">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Service Name</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Min - Max</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                {services.map((service, index) => (
                  <tr key={service._id}>
                    <td className="px-4 py-2">#0{index + 1}</td>
                    <td className="px-4 py-2">{service.name}</td>
                    <td className="px-4 py-2">${service.amount}</td>
                    <td className="px-4 py-2">{service.min} - {service.max}</td>
                    <td className="px-4 py-2">{service.type}</td>
                    <td className="px-4 py-2">{service.status}</td>
                    <td className="px-4 py-2 flex space-x-2">
                      <button onClick={() => handleEdit(service)} className="text-blue-500">
                        <FaEdit />
                      </button>
                      <button onClick={() => handleDelete(service._id)} className="text-red-500">
                        <FaTrash />
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
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-70 px-4">
          <div className="w-full max-w-4xl max-h-[90vh] p-6 shadow-lg relative overflow-y-auto rounded text-black dark:text-white bg-white dark:bg-[rgba(37,26,65,1)]">
            {/* Close Button */}
            <button
              onClick={() => {
                setIsModalOpen(false);
                setServiceData({ name: '', amount: '', min: '', max: '', type: 'Default', status: 'active' });
                setEditId(null);
              }}
              className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-pink-500 dark:text-gray-300"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">{editId ? 'Edit' : 'Add'} Service</h2>

            <form
              className="space-y-4 text-sm"
              onSubmit={handleModalSubmit}
            >
              {/* Service Name */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Service Name</label>
                <input
                  type="text"
                  value={serviceData.name}
                   style={{border: '1px solid gray', color:'gray'}}
                  onChange={(e) => setServiceData({ ...serviceData, name: e.target.value })}
                  placeholder="Service Name"
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Category Name</label>
                <select
                
                  value={serviceData.categoryId}
                  onChange={(e) => setServiceData({ ...serviceData, categoryId: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border dark:border-gray-600 rounded"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))}
                </select>

              </div>
              {/* Type */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Type</label>
                <select
                  value={serviceData.type}
                  onChange={(e) => setServiceData({ ...serviceData, type: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                >
                  <option value="Default">Default</option>
                  <option value="DripFeed">DripFeed</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Status</label>
                <select
                  value={serviceData.status}
                  onChange={(e) => setServiceData({ ...serviceData, status: e.target.value })}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              {/* Amount */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Amount</label>
                <input
                  type="number"
                  value={serviceData.amount}
                   style={{border: '1px solid gray', color: 'gray'}}
                  onChange={(e) => setServiceData({ ...serviceData, amount: e.target.value })}
                  placeholder="Amount"
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                />
              </div>

              {/* Min Quantity */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Min. Quantity</label>
                <input
                  type="number"
                  value={serviceData.min}
                   style={{border: '1px solid gray', color: 'gray'}}
                  onChange={(e) => setServiceData({ ...serviceData, min: e.target.value })}
                  placeholder="Min. Quantity"
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                />
              </div>

              {/* Max Quantity */}
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Max. Quantity</label>
                <input
                  type="number"
                  value={serviceData.max}
                   style={{border: '1px solid gray', color: 'gray'}}
                  onChange={(e) => setServiceData({ ...serviceData, max: e.target.value })}
                  placeholder="Max. Quantity"
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                />
              </div>

              {/* Submit Button */}
              <div className="text-left">
                <button
                  type="submit"
                  className="px-28 py-2 mt-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}


      {/* Add Category Modal */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 z-30 flex items-center justify-center bg-opacity-70 px-4">
          <div className="w-full max-w-4xl max-h-[90vh] p-6 shadow-lg relative overflow-y-auto rounded text-black bg-white dark:text-white dark:bg-[rgba(37,26,65,1)]">
            <button
              onClick={() => setIsCategoryModalOpen(false)}
              className="absolute top-4 right-4 text-3xl text-gray-600 hover:text-pink-500 dark:text-gray-300"
            >
              &times;
            </button>

            <h2 className="text-xl font-semibold mb-4">Add New Category</h2>

            <form className="space-y-4 text-sm" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Category Name</label>
                <input
                  type="text"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                   style={{border: '1px solid gray', color: 'gray'}}
                  placeholder="Enter category name"
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-100 dark:border-gray-600 rounded"
                />
              </div>

              <div>
                <label className="block mb-1 font-medium text-gray-900 dark:text-gray-300">
                  Upload Icon (JPEG, JPG, PNG)
                </label>
                <div className="border border-dashed border-gray-400 py-4 rounded dark:border-gray-600">
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept=".jpeg,.jpg,.png"
                    onChange={handleFileChange}
                  />
                  <div
                    className="flex flex-col w-[200px] mx-auto items-center justify-center bg-gray-50 dark:bg-[#19162f] rounded-4xl cursor-pointer"
                    onClick={triggerFileInput}
                  >
                    <img
                      src={Choose}
                      alt="Choose illustration"
                      className="mb-2 mt-4 p-4 w-20 h-20 object-contain"
                    />
                    <h1 className="mb-2 text-center">Choose Image</h1>
                  </div>
                  <span className="block mt-2 text-center text-gray-700 dark:text-gray-300">
                    {selectedFileName || 'No file chosen'}
                  </span>
                </div>
              </div>

              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="block mb-1 text-gray-700 dark:text-gray-300">Description</label>
                <textarea
                  rows="4"
                  value={description}
                   style={{border: '1px solid gray', color: 'gray'}}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Instagram services like followers..."
                  className="w-full px-4 py-2 bg-gray-100 dark:bg-[#271F44] border border-gray-300 dark:border-gray-600 rounded resize-none"
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="px-28 py-2 mt-2 bg-gradient-to-r from-purple-600 to-pink-500 text-white rounded-full"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}



    </div>



  );
};

export default ServiceAndCategories;
