import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WithdrawalApprovals = () => {
  const [withdrawals, setWithdrawals] = useState([]);
  const [reasons, setReasons] = useState({});
  const [loading, setLoading] = useState(false);

  const API = 'https://adglow-backend.onrender.com';

  const fetchWithdrawals = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adglow_admin_token');
      const res = await axios.get(`${API}/api/admin/withdrawals`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWithdrawals(res.data || []);
    } catch (err) {
      console.error('Error fetching withdrawals:', err.message);
      alert('Failed to fetch withdrawal requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id) => {
    try {
      const token = localStorage.getItem('adglow_admin_token');
      await axios.post(`${API}/api/admin/withdrawals/approve/${id}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`✅ Withdrawal #${id} approved`);
      fetchWithdrawals();
    } catch (err) {
      console.error('Approve error:', err.message);
      alert('Failed to approve withdrawal');
    }
  };

  const handleReject = async (id) => {
    const reason = reasons[id];
    if (!reason?.trim()) {
      return alert('Please provide a reason for rejection');
    }

    try {
      const token = localStorage.getItem('adglow_admin_token');
      await axios.post(`${API}/api/admin/withdrawals/reject/${id}`, { reason }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert(`❌ Withdrawal #${id} rejected`);
      setReasons((prev) => ({ ...prev, [id]: '' }));
      fetchWithdrawals();
    } catch (err) {
      console.error('Reject error:', err.message);
      alert('Failed to reject withdrawal');
    }
  };

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-6">💰 Withdrawal Approvals</h1>

      {loading ? (
        <p>Loading...</p>
      ) : withdrawals.length === 0 ? (
        <p>No withdrawal requests.</p>
      ) : (
        <div className="grid gap-6">
          {withdrawals.map((w) => (
            <div
              key={w._id}
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
                    onClick={() => handleApprove(w._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    ✅ Approve
                  </button>
                  <textarea
                    placeholder="Reason for rejection"
                    className="border p-2 rounded text-sm"
                    value={reasons[w._id] || ''}
                    onChange={(e) =>
                      setReasons((prev) => ({ ...prev, [w._id]: e.target.value }))
                    }
                  />
                  <button
                    onClick={() => handleReject(w._id)}
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
