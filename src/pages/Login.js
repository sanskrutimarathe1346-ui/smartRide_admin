import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        form
      );

      // ✅ Save token (important for future APIs)
      localStorage.setItem("token", res.data.token);

      alert("Login successful");

      // ✅ Redirect to dashboard
      navigate("/dashboard");

    } catch (err) {
      console.error(err.response?.data || err.message);
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-600">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow w-96">

        <h2 className="text-xl font-bold mb-4">Admin Login</h2>

        <input
          placeholder="Email"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 mb-3"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button className="w-full bg-blue-600 text-white p-2">
          Login
        </button>

      </form>
    </div>
  );
};

export default Login;