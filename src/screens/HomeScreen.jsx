import React from 'react';
import { CheckSquare, Star, Bell, Archive } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useUpdateTodo } from '../hooks/useUpdateTodo';
import { useDeleteTodo } from '../hooks/useDeleteTodo';
import { useApp } from '../context/AppContext';
import TodoCard from '../components/TodoCard';
import { Button } from '@/components/ui/button';

const HomeScreen = () => {
  const { data: todos = [], isLoading } = useTodos();
  const updateTodo = useUpdateTodo();
  const deleteTodo = useDeleteTodo();
  const { setEditingTodo, setShowAddModal, searchQuery, setCurrentFilter, setCurrentScreen } = useApp();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const pendingTodos = todos.filter(t => !t.completed);
  const completedToday = todos.filter(
    t => t.completed && t.dueDate === new Date().toISOString().split('T')[0]
  ).length;

  const handleToggle = (id, completed) => {
    updateTodo.mutate({ id, updates: { completed } });
  };

  return (
    <div className="space-y-4">
      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3 p-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-4 shadow-lg">
          <div className="text-3xl font-bold">{pendingTodos.length}</div>
          <div className="text-sm text-blue-100">Active Tasks</div>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl p-4 shadow-lg">
          <div className="text-3xl font-bold">{completedToday}</div>
          <div className="text-sm text-green-100">Completed Today</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h2>
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => {
              setCurrentFilter('priority');
              setCurrentScreen('tasks');
            }}
            variant="outline"
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center gap-2 hover:shadow-md transition-shadow active:scale-95 h-auto"
          >
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-xs text-gray-600">Priority</span>
          </Button>
          <Button
            onClick={() => {
              setCurrentFilter('reminders');
              setCurrentScreen('tasks');
            }}
            variant="outline"
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center gap-2 hover:shadow-md transition-shadow active:scale-95 h-auto"
          >
            <Bell className="w-5 h-5 text-red-500" />
            <span className="text-xs text-gray-600">Reminders</span>
          </Button>
          <Button
            onClick={() => {
              setCurrentFilter('archive');
              setCurrentScreen('tasks');
            }}
            variant="outline"
            className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 flex flex-col items-center gap-2 hover:shadow-md transition-shadow active:scale-95 h-auto"
          >
            <Archive className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-600">Archive</span>
          </Button>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="px-4 pb-24">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">Recent Tasks</h2>
          <Button variant="ghost" className="text-blue-600 text-sm font-medium">
            View All
          </Button>
        </div>

        {todos
          .filter(todo =>
            searchQuery === '' ||
            todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            todo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            todo.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (todo.tags && todo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
          )
          .slice(0, 5)
          .map(todo => (
            <TodoCard
              key={todo.id}
              todo={todo}
              onToggle={handleToggle}
              onEdit={(todo) => {
                setEditingTodo(todo);
                setShowAddModal(true);
              }}
              onDelete={(id) => deleteTodo.mutate(id)}
            />
          ))}
      </div>
    </div>
  );
};

export default HomeScreen;
