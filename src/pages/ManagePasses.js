import React, { useEffect, useState } from "react";
import axios from "axios";

const ManagePasses = () => {
  const [passes, setPasses] = useState([]);

  useEffect(() => {
    fetchPasses();
  }, []);

  const fetchPasses = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/passes/all");
      const data = res.data.passes || res.data || [];
      setPasses(data);
    } catch (err) {
      console.error(err);
      setPasses([]);
    }
  };

  const handleApprove = async (id) => {
    await axios.put(`http://localhost:5000/api/passes/approve/${id}`);
    fetchPasses();
  };

  const handleReject = async (id) => {
    await axios.put(`http://localhost:5000/api/passes/reject/${id}`);
    fetchPasses();
  };

  // ✅ FIXED DOCUMENT OPEN
  const openDocument = (url) => {
    if (!url) return; // prevent null crash
    window.open(`http://localhost:5000/${url}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Manage Pass Applications
      </h1>

      <div className="space-y-4">
        {(passes || []).map((pass) => (
          <div
            key={pass._id}
            className="bg-white p-5 rounded-xl shadow border hover:shadow-lg transition"
          >
            {/* HEADER */}
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-lg font-semibold text-gray-800">
                {pass.name}
              </h2>

              <span
                className={`px-3 py-1 rounded-full text-sm font-medium
                  ${pass.status === "approved" && "bg-green-100 text-green-700"}
                  ${pass.status === "pending" && "bg-yellow-100 text-yellow-700"}
                  ${pass.status === "rejected" && "bg-red-100 text-red-700"}
                `}
              >
                {pass.status}
              </span>
            </div>

            {/* DETAILS */}
            <p className="text-gray-600">Type: {pass.passType}</p>
            <p className="text-gray-600 mb-3">Route: {pass.route}</p>

            {/* DOCUMENT BUTTONS */}
            {pass.documents && pass.documents.length > 0 && (
              <div className="mb-4">
                <p className="text-sm font-medium mb-2 text-gray-700">
                  Documents:
                </p>

                <div className="flex flex-wrap gap-2">
                  {pass.documents
                    .filter((doc) => doc) // ✅ remove null values
                    .map((doc, index) => (
                      <button
                        key={index}
                        onClick={() => openDocument(doc)}
                        className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 text-sm"
                      >
                        View Doc {index + 1}
                      </button>
                    ))}
                </div>
              </div>
            )}

            {/* ACTION BUTTONS */}
            {pass.status === "pending" && (
              <div className="flex gap-3">
                <button
                  onClick={() => handleApprove(pass._id)}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg"
                >
                  Approve
                </button>

                <button
                  onClick={() => handleReject(pass._id)}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManagePasses;