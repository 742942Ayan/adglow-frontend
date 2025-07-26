import React, { useState, useEffect } from 'react';
import { sendReferralEarnings } from '../api/referralApi';
import { getUserWallet } from '../api/userApi';

const platforms = ['YouTube', 'Instagram', 'Facebook', 'Telegram', 'Flipkart', 'Amazon', 'Meesho', 'Myntra'];

const mockTasks = [
  // Same as before, your mock task array here...
];

const Tasks = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('YouTube');
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [timer, setTimer] = useState(0);
  const [wallet, setWallet] = useState(null);

  const userToken = localStorage.getItem("token"); // Assumes token is stored here

  useEffect(() => {
    const filtered = mockTasks.filter((task) => task.platform === selectedPlatform);
    setTasks(filtered);
    setActiveTask(null);
    setTimer(0);
  }, [selectedPlatform]);

  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleStartTask = (task) => {
    setActiveTask(task.id);
    setTimer(task.time);
    window.open(task.link, '_blank');
  };

  const handleMarkAsDone = async (task) => {
    if (activeTask !== task.id || timer > 0) {
      alert('⏳ Please wait until the required time has passed before marking the task as done.');
      return;
    }

    try {
      const totalReward = task.reward;

      // ✅ Trigger referral distribution
      await sendReferralEarnings(totalReward, userToken);

      // ✅ Update user wallet UI
      const updatedWallet = await getUserWallet(userToken);
      setWallet(updatedWallet);

      alert(`✅ Task marked as completed!\n₹${totalReward * 0.5} added to your wallet.\nRemaining ₹${totalReward * 0.5} distributed to your uplines.`);
    } catch (error) {
      console.error("Referral earning error:", error);
      alert("❌ Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">📋 Task Center</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPlatform(p)}
            className={`px-4 py-2 rounded-full text-sm ${
              selectedPlatform === p ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {tasks.length === 0 ? (
        <p className="text-gray-600">No tasks available for {selectedPlatform}</p>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-lg font-semibold">{task.type} Task</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-500">Time Required: {task.time}s</p>
              <p className="text-sm text-green-600">Reward: ₹{task.reward}</p>

              {activeTask === task.id && timer > 0 && (
                <p className="text-red-500 font-medium mt-1">⏱ Please wait: {timer} seconds...</p>
              )}

              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => handleStartTask(task)}
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  🔗 Start Task
                </button>
                <button
                  onClick={() => handleMarkAsDone(task)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                >
                  ✅ Mark as Done
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
