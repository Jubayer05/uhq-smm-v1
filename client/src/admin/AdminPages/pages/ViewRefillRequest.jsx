import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';

const ViewRefillRequest = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-8 py-4 w-full max-w-9xl mx-auto">
                        <h1 className="text-gray-400 mb-1">Dashboard / Refill History / View Refill Request</h1>
                        <div className="mb-4 mt-5 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                            <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                                Refill History
                            </h1>
                            <Datepicker align="left" />
                        </div>
                    </div>
                </main>

                <div className="px-4 py-6">
                    <div className="bg-white border border-gray-200 dark:bg-[rgba(37,33,57,1)] dark:border-gray-100 p-8">
                        <h2 className="mt-4 text-2xl font-light mb-8">View Refill Request</h2>

                        {/* Order Information */}
                        <section className="mb-8">
                            <h3 className="text-lg font-semibold mb-4">Order Information</h3>
                            <hr className="border-t border-gray-300 dark:border-gray-600 mb-5" />

                            <div className="text-sm space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="block text-gray-400">Order ID</strong>
                                        <span>#123456</span>
                                    </div>
                                    <div>
                                        <strong className="block text-gray-400">Order Link</strong>
                                        <a href="https://example.com/post/123" className="text-blue-400 underline">https://example.com/post/123</a>
                                    </div>
                                </div>
                                <hr className="border-t border-gray-600" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="block text-gray-400">Order Quantity</strong>
                                        <span>1000</span>
                                    </div>
                                    <div>
                                        <strong className="block text-gray-400">Order Status</strong>
                                        <span>Completed</span>
                                    </div>
                                </div>
                                <hr className="border-t border-gray-600" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="block text-gray-400">Order Service</strong>
                                        <span>Likes</span>
                                    </div>
                                    <div>
                                        <strong className="block text-gray-400">Order Date</strong>
                                        <span>2023-06-15</span>
                                    </div>
                                </div>
                                <hr className="border-t border-gray-600" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="block text-gray-400">Order Provider</strong>
                                        <span>Provider A</span>
                                    </div>
                                    <div>
                                        <strong className="block text-gray-400">Order Cost</strong>
                                        <span>$10</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* User Refill Reason */}
                        <section className="mb-6">
                            <h3 className="mt-16 text-lg font-semibold">User Refill Reason</h3>
                            <p className="mt-2 text-sm text-gray-300">
                                The user reported that the likes dropped significantly after a few days. They provided screenshots as proof of the drop and requested a refill to compensate for the lost likes.
                            </p>
                        </section>

                        {/* Provider Info */}
                        <h3 className="text-lg font-semibold mb-4 mt-8">Provider Information</h3>
                        <section className="mb-6 border border-gray-600 p-4">
                            <div className="text-sm space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="block text-gray-400">Provider ID</strong>
                                        <span>#789012</span>
                                    </div>
                                    <div>
                                        <strong className="block text-gray-400">Provider Name</strong>
                                        <span>Provider A</span>
                                    </div>
                                </div>
                                <hr className="border-t border-gray-600" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="block text-gray-400">Provider Status</strong>
                                        <span>Active</span>
                                    </div>
                                    <div>
                                        <strong className="block text-gray-400">Provider Service</strong>
                                        <span>Likes</span>
                                    </div>
                                </div>
                                <hr className="border-t border-gray-600" />

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <strong className="block text-gray-400">Provider Cost</strong>
                                        <span>$8</span>
                                    </div>
                                    <div>
                                        <strong className="block text-gray-400">Provider Notes</strong>
                                        <span>No issues reported with this provider.</span>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Admin Notes */}
                        <section className="mb-6">
                            <h3 className="text-lg mt-8 font-semibold mb-2">Admin Notes / Logs</h3>
                            <textarea className="w-full sm:w-96 bg-transparent border rounded-xl p-4 text-sm resize-none h-28 focus:outline-none focus:ring-2 focus:ring-purple-500" placeholder="Notes" />
                        </section>

                        {/* Action Buttons */}
                        <div className="flex flex-wrap gap-3 justify-end">
                            <button
                                className="text-white px-6 py-2 rounded-full"
                                style={{
                                    background: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%)',
                                    borderImage: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%) 1',
                                }}
                            >
                                Approve
                            </button>
                            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded-full">Reject</button>
                            <button className="bg-black border border-gray-500 hover:bg-gray-900 text-white px-6 py-2 rounded-full">Mark as Refilled</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewRefillRequest;
    