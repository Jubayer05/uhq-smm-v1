import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import { toast } from 'react-toastify';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';

function NewOrder() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isPriceAsc, setIsPriceAsc] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [link, setLink] = useState('');
  const [quantity, setQuantity] = useState(100);
  const [originalServices, setOriginalServices] = useState([]); // untouched original data
  const [charge, setCharge] = useState('')
  const [selectedService, setSelectedService] = useState('');
  const [allServices, setAllServices] = useState([]);
  const [notEnoughData, setNotEnoughData] = useState('')
  const [averageTime, setAverageTime] = useState(null);
const [selectedServiceId, setSelectedServiceId] = useState(null)

   useEffect(() => {
    fetchServices();
  }, []);

  
  const dropdownRef = useRef();

const togglePriceOrder = () => {
  const newSortOrder = !isPriceAsc;
  setIsPriceAsc(newSortOrder);

  const sorted = [...allServices].sort((a, b) => {
    return newSortOrder ? a.amount - b.amount : b.amount - a.amount;
  });

  setAllServices(sorted);

  // Update selected service if category is selected
  if (selectedCategory) {
    const filtered = sorted.filter(
      (service) =>
        service.status === 'active' &&
        service.categoryId._id === selectedCategory.value
    );

    if (filtered.length > 0) {
      setSelectedService(filtered[0]);
      const price = ((filtered[0].amount * quantity) / 1000) * 0.99;
      setCharge(price.toFixed(2));
    }
  }
};






  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/getAllCategories`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          const formatted = res.data.categories.map((cat) => ({
            value: cat._id,
            label: cat.name,
            image: cat.image,
            description: cat.description,
          }));

          setCategories(formatted);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();

    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


  const fetchServices = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/getAllServices`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success) {
        setAllServices(res.data.services);
        setOriginalServices(res.data.services); // save full list separately
      }
    } catch (error) {
      console.error('Error fetching services:', error);
    }
  };

  

  

  const handleSubmit = async () => {
    if (!selectedCategory || !selectedService || !link || !quantity || !charge) {
      toast.error('Please fill all fields.');
      return;
    }

    if (quantity < selectedService.min || quantity > selectedService.max) {
      toast.error(`Quantity must be between ${selectedService.min} and ${selectedService.max}`);
      return;
    }

    const orderBody = {
      categoryId: selectedCategory.value,
      serviceId: selectedService._id,
      link,
      quantity,
      charge: Number(charge),
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/newOrder`, orderBody, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.order) {
        toast.success('Order placed successfully!');
      } else {
        alert('Unexpected response, but order might be placed.');
      }
    } catch (error) {
      console.error('Order error:', error);
      toast.error(error.response?.data?.message || 'Failed to place order.');
    }
  };
 const fetchPopularServices = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/getAllServices`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success) {
      // Sort services based on soldCount descending (most popular first)
      const sortedByPopularity = [...res.data.services].sort((a, b) => b.soldCount - a.soldCount);

      setAllServices(sortedByPopularity);

      // Set the first service as default
      if (sortedByPopularity.length > 0) {
        const firstService = sortedByPopularity[0];
        setSelectedService(firstService);

        // You might want to update selectedCategory as well
        const matchingCategory = categories.find(cat => cat.value === firstService.categoryId._id);
        if (matchingCategory) setSelectedCategory(matchingCategory);

        const price = ((firstService.amount * quantity) / 1000) * 0.99;
        setCharge(price.toFixed(2));
      }
    }
  } catch (error) {
    console.error('Error fetching popular services:', error);
  }
};



