// src/pages/admin/WithdrawalApprovals.jsx
import React, { useEffect, useState } from 'react';

const mockWithdrawals = [
  {
    id: 1,
    userId: 'USR001',
    fullName: 'Ravi Kumar',
    amount: 500,
    method: 'UPI',
    upiId: 'ravi@upi',
    status: 'pending',
  },
  {
    id: 2,
    userId: 'USR002',
    fullName: 'Priya Sharma',
    amount: 750,
    method: 'Bank Transfer',
    account: 'XXXXXX7890',
    ifsc: 'SBIN0001234',
    status: 'pending',
  },
];

const WithdrawalApprovals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [rejectReason, setRejectReason] = useState('');

  useEffect(() => {
    // Later: fetch from backend
    setWithdrawals(mockWithdrawals);
  }, []);

  const handleApprove = (id) => {
    const updated = withdrawals.map((w) =>
      w.id === id ? { ...w, status: 'approved' } : w
    );
    setWithdrawals(updated);
    alert(`✅ Withdrawal request #${id} approved.`);
  };

  const handleReject = (id) => {
    if (!rejectReason.trim()) {
      alert('❌ Please enter a reason for rejection');
      return;
    }

    const updated = withdrawals.map((w) =>
      w.id === id ? { ...w, status: 'rejected', reason: rejectReason } : w
    );
    setWithdrawals(updated);
    alert(`❌ Withdrawal request #${id} rejected.\nReason: ${rejectReason}`);
    setRejectReason('');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">💰 Withdrawal Approvals</h1>

      {withdrawals.length === 0 ? (
        <p>No withdrawal requests.</p>
      ) : (
        <div className="grid gap-6">
          {withdrawals.map((w) => (
            <div
              key={w.id}
              className="bg-white p-4 rounded shadow flex flex-col md:flex-row gap-6"
            >
              <div className="flex-1">
                <p><strong>User ID:</strong> {w.userId}</p>
                <p><strong>Name:</strong> {w.fullName}</p>
                <p><strong>Amount:</strong> ₹{w.amount}</p>
                <p><strong>Method:</strong> {w.method}</p>
                {w.method === 'UPI' && <p><strong>UPI ID:</strong> {w.upiId}</p>}
                {w.method === 'Bank Transfer' && (
                  <>
                    <p><strong>Account:</strong> {w.account}</p>
                    <p><strong>IFSC:</strong> {w.ifsc}</p>
                  </>
                )}
                <p>
                  <strong>Status:</strong>{' '}
                  <span
                    className={`font-bold ${
                      w.status === 'approved'
                        ? 'text-green-600'
                        : w.status === 'rejected'
                        ? 'text-red-600'
                        : 'text-yellow-600'
                    }`}
                  >
                    {w.status.toUpperCase()}
                  </span>
                </p>

                {w.status === 'rejected' && w.reason && (
                  <p className="text-red-500 text-sm">❌ Reason: {w.reason}</p>
                )}
              </div>

              {w.status === 'pending' && (
                <div className="flex flex-col gap-3 w-full md:w-64">
                  <button
                    onClick={() => handleApprove(w.id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ✅ Approve
                  </button>
                  <textarea
                    placeholder="Reason for rejection"
                    className="border p-2 rounded text-sm"
                    value={rejectReason}
                    onChange={(e) => setRejectReason(e.target.value)}
                  />
                  <button
                    onClick={() => handleReject(w.id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    ❌ Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WithdrawalApprovals;
