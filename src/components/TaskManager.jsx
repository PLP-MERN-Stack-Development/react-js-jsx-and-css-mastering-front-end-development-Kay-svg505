import React, { useState, useEffect } from 'react';
import Button from './Button';
import Card from './Card';

const useLocalStorageTasks = () => {
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = text => {
    if (!text.trim()) return;
    setTasks(prev => [
      ...prev,
      { id: Date.now(), text, completed: false, createdAt: new Date().toISOString() },
    ]);
  };

  const toggleTask = id => setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  const deleteTask = id => setTasks(prev => prev.filter(t => t.id !== id));

  return { tasks, addTask, toggleTask, deleteTask };
};

const TaskManager = () => {
  const { tasks, addTask, toggleTask, deleteTask } = useLocalStorageTasks();
  const [newTask, setNewTask] = useState('');
  const [filter, setFilter] = useState('all');

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const handleSubmit = e => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('');
  };

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-4">Task Manager</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Add a task..."
          value={newTask}
          onChange={e => setNewTask(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        />
        <Button type="submit" variant="primary">Add</Button>
      </form>

      <div className="flex gap-2 mb-4">
        {['all','active','completed'].map(f => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'secondary'}
            size="sm"
            onClick={() => setFilter(f)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      <ul className="space-y-2">
        {filteredTasks.length === 0 ? <li className="text-gray-500 dark:text-gray-400 text-center py-2">No tasks</li> :
          filteredTasks.map(task => (
            <li key={task.id} className="flex justify-between items-center p-2 border rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition">
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={task.completed} onChange={() => toggleTask(task.id)} className="h-5 w-5 text-blue-600" />
                <span className={task.completed ? 'line-through text-gray-500 dark:text-gray-400' : ''}>{task.text}</span>
              </div>
              <Button variant="danger" size="sm" onClick={() => deleteTask(task.id)}>Delete</Button>
            </li>
          ))
        }
      </ul>

      <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">{tasks.filter(t => !t.completed).length} tasks remaining</p>
    </Card>
  );
};

export default TaskManager;
