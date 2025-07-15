// src/pages/KycUpload.jsx
import React, { useState } from 'react';
import axios from 'axios';

const KycUpload = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    documentType: '',
    documentNumber: '',
    frontImage: null,
    backImage: null,
  });

  const [loading, setLoading] = useState(false);

  const documentOptions = [
    'Aadhar Card',
    'PAN Card',
    'Passport',
    'Voter ID',
    'Driving License',
    'National Identity Card'
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      fullName,
      fatherName,
      dob,
      documentType,
      documentNumber,
      frontImage,
      backImage
    } = formData;

    if (!fullName || !fatherName || !dob || !documentType || !documentNumber || !frontImage || !backImage) {
      return alert("Please fill all required fields.");
    }

    const token = localStorage.getItem("adglow_token");
    if (!token) {
      alert("Please login first.");
      return;
    }

    try {
      setLoading(true);
      const data = new FormData();
      data.append('fullName', fullName);
      data.append('fatherName', fatherName);
      data.append('dob', dob);
      data.append('documentType', documentType);
      data.append('documentNumber', documentNumber);
      data.append('frontImage', frontImage);
      data.append('backImage', backImage);

      const res = await axios.post("https://adglow-backend.onrender.com/api/user/kyc", data, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      alert("✅ KYC submitted successfully!");
    } catch (err) {
      console.error("❌ KYC Upload Error:", err);
      alert(err.response?.data?.message || "KYC upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl space-y-4"
        encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold text-center mb-4">📄 KYC Document Submission</h2>

        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={formData.fatherName}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={formData.dob}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <select
          name="documentType"
          value={formData.documentType}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        >
          <option value="">Select Document Type</option>
          {documentOptions.map((doc, idx) => (
            <option key={idx} value={doc}>{doc}</option>
          ))}
        </select>

        <input
          type="text"
          name="documentNumber"
          placeholder="Document Number"
          value={formData.documentNumber}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg"
          required
        />

        <div>
          <label className="block mb-1">Upload Front Side (Image):</label>
          <input
            type="file"
            name="frontImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <div>
          <label className="block mb-1">Upload Back Side (Image):</label>
          <input
            type="file"
            name="backImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Submitting..." : "🚀 Submit KYC"}
        </button>
      </form>
    </div>
  );
};

export default KycUpload;
