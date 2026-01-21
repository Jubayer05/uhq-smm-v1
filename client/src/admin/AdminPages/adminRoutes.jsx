import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import '../AdminPages/charts/ChartjsConfig';
import '../AdminPages/css/style.css';
import ThemeContext from '../AdminPages/utils/ThemeContext';

import Dashboard from '../AdminPages/pages/Dashboard';
import AddTicket from '../AdminPages/pages/AddTicket';
import ServiceandCategories from '../AdminPages/pages/ServicesandCateogries';
import Providers from '../AdminPages/pages/Providers';
import Subscriptions from '../AdminPages/pages/Subscriptions';
import ManageUsers from '../AdminPages/pages/ManageUsers';
import TicketSupport from '../AdminPages/pages/AffilieatesSystem';
import ChildPanel from '../AdminPages/pages/ChildPanel';
import BroadCastMessages from '../AdminPages/pages/BroadCastMessages';
import ReportsAndLogs from '../AdminPages/pages/ReportsAndLogs';
import RefundRequest from '../AdminPages/pages/RefundRequest';
import ManageOrders from '../AdminPages/pages/ManageOrders';
import UserViewDetail from '../AdminPages/pages/ViewUserDetail';
import ViewOrderDetail from './pages/ViewOrderDetail';
import Payment from '../AdminPages/pages/Payment';
import RefillRequest from '../AdminPages/pages/RefillRequest';
import SystemErrors from '../AdminPages/pages/SystemErrors';
import OrderReports from '../AdminPages/pages/OrderReports';
import SecurityLogs from '../AdminPages/pages/SecurityLogs';
import ViewTicketSupport from '../AdminPages/pages/ViewTicketSupport';
import ViewRefillRequest from '../AdminPages/pages/ViewRefillRequest';
import Login from '../AdminPages/pages/Login';

const AdminRoutes = () => {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('adminAuthToken') || '');

  // Log current location and token status
  console.log("🌐 Admin route:", location.pathname);
  console.log("🔐 Admin token exists:", !!token);

  useEffect(() => {
    if (token) {
      localStorage.setItem('adminAuthToken', token);
    } else {
      localStorage.removeItem('adminAuthToken');
    }
  }, [token]);

  // Is current page login page?
  const isLoginPage =
    location.pathname === '/admin' || location.pathname === '/admin/login';

  return (
    <ThemeContext>
      <Routes>
        {/* Always allow login and base /admin */}
        <Route path="login" element={<Login setToken={setToken} />} />
        <Route path="" element={<Navigate to="login" replace />} />

        {/* Only show protected routes if token exists */}
        {token ? (
          <>
            <Route path="dashboard" element={<Dashboard setToken={setToken} />} />
            <Route path="manage-users" element={<ManageUsers />} />
            <Route path="user-detail/:id" element={<UserViewDetail />} />
            <Route path="orders-management" element={<ManageOrders />} />
            <Route path="order-detail/:id" element={<ViewOrderDetail />} />
            <Route path="manual-payments" element={<Payment />} />
            <Route path="refill-request" element={<RefillRequest />} />
            <Route path="ticket-support" element={<AddTicket />} />
            <Route path="view-ticket-support" element={<ViewTicketSupport />} />
            <Route path="view-refill-request" element={<ViewRefillRequest />} />
            <Route path="services-categories" element={<ServiceandCategories />} />
            <Route path="providers" element={<Providers />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="affiliates" element={<TicketSupport />} />
            <Route path="child-panel" element={<ChildPanel />} />
            <Route path="refund-request" element={<RefundRequest />} />
            <Route path="broadcast-messages" element={<BroadCastMessages />} />
            <Route path="report-logs" element={<ReportsAndLogs />} />
            <Route path="system-errors" element={<SystemErrors />} />
            <Route path="order-reports" element={<OrderReports />} />
            <Route path="security-logs" element={<SecurityLogs />} />
          </>
        ) : (
          // If trying to access any other /admin route without token
          !isLoginPage && <Route path="*" element={<Navigate to="/admin/login" replace />} />
        )}
      </Routes>
    </ThemeContext>
  );
};

export default AdminRoutes;
