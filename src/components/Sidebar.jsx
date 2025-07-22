import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const linkClasses = (path) =>
    `block px-4 py-2 rounded-md font-medium ${
      location.pathname === path
        ? 'bg-blue-600 text-white'
        : 'text-gray-700 hover:bg-blue-100'
    }`;

  return (
    <div className="w-64 h-screen bg-white shadow-md fixed left-0 top-0 p-4">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">AdGlow</h2>

      <nav className="flex flex-col gap-2">
        <Link to="/dashboard" className={linkClasses('/dashboard')}>
          🏠 Dashboard
        </Link>

        <Link to="/watch-ads" className={linkClasses('/watch-ads')}>
          🎥 Watch Ads
        </Link>

        <Link to="/withdraw" className={linkClasses('/withdraw')}>
          💸 Withdraw
        </Link>

        <Link to="/team-tree" className={linkClasses('/team-tree')}>
          🌳 Team Tree
        </Link>

        <Link to="/kyc-upload" className={linkClasses('/kyc-upload')}>
          📄 KYC Upload
        </Link>

        <Link to="/leaderboard" className={linkClasses('/leaderboard')}>
          🏆 Leaderboard
        </Link>

        <Link to="/profile" className={linkClasses('/profile')}>
          👤 Profile
        </Link>

        <Link to="/logout" className="mt-6 text-red-600 hover:bg-red-100 px-4 py-2 rounded-md font-medium">
          🚪 Logout
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
