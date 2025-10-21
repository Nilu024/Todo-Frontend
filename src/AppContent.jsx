import React from "react";
import { useApp, AppProvider } from "@/context/AppContext";
import { Header } from "@/components/Header";
import { BottomNav } from "@/components/BottomNav";
import { FAB } from "@/components/FAB";
import { TodoModal } from "@/components/TodoModal";

import HomeScreen from "@/screens/HomeScreen";
import TasksScreen from "./screens/TasksScreen";
import CalendarScreen from "./screens/CalendarScreen";
import { AnalyticsScreen } from "@/screens/AnalyticsScreen";
import SettingsScreen from './screens/SettingsScreen';

export const AppContent = () => {
  const { currentScreen, setCurrentScreen, showAddModal, setShowAddModal } =
    useApp();

  const screens = {
    home: { component: HomeScreen, title: "Dashboard", showSearch: true },
    tasks: { component: TasksScreen, title: "My Tasks", showSearch: true },
    calendar: {
      component: CalendarScreen,
      title: "Calendar",
      showSearch: false,
    },
    analytics: {
      component: AnalyticsScreen,
      title: "Analytics",
      showSearch: false,
    },
    settings: {
      component: SettingsScreen,
      title: "Settings",
      showSearch: false,
    },
  };

  const CurrentScreenComponent = screens[currentScreen].component;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        title={screens[currentScreen].title}
        showSearch={screens[currentScreen].showSearch}
        onSearchClick={() => {
          const { isSearching, setIsSearching, setSearchQuery } = useApp();
          setIsSearching(!isSearching);
          if (isSearching) {
            setSearchQuery('');
          }
        }}
      />

      <main className="max-w-2xl mx-auto">
        <CurrentScreenComponent />
      </main>

      <BottomNav
        currentScreen={currentScreen}
        setCurrentScreen={setCurrentScreen}
      />

      {currentScreen !== "settings" && (
        <FAB onClick={() => setShowAddModal(true)} />
      )}

      <TodoModal />
    </div>
  );
};
