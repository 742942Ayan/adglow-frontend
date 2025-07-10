import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import Withdraw from './pages/Withdraw';
import TeamTree from './pages/TeamTree';
import KycUpload from './pages/KycUpload';
import Leaderboard from './pages/Leaderboard';
import Profile from './pages/Profile';
import Tasks from './pages/Tasks';

// ✅ Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminTasks from './pages/admin/AdminTasks';
import KycApprovals from './pages/admin/KycApprovals';
import WithdrawalApprovals from './pages/admin/WithdrawalApprovals';
import ReferralSettings from './pages/admin/ReferralSettings'; // ✅ Route added
import UserManagement from './pages/admin/UserManagement'; // ✅ NEW
import UserList from './pages/admin/UserList';



function App() {
  return (
    <Router>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/team" element={<TeamTree />} />
        <Route path="/kyc" element={<KycUpload />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/profile" element={<Profile />} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/tasks" element={<AdminTasks />} />
        <Route path="/admin/kyc-approvals" element={<KycApprovals />} />
        <Route path="/admin/withdrawals" element={<WithdrawalApprovals />} />
        <Route path="/admin/commissions" element={<ReferralSettings />} /> {/* ✅ New */}
        <Route path="/admin/users" element={<UserManagement />} /> {/* ✅ ADDED */}
        <Route path="/admin/users" element={<UserList />} />
      </Routes>
    </Router>
  );
}

export default App;
