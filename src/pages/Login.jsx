import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      return alert("⚠️ Please enter both email and password");
    }

    try {
      setLoading(true);

      const res = await axios.post("https://adglow-backend.onrender.com/api/auth/login", {
        email: email.trim().toLowerCase(),
        password,
      });

      const { token, user } = res.data;

      // ✅ Save to localStorage
      localStorage.setItem("adglow_token", token);
      localStorage.setItem("adglow_user", JSON.stringify(user));

      // ✅ Set token in axios default headers
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      alert("✅ Login successful!");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("❌ Login Error:", err);
      alert(err?.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to AdGlow</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className={`w-full text-white py-2 rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? "Logging in..." : "🚀 Login"}
          </button>
        </form>

        <div className="text-center mt-4">
          <a href="/forgot-password" className="text-sm text-blue-600 hover:underline">
            Forgot your password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
