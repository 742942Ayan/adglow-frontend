import React, { useState } from 'react';

const mockUsers = [
  { id: 'U001', name: 'Zaki Ahmad', email: 'zaki@example.com', referral: 'REF123', status: 'active' },
  { id: 'U002', name: 'John Doe', email: 'john@example.com', referral: 'REF456', status: 'suspended' },
  { id: 'U003', name: 'Ayan Malik', email: 'ayan@example.com', referral: 'REF789', status: 'active' },
];

const UserManagement = () => {
  const [query, setQuery] = useState('');
  const [foundUser, setFoundUser] = useState(null);

  const handleSearch = () => {
    const user = mockUsers.find(
      (u) => u.email === query || u.id === query || u.referral === query
    );
    setFoundUser(user || null);
  };

  const handleToggleStatus = () => {
    if (foundUser) {
      const updatedUser = {
        ...foundUser,
        status: foundUser.status === 'active' ? 'suspended' : 'active',
      };
      setFoundUser(updatedUser);
      alert(`✅ User is now ${updatedUser.status}`);
      // 🔗 Send update to backend here
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧑‍⚖️ User Search & Ban Panel</h1>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Enter Email / UserID / Referral Code"
          className="border px-3 py-2 rounded w-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          🔍 Search
        </button>
      </div>

      {foundUser ? (
        <div className="bg-white p-4 rounded shadow">
          <p><strong>👤 Name:</strong> {foundUser.name}</p>
          <p><strong>📧 Email:</strong> {foundUser.email}</p>
          <p><strong>🧾 Referral Code:</strong> {foundUser.referral}</p>
          <p><strong>⚠️ Status:</strong> 
            <span className={`ml-2 font-bold ${foundUser.status === 'active' ? 'text-green-600' : 'text-red-600'}`}>
              {foundUser.status.toUpperCase()}
            </span>
          </p>

          <button
            onClick={handleToggleStatus}
            className={`mt-4 px-4 py-2 rounded text-white ${
              foundUser.status === 'active' ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
            }`}
          >
            {foundUser.status === 'active' ? '🚫 Suspend User' : '✅ Unblock User'}
          </button>
        </div>
      ) : query ? (
        <p className="text-red-500">❌ No user found for “{query}”</p>
      ) : null}
    </div>
  );
};

export default UserManagement;
