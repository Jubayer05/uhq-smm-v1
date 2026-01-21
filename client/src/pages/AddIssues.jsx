import React, { useState } from "react";
import Sidebar from "../partials/Sidebar";
import Header from "../partials/Header";
import Datepicker from "../components/Datepicker";
import axios from "axios";
import { toast } from "react-toastify";

const AddIssues = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [issueType, setIssueType] = useState("Late delivery");
  const [service, setService] = useState("");
  const [serviceStatus, setServiceStatus] = useState("Pending");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/admin/addIssue`,
        { issueType, serviceStatus, description, service }, // ✅ include service
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Issue reported successfully!");
      setDescription("");
      setService("");
      setIssueType("Late delivery");
      setServiceStatus("Pending");
    } catch (err) {
      console.error("Error reporting issue:", err);
      toast.error(err.response?.data?.message || "Failed to report issue");
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 border-gray-200 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / Report Issues</h1>
            <div className="mb-4 sm:mb-0 flex items-center space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-light">Report Issues</h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="flex flex-col md:flex-row gap-6 p-6 font-sans">
          <div className="dark:bg-[rgba(37,33,57,1)] h-[700px] border border-gray-300 dark:border-[#FFFFFF] p-6 w-full shadow-md">
            <h1 className="text-gray-600 py-2 dark:text-white font-medium text-2xl mb-6">Report Issue</h1>
            <form onSubmit={handleSubmit}>
              {/* Issue Type */}
              <label htmlFor="issueType" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Issue Type
              </label>
              <select
                id="issueType"
                value={issueType}
                onChange={(e) => setIssueType(e.target.value)}
                className="w-full rounded-sm bg-white dark:bg-gray-900 px-4 py-3 mb-6 text-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                <option>Late delivery</option>
                <option>Item not received</option>
                <option>Wrong item received</option>
                <option>Refund not processed</option>
                <option>Payment failed</option>
                <option>Other</option>
              </select>

              {/* Service */}
              <label htmlFor="service" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Service
              </label>
              <input
                id="service"
                type="text"
                placeholder="Enter affected service (e.g., Service A, Refill, YouTube)"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full rounded-lg dark:bg-gray-700 px-4 py-2 mb-6 text-gray-900 text-sm border dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />

              {/* Service Status */}
              <label htmlFor="serviceStatus" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Service Status
              </label>
              <select
                id="serviceStatus"
                value={serviceStatus}
                onChange={(e) => setServiceStatus(e.target.value)}
                className="w-full rounded-sm bg-white dark:bg-gray-900 px-4 py-3 mb-6 text-md border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Rejected</option>
              </select>

              {/* Description */}
              <label htmlFor="description" className="block font-semibold mb-2 text-gray-900 dark:text-gray-400">
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                placeholder="Describe the issue..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-lg dark:bg-gray-700 px-4 py-3 mb-6 text-gray-900 text-sm border dark:border-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-violet-600"
              />

              <button
                type="submit"
                className="lg:w-md w-full py-2 border border-violet-600 text-violet-600 rounded-4xl dark:gradient-border hover:bg-violet-500 hover:text-white dark:hover:text-white dark:hover:bg-violet-700 cursor-pointer transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddIssues;
