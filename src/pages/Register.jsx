import React, { useState } from 'react';
import { isValidEmail } from '../utils/validators';
import { generateOTP } from '../utils/generateOTP';
import api from '../utils/api';

const Register = () => {
  const [form, setForm] = useState({
    name: '',
    fatherName: '',
    email: '',
    village: '',
    state: '',
    country: '',
    mobile: '',
    referralCode: '',
    emailOTP: '',
  });

  const [generatedOTP, setGeneratedOTP] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSendOTP = () => {
    if (!isValidEmail(form.email)) {
      alert('Please enter a valid email.');
      return;
    }

    const otp = generateOTP();
    setGeneratedOTP(otp);
    setOtpSent(true);

    // 🔄 Replace with actual backend call later
    console.log(`Simulated email OTP: ${otp}`);
    alert('OTP sent to your email (simulated)');
  };

  const handleVerifyOTP = () => {
    if (form.emailOTP === generatedOTP) {
      setEmailVerified(true);
      alert('✅ Email verified successfully!');
    } else {
      alert('❌ Invalid OTP');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!emailVerified) {
      alert('Please verify your email first.');
      return;
    }

    for (const key in form) {
      if (!form[key] && key !== 'emailOTP') {
        alert(`Please fill ${key} field.`);
        return;
      }
    }

    alert('✅ Registration successful (Simulated)');
    // TODO: Send data to backend here using api.post('/register', form)
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl p-6 rounded-xl w-full max-w-xl space-y-4"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Register to AdGlow</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="fatherName"
          placeholder="Father's Name"
          value={form.fatherName}
          onChange={handleChange}
          required
          className="input"
        />
        <div className="flex gap-2">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="input flex-1"
            disabled={emailVerified}
          />
          <button
            type="button"
            onClick={handleSendOTP}
            className="btn"
            disabled={otpSent || emailVerified}
          >
            Send OTP
          </button>
        </div>

        {otpSent && !emailVerified && (
          <div className="flex gap-2">
            <input
              type="text"
              name="emailOTP"
              placeholder="Enter OTP"
              value={form.emailOTP}
              onChange={handleChange}
              className="input flex-1"
            />
            <button type="button" onClick={handleVerifyOTP} className="btn">
              Verify OTP
            </button>
          </div>
        )}

        <input
          type="text"
          name="village"
          placeholder="Village/Town"
          value={form.village}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={form.state}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={form.country}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="tel"
          name="mobile"
          placeholder="Mobile Number"
          value={form.mobile}
          onChange={handleChange}
          required
          className="input"
        />
        <input
          type="text"
          name="referralCode"
          placeholder="Referral Code"
          value={form.referralCode}
          onChange={handleChange}
          required
          className="input"
        />

        <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
