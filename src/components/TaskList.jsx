import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, toggleTask, toggleImportant } from '../redux/tasks/taskSlice';
import { FaTrash, FaBell, FaCheck, FaStar, FaRegStar } from 'react-icons/fa';
import format from 'date-fns/format';
import { FaCalendar } from 'react-icons/fa';
import { parseISO } from 'date-fns';
import { isToday } from 'date-fns';

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.items);
  const dispatch = useDispatch();

  return (
    <div className="task-list">
      {tasks.map((task) => (
        
        <div key={task.id} className={`task-item ${task.priority} ${task.completed ? 'completed' : ''}`}>
          <div className="task-content">
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => dispatch(toggleTask(task.id))}
              />
              <span className="task-text">{task.text}</span>
              <button 
                className={`star-button ${task.important ? 'important' : ''}`}
                onClick={() => dispatch(toggleImportant(task.id))}
              >
                {task.important ? (
                  <FaStar className="star-icon" />
                ) : (
                  <FaRegStar className="star-icon" />
                )}
              </button>
            </div>
            
            <div className="task-meta">
              {task.dueDate && (
                <div className="meta-item">
                  <FaCalendar className="meta-icon" />
    <div className="task-date">
      {format(parseISO(task.dueDate), 'MMM dd, yyyy')}
      {isToday(parseISO(task.dueDate)) && 
        <span className="today-badge">Today</span>}
    </div>
                </div>
              )}
              <div className="meta-item priority">
                <span>{task.priority}</span>
              </div>
            </div>
          </div>
          
          <div className="task-actions">
            <button
              onClick={() => dispatch(deleteTask(task.id))}
              className="action-button delete"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;