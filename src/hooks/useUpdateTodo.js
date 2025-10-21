import { useDispatch } from 'react-redux';
import { updateTodo } from '@/store/slices/todosSlice';
import { notificationService } from '../services/notificationService';
import { realApi } from '../api/realApi';

export const useUpdateTodo = () => {
  const dispatch = useDispatch();
  return {
    mutate: async ({ id, updates }, options = {}) => {
      try {
        const updatedTodo = await realApi.updateTodo(id, updates);
        dispatch(updateTodo({ id, updates: updatedTodo }));
        // Update notification if reminder time changed or task completed
        if (updates.reminderTime !== undefined || updates.completed !== undefined) {
          notificationService.updateNotification(updatedTodo);
        }
        if (options.onSuccess) {
          options.onSuccess();
        }
      } catch (error) {
        console.error('Failed to update todo:', error);
      }
    },
  };
};
    