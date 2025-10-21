import React, { useState } from 'react';
import { Calendar as CalendarIcon } from 'lucide-react';
import { useTodos } from '../hooks/useTodos'; // assumes your custom hook for fetching todos

const CalendarScreen = () => {
  const { data: todos = [], isLoading } = useTodos();
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0]
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const todosForDate = todos.filter(t => t.dueDate === selectedDate);

  // Get upcoming deadlines (next 5 incomplete tasks)
  const upcomingDeadlines = todos
    .filter(t => t.dueDate && !t.completed)
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5);

  // Category counts
  const categories = ['Work', 'Personal', 'Health'];
  const categoryCounts = categories.map(cat => ({
    name: cat,
    count: todos.filter(t => t.category === cat && !t.completed).length,
  }));

  return (
    <div className="p-4 pb-24 space-y-4">
      {/* Upcoming Deadlines */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Upcoming Deadlines</h3>
        <div className="space-y-2">
          {upcomingDeadlines.map(todo => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <CalendarIcon className="w-5 h-5 text-blue-600" />
              <div className="flex-1">
                <div className="font-medium text-gray-800">{todo.title}</div>
                <div className="text-sm text-gray-500">{todo.dueDate}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tasks by Category */}
      <div className="bg-white rounded-xl shadow-lg p-4">
        <h3 className="font-semibold text-gray-800 mb-4">Tasks by Category</h3>
        <div className="space-y-3">
          {categoryCounts.map(cat => (
            <div
              key={cat.name}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <span className="font-medium text-gray-700">{cat.name}</span>
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {cat.count}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CalendarScreen;
