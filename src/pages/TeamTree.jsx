// 📁 src/pages/TeamTree.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const TeamTree = () => {
  const [tree, setTree] = useState([]);
  const [expandedLevels, setExpandedLevels] = useState([1]);

  const token = localStorage.getItem("adglow_token");

  useEffect(() => {
    const fetchTree = async () => {
      try {
        const res = await axios.get("/api/referral/tree", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTree(res.data.tree);
      } catch (err) {
        console.error(err);
      }
    };

    fetchTree();
  }, []);

  const toggleLevel = (level) => {
    setExpandedLevels((prev) =>
      prev.includes(level)
        ? prev.filter((l) => l !== level)
        : [...prev, level]
    );
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Your Referral Tree</h2>
      {Array.from({ length: 30 }, (_, i) => {
        const level = i + 1;
        const users = tree.filter((u) => u.level === level);
        if (users.length === 0) return null;

        return (
          <div key={level} className="mb-3">
            <button
              onClick={() => toggleLevel(level)}
              className="bg-blue-500 text-white px-4 py-1 rounded"
            >
              {expandedLevels.includes(level)
                ? `Hide Level ${level}`
                : `Show Level ${level}`}{" "}
              ({users.length})
            </button>
            {expandedLevels.includes(level) && (
              <div className="ml-4 mt-2 space-y-1">
                {users.map((user) => (
                  <div
                    key={user._id}
                    className="bg-gray-100 p-2 rounded shadow text-sm"
                  >
                    👤 {user.fullName} ({user.email})
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default TeamTree;
