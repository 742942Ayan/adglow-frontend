import React, { useEffect, useState } from "react";
import axios from "axios";

const KycApprovals = () => {
  const [pendingKycList, setPendingKycList] = useState([]);

  const fetchPendingKyc = async () => {
    try {
      const token = localStorage.getItem("adglow_admin_token");
      const res = await axios.get("https://adglow-backend.onrender.com/api/admin/kyc-pending", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPendingKycList(res.data);
    } catch (error) {
      console.error("Failed to fetch KYC data:", error.message);
    }
  };

  const approveKyc = async (userId) => {
    try {
      const token = localStorage.getItem("adglow_admin_token");
      await axios.post(`https://adglow-backend.onrender.com/api/admin/kyc-approve/${userId}`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("KYC Approved Successfully");
      fetchPendingKyc(); // Refresh list
    } catch (error) {
      console.error("Approval Error:", error.message);
      alert("Failed to approve KYC");
    }
  };

  useEffect(() => {
    fetchPendingKyc();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Pending KYC Approvals</h2>

      {pendingKycList.length === 0 ? (
        <p>No pending KYC requests.</p>
      ) : (
        <div className="space-y-6">
          {pendingKycList.map((item) => (
            <div key={item._id} className="border p-4 rounded-md shadow">
              <p><strong>Full Name:</strong> {item.fullName}</p>
              <p><strong>Father's Name:</strong> {item.fatherName}</p>
              <p><strong>DOB:</strong> {item.dob}</p>
              <p><strong>Document Type:</strong> {item.kycDetails.documentType}</p>
              <p><strong>Document Number:</strong> {item.kycDetails.documentNumber}</p>
              <div className="flex gap-4 my-2">
                <div>
                  <p className="font-semibold">Front Image:</p>
                  <img
                    src={`https://adglow-backend.onrender.com/${item.kycDetails.documentFront}`}
                    alt="Front"
                    className="w-48 border rounded"
                  />
                </div>
                <div>
                  <p className="font-semibold">Back Image:</p>
                  <img
                    src={`https://adglow-backend.onrender.com/${item.kycDetails.documentBack}`}
                    alt="Back"
                    className="w-48 border rounded"
                  />
                </div>
              </div>
              <button
                onClick={() => approveKyc(item._id)}
                className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
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
