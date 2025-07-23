import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminKycApproval = () => {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const userToken = localStorage.getItem("adglow_token");
    setToken(userToken);
    fetchKycRequests(userToken);
  }, []);

  const fetchKycRequests = async (token) => {
    try {
      const res = await axios.get(
        "https://your-backend-url.com/api/admin/kyc/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setKycList(res.data.kycs);
    } catch (error) {
      console.error("Error fetching KYC requests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKycAction = async (userId, status) => {
    try {
      await axios.post(
        "https://your-backend-url.com/api/admin/kyc/verify",
        { userId, status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchKycRequests(token); // Refresh list after action
    } catch (error) {
      console.error("Error updating KYC status:", error);
    }
  };

  const statusColor = {
    pending: "orange",
    approved: "green",
    rejected: "red",
  };

  if (loading) return <div>Loading KYC data...</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Admin KYC Approval Panel</h2>
      {kycList.length === 0 ? (
        <p>No KYC requests found.</p>
      ) : (
        <table border="1" cellPadding="10" style={{ width: "100%", marginTop: "20px" }}>
          <thead>
            <tr>
              <th>Full Name</th>
              <th>Document Type</th>
              <th>Document Number</th>
              <th>Front Image</th>
              <th>Back Image</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {kycList.map((kyc) => (
              <tr key={kyc._id}>
                <td>{kyc.fullName}</td>
                <td>{kyc.documentType}</td>
                <td>{kyc.documentNumber}</td>
                <td>
                  <img
                    src={`https://your-backend-url.com/${kyc.documentFront}`}
                    alt="Front"
                    width="100"
                  />
                </td>
                <td>
                  <img
                    src={`https://your-backend-url.com/${kyc.documentBack}`}
                    alt="Back"
                    width="100"
                  />
                </td>
                <td style={{ color: statusColor[kyc.status] }}>{kyc.status}</td>
                <td>
                  {kyc.status === "pending" ? (
                    <>
                      <button onClick={() => handleKycAction(kyc.user, "approved")}>Approve</button>
                      <button onClick={() => handleKycAction(kyc.user, "rejected")} style={{ marginLeft: "10px" }}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <span>Already {kyc.status}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminKycApproval;
