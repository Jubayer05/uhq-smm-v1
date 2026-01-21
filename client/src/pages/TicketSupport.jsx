import React, { useState, useRef } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import Choose from '../images/Choose.svg'
import axios from 'axios';
import { toast } from 'react-toastify';

const TicketSupport = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [categoryname, setCategoryname] = useState('');
  const [servicename, setServicename] = useState('');
  const [orderId, setOrderId] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState('');
  const [loading, setLoading] = useState(false);


  const fileInputRef = useRef(null);

  const triggerFileInput = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setSelectedFileName(selected?.name || '');
  };

  const uploadToCloudinary = async () => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'unsigned_upload'); // replace with actual preset

    const response = await axios.post(
      'https://api.cloudinary.com/v1_1/dscbxlcva/image/upload',
      formData
    );

    return response.data.secure_url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryname || !servicename || !orderId || !description || !file) {
      toast.info('Please fill all fields and upload an image.');
      return;
    }

    try {
      setLoading(true);

      const imageUrl = await uploadToCloudinary();

      const token = localStorage.getItem('authToken');

      const payload = {
        categoryname,
        servicename,
        orderId,
        image: imageUrl,
        description,
      };

      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/addTicket`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Ticket submitted successfully!');
        setCategoryname('');
        setServicename('');
        setOrderId('');
        setDescription('');
        setFile(null);
        setSelectedFileName('');
        fileInputRef.current.value = null;
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.response?.data?.message || 'Failed to submit ticket');
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)] border-gray-200">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

       <main className="grow-0">
                 <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
                   <h1 className="text-gray-400 mb-1">Dashboard / Add Ticket</h1>
                   <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                     <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                       Add Ticket
                     </h1>
                     <Datepicker align="left" />
                   </div>
                 </div>
               </main>
        <main className="w-full px-6 max-w-7xl mx-auto">
          {/* Important Instructions Section */}
          <div className=" bg-gray-200 dark:bg-[#272345]  border border-gray-300 dark:border-[#ffffff] shadow-sm p-6 mb-10">
            <h1 className='text-2xl mb-4 '>Add Ticket</h1>
            <div className='py-6 px-4 bg-gray-100 rounded-md dark:bg-[rgba(29,27,45,1)]'>
              <h2 className="text-lg font-light text-gray-800 dark:text-white mb-4">READ BEFORE CREATE TICKET</h2>
              <hr className="border-gray-400 dark:border-gray-600 mb-4" />

              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">FOR ORDERS SUPPORT</h2>
              <p className="mb-3">Choose Category <strong>Orders</strong></p>
              <p className="mb-3">Subcategory - Speed Up, Refill, Cancel, Restart, Other</p>
              <p className="mb-3">Order ID - Put your order id which you have problem</p>
              <p className="mb-3">Message - Your message about order</p>

              <p className="mb-3"><strong>Example:</strong></p>
              <p className="mb-3">Subcategory - Speed up</p>
              <p className="mb-3">Order ID - 1234567</p>
              <p className="mb-3">Message - Your message about order</p>
              <p className="mb-3">For multiple orders, please separate order IDs using a comma</p>
              <p className="mb-3"><strong>Example:</strong> Order ID - 1234567,1234568,1234569</p>

              <h2 className="font-semibold text-gray-800 dark:text-gray-200 mb-3">FOR PAYMENTS SUPPORT</h2>
              <p className="mb-3">Choose Category <strong>Payments</strong></p>
              <p className="mb-3">On Subcategory Choose - Payment method which you have problem</p>
              <p className="mb-4">Send your payment details related to the issue</p>

              <h2 className="font-bold mt-6 text-left text-gray-900 dark:text-white mb-4">POPULAR QUESTIONS</h2>
              <hr className="border-gray-400 dark:border-gray-600 mb-4" />
              <ul className="list-disc space-y-2 mx-4 text-left text-gray-800 dark:text-gray-300">
                <li>
                  <strong>How Can I check service actual speed?</strong><br />
                  Check the average time, it's the last 10 completed orders' time for 1000 quantity.
                </li>
                <li>
                  <strong>What is Status Partial?</strong><br />
                  Partial status means your order was partially canceled, and money was partially refunded to your account.
                </li>
                <li>
                  <strong>Order canceled, my money refunded?</strong><br />
                  Yes, refunded orders can be checked here.
                </li>
              </ul>

            </div>
            <p className="text-red-600 mb-4 mt-8 font-semibold text-sm">
              FOR FAST SUPPORT PLEASE ALWAYS SEND YOUR ORDER ID ON MESSAGE
            </p>

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="category" className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                  Category
                </label>
                <input
                  type="text"
                  id="category"
                  name="category"
                  value={categoryname}
                  onChange={(e) => setCategoryname(e.target.value)}
                  style={{ border: '1px solid rgba(0, 0, 0, 0.3)' ,color:"gray"}}

                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 dark:bg-[var(--color-dark-violet)] dark:border-blue-950 dark:text-gray-300"
                />
              </div>

              <div>
                <label htmlFor="subcategory" className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                  Service
                </label>
                <input
                  style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color:"gray" }}
                  type="text"
                  id="subcategory"
                  name="subcategory"
                  value={servicename}
                  onChange={(e) => setServicename(e.target.value)}

                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300"
                />
              </div>

              <div>
                <label htmlFor="orderId" className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                  Order ID
                </label>
                <input
                  type="text"
                  id="orderId"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color:"gray" }}
                  name="orderId"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  placeholder="Enter Order ID"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400"
                />
              </div>
              <label className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                Attach Image (JPEG, JPG, PNG)
              </label>
              <div className='border py-4 border-dotted border-gray-400'>


                {/* Hidden file input */}
                <input
                  style={{ border: '1px solid rgba(0, 0, 0, 0.3)' }}
                  type="file"
                  id="imageUpload"
                  name="imageUpload"
                  accept=".jpeg,.jpg,.png"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <div>

                  {/* Image and "Choose Image" centered in a separate div */}
                  <div className="flex flex-col w-[200px] mx-auto dark:bg-[#19162f] rounded-4xl items-center justify-center">
                    <img
                      src={Choose}
                      alt="Choose illustration"
                      className="mb-2 mt-4 cursor-pointer p-4 w-28 h-28 object-contain"
                    />
                    <h1
                      onClick={triggerFileInput}
                      className="mb-2 cursor-pointer"
                    >
                      Choose Image
                    </h1>
                  </div>

                  {/* File name displayed below the div */}
                  <span className="block mt-2 text-gray-700 dark:text-gray-300 text-center">
                    {selectedFileName || 'No file chosen'}
                  </span>
                </div>
              </div>


              <div>
                <label htmlFor="message" className="block mb-1 font-medium text-gray-900 dark:text-gray-200">
                  Message
                </label>
                <textarea
                  id="description"
                  style={{ border: '1px solid rgba(0, 0, 0, 0.3)' ,color:"gray"}}
                  name="description"
                  rows="4"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Your message here"
                  className="w-full rounded-md border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700 placeholder-gray-500 dark:bg-gray-700 dark:border-gray-600 dark:text-gray-300 dark:placeholder-gray-400 resize-none"
                ></textarea>
              </div>

              <button
                type="submit"
                className="lg:w-md w-full py-2 border border-violet-600 rounded-4xl dark:gradient-border bg-violet-500 text-white dark:hover:text-white dark:hover:bg-violet-700 cursor-pointer transition"
              >
               {loading ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </form>
          </div>

        </main>
      </div>
    </div>
  );
};

export default TicketSupport;
