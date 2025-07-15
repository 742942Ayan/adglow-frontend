import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      return alert("कृपया ईमेल और पासवर्ड भरें");
    }

    try {
      setLoading(true);

      // 🔐 API कॉल
      const res = await axios.post("https://adglow-backend.onrender.com/api/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = res.data;

      // ✅ LocalStorage में token और user सेव करें
      localStorage.setItem("token", token); // ✅ IMPORTANT - यहीं सुधार हुआ है
      localStorage.setItem("adglow_user", JSON.stringify(user));

      alert("✅ लॉगिन सफल");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Login Error:", err);
      alert(err.response?.data?.message || "❌ लॉगिन असफल");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">AdGlow में लॉगिन करें</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="अपना ईमेल डालें"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="अपना पासवर्ड डालें"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "लॉगिन हो रहा है..." : "🚀 लॉगिन"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            पासवर्ड भूल गए?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
