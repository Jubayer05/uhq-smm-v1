// src/pages/NotFound.jsx
import React, { useEffect } from 'react';
import axiosInstance from '../axiosInstance'; // your configured axios

const NotFound = () => {
  // useEffect(() => {
  //   const logSystemError = async () => {
  //     try {
  //       await axiosInstance.post('/vendor/log-frontend-error', {
  //         path: window.location.pathname,
  //       });
  //     } catch (err) {
  //       console.error('Failed to log frontend 404:', err);
  //     }
  //   };

  //   logSystemError();
  // }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold text-red-500">404 - Page Not Found</h1>
      <p className="mt-4 text-gray-600">Sorry, the page you’re looking for doesn’t exist.</p>
    </div>
  );
};

export default NotFound;
