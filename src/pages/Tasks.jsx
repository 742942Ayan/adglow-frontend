import React, { useState, useEffect } from 'react';

const platforms = ['YouTube', 'Instagram', 'Facebook', 'Telegram', 'Flipkart', 'Amazon', 'Meesho', 'Myntra'];

const mockTasks = [
  // YouTube
  {
    id: 1,
    platform: 'YouTube',
    type: 'Subscribe',
    link: 'https://youtube.com/@openai',
    description: 'Subscribe to OpenAI YouTube Channel',
    reward: 10,
    time: 30,
  },
  {
    id: 2,
    platform: 'YouTube',
    type: 'Like',
    link: 'https://youtube.com/@openai',
    description: 'Like the latest video on OpenAI channel',
    reward: 6,
    time: 20,
  },
  {
    id: 3,
    platform: 'YouTube',
    type: 'Comment',
    link: 'https://youtube.com/@openai',
    description: 'Comment something meaningful on latest video',
    reward: 7,
    time: 30,
  },

  // Instagram
  {
    id: 4,
    platform: 'Instagram',
    type: 'Follow',
    link: 'https://instagram.com/example',
    description: 'Follow this Instagram profile',
    reward: 8,
    time: 15,
  },
  {
    id: 5,
    platform: 'Instagram',
    type: 'Like',
    link: 'https://instagram.com/example-post',
    description: 'Like the given Instagram post',
    reward: 5,
    time: 10,
  },
  {
    id: 6,
    platform: 'Instagram',
    type: 'Comment',
    link: 'https://instagram.com/example-post',
    description: 'Comment on the Instagram post',
    reward: 6,
    time: 15,
  },

  // Facebook
  {
    id: 7,
    platform: 'Facebook',
    type: 'Follow',
    link: 'https://facebook.com/example',
    description: 'Follow the Facebook page',
    reward: 8,
    time: 15,
  },
  {
    id: 8,
    platform: 'Facebook',
    type: 'Like',
    link: 'https://facebook.com/example-post',
    description: 'Like the Facebook post',
    reward: 5,
    time: 10,
  },
  {
    id: 9,
    platform: 'Facebook',
    type: 'Comment',
    link: 'https://facebook.com/example-post',
    description: 'Comment on the post',
    reward: 6,
    time: 15,
  },
  {
    id: 10,
    platform: 'Facebook',
    type: 'Video Watch',
    link: 'https://facebook.com/example-video',
    description: 'Watch full Facebook video',
    reward: 9,
    time: 60,
  },

  // Telegram
  {
    id: 11,
    platform: 'Telegram',
    type: 'Join Channel',
    link: 'https://t.me/example_channel',
    description: 'Join Telegram channel',
    reward: 5,
    time: 10,
  },

  // Flipkart
  {
    id: 12,
    platform: 'Flipkart',
    type: 'Product Share',
    link: 'https://flipkart.com/product-id',
    description: 'Share this Flipkart product with others',
    reward: 10,
    time: 20,
  },

  // Amazon
  {
    id: 13,
    platform: 'Amazon',
    type: 'Product View',
    link: 'https://amazon.in/product-id',
    description: 'View this Amazon product for given time',
    reward: 10,
    time: 30,
  },

  // Meesho
  {
    id: 14,
    platform: 'Meesho',
    type: 'Promote Product',
    link: 'https://meesho.com/product-id',
    description: 'Promote this Meesho product',
    reward: 9,
    time: 25,
  },

  // Myntra
  {
    id: 15,
    platform: 'Myntra',
    type: 'Share Product',
    link: 'https://myntra.com/product-id',
    description: 'Share this Myntra product link',
    reward: 9,
    time: 20,
  },
];

const Tasks = () => {
  const [selectedPlatform, setSelectedPlatform] = useState('YouTube');
  const [tasks, setTasks] = useState([]);
  const [activeTask, setActiveTask] = useState(null);
  const [timer, setTimer] = useState(0);

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

  const handleMarkAsDone = (task) => {
    if (activeTask !== task.id || timer > 0) {
      alert('⏳ Please wait for the required time to complete this task.');
      return;
    }
    alert(`✅ Task marked as done!\nReward ₹${task.reward * 0.5} added to your wallet.\nRemaining ₹${task.reward * 0.5} will go to your uplines.`);
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
