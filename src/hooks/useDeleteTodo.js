import { useDispatch } from 'react-redux';
import { deleteTodo } from '@/store/slices/todosSlice';
import { notificationService } from '../services/notificationService';
import { realApi } from '../api/realApi';

export const useDeleteTodo = () => {
  const dispatch = useDispatch();
  return {
    mutate: async (id) => {
      try {
        await realApi.deleteTodo(id);
        dispatch(deleteTodo(id));
        // Cancel any scheduled notification for this todo
        notificationService.cancelNotification(id);
      } catch (error) {
        console.error('Failed to delete todo:', error);
      }
    },
  };
};
