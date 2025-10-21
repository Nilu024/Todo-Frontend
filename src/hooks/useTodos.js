import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTodos, setLoading, setError } from '@/store/slices/todosSlice';
import { realApi } from '../api/realApi';

export const useTodos = () => {
  const dispatch = useDispatch();
  const { todos, loading, error } = useSelector((state) => state.todos);

  useEffect(() => {
    const fetchTodos = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedTodos = await realApi.getTodos();
        dispatch(setTodos(fetchedTodos));
      } catch (err) {
        dispatch(setError(err.message));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchTodos();
  }, [dispatch]);

  return { data: todos, isLoading: loading, error };
};
