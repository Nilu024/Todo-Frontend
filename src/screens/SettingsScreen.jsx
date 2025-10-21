import React from 'react';
import { ChevronRight, User, Bell, Palette, Database, Info } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Button } from '@/components/ui/button';

const SettingsScreen = () => {
  const { setCurrentScreen } = useApp();

  const preferenceItems = [
    { icon: Bell, label: 'Notifications', action: () => {} },
    { icon: Palette, label: 'Theme', action: () => {} },
    { icon: User, label: 'Account', action: () => {} },
  ];

  const dataItems = [
    { icon: Database, label: 'Export Data', action: () => {} },
    { icon: Database, label: 'Import Data', action: () => {} },
    { icon: Database, label: 'Clear All Data', action: () => {}, destructive: true },
  ];

  const infoItems = [
    { icon: Info, label: 'About', action: () => {} },
    { icon: Info, label: 'Help & Support', action: () => {} },
    { icon: Info, label: 'Privacy Policy', action: () => {} },
  ];

  const ItemRow = ({ item, showChevron = true }) => (
    <Button
      onClick={item.action}
      variant="ghost"
      className={`w-full justify-between p-4 h-auto ${item.destructive ? 'text-red-600 hover:text-red-700 hover:bg-red-50' : ''}`}
    >
      <div className="flex items-center gap-3">
        <item.icon className="w-5 h-5" />
        <span>{item.label}</span>
      </div>
      {showChevron && <ChevronRight className="w-4 h-4 text-gray-400" />}
    </Button>
  );

  return (
    <div className="space-y-6 pb-24">
      {/* Preferences */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Preferences</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {preferenceItems.map((item) => (
            <ItemRow key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* Data Management */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Data Management</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {dataItems.map((item) => (
            <ItemRow key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* Information */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Information</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {infoItems.map((item) => (
            <ItemRow key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* App Version */}
      <div className="text-center text-sm text-gray-500">
        Todo App v1.0.0
      </div>
    </div>
  );
};

export default SettingsScreen;
