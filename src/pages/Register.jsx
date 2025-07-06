import React, { useState } from 'react';
import OtpInput from '../components/OtpInput';

const Register = () => {
  const [step, setStep] = useState(1); // 1: info, 2: OTP
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    referralCode: '',
  });
  const [otp, setOtp] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const sendOtp = (e) => {
    e.preventDefault();
    // TODO: Send OTP to email API
    console.log('OTP sent to:', formData.email);
    setStep(2);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    // TODO: Verify OTP and register user
    console.log('Verifying OTP:', otp);
    alert('✅ Registered Successfully!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Register to AdGlow</h2>

        {step === 1 ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg"
            />
            <input
              type="text"
              name="referralCode"
              placeholder="Referral Code (Optional)"
              value={formData.referralCode}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg"
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <OtpInput value={otp} onChange={setOtp} />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
            >
              Verify & Register
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Register;

