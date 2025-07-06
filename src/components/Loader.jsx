// src/components/Loader.jsx
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center py-6">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-blue-500 border-opacity-75"></div>
    </div>
  );
};

export default Loader;
