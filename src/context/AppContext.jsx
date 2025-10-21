import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

export const AppProvider = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [currentFilter, setCurrentFilter] = useState('all');
  const [showReminderDialog, setShowReminderDialog] = useState(false);
  const [reminderTodo, setReminderTodo] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTodo, setDeleteTodo] = useState(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [detailsTodo, setDetailsTodo] = useState(null);
  const [showNotificationSlider, setShowNotificationSlider] = useState(false);

  return (
    <AppContext.Provider value={{
      currentScreen,
      setCurrentScreen,
      showAddModal,
      setShowAddModal,
      editingTodo,
      setEditingTodo,
      searchQuery,
      setSearchQuery,
      isSearching,
      setIsSearching,
      currentFilter,
      setCurrentFilter,
      showReminderDialog,
      setShowReminderDialog,
      reminderTodo,
      setReminderTodo,
      showDeleteDialog,
      setShowDeleteDialog,
      deleteTodo,
      setDeleteTodo,
      showDetailsDialog,
      setShowDetailsDialog,
      detailsTodo,
      setDetailsTodo,
      showNotificationSlider,
      setShowNotificationSlider,
    }}>
      {children}
    </AppContext.Provider>
  );
};
