import React, { useState } from 'react';
import OtpInput from '../components/OtpInput';
import { useNavigate } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const sendOtp = (e) => {
    e.preventDefault();
    // TODO: Send OTP API
    console.log("Sending OTP to:", email);
    setOtpSent(true);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    // TODO: Verify OTP API
    console.log("Verifying OTP:", otp);
    alert("OTP Verified ✅");
    navigate("/reset-password", { state: { email } }); // pass email to reset
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Forgot Password</h2>

        {!otpSent ? (
          <form onSubmit={sendOtp} className="space-y-4">
            <input
              type="email"
              placeholder="Enter your registered email"
              className="w-full px-4 py-2 border rounded-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Send OTP
            </button>
          </form>
        ) : (
          <form onSubmit={verifyOtp} className="space-y-4">
            <OtpInput value={otp} onChange={setOtp} />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
