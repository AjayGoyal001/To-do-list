import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const getInitialTasks = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

export const saveTasksToStorage = createAsyncThunk(
  'tasks/save',
  async (tasks, { getState }) => {
    const { auth } = getState();
    if (auth.user) {
      localStorage.setItem(`tasks_${auth.user.id}`, JSON.stringify(tasks));
    }
  }
);

export const loadTasksFromStorage = createAsyncThunk(
  'tasks/load',
  async (_, { getState }) => {
    const { auth } = getState();
    if (auth.user) {
      const tasks = localStorage.getItem(`tasks_${auth.user.id}`);
      return tasks ? JSON.parse(tasks) : [];
    }
    return [];
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    addTask: (state, action) => {
      state.items.push({
        ...action.payload,
        dueDate: action.payload.dueDate || null,
      });
    },
    deleteTask: (state, action) => {
      state.items = state.items.filter(task => task.id !== action.payload);
    },
    toggleTask: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) task.completed = !task.completed;
    },
    setDueDate: (state, action) => {
      const { taskId, date } = action.payload;
      const task = state.items.find(task => task.id === taskId);
      if (task) task.dueDate = date;
    },
    setPriority: (state, action) => {
      const { taskId, priority } = action.payload;
      const task = state.items.find(task => task.id === taskId);
      if (task) task.priority = priority;
    },
    toggleImportant: (state, action) => {
      const task = state.items.find(task => task.id === action.payload);
      if (task) task.important = !task.important;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadTasksFromStorage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(loadTasksFromStorage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(saveTasksToStorage.fulfilled, (state) => {
        state.status = 'saved';
      });
  },
});

export const { addTask, deleteTask, toggleTask, setDueDate, setPriority, toggleImportant } = taskSlice.actions;
export default taskSlice.reducer;