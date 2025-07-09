import React, { useState } from 'react';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    dob: '',
    gender: '',
    address: '',
    country: '',
    state: '',
    district: '',
    pincode: '',
    email: '',
    emailOtp: '',
    mobile: '',
    referralCode: '',
  });

  const [referrerName, setReferrerName] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendOtp = () => {
    if (!formData.email) return alert('Please enter your email first');
    setOtpSent(true);
    alert(`OTP sent to ${formData.email}`);
    // TODO: Integrate backend email OTP sender
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Submit form data to API
    console.log(formData);
    alert('✅ Registered Successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-4"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold text-center mb-4">Register to AdGlow</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="fullName" value={formData.fullName} onChange={handleChange} required placeholder="Full Name" className="input" />
          <input name="fatherName" value={formData.fatherName} onChange={handleChange} required placeholder="Father's Name" className="input" />
          
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} required className="input" />

          <select name="gender" value={formData.gender} onChange={handleChange} required className="input">
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>

          <input name="address" value={formData.address} onChange={handleChange} required placeholder="Full Address" className="input" />
          <input name="country" value={formData.country} onChange={handleChange} required placeholder="Country" className="input" />
          <input name="state" value={formData.state} onChange={handleChange} required placeholder="State" className="input" />
          <input name="district" value={formData.district} onChange={handleChange} required placeholder="District" className="input" />
          
          <input name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="PIN Code / Zipcode" className="input" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="Email" className="input" />
          
          <div className="flex space-x-2">
            <input name="emailOtp" value={formData.emailOtp} onChange={handleChange} required placeholder="Enter Email OTP" className="input w-full" />
            <button type="button" onClick={sendOtp} className="bg-blue-600 text-white px-3 rounded-lg">Send OTP</button>
          </div>

          <input name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile Number" className="input" />
          <input name="referralCode" value={formData.referralCode} onChange={(e) => {
            handleChange(e);
            setReferrerName("Zaki Ahmad"); // 🔁 TODO: Dynamic lookup
          }} required placeholder="Referral Code" className="input" />
        </div>

        {referrerName && (
          <p className="text-sm text-green-600">Referrer Name: {referrerName}</p>
        )}

        <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold">
          🚀 Register
        </button>
      </form>
    </div>
  );
};

export default Register;
