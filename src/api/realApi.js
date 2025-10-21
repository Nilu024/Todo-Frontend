const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const mapTodoFromBackend = (todo) => ({
  ...todo,
  id: todo._id,
  createdAt: todo.createdAt,
});

const mapTodoToBackend = (todo) => {
  const { id, ...rest } = todo;
  return rest;
};

export const realApi = {
  getTodos: async () => {
    const response = await fetch(API_BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch todos');
    const todos = await response.json();
    return todos.map(mapTodoFromBackend);
  },

  addTodo: async (todo) => {
    const response = await fetch(API_BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mapTodoToBackend(todo)),
    });
    if (!response.ok) throw new Error('Failed to add todo');
    const newTodo = await response.json();
    return mapTodoFromBackend(newTodo);
  },

  updateTodo: async (id, updates) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates),
    });
    if (!response.ok) throw new Error('Failed to update todo');
    const updatedTodo = await response.json();
    return mapTodoFromBackend(updatedTodo);
  },

  deleteTodo: async (id) => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) throw new Error('Failed to delete todo');
    return id;
  },
};
