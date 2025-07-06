import React from 'react';

const TeamTree = () => {
  // TODO: Replace with API response
  const referralData = Array.from({ length: 30 }, (_, i) => ({
    level: i + 1,
    members: Math.floor(Math.random() * 50), // Dummy random members
  }));

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">🌳 My Team (Referral Tree)</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {referralData.map((level) => (
            <div
              key={level.level}
              className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
            >
              <p className="text-sm text-gray-600">Level {level.level}</p>
              <p className="text-xl font-bold text-blue-600">{level.members} Members</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TeamTree;