const handleServiceSelect = async (serviceId) => {
  setSelectedServiceId(serviceId);

  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/vendor/average-time/${serviceId}`, {
       headers: {
        Authorization: `Bearer ${token}`,
      },
  });
    const { averageTime: avg, message } = res.data;

    if (avg) {
      setAverageTime(avg);
    } else {
      setAverageTime("Not Enough Data");
    }
  } catch (err) {
    setAverageTime("Not Enough Data");
    console.error("Failed to fetch avg time", err);
  }
};




  
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / New Order</h1>
            <div className="mb-4 flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight">
                New Order
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="m-4">
          <div className="flex flex-col bg-white dark:bg-[rgba(37,33,57,1)] p-4 space-y-4 border border-gray-200 dark:border-[#FFFFFF]">
            <h1 className="text-2xl dark:text-white text-black">New Order</h1>

            {/* Category Dropdown Custom */}
            <div>
              <label className="block mt-2 text-gray-700 dark:text-gray-100 font-semibold mb-2">Category</label>
              <div ref={dropdownRef} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="w-full px-4 py-2 flex items-center justify-between border rounded-md bg-gray-50 border-gray-700 dark:border-gray-100 dark:bg-gray-900 text-black dark:text-gray-100"
                >
                  {selectedCategory ? (
                    <div className="flex items-center space-x-2">
                      <img src={selectedCategory.image} alt="" className="w-6 h-6 rounded-full" />
                      <span>{selectedCategory.label}</span>
                    </div>
                  ) : (
                    <span className="dark:text-gray-100 text-gray-900">Favourite Services</span>
                  )}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {dropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full max-h-60 border dark:border-gray-600 border-gray-700 overflow-y-auto rounded-md bg-white dark:bg-gray-900 shadow-lg">
                    {categories.map((cat) => (
                      <div
                        key={cat.value}
                        onClick={() => {
  setSelectedCategory(cat);
  setDropdownOpen(false);

  // Use original full list, not filtered or popular list
  const categoryServices = originalServices.filter(
    (service) =>
      service.status === 'active' &&
      service.categoryId._id === cat.value
  );

  setAllServices(originalServices); // restore full list
  if (categoryServices.length > 0) {
    const firstService = categoryServices[0];
    setSelectedService(firstService);
    const price = ((firstService.amount * quantity) / 1000) * 0.99;
    setCharge(price.toFixed(2));
  } else {
    setSelectedService('');
  }
}}

                        className="flex items-center border border-gray-200 space-x-2 px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      >
                        <img src={cat.image} alt={cat.label} className="w-6 h-6 rounded-full" />
                        <span className="text-sm text-gray-800 dark:text-gray-200">{cat.label}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-2 mt-1 ml-1">
              <button onClick={fetchPopularServices} className="px-4 py-2 cursor-pointer bg-gray-200 dark:bg-[rgba(37,33,57,1)] border dark:border-gray-100 rounded  text-sm font-medium">
                By Popular
              </button>

              <button
                className="px-4 py-2 bg-gray-200 rounded cursor-pointer dark:bg-[rgba(37,33,57,1)] border dark:border-gray-100 text-sm font-medium flex items-center gap-2"
                onClick={togglePriceOrder}
              >
                By Price
                <span className="mt-0.5">
                  {isPriceAsc ? <FaArrowUp size={16} /> : <FaArrowDown size={16} />}
                </span>
              </button>
            </div>

            {/* Service Dropdown */}
            <div>
              <label className="block text-gray-700 dark:text-gray-100 font-semibold mb-2">Service</label>

              {selectedCategory &&
                allServices.some(
                  (service) =>
                    service.status === 'active' &&
                    service.categoryId._id === selectedCategory.value
                ) ? (
                <select
                  value={selectedService?._id || ''}
                  onChange={(e) => {
                    const selected = allServices.find(s => s._id === e.target.value);
                    setSelectedService(selected);

                    if (selected) {
                      // ✅ Save to localStorage on every selection
                      localStorage.setItem('selectedService', JSON.stringify(selected));

                      const price = ((selected.amount * quantity) / 1000) * 0.99;
                      setCharge(price.toFixed(2));

                      handleServiceSelect(selected._id);
                    }
                  }}

                  className="w-full rounded-md border border-gray-900 dark:border-gray-100 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-100"
                >
                  {allServices
                    .filter(service =>
                      service.status === 'active' &&
                      service.categoryId._id === selectedCategory?.value
                    )
                    .map(service => (
                      <option key={service._id} value={service._id}>
                        {service.name}
                      </option>
                    ))}
                </select>

              ) : (
                <div className="w-full rounded-md border border-gray-100 px-4 py-2 bg-gray-50 dark:bg-gray-900 text-gray-400 dark:text-gray-100">
                  Service not found in this category
                </div>
              )}
            </div>




            {/* Category Description Box */}
            {selectedCategory?.description && (
              <>
                <label className="text-gray-700  dark:text-gray-100 font-semibold mb-1">Description</label>
                <div className="p-3 mt-2 border border-gray-700 rounded bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-300 text-sm whitespace-pre-line">
                  {selectedCategory.description}
                </div>
              </>
            )}


            <div>
              <label className="block text-gray-700  dark:text-gray-100 font-semibold mb-1">Average Time</label>
              <input
                type="text"
                value={averageTime || 'Not Enough Time'}
                disabled
                placeholder="Not Enough Data"
                className="w-full px-4 py-2 rounded-md border  bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                style={{ border: "1px solid black", color: 'gray' }}
              />
            </div>


            {/* Link Input */}
            <div>
              <label className="block text-gray-700  dark:text-gray-100 font-semibold mb-1">Link</label>
              <input
                type="text"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Enter order link"
                className="w-full px-4 py-2 rounded-md border  bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                style={{ border: "1px solid black", color: 'gray' }}
              />
            </div>

            {/* Quantity Input */}
            <div>
              <label className="block text-gray-700 dark:text-gray-100 font-semibold mb-1">Quantity</label>
              <input
                type="number"
                min={10}
                max={1000000}
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                style={{ border: "1px solid black", color: 'gray' }}
              />
            </div>

            {selectedService && (
              <label className="block text-gray-700 dark:text-gray-100 font-semibold mb-1">
                Min: {selectedService.min} - Max: {selectedService.max}
              </label>
            )}

            <div>
              <label className="block text-gray-700 dark:text-gray-100 font-semibold mb-1">Charge ( Your your rank based discount has been applied - 1% )</label>
              <input
                type="number"
                min={10}
                max={1000000}
                value={charge}
                onChange={(e) => setCharge(Number(e.target.value))}
                className="w-full px-4 py-2 rounded-md border bg-gray-50 dark:bg-gray-800 text-black dark:text-white"
                style={{ border: "1px solid black", color: 'gray' }}
              />
            </div>

            <button
              onClick={handleSubmit}
              className="mt-4 py-2 max-w-md cursor-pointer px-6 border border-violet-600 rounded-4xl bg-violet-600 text-white transition"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewOrder;
