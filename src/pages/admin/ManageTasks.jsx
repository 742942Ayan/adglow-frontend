import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newTask, setNewTask] = useState({
    platform: '',
    type: '',
    link: '',
    description: '',
    reward: '',
    time: ''
  });

  const API_BASE = 'https://adglow-backend.onrender.com';

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adglow_admin_token');
      const res = await axios.get(`${API_BASE}/api/admin/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data || []);
    } catch (err) {
      console.error('Error fetching tasks:', err.message);
      alert('❌ Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = async () => {
    const { platform, type, link, reward } = newTask;
    if (!platform || !type || !link || !reward) {
      return alert('Please fill all required fields.');
    }

    try {
      const token = localStorage.getItem('adglow_admin_token');
      const res = await axios.post(`${API_BASE}/api/admin/tasks`, newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('✅ Task added');
      setNewTask({
        platform: '',
        type: '',
        link: '',
        description: '',
        reward: '',
        time: ''
      });
      fetchTasks();
    } catch (err) {
      console.error('Add task error:', err);
      alert('❌ Failed to add task');
    }
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;

    try {
      const token = localStorage.getItem('adglow_admin_token');
      await axios.delete(`${API_BASE}/api/admin/tasks/${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert('🗑️ Task deleted');
      fetchTasks();
    } catch (err) {
      console.error('Delete task error:', err);
      alert('❌ Failed to delete task');
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛠️ Manage Tasks</h1>

      {/* Task Creation Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <input type="text" placeholder="Platform" className="p-2 border rounded"
          value={newTask.platform} onChange={(e) => setNewTask({ ...newTask, platform: e.target.value })} />
        <input type="text" placeholder="Type" className="p-2 border rounded"
          value={newTask.type} onChange={(e) => setNewTask({ ...newTask, type: e.target.value })} />
        <input type="text" placeholder="Link" className="p-2 border rounded"
          value={newTask.link} onChange={(e) => setNewTask({ ...newTask, link: e.target.value })} />
        <input type="text" placeholder="Description" className="p-2 border rounded"
          value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} />
        <input type="number" placeholder="Reward" className="p-2 border rounded"
          value={newTask.reward} onChange={(e) => setNewTask({ ...newTask, reward: e.target.value })} />
        <input type="number" placeholder="Time (sec)" className="p-2 border rounded"
          value={newTask.time} onChange={(e) => setNewTask({ ...newTask, time: e.target.value })} />
      </div>

      <button
        onClick={handleAddTask}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        ➕ Add Task
      </button>

      {/* Task List */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-2">📋 All Tasks</h2>

        {loading ? (
          <p>Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="text-gray-600">No tasks available.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task._id} className="p-3 bg-gray-100 rounded flex justify-between items-center">
                <div>
                  <p className="font-semibold">{task.platform} - {task.type}</p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(task._id)}
                  className="text-red-600 hover:underline"
                >
                  🗑 Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ManageTasks;
