import React, { useState, useEffect } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import { Mail, RotateCw, Link, Percent, HandCoins, MousePointerClick, UserPlus, Users, DollarSign, PiggyBank } from 'lucide-react';
import Datepicker from '../components/Datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../axiosInstance';


const Affiliate = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [referralLink, setReferralLink] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [address, setAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [affiliateData, setAffiliateData] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('Processing')



  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          setUser(res.data.user);
          setReferralLink(`https://yourapp.com/referral?code=${res.data.user.referralCode}`);
        } else {
          toast.error(res.data.message || "Failed to fetch user");
        }
      } catch (err) {
        console.error(err);
        toast.error("Something went wrong while fetching user info");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);


  const handleAffiliateSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('authToken');

      const response = await axios.post(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/addAffiliate`, {
        referralLink,
        referralCode: user?.referralCode || '',
        referrals: user?.referrals || 0,
        totalEarned: user?.totalEarned || 0,
        commission: user?.commission || 0,
        currency,
        address,
        status,
        totalAmount: amount,
        description: message,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.data.success) {
        toast.success('Affiliate Submitted successfully!');
        setAddress('');
        setAmount('');
        setMessage('');
        fetchAffiliates();
      } else {
        toast.error('❌ Failed to create affiliate: ' + response.data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error('❌ Error creating affiliate');
    }
  };

 useEffect(() => {
 const fetchAffiliates = async () => {
  try {
    const token = localStorage.getItem('authToken');
    const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/getAllAffiliates`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.data.success && res.data.affiliates) {
      setAffiliateData(res.data.affiliates); // ✅ set all affiliate records
    } else {
      setAffiliateData([]);
    }
  } catch (error) {
    console.error('Failed to fetch affiliate:', error.message);
    setAffiliateData([]);
  } finally {
    setLoading(false);
  }
};

  // Call once on mount
  fetchAffiliates();

  // Set interval to auto-refresh every 10 seconds
  const interval = setInterval(fetchAffiliates, 10000);

  // Cleanup on unmount
  return () => clearInterval(interval);
}, []);

   
 


  if (loading) {
    // return <p className="text-center mt-10 text-gray-600">Loading affiliate info...</p>;
  }

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)] border-gray-200">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Affiliates</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                Affiliates
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="space-y-10 px-4 lg:px-4 py-2">
          <div className="gap-6">
            <div className="bg-white dark:bg-[rgba(37,33,57,1)] border-gray-200 dark:border shadow-md p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="bg-violet-100 p-3 rounded-lg">
                  <Link className="text-violet-600 w-5 h-5" />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Referral link</h2>
              </div>

              <input
                type="text"
                value={referralLink}
                style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color: "gray" }}
                onChange={(e) => setReferralLink(e.target.value)}

                className="w-full rounded-md bg-gray-100 dark:bg-gray-700 px-4 py-2 text-gray-800 dark:text-white"
              />

              <div className="flex items-center gap-4 mt-4">
                <div className="bg-violet-100 p-2 rounded-lg">
                  <Percent className="text-violet-600 w-5 h-5" />
                </div>
                <span className="text-gray-700 dark:text-white">Commission rate</span>
                <span className="ml-auto font-semibold text-gray-900 dark:text-white">{user?.commission ? `${user.commission}%` : '10%'}</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-violet-100 p-2 rounded-lg">
                  <HandCoins className="text-violet-600 w-5 h-5" />
                </div>
                <span className="text-gray-700 dark:text-white">Minimum payout</span>
                <span className="ml-auto font-semibold text-gray-900 dark:text-white">10%</span>
              </div>

              <button onClick={() => {
                navigator.clipboard.writeText(referralLink);
                toast.success('Your affiliate link is copied share and earn money.');
              }} className="lg:w-md w-full mt-6 py-2 border border-violet-600 text-violet-600 rounded-4xl dark:gradient-border hover:bg-violet-500 hover:text-white dark:hover:text-white dark:hover:bg-violet-700 cursor-pointer transition">
                Copy Link
              </button>

              <hr className="border-gray-300 dark:border-gray-600 mb-4" />

              {/* Statistics */}
              <div className="bg-white dark:bg-[var(--color-dark-gray)] border-gray-200">
                <div className="flex items-center gap-4 mb-8">
                  <div className="bg-violet-100 p-3 rounded-lg">
                    <Link className="text-violet-600 w-5 h-5" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Affiliates Statistics</h2>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-700 dark:text-gray-200">
                  <div className="flex items-center gap-3"><MousePointerClick className="text-violet-600 w-5 h-5" /> <span>Visits</span></div>
                  <div className="flex items-center gap-3"><UserPlus className="text-violet-600 w-5 h-5" /> <span>Registrations</span></div>
                  <div className="flex items-center gap-3"><HandCoins className="text-violet-600 w-5 h-5" /> <span>Referrals</span> <span className="ml-auto font-bold">{user?.referrals || 0}</span></div>
                  <div className="flex items-center gap-3"><Users className="text-violet-600 w-5 h-5" /> <span>Conversion rate</span> <span className="ml-auto font-bold">0</span></div>
                  <div className="flex items-center gap-3"><DollarSign className="text-violet-600 w-5 h-5" /> <span>Total earnings</span> <span className="ml-auto font-bold">{user?.totalEarned || 0}</span></div>
                  <div className="flex items-center gap-3"><PiggyBank className="text-violet-600 w-5 h-5" /> <span>Available earnings</span> <span className="ml-auto font-bold">0</span></div>
                </div>
              </div>

              <hr className="border-gray-300 dark:border-gray-600 mb-4" />

              {/* Withdraw Form */}
              <div className="w-full">
                <div className="bg-white dark:bg-[var(--color-dark-gray)]">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="bg-violet-100 p-3 rounded-lg">
                      <Mail className="text-violet-600 w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Withdraw Your Funds</h2>
                  </div>

                  <form className="space-y-6" onSubmit={handleAffiliateSubmit}>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Select Option</label>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full rounded-md bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-800 dark:text-white"
                      >
                        <option value="USD">USD</option>
                        <option value="LTD">LTD</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Address</label>
                      <input
                        type="text"
                        placeholder="Enter your address"
                        style={{ border: '1px solid rgba(0, 0, 0, 0.3)' }}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full rounded-md bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Amount</label>
                      <input
                        type="number"
                        placeholder="Enter withdrawal amount"
                        style={{ border: '1px solid rgba(0, 0, 0, 0.3)' }}
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="w-full rounded-md bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-800 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your Message</label>
                      <textarea
                        rows={3}
                        placeholder="Write your message"
                        style={{ border: '1px solid rgba(0, 0, 0, 0.3)' }}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full rounded-md bg-gray-50 dark:bg-gray-700 px-4 py-2 text-gray-800 dark:text-white"
                      />
                    </div>

                    <button type="submit" className="lg:w-md w-full mb-6 py-2 border border-violet-600 text-violet-600 rounded-4xl dark:gradient-border hover:bg-violet-500 hover:text-white dark:hover:bg-violet-700 transition">
                      Submit
                    </button>
                  </form>
                </div>

                <hr className="border-gray-300 dark:border-gray-600 mb-4" />

                <div className="bg-white dark:bg-[var(--color-dark-gray)] border-gray-200 space-y-4">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-violet-100 p-3 rounded-lg">
                      <RotateCw className="text-violet-600 w-6 h-6" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">Withdrawal Requests</h2>
                  </div>
                  {affiliateData.length === 0 ? (
                    <div className="bg-cyan-100 text-cyan-900 px-6 py-4 rounded-md shadow-sm dark:bg-cyan-200 dark:text-cyan-950">
                      No withdrawal requests found.
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="min-w-full bg-white dark:bg-[rgba(37,33,57,1)] rounded-md">
                        <thead>
                          <tr className="bg-gray-100 dark:bg-[rgba(37,33,57,1)] text-gray-700 dark:text-gray-300 text-left">
                            <th className="py-2 px-4">ID</th>
                            <th className="py-2 px-4">Date & Time</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Currency</th>
                            <th className="py-2 px-4">Address</th>
                            <th className="py-2 px-4">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {affiliateData.map((item, index) => (
                            <tr key={item._id} className="border-t dark:bg-[rgba(37,33,57,1)] text-gray-800 dark:text-gray-100">
                              <td className="py-2 px-4">#0{index + 1}</td>
                              <td className="py-2 px-4">{new Date(item.createdAt).toLocaleString()}</td>
                              <td className="py-2 px-4">{item.totalAmount}</td>
                              <td className="py-2 px-4">{item.currency}</td>
                              <td className="py-2 px-4">{item.address}</td>
                              <td className="py-2 px-4">
                                <span
                                  className={`px-3 py-1 rounded-md text-sm font-semibold
    ${item.status === 'Processing'
                                      ? 'bg-yellow-400 text-yellow-900'
                                      : 'bg-green-400 text-green-900'
                                    }`}
                                >
                                  {item.status}
                                </span>

                              </td>


                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Affiliate;
