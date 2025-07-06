import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import WatchAds from './pages/WatchAds';
import Withdraw from './pages/Withdraw';
import TeamTree from './pages/TeamTree';
import KycUpload from './pages/KycUpload'; // ✅ NEW

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/watch-ads" element={<WatchAds />} />
        <Route path="/withdraw" element={<Withdraw />} />
        <Route path="/team" element={<TeamTree />} />
        <Route path="/kyc" element={<KycUpload />} /> {/* ✅ NEW */}
      </Routes>
    </Router>
  );
}

export default App;
