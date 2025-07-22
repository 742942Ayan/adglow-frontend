import React, { useEffect, useState } from 'react';
import axios from 'axios';

const KycUpload = () => {
  const [form, setForm] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    documentType: '',
    documentNumber: '',
    frontImage: null,
    backImage: null,
  });

  const [userKyc, setUserKyc] = useState({});
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("adglow_token");

  useEffect(() => {
    if (!token) {
      alert("Session expired. Please log in again.");
      return;
    }

    axios.get("https://adglow-backend.onrender.com/api/user/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => setUserKyc(res.data))
      .catch(err => {
        console.error("Error loading profile:", err);
        alert("Failed to load profile. Please try logging in again.");
      });
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm(prev => ({ ...prev, [name]: files[0] }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!token) {
      alert("❌ You are not logged in. Please log in and try again.");
      return;
    }

    const { fullName, fatherName, dob, documentType, documentNumber, frontImage, backImage } = form;
    if (!fullName || !fatherName || !dob || !documentType || !documentNumber || !frontImage || !backImage) {
      return alert("Please fill all required fields.");
    }

    try {
      setLoading(true);
      const data = new FormData();
      Object.entries(form).forEach(([key, val]) => data.append(key, val));

      await axios.post("https://adglow-backend.onrender.com/api/user/kyc", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("✅ KYC submitted successfully!");
      window.location.reload();
    } catch (err) {
      console.error("KYC Submit Error:", err);
      if (err.response?.status === 401) {
        alert("❌ Unauthorized. Please log in again.");
      } else {
        alert("❌ KYC submission failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const {
    kycStatus,
    kycRejectionReason,
    kycAttempts,
    kycFrontImageUrl,
    kycBackImageUrl
  } = userKyc;

  const canSubmitKyc =
    !kycStatus ||
    (kycStatus === 'rejected' && kycAttempts < 5);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl">
        <h2 className="text-2xl font-bold text-center mb-4">📝 KYC Upload</h2>

        {kycStatus === 'approved' && <p className="text-green-600 text-center">✅ Your KYC is approved.</p>}
        {kycStatus === 'pending' && <p className="text-yellow-600 text-center">⌛ KYC is under review.</p>}
        {kycStatus === 'rejected' && (
          <div className="text-red-600 text-center mb-2">
            ❌ KYC Rejected ({kycAttempts || 0} attempts)<br />
            <span className="text-sm italic">Reason: {kycRejectionReason || "Not specified"}</span>
          </div>
        )}
        {kycStatus === 'rejected' && kycAttempts >= 5 && (
          <p className="text-center text-red-700 font-semibold">
            You have reached the maximum 5 attempts. You cannot re-upload KYC.
          </p>
        )}

        {(kycFrontImageUrl || kycBackImageUrl) && (
          <div className="grid grid-cols-2 gap-4 mt-4 mb-4">
            {kycFrontImageUrl && (
              <div>
                <p className="text-sm text-gray-700 mb-1">Front Image</p>
                <img src={kycFrontImageUrl} alt="Front Doc" className="w-full rounded border" />
              </div>
            )}
            {kycBackImageUrl && (
              <div>
                <p className="text-sm text-gray-700 mb-1">Back Image</p>
                <img src={kycBackImageUrl} alt="Back Doc" className="w-full rounded border" />
              </div>
            )}
          </div>
        )}

        {canSubmitKyc && (
          <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
            <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
            <input type="text" name="fatherName" placeholder="Father's Name" value={form.fatherName} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />

            <select name="documentType" value={form.documentType} onChange={handleChange} className="w-full px-4 py-2 border rounded" required>
              <option value="">-- Select Document Type --</option>
              <option value="Aadhar Card">Aadhar Card</option>
              <option value="PAN Card">PAN Card</option>
              <option value="Passport">Passport</option>
              <option value="Voter ID">Voter ID</option>
              <option value="Driving License">Driving License</option>
              <option value="National Identity Card">National Identity Card</option>
            </select>

            <input type="text" name="documentNumber" placeholder="Document Number" value={form.documentNumber} onChange={handleChange} className="w-full px-4 py-2 border rounded" required />

            <div>
              <label className="text-sm">Upload Front Side</label>
              <input type="file" name="frontImage" accept="image/*" onChange={handleChange} className="w-full" required />
            </div>

            <div>
              <label className="text-sm">Upload Back Side</label>
              <input type="file" name="backImage" accept="image/*" onChange={handleChange} className="w-full" required />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
              {loading ? "Submitting..." : "🚀 Submit KYC"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default KycUpload;
