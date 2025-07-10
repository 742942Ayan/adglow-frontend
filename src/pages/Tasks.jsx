import React, { useState, useEffect } from 'react';

const platforms = ['YouTube', 'Instagram', 'Facebook', 'Telegram', 'Flipkart', 'Amazon', 'Meesho', 'Myntra'];

const mockTasks = [
  {
    id: 1,
    platform: 'YouTube',
    type: 'Subscribe',
    link: 'https://youtube.com/example',
    description: 'Subscribe to channel XYZ',
    reward: 10,
    time: 30,
  },
  {
    id: 2,
    platform: 'Instagram',
    type: 'Follow',
    link: 'https://instagram.com/example',
    description: 'Follow profile ABC',
    reward: 8,
    time: 15,
  },
];

const Tasks = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('YouTube');
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const filtered = mockTasks.filter((task) => task.platform === selectedPlatform);
    setTasks(filtered);
  }, [selectedPlatform]);

  const handleStartTask = (task) => {
    window.open(task.link, '_blank');
  };

  const handleMarkAsDone = (task) => {
    alert(`✅ Task marked as done!\nReward ₹${task.reward * 0.5} will be added to your wallet.\nRemaining will go to your uplines.`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">🧩 Task Center</h1>

      <div className="flex gap-2 mb-4 flex-wrap">
        {platforms.map((p) => (
          <button
            key={p}
            onClick={() => setSelectedPlatform(p)}
            className={`px-3 py-1 rounded ${selectedPlatform === p ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
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
            <div key={task.id} className="p-4 border rounded shadow-sm bg-white">
              <h2 className="text-lg font-semibold">{task.type}</h2>
              <p>{task.description}</p>
              <p className="text-sm text-gray-600">Time to watch: {task.time}s</p>
              <p className="text-sm text-green-700">Reward: ₹{task.reward}</p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleStartTask(task)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Start Task
                </button>
                <button
                  onClick={() => handleMarkAsDone(task)}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Mark as Done
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
