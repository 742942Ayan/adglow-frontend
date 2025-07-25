// src/components/ReferralDistributor.jsx

import React from "react";
import axios from "axios";

const ReferralDistributor = () => {
  const handleDistributeCommission = async () => {
    try {
      const token = localStorage.getItem("adglow_token"); // ✅ token from local storage

      const response = await axios.post(
        "https://your-backend-url.com/api/referral/distribute", // ✅ CHANGE THIS to your live backend URL
        { rewardAmount: 20 }, // ✅ reward you want to distribute
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        }
      );

      alert("✅ Success: " + response.data.message);
    } catch (error) {
      console.error("❌ Error:", error.response?.data || error.message);
      alert("❌ Failed: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div style={{ marginTop: "30px" }}>
      <button
        onClick={handleDistributeCommission}
        style={{
          padding: "10px 20px",
          background: "#28a745",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold"
        }}
      >
        Distribute Referral Commission
      </button>
    </div>
  );
};

export default ReferralDistributor;
