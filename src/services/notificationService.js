class NotificationService {
  constructor() {
    this.notifications = new Map();
    this.shownNotifications = new Set(JSON.parse(localStorage.getItem('shownNotifications') || '[]'));
    this.checkInterval = null;
  }

  // Request notification permission
  async requestPermission() {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      return permission === 'granted';
    }
    return false;
  }

  // Schedule a notification
  scheduleNotification(todo, reminderTime) {
    const reminderDate = new Date(reminderTime);
    const now = new Date();

    if (reminderDate <= now) {
      // If reminder time is in the past, show immediately
      this.showNotification(todo);
      return;
    }

    const timeoutId = setTimeout(() => {
      this.showNotification(todo);
      this.notifications.delete(todo.id);
    }, reminderDate - now);

    this.notifications.set(todo.id, timeoutId);
  }

  // Show browser notification
  showNotification(todo) {
    const notificationKey = `todo-${todo.id}`;

    // Check if notification has already been shown
    if (this.shownNotifications.has(notificationKey)) {
      return;
    }

    if ('Notification' in window && Notification.permission === 'granted') {
      const notification = new Notification(`Reminder: ${todo.title}`, {
        body: todo.description || 'Time to complete this task!',
        icon: '/vite.svg', // You can add a custom icon
        tag: `todo-${todo.id}`,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      // Auto close after 5 seconds
      setTimeout(() => notification.close(), 5000);
    }

    // Show reminder dialog instead of toast
    if (window.showReminderDialog) {
      window.showReminderDialog(todo);
    }

    // Mark as shown and save to localStorage
    this.shownNotifications.add(notificationKey);
    this.saveShownNotifications();
  }

  // Cancel a scheduled notification
  cancelNotification(todoId) {
    const timeoutId = this.notifications.get(todoId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.notifications.delete(todoId);
    }
  }

  // Update notification for a todo
  updateNotification(todo) {
    this.cancelNotification(todo.id);
    if (todo.reminderTime && !todo.completed) {
      this.scheduleNotification(todo, todo.reminderTime);
    }
  }

  // Start checking for reminders (for todos that might be loaded later)
  startReminderCheck(todos) {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
    }

    this.checkInterval = setInterval(() => {
      const now = new Date();
      todos.forEach(todo => {
        if (todo.reminderTime && !todo.completed) {
          const reminderTime = new Date(todo.reminderTime);
          if (reminderTime <= now && !this.notifications.has(todo.id)) {
            this.showNotification(todo);
          }
        }
      });
    }, 60000); // Check every minute
  }

  // Stop reminder checking
  stopReminderCheck() {
    if (this.checkInterval) {
      clearInterval(this.checkInterval);
      this.checkInterval = null;
    }
  }

  // Save shown notifications to localStorage
  saveShownNotifications() {
    localStorage.setItem('shownNotifications', JSON.stringify([...this.shownNotifications]));
  }

  // Clean up all notifications
  cleanup() {
    this.notifications.forEach((timeoutId) => clearTimeout(timeoutId));
    this.notifications.clear();
    this.shownNotifications.clear();
    this.saveShownNotifications();
    this.stopReminderCheck();
  }
}

export const notificationService = new NotificationService();
