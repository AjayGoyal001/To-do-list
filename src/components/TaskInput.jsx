import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTask } from '../redux/tasks/taskSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaPlus, FaCalendarAlt, FaExclamationCircle } from 'react-icons/fa';

const TaskInput = () => {
  const [text, setText] = useState('');
  const [dueDate, setDueDate] = useState(null);
  const [priority, setPriority] = useState('medium');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    dispatch(addTask({
      id: Date.now(),
      text,
      dueDate: dueDate?.toISOString(),
      priority,
      completed: false,
      important: false,
      reminder: null,
      createdAt: new Date().toISOString()
    }));
    
    setText('');
    setDueDate(null);
    setPriority('medium');
  };

  return (
    <form onSubmit={handleSubmit} className="task-input">
      <div className="input-group">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new task..."
          className="task-input-field"
        />
        <button type="submit" className="add-button">
          <FaPlus />
        </button>
      </div>
      
      <div className="task-options">
        <div className="option-item">
          <FaCalendarAlt className="option-icon" />
          <DatePicker
            selected={dueDate}
            onChange={(date) => setDueDate(date)}
            minDate={new Date()}
            placeholderText="Set due date"
            className="date-picker"
          />
        </div>  
        
        <div className="option-item">
          <FaExclamationCircle className="option-icon" />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="priority-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default TaskInput;