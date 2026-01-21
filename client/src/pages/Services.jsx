import React, { useEffect, useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import { FaHeart } from 'react-icons/fa';
import { MdFilterList } from 'react-icons/md';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Services = () => {
  const [search, setSearch] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [services, setServices] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDescription, setSelectedDescription] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/getAllServices`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const mappedServices = res.data.services.map((service, index) => ({
          id: index + 1,
          name: service.name,
          rate: `$${(service.amount / 1000).toFixed(2)}`,
          minOrder: service.min,
          maxOrder: service.max,
          avgTime: 'Not enough data',
          category: service.categoryId?.name || 'Uncategorized',
          categoryDescription: service.categoryId?.description || '',
        }));

        setServices(mappedServices);
      } catch (err) {
        console.error('Error fetching services:', err.response?.data || err.message);
      }
    };

    fetchServices();
  }, []);

  const filteredServices = services.filter((service) => {
    const matchesSearch = service.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const uniqueCategories = [...new Set(services.map((s) => s.category))];

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)] border-gray-200 dark:border-blue-700">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Services</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Services
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="p-4 mt-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div className="relative w-full sm:max-w-md text-black bg-white border border-gray-300 dark:bg-[rgba(37,33,57,1)]">
            <input
              type="search"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full dark:text-gray-100 px-4 py-2"
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

          <Link to="/vendor/add-service" className="w-full sm:w-auto">
            <button
              className="w-full sm:w-auto px-9 py-3 border cursor-pointer text-gray-600 dark:text-white border-gray-400 rounded-4xl transition flex items-center justify-center space-x-2 gradient-border-dark"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              <span>Add Services</span>
            </button>
          </Link>
        </div>

        <div className="p-4">
          <div className="bg-white dark:bg-[rgba(37,33,57,1)] dark:border border-gray-200 dark:border-[#FFF] shadow-md overflow-x-auto">
            <h1 className="text-2xl p-6 mt-2 font-light">Services</h1>

            <div className="flex gap-4 p-4 ml-2 mb-4">
              <div className="relative w-48 text-gray-300">
                <MdFilterList className="absolute left-2 top-1/2 transform -translate-y-2 pointer-events-none text-gray-300" />
                <select
                  className="w-full appearance-none bg-transparent dark:bg-[rgba(37,33,57,1)] border border-gray-500 pl-8 pr-3 py-2 rounded-sm focus:outline-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {uniqueCategories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <button className="w-40 flex items-center justify-center gap-2 border border-gray-500 px-3 py-2 rounded-sm text-gray-300 text-base">
                <FaHeart />
                <span>Favourites</span>
              </button>
            </div>

            <hr className="border-t border-gray-300 dark:border-gray-600"></hr>
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-gray-200 dark:bg-[rgba(37,33,57,1)] text-gray-700 dark:text-gray-200 font-semibold">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Services</th>
                  <th className="px-4 py-3">Rate per 1000</th>
                  <th className="px-4 py-3">Min order</th>
                  <th className="px-4 py-3">Max order</th>
                  <th className="px-4 py-3">Average time ❗</th>
                  <th className="px-4 py-3">Description</th>
                  <th className="px-4 py-3 text-center">Order</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.length === 0 ? (
                  <tr>
                    <td className="px-4 py-6 text-center text-gray-500" colSpan={8}>
                      No services found.
                    </td>
                  </tr>
                ) : (
                  filteredServices.map((service, idx) => (
                    <React.Fragment key={service.id}>
                      {(idx === 0 || service.category !== filteredServices[idx - 1]?.category) && (
                        <tr className="bg-violet-600 text-white font-bold">
                          <td colSpan={8} className="py-2 px-72">
                            {service.category}
                            <span className="bg-white text-violet-600 text-xs px-1 rounded ml-2">NEW</span>
                          </td>
                        </tr>
                      )}
                      <tr
                        className={`${idx % 2 === 0
                          ? 'bg-violet-100 dark:bg-gray-900'
                          : 'bg-white dark:bg-[rgba(37,33,57,1)] border-gray-200'
                          } text-gray-900 dark:text-gray-100`}
                      >
                        <td className="px-4 py-3">
                          <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-violet-600 text-white font-semibold">
                            {service.id}
                          </div>
                        </td>
                        <td className="px-4 py-3 flex items-center gap-2">
                          <button className="text-violet-600 hover:text-violet-900 dark:text-violet-400 dark:hover:text-violet-200" aria-label="Add to favorites">
                            ☆
                          </button>
                          {service.name}
                        </td>
                        <td className="px-4 py-3">{service.rate}</td>
                        <td className="px-4 py-3">{service.minOrder}</td>
                        <td className="px-4 py-3">{service.maxOrder}</td>
                        <td className="px-4 py-3 whitespace-pre-line">{service.avgTime}</td>
                        <td className="px-4 py-3">
                          <button
                            className="mt-2 bg-violet-600 hover:bg-violet-700 text-white px-4 py-2 rounded-lg font-semibold"
                            onClick={() => {
                              setSelectedDescription(service.categoryDescription || 'No description available.');
                              setIsModalOpen(true);
                            }}
                          >
                            Details
                          </button>

                        </td>
                        <td className="px-4 py-3 text-center">
                          <button className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-full">
                            🛒
                          </button>
                        </td>
                      </tr>
                    </React.Fragment>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {isModalOpen && (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-opacity-50">
    <div className="bg-white dark:bg-[rgba(37,33,57,1)] p-6 border dark:border-gray-100 max-w-sm lg:max-w-4xl h-[50vh] lg:h-[80vh] w-full text-gray-800 dark:text-gray-100 relative">
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-4 cursor-pointer text-gray-600 dark:text-gray-300 hover:text-red-500"
      >
        ✕
      </button>
      <h2 className="text-xl font-semibold mb-4">Service Description</h2>
      <pre className="whitespace-pre-wrap text-sm">{selectedDescription}</pre>
    </div>
  </div>
)}

    </div>
  );
};

export default Services;
