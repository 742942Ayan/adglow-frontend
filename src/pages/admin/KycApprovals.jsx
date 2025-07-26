import React, { useEffect, useState } from "react";
import axios from "axios";

const KycApprovals = () => {
  const [pendingKycList, setPendingKycList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingKyc = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("adglow_admin_token");
      const res = await axios.get("https://adglow-backend.onrender.com/api/admin/kyc-pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingKycList(res.data || []);
    } catch (error) {
      console.error("Failed to fetch KYC data:", error);
      alert("❌ Failed to load KYC requests");
    } finally {
      setLoading(false);
    }
  };

  const approveKyc = async (userId) => {
    try {
      const token = localStorage.getItem("adglow_admin_token");
      await axios.post(
        `https://adglow-backend.onrender.com/api/admin/kyc-approve/${userId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ KYC Approved Successfully");
      fetchPendingKyc();
    } catch (error) {
      console.error("Approval Error:", error);
      alert("❌ Failed to approve KYC");
    }
  };

  useEffect(() => {
    fetchPendingKyc();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending KYC Approvals</h2>

      {loading ? (
        <p>Loading...</p>
      ) : pendingKycList.length === 0 ? (
        <p>No pending KYC requests.</p>
      ) : (
        <div className="space-y-6">
          {pendingKycList.map((user) => (
            <div key={user._id} className="border p-4 rounded-md shadow">
              <p><strong>Full Name:</strong> {user.fullName}</p>
              <p><strong>Father's Name:</strong> {user.fatherName}</p>
              <p><strong>Date of Birth:</strong> {user.dob}</p>
              <p><strong>Document Type:</strong> {user.kycDetails?.documentType}</p>
              <p><strong>Document Number:</strong> {user.kycDetails?.documentNumber}</p>

              <div className="flex gap-6 mt-3">
                <div>
                  <p className="font-semibold">Front Image:</p>
                  <img
                    src={`https://adglow-backend.onrender.com/${user.kycDetails?.documentFront}`}
                    alt="Front Document"
                    className="w-48 border rounded"
                  />
                </div>
                <div>
                  <p className="font-semibold">Back Image:</p>
                  <img
                    src={`https://adglow-backend.onrender.com/${user.kycDetails?.documentBack}`}
                    alt="Back Document"
                    className="w-48 border rounded"
                  />
                </div>
              </div>

              <button
                onClick={() => approveKyc(user._id)}
                className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Approve KYC
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default KycApprovals;
