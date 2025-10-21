import React, { useMemo } from 'react';
import { useTodos } from '@/hooks/useTodos';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, BarChart, XAxis, YAxis, Bar, Legend, CartesianGrid } from 'recharts';
import { Loader2 } from 'lucide-react';

// Colors for charts
const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

const AnalyticsScreen = () => {
  const { data: todos = [], isLoading } = useTodos();

  const stats = useMemo(() => {
    if (!todos.length) return null;

    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const pending = total - completed;

    const byPriority = ['high', 'medium', 'low'].map(p => ({
      name: p.charAt(0).toUpperCase() + p.slice(1),
      value: todos.filter(t => t.priority === p).length,
    }));

    const byCategory = [...new Set(todos.flatMap(t => Array.isArray(t.category) ? t.category : [t.category || 'Uncategorized']))].map(cat => ({
      name: cat,
      value: todos.filter(t => Array.isArray(t.category) ? t.category.includes(cat) : t.category === cat).length,
    }));

    return { total, completed, pending, byPriority, byCategory };
  }, [todos]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
        <span className="ml-2 text-gray-500">Loading analytics...</span>
      </div>
    );
  }

  if (!stats || stats.total === 0) {
    return (
      <div className="text-center text-gray-500 py-12">
        No data available yet. Add some tasks to see your analytics.
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-3 gap-3">
        <div className="bg-blue-50 p-3 rounded-xl text-center shadow-sm">
          <p className="text-sm text-gray-600">Total Tasks</p>
          <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
        </div>
        <div className="bg-green-50 p-3 rounded-xl text-center shadow-sm">
          <p className="text-sm text-gray-600">Completed</p>
          <p className="text-2xl font-bold text-green-700">{stats.completed}</p>
        </div>
        <div className="bg-yellow-50 p-3 rounded-xl text-center shadow-sm">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.pending}</p>
        </div>
      </div>

      {/* Priority Distribution Pie */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Priority Distribution</h3>
        <div className="h-56">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={stats.byPriority}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={70}
                label
              >
                {stats.byPriority.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Category Distribution Bar */}
      <div className="bg-white shadow-md rounded-xl p-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">Tasks by Category</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={stats.byCategory}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#2563EB" name="Tasks" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsScreen;
