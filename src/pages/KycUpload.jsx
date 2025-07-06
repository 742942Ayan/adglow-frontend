import React, { useState } from 'react';

const KycUpload = () => {
  const [aadhaar, setAadhaar] = useState(null);
  const [pan, setPan] = useState(null);
  const [kycStatus, setKycStatus] = useState('Pending'); // "Pending", "Approved", "Rejected"

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!aadhaar || !pan) return alert("Upload both documents");

    // TODO: Connect to backend
    alert("📤 Documents uploaded! Your KYC is under review.");
    setKycStatus('Pending');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 flex justify-center items-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">KYC Upload</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Upload Aadhaar</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setAadhaar(e.target.files[0])}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Upload PAN</label>
            <input
              type="file"
              accept="image/*,.pdf"
              onChange={(e) => setPan(e.target.files[0])}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg"
          >
            📤 Submit for KYC
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="font-semibold">KYC Status:</p>
          <p className={`text-lg font-bold ${kycStatus === 'Approved' ? 'text-green-600' : kycStatus === 'Rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
            {kycStatus}
          </p>
        </div>
      </div>
    </div>
  );
};

export default KycUpload;
