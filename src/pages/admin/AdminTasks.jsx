import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({
    platform: 'YouTube',
    type: '',
    link: '',
    description: '',
    reward: '',
    time: '',
  });

  const navigate = useNavigate();

  // ✅ Block unauthenticated admin access
  useEffect(() => {
    if (!localStorage.getItem('admin_logged_in')) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_logged_in');
    navigate('/admin/login');
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    const newTask = {
      ...form,
      id: Date.now(),
      reward: parseFloat(form.reward),
      time: parseInt(form.time),
    };
    setTasks([...tasks, newTask]);
    setForm({
      platform: 'YouTube',
      type: '',
      link: '',
      description: '',
      reward: '',
      time: '',
    });
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">📋 Admin Task Manager</h1>
        <button
          onClick={handleLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          🔒 Logout
        </button>
      </div>

      {/* Add Task Form */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h2 className="text-lg font-semibold mb-2">➕ Add New Task</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select name="platform" value={form.platform} onChange={handleChange} className="border px-2 py-1 rounded">
            <option>YouTube</option>
            <option>Instagram</option>
            <option>Facebook</option>
            <option>Telegram</option>
            <option>Flipkart</option>
            <option>Amazon</option>
            <option>Meesho</option>
            <option>Myntra</option>
          </select>
          <input name="type" placeholder="Task Type (e.g. Subscribe)" value={form.type} onChange={handleChange} className="border px-2 py-1 rounded" />
          <input name="link" placeholder="Task Link" value={form.link} onChange={handleChange} className="border px-2 py-1 rounded" />
          <input name="description" placeholder="Short Description" value={form.description} onChange={handleChange} className="border px-2 py-1 rounded" />
          <input name="reward" type="number" placeholder="Reward ₹" value={form.reward} onChange={handleChange} className="border px-2 py-1 rounded" />
          <input name="time" type="number" placeholder="Watch Time (sec)" value={form.time} onChange={handleChange} className="border px-2 py-1 rounded" />
        </div>
        <button onClick={handleAddTask} className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          ➕ Add Task
        </button>
      </div>

      {/* Task List */}
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{task.platform} - {task.type}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm text-green-600">Reward: ₹{task.reward} | Time: {task.time}s</p>
            </div>
            <button onClick={() => handleDelete(task.id)} className="text-red-600 font-bold">🗑️ Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTasks;
