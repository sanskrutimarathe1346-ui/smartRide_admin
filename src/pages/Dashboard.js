import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // 🔥 FETCH ALL PASSES
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/passes/all");

        const passes = res.data.passes || [];

        const total = passes.length;
        const pending = passes.filter(p => p.status === "pending").length;
        const approved = passes.filter(p => p.status === "approved").length;
        const rejected = passes.filter(p => p.status === "rejected").length;

        setStats({ total, pending, approved, rejected });

      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="bg-white shadow rounded-xl p-6 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 text-sm">Manage pass applications</p>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Applications</p>
          <h2 className="text-2xl font-bold text-blue-600">{stats.total}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Pending</p>
          <h2 className="text-2xl font-bold text-yellow-500">{stats.pending}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Approved</p>
          <h2 className="text-2xl font-bold text-green-600">{stats.approved}</h2>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Rejected</p>
          <h2 className="text-2xl font-bold text-red-500">{stats.rejected}</h2>
        </div>

      </div>

      {/* ACTION SECTION */}
      <div className="bg-white p-8 rounded-xl shadow text-center">

        <h2 className="text-lg font-semibold text-gray-700 mb-3">
          Manage Pass Applications
        </h2>

        <p className="text-gray-500 mb-5">
          Review and approve/reject user pass requests
        </p>

        <button
          onClick={() => navigate("/passes")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition"
        >
          Go to Applications
        </button>

      </div>

    </div>
  );
};

export default Dashboard;