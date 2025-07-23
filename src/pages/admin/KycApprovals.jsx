import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminKycApproval = () => {
  const [kycList, setKycList] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchKycRequests = async () => {
    try {
      const token = localStorage.getItem("adglow_admin_token");
      const res = await axios.get("https://your-backend-url/api/admin/kyc-requests", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setKycList(res.data);
    } catch (error) {
      console.error("Error fetching KYC data", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (kycId, action) => {
    try {
      const token = localStorage.getItem("adglow_admin_token");
      await axios.post(
        `https://your-backend-url/api/admin/kyc-${action}`,
        { kycId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Refresh list
      fetchKycRequests();
    } catch (error) {
      console.error(`Error on KYC ${action}`, error);
    }
  };

  useEffect(() => {
    fetchKycRequests();
  }, []);

  if (loading) return <p>Loading KYC requests...</p>;

  return (
    <div style={styles.container}>
      <h2>Pending KYC Approvals</h2>
      {kycList.length === 0 ? (
        <p>No pending KYC submissions.</p>
      ) : (
        kycList.map((kyc) => (
          <div key={kyc._id} style={styles.card}>
            <p><strong>Full Name:</strong> {kyc.fullName}</p>
            <p><strong>Father's Name:</strong> {kyc.fatherName}</p>
            <p><strong>DOB:</strong> {kyc.dob}</p>
            <p><strong>Document Type:</strong> {kyc.documentType}</p>
            <p><strong>Document Number:</strong> {kyc.documentNumber}</p>
            <div style={styles.images}>
              <div>
                <p>Front Image:</p>
                <img src={kyc.frontImage} alt="Front" style={styles.img} />
              </div>
              <div>
                <p>Back Image:</p>
                <img src={kyc.backImage} alt="Back" style={styles.img} />
              </div>
            </div>
            <div style={styles.buttons}>
              <button onClick={() => handleAction(kyc._id, "approve")} style={styles.approve}>Approve</button>
              <button onClick={() => handleAction(kyc._id, "reject")} style={styles.reject}>Reject</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    marginBottom: "20px",
    backgroundColor: "#f9f9f9",
  },
  images: {
    display: "flex",
    gap: "20px",
    marginTop: "10px",
  },
  img: {
    width: "200px",
    height: "auto",
    borderRadius: "5px",
  },
  buttons: {
    marginTop: "15px",
  },
  approve: {
    backgroundColor: "green",
    color: "#fff",
    padding: "10px 15px",
    marginRight: "10px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
  reject: {
    backgroundColor: "red",
    color: "#fff",
    padding: "10px 15px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default AdminKycApproval;
