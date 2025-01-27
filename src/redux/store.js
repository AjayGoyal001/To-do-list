import { configureStore } from '@reduxjs/toolkit';
import { saveTasksToStorage } from './tasks/taskSlice';
import authReducer from './auth/authSlice';
import taskReducer from './tasks/taskSlice';
import themeReducer from './theme/themeSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks: taskReducer,
    theme: themeReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(store => next => action => {
      const result = next(action);
      if (['tasks/addTask', 'tasks/deleteTask', 'tasks/toggleTask'].includes(action.type)) {
        store.dispatch(saveTasksToStorage(store.getState().tasks.items));
      }
      return result;
    }),
});

export default store;