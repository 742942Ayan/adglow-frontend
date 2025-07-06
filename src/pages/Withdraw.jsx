import React, { useState } from 'react';

const Withdraw = () => {
  const [amount, setAmount] = useState('');
  const [upi, setUpi] = useState('');
  const walletBalance = 1520.75; // TODO: Fetch from backend in future

  const handleWithdraw = (e) => {
    e.preventDefault();
    if (!amount || !upi) return alert("Fill all fields");

    if (parseFloat(amount) > walletBalance) {
      return alert("❌ Not enough balance");
    }

    // TODO: API call for withdraw
    alert(`✅ ₹${amount} withdraw requested to ${upi}`);
    setAmount('');
    setUpi('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Withdraw Earnings</h2>
        
        <p className="text-center text-gray-600 mb-4">
          Wallet Balance: <span className="font-bold text-green-600">₹{walletBalance.toFixed(2)}</span>
        </p>

        <form onSubmit={handleWithdraw} className="space-y-4">
          <input
            type="number"
            placeholder="Enter amount (₹)"
            className="w-full px-4 py-2 border rounded-lg"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Enter UPI ID"
            className="w-full px-4 py-2 border rounded-lg"
            value={upi}
            onChange={(e) => setUpi(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            💸 Request Withdraw
          </button>
        </form>
      </div>
    </div>
  );
};

export default Withdraw;
