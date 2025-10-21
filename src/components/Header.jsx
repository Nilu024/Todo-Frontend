import React from 'react';
import { Search, X, Bell } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { Button } from '@/components/ui/button';

export const Header = () => {
  const { searchQuery, setSearchQuery, isSearching, setIsSearching, currentScreen, showNotificationSlider, setShowNotificationSlider } = useApp();

  const handleSearchToggle = () => {
    setIsSearching(!isSearching);
    if (isSearching) {
      setSearchQuery('');
    }
  };

  const handleNotificationToggle = () => {
    setShowNotificationSlider(!showNotificationSlider);
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home': return 'Home';
      case 'tasks': return 'Tasks';
      case 'calendar': return 'Calendar';
      case 'analytics': return 'Analytics';
      case 'settings': return 'Settings';
      default: return 'Todo App';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Placeholder for future menu functionality */}
          <h1 className="text-xl font-semibold text-gray-800">{getScreenTitle()}</h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            onClick={handleNotificationToggle}
            variant="ghost"
            size="icon"
          >
            <Bell className="w-6 h-6" />
          </Button>
          <Button
            onClick={handleSearchToggle}
            variant="ghost"
            size="icon"
          >
            {isSearching ? <X className="w-6 h-6" /> : <Search className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {isSearching && (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
    </header>
  );
};
