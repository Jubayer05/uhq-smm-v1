import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './MyComponents/navbar';
import CornerImage from './images/Ellipse 22.svg';
import './styles/App.css';
import Home from './MyComponents/home';
import Footer from './MyComponents/footer';
import AboutUs from './MyComponents/Aboutus';
import Pricing from './MyComponents/Pricing';
import ContactUs from './MyComponents/Contactus';
import Service from './MyComponents/Services';
import Login from './MyComponents/Login';
import ForgotPassword from './MyComponents/ForgotPassword';
import OtpInput from './MyComponents/OtpInput';
import ResetPassword from './MyComponents/ResetPassword';
import Signup from './MyComponents/Signup';
import Faqs from './MyComponents/Faqs';
import TermsConditions from './MyComponents/TermsConditions';
import Privacy from './MyComponents/Privacy';
import AdminRoutes from './admin/AdminPages/adminRoutes';

import './charts/ChartjsConfig';
import './css/style.css';

import Dashboard from './pages/Dashboard';
import MassOrder from './pages/MassOrder';
import AddService from './pages/AddService';
import OrderHistory from './pages/OrderHistory';
import Subscriptions from './pages/Subscriptions';
import RefillHistory from './pages/RefillHistory';
import Services from './pages/Services';
import Funds from './pages/Funds';
import AddFunds from './pages/AddFunds';
import TicketSupport from './pages/TicketSupport';
import ChildPanel from './pages/ChildPanel';
import Refunds from './pages/Refunds';
import API from './pages/API';
import Affiliate from './pages/Affiliate';
import NewOrder from './pages/NewOrder';

import { ToastContainer } from 'react-toastify';
import VIPSubscription from './pages/VIPSubscription';
import ReportIssues from './pages/ReportIssues';
import AddIssues from './pages/AddIssues';
import NotFound from './pages/pageNotFound';
import RefundPolicy from './MyComponents/RefundPolicy';

const AppContent = () => {
  const location = useLocation();

  const isVendorRoute = location.pathname.startsWith('/vendor');
  const isAdminRoute = location.pathname.startsWith('/admin');
  const is404Route = location.pathname === '/404';
  const showCornerImage = isVendorRoute || isAdminRoute;

  useEffect(() => {
    document.querySelector('html').style.scrollBehavior = 'auto';
    window.scroll({ top: 0 });
    document.querySelector('html').style.scrollBehavior = '';
  }, [location.pathname]);

  return (
    <div className={!isVendorRoute && !isAdminRoute ? 'frontend-body' : ''}>
      {/* Show corner image only on admin or vendor routes */}
      {showCornerImage && (
        <img
          src={CornerImage}
          alt="Corner Decoration"
          style={{
            position: 'fixed',
            top: '65px',
            right: '0px',
            width: '500px',
            height: '600px',
            zIndex: 0,
            pointerEvents: 'none',
          }}
        />
      )}

      {!showCornerImage && !is404Route && <Navbar />}

      <Routes>
        {/* Frontend Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/services" element={<Service />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contactus" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
         <Route path="/recovery" element={<ForgotPassword />} />
        <Route path="/otp" element={<OtpInput />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/refund-policy" element={<RefundPolicy/>} />

        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/privacy-policy" element={<Privacy />} />

        {/* Vendor Routes */}
        <Route path="/vendor" element={<Dashboard />} />
        <Route path="/vendor/new-order" element={<NewOrder />} />
        <Route path="/vendor/mass-order" element={<MassOrder />} />
        <Route path="/vendor/add-service" element={<AddService />} />
        <Route path="/vendor/order-history" element={<OrderHistory />} />
        <Route path="/vendor/subscriptions" element={<Subscriptions />} />
        <Route path="/vendor/vip-subscriptions" element={<VIPSubscription />} />
        <Route path="/vendor/refill-history" element={<RefillHistory />} />
        <Route path="/vendor/new-services" element={<Services />} />
        <Route path="/vendor/funds" element={<Funds />} />
        <Route path="/vendor/report-issues" element={<ReportIssues />} />
        <Route path="/vendor/add-issues" element={<AddIssues />} />
        <Route path="/vendor/add-funds" element={<AddFunds />} />
        <Route path="/vendor/ticket-support" element={<TicketSupport />} />
        <Route path="/vendor/child-panel" element={<ChildPanel />} />
        <Route path="/vendor/refunds" element={<Refunds />} />
        
        <Route path="/vendor/api" element={<API />} />
        <Route path="/vendor/refer" element={<Affiliate />} />

        {/* Admin Routes (mounted correctly) */}
        <Route path="/admin/*" element={<AdminRoutes />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>

      {!showCornerImage && !is404Route && <Footer />}
      <ToastContainer />
    </div>
  );
};

const App = () => {
  return <AppContent />;
};

export default App;
