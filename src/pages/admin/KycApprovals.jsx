// src/pages/admin/KycApprovals.jsx
import React, { useEffect, useState } from 'react';

const mockKycList = [
  {
    id: 1,
    name: 'Ravi Kumar',
    email: 'ravi@example.com',
    status: 'pending',
    aadharUrl: 'https://via.placeholder.com/150',
    panUrl: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    name: 'Pooja Sharma',
    email: 'pooja@example.com',
    status: 'pending',
    aadharUrl: 'https://via.placeholder.com/150',
    panUrl: 'https://via.placeholder.com/150',
  },
];

const KycApprovals = () => {
  const [kycList, setKycList] = useState([]);

  useEffect(() => {
    // 🔁 Later: fetch from backend
    setKycList(mockKycList);
  }, []);

  const handleApprove = (id) => {
    const updated = kycList.map((k) =>
      k.id === id ? { ...k, status: 'approved' } : k
    );
    setKycList(updated);
    alert('✅ KYC Approved');
  };

  const handleReject = (id) => {
    const updated = kycList.map((k) =>
      k.id === id ? { ...k, status: 'rejected' } : k
    );
    setKycList(updated);
    alert('❌ KYC Rejected');
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">📝 KYC Approval Panel</h1>

      {kycList.length === 0 ? (
        <p>No pending KYC found.</p>
      ) : (
        <div className="grid gap-4">
          {kycList.map((kyc) => (
            <div
              key={kyc.id}
              className="p-4 bg-white rounded shadow flex flex-col md:flex-row md:items-center md:justify-between"
            >
              <div>
                <p className="font-bold text-lg">{kyc.name}</p>
                <p className="text-sm text-gray-600">{kyc.email}</p>
                <div className="flex gap-4 mt-2">
                  <a
                    href={kyc.aadharUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    Aadhar
                  </a>
                  <a
                    href={kyc.panUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    PAN
                  </a>
                </div>
              </div>

              <div className="flex gap-3 mt-4 md:mt-0">
                <button
                  onClick={() => handleApprove(kyc.id)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleReject(kyc.id)}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KycApprovals;
