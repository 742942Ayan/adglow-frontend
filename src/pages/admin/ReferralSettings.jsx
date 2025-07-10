import React, { useState } from 'react';

const defaultPercentages = Array(30).fill((50 / 30).toFixed(2)); // 1.66%

const ReferralSettings = () => {
  const [percentages, setPercentages] = useState(defaultPercentages);

  const handleChange = (index, value) => {
    const newPercents = [...percentages];
    newPercents[index] = value;
    setPercentages(newPercents);
  };

  const handleSave = () => {
    const total = percentages.reduce((sum, val) => sum + parseFloat(val), 0);
    if (total !== 50) {
      alert(`❌ Total must be 50%, currently it's ${total.toFixed(2)}%`);
      return;
    }
    // 🔗 Send to backend API (replace URL)
    fetch('/api/admin/referral-settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ percentages }),
    })
      .then((res) => res.json())
      .then(() => alert('✅ Referral settings saved!'))
      .catch(() => alert('❌ Error saving settings'));
  };

  const handleReset = () => {
    setPercentages(defaultPercentages);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">⚙️ Referral Commission Settings</h1>
      <p className="mb-4 text-gray-600">Distribute 50% reward across 30 levels.</p>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {percentages.map((percent, index) => (
          <div key={index} className="flex items-center gap-2">
            <label className="w-14 font-semibold">L{index + 1}</label>
            <input
              type="number"
              value={percent}
              step="0.01"
              onChange={(e) => handleChange(index, e.target.value)}
              className="border px-2 py-1 rounded w-24"
            />
            <span>%</span>
          </div>
        ))}
      </div>

      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          💾 Save Settings
        </button>
        <button
          onClick={handleReset}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ♻️ Reset to Default
        </button>
      </div>
    </div>
  );
};

export default ReferralSettings;
