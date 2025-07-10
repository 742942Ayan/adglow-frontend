// src/pages/admin/KycApprovals.jsx
import React, { useEffect, useState } from 'react';

const mockKycData = [
  {
    id: 1,
    userId: 'USR001',
    fullName: 'Ravi Kumar',
    email: 'ravi@example.com',
    documentType: 'Aadhaar Card',
    documentUrl: 'https://via.placeholder.com/300x200?text=KYC+Doc',
    status: 'pending',
  },
  {
    id: 2,
    userId: 'USR002',
    fullName: 'Priya Sharma',
    email: 'priya@example.com',
    documentType: 'PAN Card',
    documentUrl: 'https://via.placeholder.com/300x200?text=KYC+Doc',
    status: 'pending',
  },
];

const KycApprovals = () => {
  const [kycList, setKycList] = useState([]);

  useEffect(() => {
    // Fetch from backend later
    setKycList(mockKycData);
  }, []);

  const updateStatus = (id, status) => {
    const updated = kycList.map((kyc) =>
      kyc.id === id ? { ...kyc, status } : kyc
    );
    setKycList(updated);
    alert(`✅ KYC ${status.toUpperCase()} for user ID ${id}`);
    // Later: Send update to backend
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">✅ KYC Approvals</h1>

      {kycList.length === 0 ? (
        <p>No pending KYC submissions.</p>
      ) : (
        <div className="grid gap-6">
          {kycList.map((kyc) => (
            <div
              key={kyc.id}
              className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row gap-6"
            >
              <img
                src={kyc.documentUrl}
                alt="KYC Document"
                className="w-full md:w-64 h-auto border rounded"
              />
              <div className="flex-1">
                <p><strong>User ID:</strong> {kyc.userId}</p>
                <p><strong>Full Name:</strong> {kyc.fullName}</p>
                <p><strong>Email:</strong> {kyc.email}</p>
                <p><strong>Document Type:</strong> {kyc.documentType}</p>
                <p><strong>Status:</strong>{' '}
                  <span className={`font-bold ${kyc.status === 'approved' ? 'text-green-600' : kyc.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {kyc.status.toUpperCase()}
                  </span>
                </p>
                {kyc.status === 'pending' && (
                  <div className="mt-4 flex gap-3">
                    <button
                      onClick={() => updateStatus(kyc.id, 'approved')}
                      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => updateStatus(kyc.id, 'rejected')}
                      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    >
                      ❌ Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KycApprovals;
