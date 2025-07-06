import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">👋 Welcome to AdGlow</h1>
        <p className="text-lg text-gray-700 mb-2">Start watching ads and earn daily rewards!</p>
        <div className="mt-4 space-y-3">
          <p className="font-semibold text-green-600">🎯 Today’s Goal: Watch 3 Ads</p>
          <p className="text-blue-600">💼 Referral Earnings: ₹0.00</p>
          <p className="text-purple-600">💰 Wallet Balance: ₹0.00</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
