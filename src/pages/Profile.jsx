import React from 'react';

const Profile = () => {
  // TODO: Replace with real user data from auth context or API
  const user = {
    name: 'Ayan Malik',
    email: 'ayan@example.com',
    referralCode: 'ADGLOW12345',
    joined: '2025-07-01',
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(user.referralCode);
    alert('📋 Referral code copied!');
  };

  const handleLogout = () => {
    // TODO: Clear auth and redirect to login
    alert('Logged out!');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">👤 My Profile</h2>
        <div className="space-y-2 text-left">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Referral Code:</strong> <span className="text-blue-600 font-mono">{user.referralCode}</span></p>
          <p><strong>Joined On:</strong> {user.joined}</p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={handleCopy}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            📋 Copy Referral Code
          </button>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg"
          >
            🔓 Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
