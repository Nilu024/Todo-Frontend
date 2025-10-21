import React from 'react';
import { Bell, X, Trash2 } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useTodos } from '@/hooks/useTodos';
import { Button } from '@/components/ui/button';
import { notificationService } from '@/services/notificationService';

export const NotificationSlider = () => {
  const { showNotificationSlider, setShowNotificationSlider } = useApp();
  const { data: todos = [] } = useTodos();

  // Filter todos with reminders that are not completed
  const reminderTodos = todos.filter(todo => todo.reminderTime && !todo.completed);

  const handleClose = () => {
    setShowNotificationSlider(false);
  };

  const handleClearAll = () => {
    // Mark all reminder todos as shown in notification service
    reminderTodos.forEach(todo => {
      const notificationKey = `todo-${todo.id}`;
      notificationService.shownNotifications.add(notificationKey);
    });
    notificationService.saveShownNotifications();
    setShowNotificationSlider(false);
  };

  if (!showNotificationSlider) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={handleClose}
      />

      {/* Slider */}
      <div className={`fixed inset-0 bg-white z-50 transform transition-opacity duration-300 ${
        showNotificationSlider ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Notifications</h2>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {reminderTodos.length === 0 ? (
            <div className="text-center text-gray-500 mt-8">
              <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p>No notifications</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reminderTodos.map(todo => (
                <div key={todo.id} className="bg-gray-50 rounded-lg p-3 border">
                  <h3 className="font-medium text-gray-900 mb-1">{todo.title}</h3>
                  {todo.description && (
                    <p className="text-sm text-gray-600 mb-2">{todo.description}</p>
                  )}
                  <div className="text-xs text-gray-500">
                    <p>Reminder: {new Date(todo.reminderTime).toLocaleString()}</p>
                    {todo.dueDate && (
                      <p>Due: {new Date(todo.dueDate).toLocaleDateString()}</p>
                    )}
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                      todo.priority === 'high' ? 'bg-red-100 text-red-800' :
                      todo.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {todo.priority}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Clear Button */}
        {reminderTodos.length > 0 && (
          <div className="border-t p-4">
            <Button
              onClick={handleClearAll}
              variant="outline"
              className="w-full"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear All
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
