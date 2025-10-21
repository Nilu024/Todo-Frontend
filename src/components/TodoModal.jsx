import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useAddTodo } from '@/hooks/useAddTodo';
import { useUpdateTodo } from '@/hooks/useUpdateTodo';
import { Button } from '@/components/ui/button';

export const TodoModal = () => {
  const { showAddModal, setShowAddModal, editingTodo, setEditingTodo } = useApp();
  const addTodo = useAddTodo();
  const updateTodo = useUpdateTodo();

  const predefinedCategories = ['Work', 'Personal', 'Health', 'Fitness', 'Education', 'Shopping'];

  const [form, setForm] = useState({
    title: '',
    description: '',
    category: [],
    priority: 'medium',
    dueDate: '',
    reminderTime: '',
    tags: '',
  });

  useEffect(() => {
    if (editingTodo) {
      setForm({
        title: editingTodo.title || '',
        description: editingTodo.description || '',
        category: editingTodo.category || [],
        priority: editingTodo.priority || 'medium',
        dueDate: editingTodo.dueDate || '',
        reminderTime: editingTodo.reminderTime || '',
        tags: editingTodo.tags?.join(', ') || '',
      });
    } else {
      setForm({
        title: '',
        description: '',
        category: [],
        priority: 'medium',
        dueDate: '',
        reminderTime: '',
        tags: '',
      });
    }
  }, [editingTodo]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (category) => {
    setForm(prev => ({
      ...prev,
      category: prev.category.includes(category)
        ? prev.category.filter(c => c !== category)
        : [...prev.category, category]
    }));
  };

  const handleSubmit = () => {
    if (!form.title.trim()) return alert('Title is required');
    if (form.category.length === 0) return alert('Please select at least one category');

    const newTodo = {
      title: form.title.trim(),
      description: form.description.trim(),
      category: form.category,
      priority: form.priority,
      dueDate: form.dueDate,
      reminderTime: form.reminderTime,
      tags: form.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      completed: false,
    };

    if (editingTodo) {
      updateTodo.mutate(
        { id: editingTodo.id, updates: newTodo },
        {
          onSuccess: () => {
            setShowAddModal(false);
            setEditingTodo(null);
          },
        }
      );
    } else {
      addTodo.mutate(newTodo, {
        onSuccess: () => setShowAddModal(false),
      });
    }
  };

  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md mx-4">
        <div className="flex justify-between items-center border-b p-4">
          <h2 className="text-lg font-semibold">
            {editingTodo ? 'Edit Task' : 'Add New Task'}
          </h2>
          <Button
            onClick={() => {
              setShowAddModal(false);
              setEditingTodo(null);
            }}
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4 space-y-3">
          <input
            type="text"
            name="title"
            placeholder="Task title"
            value={form.title}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Categories</label>
            <div className="grid grid-cols-2 gap-2">
              {predefinedCategories.map((category) => (
                <label key={category} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={form.category.includes(category)}
                    onChange={() => handleCategoryChange(category)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <select
            name="priority"
            value={form.priority}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          >
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />

          <input
            type="datetime-local"
            name="reminderTime"
            value={form.reminderTime}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            placeholder="Set reminder time"
          />

          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={form.tags}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="flex justify-end border-t p-4">
          <Button
            onClick={() => {
              setShowAddModal(false);
              setEditingTodo(null);
            }}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="ml-2"
          >
            {editingTodo ? 'Update' : 'Add Task'}
          </Button>
        </div>
      </div>
    </div>
  );
};
