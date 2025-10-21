import React from 'react';
import { Bell, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

export const ReminderDialog = () => {
  const { showReminderDialog, setShowReminderDialog, reminderTodo, setReminderTodo } = useApp();

  if (!showReminderDialog || !reminderTodo) return null;

  const handleClose = () => {
    setShowReminderDialog(false);
    setReminderTodo(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-4">
        <div className="flex justify-between items-center border-b p-4">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            <h2 className="text-lg font-semibold">Task Reminder</h2>
          </div>
          <Button
            onClick={handleClose}
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-2">{reminderTodo.title}</h3>
            {reminderTodo.description && (
              <p className="text-gray-600 mb-4">{reminderTodo.description}</p>
            )}
            <div className="text-sm text-gray-500 mb-4">
              <p>Priority: <span className={`font-medium ${
                reminderTodo.priority === 'high' ? 'text-red-600' :
                reminderTodo.priority === 'medium' ? 'text-yellow-600' : 'text-green-600'
              }`}>{reminderTodo.priority}</span></p>
              {reminderTodo.dueDate && (
                <p>Due: {new Date(reminderTodo.dueDate).toLocaleDateString()}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-center border-t p-4">
          <Button
            onClick={handleClose}
          >
            Got it!
          </Button>
        </div>
      </div>
    </div>
  );
};
