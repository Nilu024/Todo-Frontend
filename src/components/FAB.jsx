import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const FAB = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      size="icon"
      className="fixed bottom-20 bg-blue-500 right-4 w-14 h-14 rounded-full shadow-lg hover:shadow-xl transition-shadow z-40"
    >
      <Plus className="w-6 h-6" />
    </Button>
  );
};
