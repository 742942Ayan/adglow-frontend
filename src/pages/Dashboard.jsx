import React, { useEffect, useState } from 'react';

const Dashboard = () => {
  const [referralEarnings, setReferralEarnings] = useState(0);
  const [walletBalance, setWalletBalance] = useState(0);
  const [adsWatchedToday, setAdsWatchedToday] = useState(0);
  const totalGoal = 3;

  useEffect(() => {
    // TODO: Replace with real API calls
    const fetchUserStats = async () => {
      // Example dummy values
      setReferralEarnings(74.50);
      setWalletBalance(310.00);
      setAdsWatchedToday(2);
    };

    fetchUserStats();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">👋 Welcome to AdGlow</h1>
        <p className="text-lg text-gray-700 mb-2">Start watching tasks and earn daily rewards!</p>

        <div className="mt-4 space-y-3">
          <p className="font-semibold text-green-600">
            🎯 Today’s Goal: Watch {totalGoal} Tasks
          </p>
          <p className="text-yellow-600">
            ✅ Completed: {adsWatchedToday} / {totalGoal}
          </p>
          <p className="text-blue-600">
            💼 Referral Earnings: ₹{referralEarnings.toFixed(2)}
          </p>
          <p className="text-purple-600">
            💰 Wallet Balance: ₹{walletBalance.toFixed(2)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
