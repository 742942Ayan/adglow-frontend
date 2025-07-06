// src/components/AdCard.jsx
import React from 'react';

const AdCard = ({ ad, onWatch }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4 flex flex-col items-center gap-2">
      <img
        src={ad.thumbnail || 'https://via.placeholder.com/300x150?text=Ad'}
        alt={ad.title}
        className="rounded w-full h-40 object-cover"
      />
      <h3 className="text-lg font-semibold">{ad.title}</h3>
      <p className="text-sm text-gray-500">{ad.description}</p>
      <p className="text-sm text-green-600">Earn: ₹{ad.reward}</p>
      <button
        onClick={() => onWatch(ad)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-full text-sm"
      >
        Watch Now
      </button>
    </div>
  );
};

export default AdCard;
