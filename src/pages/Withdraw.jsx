import React, { useState, useEffect } from "react";
import axios from "axios";

const Withdraw = () => {
  const [formData, setFormData] = useState({
    amount: "",
    accountHolder: "",
    accountNumber: "",
    ifscCode: "",
    upiId: "",
  });

  const [walletBalance, setWalletBalance] = useState(0);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  // 🔹 Fetch wallet balance on load
  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const token = localStorage.getItem("adglow_token");
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/api/user/dashboard`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setWalletBalance(res.data.user.wallet);
      } catch (err) {
        console.error(err);
      }
    };
    fetchWallet();
  }, []);

  // 🔹 Input handler
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (parseFloat(formData.amount) < 100) {
      setError("Minimum withdrawal amount is ₹100");
      return;
    }

    if (parseFloat(formData.amount) > walletBalance) {
      setError("Insufficient wallet balance");
      return;
    }

    try {
      const token = localStorage.getItem("adglow_token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/withdrawal/request`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setMessage(res.data.message);
      setFormData({
        amount: "",
        accountHolder: "",
        accountNumber: "",
        ifscCode: "",
        upiId: "",
      });
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Withdraw Funds</h2>
      <p className="mb-2 font-semibold">Wallet Balance: ₹{walletBalance}</p>

      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 mt-4">
        <input
          type="number"
          name="amount"
          placeholder="Amount (min ₹100)"
          value={formData.amount}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="accountHolder"
          placeholder="Account Holder Name"
          value={formData.accountHolder}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="accountNumber"
          placeholder="Account Number"
          value={formData.accountNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="ifscCode"
          placeholder="IFSC Code"
          value={formData.ifscCode}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          name="upiId"
          placeholder="UPI ID (optional)"
          value={formData.upiId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Request Withdrawal
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
