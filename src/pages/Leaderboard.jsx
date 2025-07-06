import React from 'react';

const Leaderboard = () => {
  // Dummy static data — replace with backend API later
  const topUsers = [
    { name: 'Ayan Malik', earnings: 24200, level: 30 },
    { name: 'Rohit Singh', earnings: 21850, level: 28 },
    { name: 'Zoya Khan', earnings: 20190, level: 27 },
    { name: 'Arjun Verma', earnings: 17890, level: 25 },
    { name: 'Neha Sharma', earnings: 16500, level: 22 },
    { name: 'Dev Yadav', earnings: 15200, level: 20 },
    { name: 'Iqbal Sheikh', earnings: 14100, level: 18 },
    { name: 'Rina Patel', earnings: 13200, level: 16 },
    { name: 'Kaif Ali', earnings: 12600, level: 14 },
    { name: 'Ravi Mehta', earnings: 11900, level: 12 },
  ];

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
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-semibold">{getBadge(index)}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3 text-green-700 font-bold">₹{user.earnings.toLocaleString()}</td>
                  <td className="p-3">Level {user.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
