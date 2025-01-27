import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TaskInput from '../components/TaskInput';
import TaskList from '../components/TaskList';
import ThemeToggle from '../components/ThemeToggle';
import { loadTasksFromStorage } from '../redux/tasks/taskSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { status } = useSelector((state) => state.tasks);
  const { mode } = useSelector((state) => state.theme);

  useEffect(() => {
    if (user) {
      dispatch(loadTasksFromStorage());
    }
  }, [dispatch, user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className={`dashboard ${mode}`}>
      <Sidebar />
      <main className="main-content">
        <header className="dashboard-header">
          <h1>My Tasks</h1>
          <ThemeToggle />
        </header>
        
        <div className="content-wrapper">
          <TaskInput />
          {status === 'loading' ? (
            <div className="loading-indicator">Loading tasks...</div>
          ) : (
            <TaskList />
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;