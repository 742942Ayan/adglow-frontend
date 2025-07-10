// src/pages/admin/AdminDashboard.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">👨‍💼 Admin Dashboard</h1>

      <div className="space-y-4">
        <Link
          to="/admin/tasks"
          className="block p-4 bg-blue-500 text-white rounded shadow hover:bg-blue-600"
        >
          ➕ Manage Tasks
        </Link>
        {/* More modules can be added here */}
      </div>
    </div>
  );
};

export default AdminDashboard;
