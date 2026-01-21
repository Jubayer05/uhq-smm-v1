import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import Emily from '../images/Emily.svg'
import Sara from '../images/Sara.svg'

const ViewTicketSupport = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
                        <h1 className="text-gray-600 dark:text-gray-400 mb-1">
                            Dashboard / Ticket Support / Ticket Support view detail
                        </h1>

                        <div className="mb-4 mt-5 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                            <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-white font-extralight mb-4 sm:mb-0">
                                Ticket Support
                            </h1>
                            <Datepicker align="left" />
                        </div>
                    </div>
                </main>

                <div className="px-4 py-6">
                    <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-100 p-8">
                        {/* Ticket Header */}
                        <div className="mb-6 mt-4 border-gray-200 dark:border-gray-700 pb-4">
                            <h1 className="text-xl font-bold mb-8 text-gray-800 dark:text-white">Ticket #12345</h1>
                            <h2 className='text-md mb-4'>Ticket Information</h2>
                            <hr className="border-t border-gray-300 dark:border-gray-600 mb-5" />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2 text-sm text-gray-600 dark:text-gray-300">
                                <div>
                                    <span className="font-medium text-gray-800 dark:text-white">Status:</span> Open
                                    <hr className="mt-6 mb-2 border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div>
                                    <span className="font-medium text-gray-800 dark:text-white">Priority:</span> High
                                    <hr className="mt-6 mb-2 border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div>
                                    <span className="font-medium text-gray-800 dark:text-white">Assigned To:</span> Sarah Miller
                                    <hr className="mt-6 mb-2 border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div>
                                    <span className="font-medium text-gray-800 dark:text-white">Created At:</span> 2024-07-10 10:00 AM
                                    <hr className="mt-6 mb-2 border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div><span className="font-medium text-gray-800 dark:text-white">Last Updated:</span> 2024-07-10 12:05 PM</div>
                                <div><span className="font-medium text-gray-800 dark:text-white">Customer:</span> Emily Carter</div>
                            </div>
                        </div>

                        {/* Message Thread */}
                        <div className="space-y-8 text-sm">
                            <h1 className='text-lg mt-5 font-semibold'>Message Thread</h1>
                            <div className="flex items-start gap-3">
                                <img
                                    src={Emily}
                                    alt="User"
                                    className="w-8 h-8 mt-24 rounded-full object-cover"
                                />

                                <div className="bg-[#e5e7eb] dark:bg-[#4b3b6e] p-4 rounded-xl w-full max-w-80">
                                    <p className="text-gray-800 dark:text-white">I'm having trouble accessing my account. I tried resetting my password, but I'm not receiving the reset email. Can you please help?</p>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs block mt-1">Emily Carter</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 justify-end">
                                <div className="bg-[#f3f4f6] dark:bg-[#3a2d5a] p-4 rounded-xl w-full max-w-80">
                                    <p className="text-gray-800 dark:text-white">Hi Emily, I’m sorry to hear you're having trouble. I’ve checked your account and it seems there might be an issue with the email address on file. Could you please confirm the email you're trying to use?</p>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs block mt-1 text-right">Sarah Miller</span>
                                </div>
                                <img
                                    src={Sara}
                                    alt="User"
                                    className="w-8 h-8 mt-24 rounded-full object-cover"
                                />

                            </div>

                            <div className="flex items-start gap-3">
                                <img
                                    src={Emily}
                                    alt="User"
                                    className="w-8 h-8 mt-24 rounded-full object-cover"
                                />

                                <div className="bg-[#e5e7eb] dark:bg-[#4b3b6e] p-4 rounded-xl w-full max-w-80">
                                    <p className="text-gray-800 dark:text-white">Yes, it’s emilycarter@email.com. I’ve been using this email for years, so I’m not sure why it’s not working.</p>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs block mt-1">Emily Carter</span>
                                </div>
                            </div>

                            <div className="flex items-start gap-3 justify-end">
                                <div className="bg-[#f3f4f6] dark:bg-[#3a2d5a] p-4 rounded-xl w-full max-w-80">
                                    <p className="text-gray-800 dark:text-white">Thank you for confirming. I've updated your email address in our system. Please try resetting your password again, and let me know if you still don’t receive the email.</p>
                                    <span className="text-gray-500 dark:text-gray-400 text-xs block mt-1 text-right">Sarah Miller</span>
                                </div>
                                <img
                                    src={Sara}
                                    alt="User"
                                    className="w-8 h-8 mt-24 rounded-full object-cover"
                                />

                            </div>
                        </div>

                        {/* Reply Input */}
                        <div className="mt-6 border-gray-200 dark:border-gray-700 pt-4">
                            <div className="flex flex-col sm:flex-row items-start gap-3">
                                <img
                                    src={Emily}
                                    alt="User"
                                    className="w-10 h-10 mt-1 rounded-full object-cover"
                                />

                                <input
                                    type="text"
                                    placeholder="Type your text here..."
                                    className="w-full bg-white dark:bg-[#1a0c3d] text-gray-100 dark:text-white p-3 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-600"
                                />
                            </div>

                            <div className="flex flex-col sm:items-end mt-6">
                                <div className="flex flex-wrap gap-2 justify-end">
                                    <button
                                        className="bg-purple-600 px-4 py-2 cursor-pointer rounded-4xl text-sm text-white transition"
                                        style={{
                                            background: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%)',
                                            borderImage: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%) 1',
                                        }}
                                    >
                                        Send
                                    </button>
                                    <button className="bg-gray-200 dark:bg-gray-900 cursor-pointer px-4 py-2 rounded-4xl text-sm text-gray-900 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-600 transition">
                                        Close Ticket
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-4 mt-6 text-sm mb-8 justify-end">
                                    <button className="bg-gray-200 dark:bg-gray-900 cursor-pointer px-4 py-2 rounded-4xl text-sm text-gray-900 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-600 transition">
                                        Block User
                                    </button>

                                    <button className="bg-gray-200 dark:bg-gray-900 cursor-pointer px-4 py-2 rounded-4xl text-sm text-gray-900 dark:text-white hover:bg-gray-500 dark:hover:bg-gray-600 transition">
                                        Change Priority/Status
                                    </button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>

            </div>
        </div>
    );
};

export default ViewTicketSupport;
