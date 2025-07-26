import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    pendingKyc: 0,
    totalWalletBalance: 0,
  });

  useEffect(() => {
    if (!localStorage.getItem('admin_logged_in')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const token = localStorage.getItem('adglow_admin_token');
        const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/admin/summary`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
      }
    };

    fetchStats();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    localStorage.removeItem('adglow_admin_token');
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">👨‍💼 Admin Dashboard</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🔒 Logout
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded shadow p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">👥 Total Users</h2>
          <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">📄 Pending KYC</h2>
          <p className="text-2xl font-bold text-orange-500">{stats.pendingKyc}</p>
        </div>
        <div className="bg-white rounded shadow p-4 text-center">
          <h2 className="text-xl font-semibold text-gray-700">💰 Wallet Balance</h2>
          <p className="text-2xl font-bold text-green-600">₹{stats.totalWalletBalance.toFixed(2)}</p>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="space-y-4">
        <Link
          to="/admin/tasks"
          className="block p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          ➕ Manage Tasks
        </Link>

        <Link
          to="/admin/kyc-approvals"
          className="block p-4 bg-purple-500 text-white rounded shadow hover:bg-purple-600"
        >
          ✅ KYC Approvals
        </Link>

        <Link
          to="/admin/withdrawals"
          className="block p-4 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600"
        >
          💸 Withdrawal Approvals
        </Link>

        <Link
          to="/admin/commissions"
          className="block p-4 bg-green-600 text-white rounded shadow hover:bg-green-700"
        >
          ⚙️ Referral Settings
        </Link>

        <Link
          to="/admin/users"
          className="block p-4 bg-indigo-500 text-white rounded shadow hover:bg-indigo-600"
        >
          👥 View All Users
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;
