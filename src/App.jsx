import React, { useEffect } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';
import { AppProvider, useApp } from '@/context/AppContext';
import { AppContent } from '@/AppContent';
import { ReminderDialog } from '@/components/ReminderDialog';
import { DeleteDialog } from '@/components/DeleteDialog';
import { TodoDetailsDialog } from '@/components/common/TodoDetailsDialog';
import { NotificationSlider } from '@/components/NotificationSlider';
import { notificationService } from './services/notificationService';
import { useTodos } from './hooks/useTodos';
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false, retry: 1 } },
});

// Component to handle notifications inside the Redux context
const NotificationHandler = () => {
  const { data: todos = [] } = useTodos();
  const { setShowReminderDialog, setReminderTodo } = useApp();

  useEffect(() => {
    // Set up global function for showing reminder dialog
    window.showReminderDialog = (todo) => {
      setReminderTodo(todo);
      setShowReminderDialog(true);
    };

    // Request notification permission on app start
    notificationService.requestPermission();

    // Start reminder checking
    notificationService.startReminderCheck(todos);

    // Schedule notifications for existing todos (only if not already shown)
    todos.forEach(todo => {
      if (todo.reminderTime && !todo.completed) {
        const reminderDate = new Date(todo.reminderTime);
        const now = new Date();
        if (reminderDate > now) {
          notificationService.scheduleNotification(todo, todo.reminderTime);
        }
      }
    });

    return () => {
      notificationService.cleanup();
      delete window.showReminderDialog;
    };
  }, [todos, setShowReminderDialog, setReminderTodo]);

  return null;
};

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppProvider>
            <NotificationHandler />
            <AppContent />
            <ReminderDialog />
            <DeleteDialog />
            <TodoDetailsDialog />
            <NotificationSlider />
            <Toaster />
          </AppProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
