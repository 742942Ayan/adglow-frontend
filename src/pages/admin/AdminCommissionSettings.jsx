import React, { useState } from 'react';

const AdminCommissionSettings = () => {
  const [totalLevels, setTotalLevels] = useState(7);
  const [commissions, setCommissions] = useState(Array(7).fill(7.14));

  const handleLevelChange = (e) => {
    const levels = parseInt(e.target.value);
    setTotalLevels(levels);
    const newCommissions = Array(levels).fill(+(50 / levels).toFixed(2));
    setCommissions(newCommissions);
  };

  const handleCommissionChange = (index, value) => {
    const updated = [...commissions];
    updated[index] = parseFloat(value);
    setCommissions(updated);
  };

  const handleSave = () => {
    const total = commissions.reduce((a, b) => a + b, 0);
    if (total !== 50) {
      alert(`❌ Total commission must equal 50%. Currently: ${total}%`);
      return;
    }

    // 🟡 Send to backend (replace with real API)
    console.log('Saving commission settings:', { totalLevels, commissions });
    alert('✅ Commission structure saved!');
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🎯 Commission Settings</h1>

      <label className="block mb-2 font-medium">Total Levels (1–30)</label>
      <input
        type="number"
        min={1}
        max={30}
        value={totalLevels}
        onChange={handleLevelChange}
        className="border px-3 py-1 mb-4 rounded w-full"
      />

      <div className="space-y-2 mb-6">
        {commissions.map((value, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <label className="w-16 font-semibold">L{idx + 1}</label>
            <input
              type="number"
              step="0.01"
              value={value}
              onChange={(e) => handleCommissionChange(idx, e.target.value)}
              className="border px-3 py-1 rounded w-32"
            />
            <span>%</span>
          </div>
        ))}
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        💾 Save Settings
      </button>
    </div>
  );
};

export default AdminCommissionSettings;
