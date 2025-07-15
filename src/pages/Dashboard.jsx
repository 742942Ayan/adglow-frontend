import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const totalGoal = 3;

  useEffect(() => {
    const token = localStorage.getItem("token");

    // 🔐 If no token, redirect to login
    if (!token) {
      alert("Session expired. Please login again.");
      window.location.href = "/login";
      return;
    }

    const fetchUserProfile = async () => {
      try {
        console.log("📦 Token:", token); // Debug
        const res = await axios.get("https://adglow-backend.onrender.com/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserData(res.data);
      } catch (err) {
        console.error("❌ Error fetching user profile:", err);
        alert("Unable to fetch user data. Please login again.");
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    };

    fetchUserProfile();
  }, []);

  if (!userData) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-xl text-center">
        <h1 className="text-3xl font-bold mb-4">👋 Welcome, {userData.fullName}</h1>
        <p className="text-lg text-gray-700 mb-2">Start watching tasks and earn daily rewards!</p>

        <div className="mt-4 space-y-3">
          <p className="font-semibold text-green-600">
            🎯 Today’s Goal: Watch {totalGoal} Tasks
          </p>
          <p className="text-yellow-600">
            ✅ Completed: {userData.adsWatchedToday || 0} / {totalGoal}
          </p>
          <p className="text-blue-600">
            💼 Referral Earnings: ₹{userData.referralEarnings?.toFixed(2) || 0}
          </p>
          <p className="text-purple-600">
            💰 Wallet Balance: ₹{userData.walletBalance?.toFixed(2) || 0}
          </p>
          <p className="text-gray-600">
            🧾 KYC Status: {userData.kycStatus || 'pending'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
