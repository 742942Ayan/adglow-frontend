// src/pages/admin/ManageTasks.jsx
import React, { useState } from 'react';

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({
    platform: '',
    type: '',
    link: '',
    description: '',
    reward: '',
    time: ''
  });

  const handleAddTask = () => {
    if (!newTask.platform || !newTask.type || !newTask.link || !newTask.reward) {
      alert('Please fill all required fields.');
      return;
    }

    const updated = [...tasks, { ...newTask, id: Date.now() }];
    setTasks(updated);
    setNewTask({ platform: '', type: '', link: '', description: '', reward: '', time: '' });
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠️ Task Management</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input
          type="text"
          placeholder="Platform (e.g., YouTube)"
          className="p-2 border rounded"
          value={newTask.platform}
          onChange={(e) => setNewTask({ ...newTask, platform: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Type (Subscribe, Like...)"
          className="p-2 border rounded"
          value={newTask.type}
          onChange={(e) => setNewTask({ ...newTask, type: e.target.value })}
        />
        <input
          type="text"
          placeholder="Task Link"
          className="p-2 border rounded"
          value={newTask.link}
          onChange={(e) => setNewTask({ ...newTask, link: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          className="p-2 border rounded"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <input
          type="number"
          placeholder="Reward"
          className="p-2 border rounded"
          value={newTask.reward}
          onChange={(e) => setNewTask({ ...newTask, reward: e.target.value })}
        />
        <input
          type="number"
          placeholder="Time to watch (sec)"
          className="p-2 border rounded"
          value={newTask.time}
          onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
        />
      </div>

      <button
        onClick={handleAddTask}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Task
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">📋 All Tasks</h2>
        {tasks.length === 0 ? (
          <p className="text-gray-600">No tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
                <span>{task.platform} - {task.type}</span>
                <button onClick={() => handleDelete(task.id)} className="text-red-600">🗑 Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageTasks;
