import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("adglow_token");
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("https://adglow-backend.onrender.com/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.error("❌ Error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
        } else {
          alert("Failed to load profile. Please try again.");
        }
        localStorage.removeItem("adglow_token");
        navigate("/login");
      });
  }, [navigate]);

  const handleCopy = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      alert('📋 Referral code copied!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adglow_token");
    alert("You have been logged out.");
    navigate("/login");
  };

  if (!user) return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>
        <div className="space-y-2 text-left">
          <p><strong>Name:</strong> {user.fullName}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p>
            <strong>Referral Code:</strong>{" "}
            <span className="text-blue-600 font-mono">{user.referralCode}</span>
          </p>
          <p><strong>KYC Status:</strong> {user.kycStatus || "Pending"}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleCopy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            📋 Copy Referral Code
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            🔓 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
