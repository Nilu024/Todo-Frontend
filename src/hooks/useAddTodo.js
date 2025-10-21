import { useDispatch } from 'react-redux';
import { addTodo } from '@/store/slices/todosSlice';
import { notificationService } from '../services/notificationService';
import toast from 'react-hot-toast';
import { realApi } from '../api/realApi';

export const useAddTodo = () => {
  const dispatch = useDispatch();
  return {
    mutate: async (todo, options = {}) => {
      try {
        const newTodo = await realApi.addTodo(todo);
        dispatch(addTodo(newTodo));
        // Schedule notification if reminder time is set
        if (newTodo.reminderTime) {
          notificationService.scheduleNotification(newTodo, newTodo.reminderTime);
        }
        // Show success notification
        const createdTime = new Date(newTodo.createdAt).toLocaleString();
        toast.success(`Task "${newTodo.title}" created successfully at ${createdTime}`, {
          duration: 4000,
          position: 'top-center',
        });
        if (options.onSuccess) {
          options.onSuccess();
        }
      } catch (error) {
        toast.error('Failed to add todo');
        console.error(error);
      }
    },
  };
};
