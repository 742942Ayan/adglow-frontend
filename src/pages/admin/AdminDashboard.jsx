// src/pages/admin/AdminDashboard.jsx
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // ✅ Block unauthenticated access
  useEffect(() => {
    if (!localStorage.getItem('admin_logged_in')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
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

      <div className="space-y-4">
        <Link
          to="/admin/tasks"
          className="block p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          ➕ Manage Tasks
        </Link>

        {/* Future admin modules can be linked below */}
        {/* <Link to="/admin/kyc" className="...">Manage KYC</Link> */}
      </div>
    </div>
  );
};

export default AdminDashboard;
