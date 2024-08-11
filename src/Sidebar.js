import React from 'react';
import './Sidebar.css';

function Sidebar({ isOpen, countdownUnit, handleUnitChange }) {
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-content">
        <h3>Customize Countdown</h3>
        <select value={countdownUnit} onChange={(e) => handleUnitChange(e.target.value)}>
          <option value="default">Default</option>
          <option value="seconds">Seconds</option>
          <option value="hours">Hours</option>
          <option value="days">Days</option>
          <option value="weeks">Weeks</option>
        </select>
      </div>
    </div>
  );
}

export default Sidebar;