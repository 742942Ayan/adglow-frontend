import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Leaderboard = () => {
  const [topUsers, setTopUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get('/api/leaderboard');
        setTopUsers(res.data.topUsers || []);
      } catch (err) {
        console.error('Failed to load leaderboard:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  const getBadge = (rank) => {
    if (rank === 0) return '🥇';
    if (rank === 1) return '🥈';
    if (rank === 2) return '🥉';
    return `#${rank + 1}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-bold text-center mb-6">🏆 Top 10 Earners</h2>

        {loading ? (
          <p className="text-center text-gray-600">Loading leaderboard...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Earnings (₹)</th>
                  <th className="p-3 text-left">Level</th>
                </tr>
              </thead>
              <tbody>
                {topUsers.map((user, index) => (
                  <tr key={user._id || index} className="border-b hover:bg-gray-50">
                    <td className="p-3 font-semibold">{getBadge(index)}</td>
                    <td className="p-3">{user.fullName}</td>
                    <td className="p-3 text-green-700 font-bold">
                      ₹{user.totalEarnings.toLocaleString()}
                    </td>
                    <td className="p-3">Level {user.referralLevel}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
