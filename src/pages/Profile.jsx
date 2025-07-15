import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // 🔐 Fetch user data from backend
  useEffect(() => {
    const token = localStorage.getItem("adglow_token"); // ✅ यहीं बदलाव हुआ है
    if (!token) {
      navigate("/login");
      return;
    }

    axios.get("https://adglow-backend.onrender.com/api/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("❌ Error:", err);
        alert("प्रोफाइल लोड नहीं हो सकी। कृपया लॉगिन करें।");
        localStorage.removeItem("adglow_token");
        navigate("/login");
      });
  }, [navigate]);

  const handleCopy = () => {
    if (user?.referralCode) {
      navigator.clipboard.writeText(user.referralCode);
      alert('📋 रेफरल कोड कॉपी हो गया!');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adglow_token"); // ✅ token का नाम consistent
    alert("आप लॉगआउट हो चुके हैं!");
    navigate("/login");
  };

  if (!user) return <div className="text-center mt-10">लोड हो रहा है...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">👤 मेरी प्रोफाइल</h2>
        <div className="space-y-2 text-left">
          <p><strong>नाम:</strong> {user.fullName}</p>
          <p><strong>ईमेल:</strong> {user.email}</p>
          <p>
            <strong>रेफरल कोड:</strong>{" "}
            <span className="text-blue-600 font-mono">{user.referralCode}</span>
          </p>
          <p><strong>KYC स्थिति:</strong> {user.kycStatus || "Pending"}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleCopy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            📋 रेफरल कोड कॉपी करें
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            🔓 लॉगआउट करें
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
