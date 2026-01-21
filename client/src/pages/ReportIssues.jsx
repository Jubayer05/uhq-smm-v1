import React, { useState, useEffect } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import { useLocation, Link } from 'react-router-dom';
import Datepicker from '../components/Datepicker';
import axios from "axios";

const ReportIssues = () => {
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [Issues, setIssues] = useState([]);

    useEffect(() => {
        const fetchIssues = async () => {
            try {
                const token = localStorage.getItem("authToken");
                const res = await axios.get(`${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/getAllIssues`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIssues(res.data.reports || []);
            } catch (err) {
                console.error("Error fetching Issues:", err);
            }
        };

        fetchIssues();
    }, []);

    return (
        <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow-0">
                    <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
                        <h1 className="text-gray-400 mb-1">Dashboard / Report Issues</h1>
                        <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                            <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                                Report Issues
                            </h1>
                            <Datepicker align="left" />
                        </div>
                    </div>
                </main>
                {/* Search and Add Button */}
                <div className="p-4 flex justify-between items-center">
                    <div className="relative w-full max-w-md text-black bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
                        <input
                            type="search"
                            placeholder="Search"
                            className="w-full dark:text-gray-100 px-4 py-2"
                            style={{ paddingLeft: '40px', color: "gray" }}
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

                    <Link to='/vendor/add-issues'>
                        <button
                            className="ml-4 px-6 py-1 md:px-9 md:py-3 border z-[1000] cursor-pointer text-sm md:text-base text-gray-600 dark:text-white border-gray-400 transition flex items-center space-x-2 gradient-border-dark"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                            </svg>
                            <span className="sm:inline">Report Issue</span>
                        </button>
                    </Link>
                </div>

                {/* Issues Table */}
                <div className="p-4">
                    <div className="bg-white border-gray-200 border dark:bg-[rgba(37,33,57,1)] p-4 shadow-md overflow-x-auto">
                        <table className="min-w-full text-left text-sm">

                            <thead className="border-b border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200">
                                <tr>
                                    <th className="px-4 py-3">#</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Issue Type</th>
                                    
                                    <th className="px-4 py-3">Status</th>
                                </tr>
                            </thead>
                            <tbody className="text-gray-500 dark:text-gray-400 divide-y divide-gray-200 dark:divide-gray-700">
                                {Issues.length > 0 ? (
                                    Issues.map((issue, index) => (
                                        <tr key={issue._id}>
                                            <td className="px-4 py-2">{index + 1}</td>
                                            <td className="px-4 py-2">{new Date(issue.dateTime).toLocaleDateString()}</td>
                                            <td className="px-4 py-2">{issue.issueType}</td>
                                           
                                            <td className="px-4 py-2">
                                                <span
                                                    className={`px-2 py-1 rounded text-xs font-medium
      ${issue.serviceStatus === "Pending"
                                                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                                            : issue.serviceStatus === "Approved"
                                                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                                                : issue.serviceStatus === "Blocked"
                                                                    ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                                                                    : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-200"
                                                        }`}
                                                >
                                                    {issue.serviceStatus}
                                                </span>
                                            </td>


                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center py-4">No issues found</td>
                                    </tr>
                                )}
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReportIssues;
