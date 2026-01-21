import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';

import { FaGlobeAmericas, FaCoins, FaUsers, FaLock } from 'react-icons/fa';


const steps = [
    {
        step: 'Step 1',
        text: ['Enter Your', 'Domain'],
        icon: <FaGlobeAmericas className="w-10 h-10 text-violet-600" />,
    },
    {
        step: 'Step 2',
        text: ['Select Your', 'Website', 'Currency'],
        icon: <FaCoins className="w-10 h-10 text-violet-600" />,
    },
    {
        step: 'Step 3',
        text: ['Enter your', 'username'],
        icon: <FaUsers className="w-10 h-10 text-violet-600" />,
    },
    {
        step: 'Step 4',
        text: ['Enter Your', 'Password'],
        icon: <FaLock className="w-10 h-10 text-violet-600" />,
    },
];



const ChildPanel = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [domain, setDomain] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const [currency, setCurrency] = useState('USD');
    const price = 25;

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
        toast.error("Passwords do not match.");
        return;
    }

    try {

      const token = localStorage.getItem('authToken');

        const res = await axios.post(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/addChildPanel`,
            {
                domain,
                username,
                password,
                confirmPassword: confirm,
                currency,
                price,
            },
            {
                headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
            }
        );

        if (res.data.success) {
            toast.success("Child panel Submitted successfully!");
            setDomain('');
            setUsername('');
            setPassword('');
            setConfirm('');
            setCurrency('USD');
        } else {
            toast.error("Failed to create child panel.");
        }
    } catch (error) {
        console.error("Error creating child panel:", error);
        toast.error("Error occurred while creating child panel.");
    }
};



    const nsInfo = [
        'ns1.supergrow.online',
        'ns2.supergrow.online'
    ];

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
    };


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 dark:border-blue-700">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Site header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />


               <main className="grow-0">
                         <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
                           <h1 className="text-gray-400 mb-1">Dashboard / Child Panel</h1>
                           <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                             <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                               Child Panel
                             </h1>
                             <Datepicker align="left" />
                           </div>
                         </div>
                       </main>

                <div className="bg-gray-100 p-8 dark:bg-[var(--color-dark-gray)] border-gray-200">
                    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
                        {steps.map(({ step, text, icon }) => (
                            <div
                                key={step}
                                className="bg-white p-6 shadow-sm flex justify-between items-center gap-4 border dark:border dark:bg-[rgba(37,33,57,1)] border-gray-200 dark:border-blue-100"
                            >
                                <div>
                                    <div className="flex items-center gap-1 mb-2">
                                        <span className="h-6 w-1 bg-violet-600  dark:bg-violet-600"></span>
                                        <span className="bg-violet-300 px-3 py-1  font-semibold text-sm dark:bg-violet-200 dark:text-violet-900">
                                            {step}
                                        </span>
                                    </div>
                                    <div className="font-semibold mb-4 text-gray-900 text-base leading-tight dark:text-white">
                                        {text.map((line, idx) => (
                                            <p key={idx}>{line}</p>
                                        ))}
                                    </div>
                                </div>
                                <div>{icon}</div>
                            </div>
                        ))}
                    </div>
                </div>


                <div className='mx-8 mb-6'>
                    <form className="w-full bg-white dark:bg-[rgba(37,33,57,1)]  border-gray-200 dark:border-[#FFFFF] dark:border p-8  gap-8" onSubmit={handleSubmit}>

                        {/* Left side inputs */}
                        <div className="space-y-6">
                            {/* Domain */}
                            <div>
                                <label htmlFor="domain" className="block mb-2 font-semibold text-gray-900 dark:text-white">child_panels.form.domain</label>
                                <input
                                style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color:"gray" }}
                                    id="domain"
                                    type="text"
                                    value={domain}
                                    onChange={(e) => setDomain(e.target.value)}
                                    placeholder="Enter domain"
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
                                />
                            </div>

                            {/* NS Info */}
                            <div className="p-6 rounded-md border dark:border-gray-100">
                                <p className="mb-2 text-gray-800  dark:text-gray-500 font-semibold">child_panels.form.ns.info</p>
                                <ul className="list-disc pl-5 space-y-2 text-gray-800 dark:text-white font-semibold">
                                    {nsInfo.map((ns, i) => (
                                        <li key={i} className="flex items-center justify-between cursor-pointer" onClick={() => copyToClipboard(ns)}>
                                            {ns}
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-600 dark:text-gray-800 ml-2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                                <path d="M8 16h8M8 12h8M8 8h8M4 20h16v-8H4v8zM4 4h8v4H4V4z" />
                                            </svg>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Currency */}
                            <div>
                                <label htmlFor="currency" className="block mb-2 font-semibold text-gray-900 dark:text-gray-500">child_panels.form.currency</label>
                                <select
                                    id="currency"
                                    value={currency}
                                    onChange={(e) => setCurrency(e.target.value)}
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-900 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
                                >
                                    <option value="USD">U.S. Dollar (USD)</option>
                                    <option value="EUR">Euro (EUR)</option>
                                    <option value="GBP">British Pound (GBP)</option>
                                </select>
                            </div>
                        </div>

                        {/* Right side inputs */}
                        <div className="space-y-6">
                            {/* Username */}
                            <div>
                                <label htmlFor="username" className="block mb-2 mt-4 font-semibold text-gray-900 dark:text-white">child_panels.form.username</label>
                                <input
                                    id="username"
                                    style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color:"gray" }}
                                    type="text"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    placeholder="Enter username"
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
                                />
                            </div>

                            {/* Password */}
                            <div>
                                <label htmlFor="password" className="block mb-2 font-semibold text-gray-900 dark:text-white">child_panels.form.password</label>
                                <input
                                style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color:"gray" }}
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter password"
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label htmlFor="confirm" className="block mb-2 font-semibold text-gray-900 dark:text-white">child_panels.form.confirm</label>
                                <input
                                    id="confirm"
                                    style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color:"gray" }}
                                    type="password"
                                    value={confirm}
                                    onChange={(e) => setConfirm(e.target.value)}
                                    placeholder="Confirm password"
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-violet-600 focus:outline-none"
                                />
                            </div>

                            {/* Price (disabled) */}
                            <div>
                                <label htmlFor="price" className="block mb-2 font-semibold text-gray-900 dark:text-white">child_panels.form.price</label>
                                <input
                                style={{ border: '1px solid rgba(0, 0, 0, 0.3)', color:"gray" }}
                                    id="price"
                                    type="text"
                                    value={`$ ${price}`}
                                    disabled
                                    className="w-full rounded-md border border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="lg:w-md w-full mt-6 py-2 border border-violet-600 rounded-4xl dark:gradient-border bg-violet-500 text-white hover:text-white dark:hover:text-white dark:hover:bg-violet-700 cursor-pointer transition"
                        >
                            Submit Order
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ChildPanel;
