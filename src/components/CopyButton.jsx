// src/components/CopyButton.jsx
import React from 'react';
import { copyToClipboard } from '../utils/copyToClipboard';

const CopyButton = ({ text }) => {
  return (
    <button
      onClick={() => copyToClipboard(text)}
      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded ml-2"
    >
      Copy
    </button>
  );
};

export default CopyButton;
