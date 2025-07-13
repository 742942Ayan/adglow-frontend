import React, { useState } from 'react';
import axios from 'axios';

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
    password: '',
    confirmPassword: '',
  });

  const [referrerName, setReferrerName] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // ✅ STEP 1: Send OTP (create temporary user)
  const sendOtp = async () => {
    const {
      fullName, fatherName, dob, gender, address,
      country, state, district, pincode, email,
      mobile, referralCode, password, confirmPassword
    } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      return alert('Please fill required fields including password');
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      setLoading(true);
      const res = await axios.post('https://adglow-backend.onrender.com/api/auth/register', {
        fullName,
        fatherName,
        dob,
        gender,
        address,
        country,
        state,
        district,
        pincode,
        email,
        mobile,
        password,
        referredBy: referralCode || ""
      });
      setOtpSent(true);
      setMessage(`✅ OTP sent to ${email}`);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '❌ Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  // ✅ STEP 2: Verify OTP
  const verifyOtp = async () => {
    if (!formData.email || !formData.emailOtp) {
      return alert("Please enter both Email and OTP");
    }

    try {
      setLoading(true);
      const res = await axios.post('https://adglow-backend.onrender.com/api/auth/verify-otp', {
        email: formData.email,
        otp: formData.emailOtp
      });

      alert('✅ OTP verified successfully!');
      setEmailVerified(true);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || '❌ OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form className="bg-white p-6 rounded-xl shadow-md w-full max-w-2xl space-y-4">
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
          <input name="mobile" value={formData.mobile} onChange={handleChange} required placeholder="Mobile Number" className="input" />
          <input name="referralCode" value={formData.referralCode} onChange={(e) => {
            handleChange(e);
            setReferrerName("Zaki Ahmad");
          }} required placeholder="Referral Code" className="input" />
          {referrerName && (
            <p className="text-sm text-green-600">Referrer Name: {referrerName}</p>
          )}

          <input type="password" name="password" value={formData.password} onChange={handleChange} required placeholder="Create Password" className="input" />
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Confirm Password" className="input" />
        </div>

        {/* ✅ OTP Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <input name="emailOtp" value={formData.emailOtp} onChange={handleChange} placeholder="Enter OTP" className="input" />

          {!emailVerified ? (
            <>
              <button type="button" onClick={sendOtp} className="bg-blue-600 text-white px-4 py-2 rounded-md" disabled={loading}>
                {loading ? "Sending..." : "Send OTP"}
              </button>
              <button type="button" onClick={verifyOtp} className="bg-green-600 text-white px-4 py-2 rounded-md" disabled={loading || !otpSent}>
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          ) : (
            <p className="text-green-600">✅ Email Verified</p>
          )}
        </div>

        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            if (!emailVerified) return alert("Please verify your email before registering.");
            alert("✅ Registration completed!");
            // You can redirect or handle final step here
          }}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold"
        >
          🚀 Register
        </button>

        {message && <p className="text-center text-blue-600">{message}</p>}
      </form>
    </div>
  );
};

export default Register;
