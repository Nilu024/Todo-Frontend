export const mockApi = {
  todos: [
    { id: 1, title: 'Complete project proposal', description: 'Finalize and submit the Q4 project proposal', category: 'Work', priority: 'high', completed: false, dueDate: '2025-10-22', reminderTime: '2025-10-22T09:00', tags: ['urgent', 'important'], createdAt: '2025-10-18' },
    { id: 2, title: 'Grocery shopping', description: 'Buy vegetables, fruits, and dairy products', category: 'Personal', priority: 'medium', completed: false, dueDate: '2025-10-21', reminderTime: '2025-10-21T14:00', tags: ['home'], createdAt: '2025-10-19' },
    { id: 3, title: 'Gym workout', description: 'Leg day - squats and lunges', category: 'Health', priority: 'medium', completed: true, dueDate: '2025-10-20', reminderTime: '2025-10-20T18:00', tags: ['fitness'], createdAt: '2025-10-17' },
    { id: 4, title: 'Read book chapter', description: 'Finish chapter 5 of Atomic Habits', category: 'Personal', priority: 'low', completed: false, dueDate: '2025-10-23', reminderTime: '2025-10-23T20:00', tags: ['reading'], createdAt: '2025-10-18' },
  ],

  getTodos: () => Promise.resolve(mockApi.todos),

  addTodo: (todo) => {
    const newTodo = { ...todo, id: Date.now(), createdAt: new Date().toISOString().split('T')[0] };
    mockApi.todos.push(newTodo);
    return Promise.resolve(newTodo);
  },

  updateTodo: (id, updates) => {
    const index = mockApi.todos.findIndex(t => t.id === id);
    if (index !== -1) {
      mockApi.todos[index] = { ...mockApi.todos[index], ...updates };
      return Promise.resolve(mockApi.todos[index]);
    }
    return Promise.reject(new Error('Todo not found'));
  },

  deleteTodo: (id) => {
    mockApi.todos = mockApi.todos.filter(t => t.id !== id);
    return Promise.resolve(id);
  },
};
