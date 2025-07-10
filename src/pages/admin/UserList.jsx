import React, { useState } from 'react';

const dummyUsers = [
  {
    id: 'u1',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    referralCode: 'RAH123',
    wallet: 320,
    phone: '9876543210',
    fatherName: 'Ramesh Sharma',
    gender: 'Male',
    dob: '1995-05-20',
    address: 'Delhi, India',
    kycStatus: 'Approved',
  },
  {
    id: 'u2',
    name: 'Fatima Khan',
    email: 'fatima@example.com',
    referralCode: 'FAT456',
    wallet: 185,
    phone: '7894561230',
    fatherName: 'Yusuf Khan',
    gender: 'Female',
    dob: '1998-11-10',
    address: 'Mumbai, India',
    kycStatus: 'Pending',
  },
  // Add more dummy users here
];

const UserList = () => {
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const filteredUsers = dummyUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()) ||
      user.referralCode.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-4">👥 All Users</h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by name, email, or referral code"
        className="w-full max-w-md mb-4 px-4 py-2 border rounded"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white border rounded shadow">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Referral</th>
              <th className="px-4 py-2">Wallet ₹</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, idx) => (
              <tr key={user.id} className="text-center hover:bg-gray-100">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{user.name}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.referralCode}</td>
                <td className="px-4 py-2">₹{user.wallet}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => setSelectedUser(user)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Selected User Details */}
      {selectedUser && (
        <div className="mt-6 p-4 bg-white border rounded shadow max-w-2xl mx-auto">
          <h2 className="text-xl font-bold mb-2">👤 User Details</h2>
          <p><strong>Name:</strong> {selectedUser.name}</p>
          <p><strong>Email:</strong> {selectedUser.email}</p>
          <p><strong>Phone:</strong> {selectedUser.phone}</p>
          <p><strong>Father's Name:</strong> {selectedUser.fatherName}</p>
          <p><strong>Gender:</strong> {selectedUser.gender}</p>
          <p><strong>Date of Birth:</strong> {selectedUser.dob}</p>
          <p><strong>Address:</strong> {selectedUser.address}</p>
          <p><strong>Referral Code:</strong> {selectedUser.referralCode}</p>
          <p><strong>Wallet Balance:</strong> ₹{selectedUser.wallet}</p>
          <p><strong>KYC Status:</strong> {selectedUser.kycStatus}</p>

          <button
            className="mt-3 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            onClick={() => setSelectedUser(null)}
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default UserList;
