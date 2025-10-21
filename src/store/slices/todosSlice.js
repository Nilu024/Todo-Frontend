import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  todos: [],
  loading: false,
  error: null,
};

const todosSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
    addTodo: (state, action) => {
      state.todos.push(action.payload);
    },
    updateTodo: (state, action) => {
      const { id, updates } = action.payload;
      const index = state.todos.findIndex(todo => todo.id === id);
      if (index !== -1) {
        state.todos[index] = { ...state.todos[index], ...updates };
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setTodos, addTodo, updateTodo, deleteTodo, setLoading, setError } = todosSlice.actions;

export default todosSlice.reducer;
