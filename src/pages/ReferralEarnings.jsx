// 📁 src/pages/ReferralEarnings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const ReferralEarnings = () => {
  const [earnings, setEarnings] = useState([]);
  const token = localStorage.getItem("adglow_token");

  useEffect(() => {
    const fetchEarnings = async () => {
      try {
        const res = await axios.get("/api/referral/earnings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEarnings(res.data.earnings);
      } catch (err) {
        console.error(err);
      }
    };

    fetchEarnings();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Referral Earnings History</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-200 text-sm">
              <th className="py-2 px-4 border">Date</th>
              <th className="py-2 px-4 border">From User</th>
              <th className="py-2 px-4 border">Level</th>
              <th className="py-2 px-4 border">Type</th>
              <th className="py-2 px-4 border">Amount</th>
            </tr>
          </thead>
          <tbody>
            {earnings.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No earnings yet.
                </td>
              </tr>
            ) : (
              earnings.map((e, i) => (
                <tr key={i} className="text-sm text-center">
                  <td className="py-2 px-2 border">{new Date(e.date).toLocaleDateString()}</td>
                  <td className="py-2 px-2 border">{e.fromUserName} ({e.fromUserEmail})</td>
                  <td className="py-2 px-2 border">Level {e.level}</td>
                  <td className="py-2 px-2 border">{e.source}</td>
                  <td className="py-2 px-2 border text-green-600 font-semibold">₹{e.amount}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReferralEarnings;
