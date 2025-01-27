import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FaTasks, 
  FaCalendarDay, 
  FaStar, 
  FaCalendarAlt,
  FaUser,
  FaMoon,
  FaSun
} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>DoIt</h2>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" className="nav-item">
          <FaTasks />
          <span>All Tasks</span>
        </NavLink>
        
        <NavLink 
            to="/dashboard/today" 
            className={({ isActive }) => 
                `nav-item ${isActive ? 'active' : ''}`
            }
            >
            <FaCalendarDay />
            <span>Today</span>
        </NavLink>
        
        <NavLink to="/important" className="nav-item">
          <FaStar />
          <span>Important</span>
        </NavLink>
        
        <NavLink to="/planned" className="nav-item">
          <FaCalendarAlt />
          <span>Planned</span>
        </NavLink>
        
        <div className="nav-section">
          <h4>Assigned to me</h4>
          <NavLink to="/assigned" className="nav-item">
            <FaUser />
            <span>My Tasks</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;