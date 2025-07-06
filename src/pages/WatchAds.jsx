import React, { useState, useEffect } from 'react';

const WatchAds = () => {
  const [timeLeft, setTimeLeft] = useState(30); // 30 sec timer
  const [watched, setWatched] = useState(false);
  const [rewarded, setRewarded] = useState(false);

  useEffect(() => {
    let timer;
    if (timeLeft > 0 && !watched) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0) {
      setWatched(true);
    }
    return () => clearInterval(timer);
  }, [timeLeft, watched]);

  const handleClaimReward = () => {
    // TODO: API call to credit earning
    setRewarded(true);
    alert('🎉 ₹2 credited to your wallet!');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-lg text-center">
        <h2 className="text-2xl font-bold mb-4">📺 Watch & Earn</h2>

        {!watched ? (
          <div className="space-y-4">
            <p className="text-lg">Ad playing... Please wait</p>
            <p className="text-4xl font-bold text-blue-600">{timeLeft}s</p>
            <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-600">[ Sample Ad Area ]</span>
            </div>
          </div>
        ) : !rewarded ? (
          <div className="space-y-4">
            <p className="text-lg text-green-600 font-semibold">Ad Completed ✅</p>
            <button
              onClick={handleClaimReward}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg"
            >
              💰 Claim ₹2 Reward
            </button>
          </div>
        ) : (
          <p className="text-lg text-purple-600 font-bold">🎉 Reward Claimed!</p>
        )}
      </div>
    </div>
  );
};

export default WatchAds;
