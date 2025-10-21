import React, { useState } from 'react';
import { Filter, SortAsc } from 'lucide-react';
import { useTodos } from '../hooks/useTodos';
import { useApp } from '../context/AppContext';
import TodoCard from '../components/TodoCard';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const TasksScreen = () => {
  const { data: todos = [], isLoading } = useTodos();
  const { searchQuery, currentFilter, setCurrentFilter } = useApp();
  const [sortBy, setSortBy] = useState('createdAt');
  const [accordionValue, setAccordionValue] = useState('');

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const filteredTodos = todos.filter(todo => {
    const matchesSearch = searchQuery === '' ||
      todo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      todo.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (Array.isArray(todo.category) ? todo.category.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase())) : (todo.category || '').toLowerCase().includes(searchQuery.toLowerCase())) ||
      (todo.tags && todo.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));

    if (!matchesSearch) return false;

    switch (currentFilter) {
      case 'priority':
        return todo.priority === 'high';
      case 'reminders':
        return todo.reminderTime && !todo.completed;
      case 'archive':
        return todo.completed;
      case 'all':
      default:
        return true;
    }
  });

  const sortedTodos = [...filteredTodos].sort((a, b) => {
    switch (sortBy) {
      case 'priority':
        const priorityOrder = { high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'dueDate':
        if (!a.dueDate && !b.dueDate) return 0;
        if (!a.dueDate) return 1;
        if (!b.dueDate) return -1;
        return new Date(a.dueDate) - new Date(b.dueDate);
      case 'createdAt':
      default:
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    }
  });

  const filterOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'priority', label: 'High Priority' },
    { value: 'reminders', label: 'With Reminders' },
    { value: 'archive', label: 'Completed' },
  ];

  const sortOptions = [
    { value: 'createdAt', label: 'Date Created' },
    { value: 'priority', label: 'Priority' },
    { value: 'dueDate', label: 'Due Date' },
  ];

  const handleFilterSelect = (filterValue) => {
    setCurrentFilter(filterValue);
    setAccordionValue(''); // Close accordion
  };

  const handleSortSelect = (sortValue) => {
    setSortBy(sortValue);
    setAccordionValue(''); // Close accordion
  };

  return (
    <div className="space-y-4">
      {/* Filter and Sort Controls */}
      <div className="px-4">
        <Accordion type="single" collapsible value={accordionValue} onValueChange={setAccordionValue}>
          <AccordionItem value="filters">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Filter: {filterOptions.find(f => f.value === currentFilter)?.label || 'All Tasks'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-2 flex-wrap pb-2">
                {filterOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => handleFilterSelect(option.value)}
                    variant={currentFilter === option.value ? "default" : "outline"}
                    size="sm"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="sort">
            <AccordionTrigger className="py-3">
              <div className="flex items-center gap-2">
                <SortAsc className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">
                  Sort by: {sortOptions.find(s => s.value === sortBy)?.label || 'Date Created'}
                </span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-2 flex-wrap pb-2">
                {sortOptions.map((option) => (
                  <Button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    variant={sortBy === option.value ? "default" : "outline"}
                    size="sm"
                  >
                    {option.label}
                  </Button>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* Tasks List */}
      <div className="px-4 pb-24">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-semibold text-gray-800">
            {filterOptions.find(f => f.value === currentFilter)?.label || 'All Tasks'}
            <span className="text-sm text-gray-500 ml-2">({sortedTodos.length})</span>
          </h2>
        </div>

        {sortedTodos.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-6xl mb-4">📝</div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No tasks found</h3>
            <p className="text-gray-500">
              {searchQuery ? 'Try adjusting your search or filters' : 'Create your first task to get started'}
            </p>
          </div>
        ) : (
          sortedTodos.map(todo => (
            <TodoCard key={todo.id} todo={todo} />
          ))
        )}
      </div>
    </div>
  );
};

export default TasksScreen;
