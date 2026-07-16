import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000/tasks';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Form state for creating a new task
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  // Fetch all tasks on mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // GET - Fetch all tasks
  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setError('');
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Failed to load tasks. Is the backend running?');
    } finally {
      setLoading(false);
    }
  };

  // POST - Create a new task
  const createTask = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    try {
      setSubmitting(true);
      const response = await axios.post(API_URL, form);
      setTasks([response.data, ...tasks]);
      setForm({ title: '', description: '', priority: 'medium' });
      setError('');
    } catch (err) {
      console.error('Error creating task:', err);
      setError(err.response?.data?.error || 'Failed to create task.');
    } finally {
      setSubmitting(false);
    }
  };

  // PUT - Toggle completed status
  const toggleComplete = async (task) => {
    try {
      const response = await axios.put(`${API_URL}/${task._id}`, {
        completed: !task.completed,
      });
      setTasks(tasks.map((t) => (t._id === task._id ? response.data : t)));
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Failed to update task.');
    }
  };

  // DELETE - Remove a task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Failed to delete task.');
    }
  };

  const priorityColor = (priority) => {
    if (priority === 'high') return 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300';
    if (priority === 'medium') return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300';
    return 'bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50 mb-8">Task Manager</h1>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-md text-sm">
          {error}
        </div>
      )}

      {/* CREATE Task Form */}
      <form
        onSubmit={createTask}
        className="bg-white dark:bg-neutral-800 border border-slate-200 dark:border-neutral-700 rounded-lg p-6 mb-8 shadow-sm"
      >
        <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-100 mb-4">Add New Task</h2>
        <div className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Title <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
              className="w-full px-3 py-2 text-sm rounded-md bg-gray-50 dark:bg-neutral-700 border border-slate-300 dark:border-neutral-600 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Description
            </label>
            <input
              id="description"
              type="text"
              placeholder="Optional description"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-md bg-gray-50 dark:bg-neutral-700 border border-slate-300 dark:border-neutral-600 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              Priority
            </label>
            <select
              id="priority"
              value={form.priority}
              onChange={(e) => setForm({ ...form, priority: e.target.value })}
              className="w-full px-3 py-2 text-sm rounded-md bg-gray-50 dark:bg-neutral-700 border border-slate-300 dark:border-neutral-600 text-slate-900 dark:text-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={submitting}
            className="w-full py-2 px-4 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {submitting ? 'Adding...' : 'Add Task'}
          </button>
        </div>
      </form>

      {/* Task List */}
      {loading ? (
        <div className="text-center py-12 text-slate-500 dark:text-slate-400">Loading tasks...</div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-12 text-slate-400 dark:text-slate-500 border-2 border-dashed border-slate-200 dark:border-neutral-700 rounded-lg">
          No tasks yet. Add one above!
        </div>
      ) : (
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task._id}
              className={`flex items-start gap-4 p-4 rounded-lg border transition-all shadow-sm ${
                task.completed
                  ? 'bg-gray-50 dark:bg-neutral-800/50 border-slate-100 dark:border-neutral-700/50 opacity-70'
                  : 'bg-white dark:bg-neutral-800 border-slate-200 dark:border-neutral-700'
              }`}
            >
              {/* Complete Toggle */}
              <button
                onClick={() => toggleComplete(task)}
                title={task.completed ? 'Mark incomplete' : 'Mark complete'}
                className={`mt-0.5 w-5 h-5 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors focus:outline-none ${
                  task.completed
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-slate-400 dark:border-neutral-500 hover:border-blue-500'
                }`}
              >
                {task.completed && (
                  <svg className="w-3 h-3 text-white" viewBox="0 0 12 10" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 5l3 3 7-7" />
                  </svg>
                )}
              </button>

              {/* Task Info */}
              <div className="flex-1 min-w-0">
                <p className={`text-sm font-medium text-slate-900 dark:text-slate-50 ${task.completed ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                  {task.title}
                </p>
                {task.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">{task.description}</p>
                )}
                <span className={`inline-block mt-1.5 px-2 py-0.5 text-xs font-medium rounded-full ${priorityColor(task.priority)}`}>
                  {task.priority}
                </span>
              </div>

              {/* Delete Button */}
              <button
                onClick={() => deleteTask(task._id)}
                title="Delete task"
                className="shrink-0 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors focus:outline-none"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Summary footer */}
      {tasks.length > 0 && (
        <p className="text-xs text-slate-400 dark:text-slate-500 text-center mt-6">
          {tasks.filter((t) => t.completed).length} of {tasks.length} tasks completed
        </p>
      )}
    </div>
  );
};

export default TaskList;
