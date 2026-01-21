import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
import Code2 from '../images/Code2.svg'
import Datepicker from '../components/Datepicker';
import { Code } from 'lucide-react';


const API = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (


        <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 ">
            {/* Sidebar */}
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

            <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
                {/* Header */}
                <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

                <main className="grow-0">
                          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
                            <h1 className="text-gray-400 mb-1">Dashboard / API</h1>
                            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
                              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                                API
                              </h1>
                              <Datepicker align="left" />
                            </div>
                          </div>
                        </main>
                <div className='py-2 px-4'>
                    <div className="w-full px-6 py-8 space-y-10 bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
                        {/* Api Documentation Block */}
                        <div>
                            <h1 className='font-light text-2xl'>API</h1>
                            <div className="flex items-center gap-4  bg-white dark:bg-[rgba(37,33,57,1)] border-gray-200 mt-8 rounded-t-lg">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className=" dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Api Documentations</h2>
                            </div>

                            <div className="border mt-4 border-gray-200 dark:border-gray-700">
                                <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4 font-medium">HTTP Method</td>
                                            <td className="p-4">POST</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4 font-medium">API URL</td>
                                            <td className="p-4">https://uhqsmm.com/api/v2</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4 font-medium">API Key</td>
                                            <td className="p-4">
                                                Get an API key on the{' '}
                                                <a href="/account" className="text-blue-600 dark:text-blue-400 underline">Account</a> page
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="p-4 font-medium">Response format</td>
                                            <td className="p-4">JSON</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <hr className="border-gray-300 dark:border-gray-600 mb-8" />


                        {/* Service List Block */}
                        <div>
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200  mb-4 rounded-t-lg  ">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className="text-violet-600 dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Service list</h2>
                            </div>

                            <div className="border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                    <thead className="text-sm font-semibold text-gray-800 dark:text-gray-200 border-b dark:border-gray-600">
                                        <tr>
                                            <th className="p-4">Parameters</th>
                                            <th className="p-4">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4">key</td>
                                            <td className="p-4">Your API key</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">action</td>
                                            <td className="p-4">services</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Example Response */}
                        <div className="mt-10">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example response</h3>
                            <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200  text-sm text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
                                <code>
                                    {`[
  {
    "service": 1,
    "name": "Followers",
    "type": "Default",
    "category": "First Category",
    "rate": "0.90",
    "min": "50",
    "max": "10000",
    "refill": true,
    "cancel": true
  },
  {
    "service": 2,
    "name": "Comments",
    "type": "Custom Comments",
    "category": "Second Category",
    "rate": "8",
    "min": "10",
    "max": "1500",
    "refill": false,
    "cancel": true
  }
]`}
                                </code>
                            </pre>
                        </div>

                        <hr className="border-gray-300 dark:border-gray-600 mb-4" />


                        {/* Add Order Section */}
                        <div className="mt-10">
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 mb-4 rounded-t-lg">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className="text-violet-600 dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add order</h2>
                            </div>

                            <div className="bg-gray-50 dark:bg-[var(--color-dark-gray)] dark:border-gray-600 border-gray-200 text-gray-900 dark:text-white p-4 border ">
                                Default
                            </div>

                            <div className="mt-4">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example response</h3>
                                <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200  text-sm text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    <code>
                                        {`{
  "order": 23501
}`}
                                    </code>
                                </pre>
                            </div>
                        </div>

                        <hr className="border-gray-300 dark:border-gray-600 mb-4" />

                        {/* Order Status Section */}
                        <div className="mt-10">
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 mb-4 rounded-t-lg">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className="text-violet-600 dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Order status</h2>
                            </div>

                            <div className="border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                    <thead className="bg-white dark:bg-[var(--color-dark-gray)]  border-gray-200 dark:border-blue-950">
                                        <tr>
                                            <th className="p-4 font-semibold border-b border-gray-300 dark:border-gray-600">Parameters</th>
                                            <th className="p-4 font-semibold border-b border-gray-300 dark:border-gray-600">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4">key</td>
                                            <td className="p-4">Your API key</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4">action</td>
                                            <td className="p-4">status</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">order</td>
                                            <td className="p-4">Order ID</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Example response for Order Status */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example response</h3>
                            <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200  text-sm text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
                                <code>
                                    {`{
  "charge": "0.27819",
  "start_count": "3572",
  "status": "Partial",
  "remains": "157",
  "currency": "USD"
}`}
                                </code>
                            </pre>
                        </div>
                        <hr className="border-gray-300 dark:border-gray-600 mb-4" />



                        {/* Multiple orders status section */}
                        <div className="w-full mx-auto py-8">
                            {/* Header */}
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 mb-4 rounded-t-lg">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className="text-violet-600 dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Multiple orders status</h2>
                            </div>

                            {/* Table */}
                            <div className="border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                    <thead className="border-b border-gray-300 dark:border-gray-600">
                                        <tr>
                                            <th className="p-4 font-semibold">Parameters</th>
                                            <th className="p-4 font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4">key</td>
                                            <td className="p-4">Your API key</td>
                                        </tr>
                                        <tr className="border-b border-gray-200 dark:border-gray-700">
                                            <td className="p-4">action</td>
                                            <td className="p-4">status</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">orders</td>
                                            <td className="p-4">Order IDs (separated by a comma, up to 100 IDs)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <h3 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Example response</h3>
                        <pre className="bg-gray-100dark:bg-[var(--color-dark-gray)]  border-gray-200  text-sm text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
                            {`{
  "1": {
    "charge": "0.27819",
    "start_count": "3572",
    "status": "Partial",
    "remains": "157",
    "currency": "USD"
  },
  "10": {
    "error": "Incorrect order ID"
  },
  "100": {
    "charge": "1.44219",
    "start_count": "234",
    "status": "In progress",
    "remains": "10",
    "currency": "USD"
  }
}`}
                        </pre>

                        <hr className="border-gray-300 dark:border-gray-600 mb-8" />


                        {/* Create refill section */}
                        <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 mb-4 rounded-t-lg ">
                            <div className="bg-violet-100p-3 rounded-lg">
                                <img src={Code2} className="text-violet-600 dark:text-white w-10 h-10" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create refill</h2>
                        </div>

                        {/* Table */}
                        <div className="border border-gray-200 dark:border-gray-700">
                            <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                <thead>
                                    <tr className="border-b border-gray-300 dark:border-gray-700">
                                        <th className="p-4 font-semibold">Parameters</th>
                                        <th className="p-4 font-semibold">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-4">key</td>
                                        <td className="p-4">Your API key</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-4">action</td>
                                        <td className="p-4">refill</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">order</td>
                                        <td className="p-4">Order ID</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Example response */}
                        <h3 className="text-lg font-semibold mt-6 mb-2 text-gray-800 dark:text-white">Example response</h3>
                        <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200  text-sm text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
                            {`{
  "refill": "1"
}`}
                        </pre>

                        <hr className="border-gray-300 dark:border-gray-600 mb-8" />



                        {/* Create multiple refill section */}
                        <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 mb-4 rounded-t-lg">
                            <div className="bg-violet-100p-3 rounded-lg">
                                <img src={Code2} className="text-violet-600 dark:text-white w-10 h-10" />
                            </div>
                            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Create multiple refill</h2>
                        </div>

                        {/* Table */}
                        <div className="border border-gray-200 dark:border-gray-700">
                            <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                <thead>
                                    <tr className="border-b border-gray-300 dark:border-gray-700">
                                        <th className="p-4 font-semibold">Parameters</th>
                                        <th className="p-4 font-semibold">Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-4">key</td>
                                        <td className="p-4">Your API key</td>
                                    </tr>
                                    <tr className="border-b border-gray-200 dark:border-gray-700">
                                        <td className="p-4">action</td>
                                        <td className="p-4">refill</td>
                                    </tr>
                                    <tr>
                                        <td className="p-4">orders</td>
                                        <td className="p-4">Order IDs (separated by a comma, up to 100 IDs)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        {/* Example response for multiple refill */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example response</h3>
                            <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 text-sm text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
                                {`[
  {
    "order": 1,
    "refill": 1
  },
  {
    "order": 2,
    "refill": 2
  },
  {
    "order": 3,
    "refill": {
      "error": "Incorrect order ID"
    }
  }
]`}
                            </pre>
                        </div>
                        <hr className="border-gray-300 dark:border-gray-600 mb-8" />


                        {/* Get refill status section */}
                        <div className="mt-10">
                            {/* Header */}
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 mb-4 rounded-t-lg">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className=" dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Get refill status</h2>
                            </div>

                            {/* Table */}
                            <div className="border border-gray-200 dark:border-gray-700
">
                                <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                    <thead>
                                        <tr className="border-b dark:border-gray-700">
                                            <th className="p-4 font-semibold">Parameters</th>
                                            <th className="p-4 font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b dark:border-gray-700">
                                            <td className="p-4">key</td>
                                            <td className="p-4">Your API key</td>
                                        </tr>
                                        <tr className="border-b dark:border-gray-700">
                                            <td className="p-4">action</td>
                                            <td className="p-4">refill_status</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">refill</td>
                                            <td className="p-4">Refill ID</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Example response */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example response</h3>
                                <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 text-sm text-gray-800 dark:text-gray-100 p-4 rounded-lg overflow-x-auto">
                                    {`{
  "status": "Completed"
}`}
                                </pre>
                            </div>
                        </div>
                        <hr className="border-gray-300 dark:border-gray-600 mb-4" />


                        {/* Get multiple refill status section */}
                        <div className="mt-10">
                            {/* Header */}
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-border)]  border-gray-200 mb-4 rounded-t-lg">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className=" dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Get multiple refill status</h2>
                            </div>

                            {/* Table */}
                            <div className="border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                    <thead>
                                        <tr className="border-b dark:border-gray-700">
                                            <th className="p-4 font-semibold">Parameters</th>
                                            <th className="p-4 font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b dark:border-gray-700">
                                            <td className="p-4">key</td>
                                            <td className="p-4">Your API key</td>
                                        </tr>
                                        <tr className="border-b dark:border-gray-700">
                                            <td className="p-4">action</td>
                                            <td className="p-4">refill_status</td>
                                        </tr>
                                        <tr>
                                            <td className="p-4">refills</td>
                                            <td className="p-4">Refill IDs (separated by a comma, up to 100 IDs)</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* Example response for Get multiple refill status */}
                        <div className="mt-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example response</h3>
                            <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 text-sm text-gray-800 dark:text-gray-200 rounded-md p-4 overflow-auto">
                                {`[
  {
    "refill": 1,
    "status": "Completed"
  },
  {
    "refill": 2,
    "status": "Rejected"
  },
  {
    "refill": 3,
    "status": {
      "error": "Refill not found"
    }
  }
]`}
                            </pre>
                        </div>
                        <hr className="border-gray-300 dark:border-gray-600 mb-4" />



                        {/* User Balance Section */}
                        <div className="mt-10">
                            {/* Header */}
                            <div className="flex items-center gap-4 bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200 mb-4 rounded-t-lg">
                                <div className="bg-violet-100p-3 rounded-lg">
                                    <img src={Code2} className=" dark:text-white w-10 h-10" />
                                </div>
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">User balance</h2>
                            </div>

                            {/* Table */}
                            <div className="border border-gray-200 dark:border-gray-700">
                                <table className="min-w-full text-left text-sm text-gray-900 dark:text-white">
                                    <thead className="bg-white dark:bg-[var(--color-dark-gray)]  border-gray-200 dark:border-blue-950">
                                        <tr>
                                            <th className="p-4 font-semibold">Parameters</th>
                                            <th className="p-4 font-semibold">Description</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-t border-gray-200 dark:border-gray-700">
                                            <td className="p-4">key</td>
                                            <td className="p-4">Your API key</td>
                                        </tr>
                                        <tr className="border-t border-gray-200 dark:border-gray-700">
                                            <td className="p-4">action</td>
                                            <td className="p-4">balance</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Example response */}
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Example response</h3>
                                <pre className="bg-gray-100 dark:bg-[var(--color-dark-gray)]  border-gray-200  text-sm text-gray-800 dark:text-gray-200 rounded-md p-4 overflow-auto">
                                    {`{
  "balance": "100.84292",
  "currency": "USD"
}`}
                                </pre>
                            </div>
                            <hr className="border-gray-300 dark:border-gray-600 mb-4" />
                        </div>



                    </div>
                </div>
            </div>
        </div>
    );
};

export default API;
