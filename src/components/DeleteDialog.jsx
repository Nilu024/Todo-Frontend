import React from 'react';
import { Trash2, X } from 'lucide-react';
import { useApp } from '@/context/AppContext';
import { useDeleteTodo } from '@/hooks/useDeleteTodo';
import { Button } from '@/components/ui/button';

export const DeleteDialog = () => {
  const { showDeleteDialog, setShowDeleteDialog, deleteTodo: todoToDelete, setDeleteTodo } = useApp();
  const deleteTodo = useDeleteTodo();

  if (!showDeleteDialog || !todoToDelete) return null;

  const handleDelete = () => {
    deleteTodo.mutate(todoToDelete.id);
    setShowDeleteDialog(false);
    setDeleteTodo(null);
  };

  const handleCancel = () => {
    setShowDeleteDialog(false);
    setDeleteTodo(null);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-sm mx-4">
        <div className="flex justify-between items-center border-b p-4">
          <div className="flex items-center gap-2">
            <Trash2 className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold">Delete Task</h2>
          </div>
          <Button
            onClick={handleCancel}
            variant="ghost"
            size="icon"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <div className="p-4">
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              Are you sure you want to delete this task?
            </p>
            <div className="bg-gray-50 rounded-lg p-3 mb-4">
              <h3 className="font-semibold text-left">{todoToDelete.title}</h3>
              {todoToDelete.description && (
                <p className="text-sm text-gray-600 text-left mt-1">{todoToDelete.description}</p>
              )}
            </div>
            <p className="text-sm text-red-600">
              This action cannot be undone.
            </p>
          </div>
        </div>

        <div className="flex justify-end border-t p-4 gap-2">
          <Button
            onClick={handleCancel}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            onClick={handleDelete}
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};
