import React, { useState } from 'react';
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';

import Datepicker from '../components/Datepicker';
import axios from 'axios';
import { toast } from 'react-toastify';
const plans = [
  {
    title: 'Current Plan',
    price: 'Free',
    features: ['Subscribe now to start enjoying member benefits.'],
    button: 'Active Now',
    highlight: false,
  },
  {
    title: 'Basic plan',
    price: '$10/mth',
    sub: 'Billed annually.',
    features: [
      '10% discount on all services',
      'Priority customer support',
      'Access to basic promotions',
      'Faster order processing',
      'Access to limited-time offers',
    ],
    button: 'Subscribe',
    highlight: false,
  },
  {
    title: 'Pro plan',
    price: '$45/month',
    sub: 'Billed annually.',
    features: [
      'All Basic plan benefits',
      '15% discount on services',
      '2% bonus on each deposit',
      'Early access to new features',
      'Dedicated support assistant',
    ],
    button: 'Subscribe',
    highlight: 'Most Popular',
  },
  {
    title: 'Elite',
    price: '$50/month',
    sub: 'Billed annually.',
    features: [
      'All Pro plan benefits',
      '25% discount on services',
      '3% bonus on each deposit',
      'VIP WhatsApp support',
      'First access to private beta tools',
    ],
    button: 'Subscribe',
    highlight: false,
  },
];

const VIPSubscription = () => {
  const [sidebarOpen, setSidebarOpen] = useState('');



  const handleSubscribe = async (plan) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/vendor/addSubscription`,
        {
          name: plan.title.replace(' plan', '').trim(),
          price: parseFloat(plan.price.replace(/[^0-9.]/g, '')),
          billingCycle: 'annually',
          features: plan.features.join(', '),
          discount:
            plan.title.includes('Basic') ? 10 :
              plan.title.includes('Pro') ? 15 :
                plan.title.includes('Elite') ? 25 : 0,
          depositBonus:
            plan.title.includes('Basic') ? 1 :
              plan.title.includes('Pro') ? 2 :
                plan.title.includes('Elite') ? 3 : 0,
          isMostPopular: !!plan.highlight,
          // 🚫 No more serviceId
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success('Subscribed successfully!');
      } else {
        toast.error('Failed to subscribe.');
      }
    } catch (error) {
      console.error('Error while subscribing:', error.message);
      toast.error('Something went wrong.');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-[var(--color-dark-gray)]">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        {/* Site header */}
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="grow-0">
          <div className="px-4 sm:px-6 lg:px-4 py-4 w-full max-w-9xl mx-auto">
            <h1 className="text-gray-400 mb-1">Dashboard / VIP Subscription</h1>
            <div className="mb-4 sm:mb-0 flex flex-col sm:flex-row items-start sm:items-center space-x-0 sm:space-x-14">
              <h1 className="text-2xl md:text-4xl text-gray-800 dark:text-gray-100 font-extralight mb-4 sm:mb-0">
                VIP Subscription
              </h1>
              <Datepicker align="left" />
            </div>
          </div>
        </main>

        <div className="px-4 py-6">
          <div className="px-6 py-10 text-gray-800 dark:text-white 
           bg-white border-gray-300 border dark:bg-[rgba(37,33,57,1)]">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl sm:text-4xl font-bold text-left mb-10">Be Membership</h2>
              <p className="text-left max-w-3xl text-gray-600 dark:text-gray-300 mb-10">
                Upgrade your experience and unlock exclusive features with our premium Be Membership plans. All subscriptions are deducted from your balance.
              </p>

              {/* First row - Current Plan */}
              <div className="mb-6">
                <div className="relative rounded-xl border border-violet-900 bg-white dark:bg-[#1a1127] p-6 shadow-md dark:border-gray-700 w-full max-w-72 min-h-[300px] flex flex-col items-center justify-between text-center">
                  <div className="h-6 w-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mb-3"></div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Current Plan</h3>
                    <p className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Free</p>
                    <p className="text-sm text-gray-400 mb-4">Billed annually.</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Subscribe now to start enjoying member benefits.
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleSubscribe({
                        title: 'Basic',
                        price: '$0',
                        features: ['Subscribe now to start enjoying member benefits.'],
                        highlight: false,
                      })
                    }
                    className="w-full py-2 border border-fuchsia-600 text-fuchsia-600 dark:text-white rounded-full hover:bg-fuchsia-600 hover:text-white transition"
                  >
                    Active Now
                  </button>

                </div>
              </div>

              {/* Second row - Basic, Pro, Elite */}
              <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {plans.slice(1).map((plan, index) => (
                  <div
                    key={index}
                    className="relative rounded-xl border border-violet-900 bg-white dark:bg-[#1a1127] p-6 shadow-md dark:border-gray-700"
                  >
                    {plan.highlight && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-fuchsia-700 text-xs px-3 py-1 rounded-full text-white">
                        {plan.highlight}
                      </div>
                    )}
                    <div className="flex items-center justify-center">
                      <div className="h-6 w-6 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-full mb-3
                      "></div>
                    </div>
                    <h3 className="text-xl font-semibold text-center text-gray-800 dark:text-white mb-2">{plan.title}</h3>
                    <p className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-1">{plan.price}</p>
                    {plan.sub && <p className="text-sm text-center text-gray-400 mb-4">{plan.sub}</p>}
                    <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2 mb-6">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-fuchsia-500">●</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => handleSubscribe(plan)} className="w-full py-2 border border-fuchsia-600 text-fuchsia-600 dark:text-white rounded-full hover:bg-fuchsia-600 hover:text-white transition">
                      {plan.button}
                    </button>
                  </div>
                ))}
              </div>

              {/* How It Works */}
              <div className="mt-14 text-sm text-gray-500 dark:text-gray-400 max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold dark:text-white mb-2">How It Works</h3>
                <ul className="list-disc list-inside space-y-1">
                  <li>Funds must be added to your account before subscribing.</li>
                  <li>Membership lasts for 30 days.</li>
                  <li>You can upgrade anytime, and any remaining days will be credited.</li>
                  <li>If your plan expires, you’ll return to the Free Plan automatically.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VIPSubscription;
