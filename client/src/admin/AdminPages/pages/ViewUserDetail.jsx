import React, { useEffect, useState } from "react";
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Datepicker from '../components/Datepicker';
import UserImage from '../images/UserDetailImage.svg';
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from 'react-toastify';


const UserViewDetail = () => {
    const [sidebarOpen, setSidebarOpen] = useState('');
    const { id } = useParams()
    const [user, setUser] = useState(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/userdetail/getsingleuser/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUser(response.data.user)
            } catch (error) {
                toast.error("Failed to fetch user data");
                console.error(err);

            }
        }
        fetchUser();
    }, [id]);

    if (!user) return <div className="p-6 text-gray-800 dark:text-white">Loading user data...</div>;


    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow">
                    <div className="px-4 sm:px-6 lg:px-5 py-4 w-full max-w-9xl mx-auto">
                        <h1 className="text-gray-400  mb-1">
                            Dashboard / Manage Users / User View Detail
                        </h1>

                        <div className="mb-4 mt-5  sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                            <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                                User Detail
                            </h1>
                            <Datepicker align="left" />
                        </div>
                    </div>

                </main>

                <div className="flex px-6 py-4 space-x-2">
                    {/* Delete Button */}
                    <button
                        title="Delete"
                        className="flex items-center cursor-pointer space-x-2 px-5 py-2 text-sm font-medium dark:text-gray-300 border border-gray-300 dark:border-pink-400"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M1 7h22M10 3h4a1 1 0 011 1v1H9V4a1 1 0 011-1z"
                            />
                        </svg>
                        <span>Delete</span>
                    </button>

                    {/* Edit Button with gradient background + border */}
                    <button
                        title="Edit"
                        className="flex items-center space-x-2 px-6 py-2 text-sm font-medium cursor-pointer dark:text-black rounded"
                        style={{
                            background: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%)',
                            border: '1px solid',
                            borderImage: 'linear-gradient(354.17deg, #7129FF 3.91%, #FD00E3 72.59%) 1',
                        }}
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11 5h6m2 0h.01M15.586 4.586a2 2 0 112.828 2.828L7 19l-4 1 1-4 11.586-11.586z"
                            />
                        </svg>
                        <span>Edit</span>
                    </button>
                </div>




                <div className="px-4 py-4">
                    <div className="bg-white dark:bg-[#1F1F2E] p-6 w-full border border-gray-300 dark:border-[#FFFFFF]">
                        <h2 className="text-gray-800 dark:text-white mt-4 font-light text-xl mb-6">
                            User details view
                        </h2>

                        <div className="flex items-center space-x-4 mb-6">
                            <img
                                src={UserImage}
                                alt="User"
                                className="w-64 h-48 rounded-md object-cover"
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-800 dark:text-white">
                            <div className="text-gray-500 dark:text-gray-400">Name</div>
                            <div className="col-span-2">{user.name}</div>

                            <div className="text-gray-500 dark:text-gray-400">Email</div>
                            <div className="col-span-2">{user.email}</div>

                            <div className="text-gray-500 dark:text-gray-400">Phone num</div>
                            <div className="col-span-2">{user.phone || 'N/A'}</div>

                            <div className="text-gray-500 dark:text-gray-400">Links</div>
                            <div className="col-span-2">{user.links || 'uhqsmm.com'}</div>

                            <div className="text-gray-500 dark:text-gray-400">Quantity</div>
                            <div className="col-span-2">{user.quantity || '1000'}</div>

                            <div className="text-gray-500 dark:text-gray-400">Services</div>
                            <div className="col-span-2">{user.service || '1615 Swaniaswki Neck, Provo'}</div>

                            <div className="text-gray-500 dark:text-gray-400">Status</div>
                            <div className="col-span-2">{user.status}</div>

                            <div className="text-gray-500 dark:text-gray-400">Amount</div>
                            <div className="col-span-2">{user.amount || '10000'}</div>

                            <div className="text-gray-500 dark:text-gray-400">Link (clickable)</div>
                            <div className="col-span-2">{user.link || 'uhqsmm.com'}</div>

                            <div className="text-gray-500 dark:text-gray-400">Start Count / Remarks</div>
                            <div className="col-span-2">{user.count || 'N/A'}</div>

                            <div className="text-gray-500 dark:text-gray-400">User info</div>
                            <div className="col-span-2">{user.info || 'N/A'}</div>

                            <div className="text-gray-500 dark:text-gray-400">Order ID & Status</div>
                            <div className="col-span-2">{user.orderId || '1615 Swaniaswki Neck, Provo 48586-7956'}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserViewDetail;
