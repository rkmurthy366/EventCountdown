import React, { useState, useEffect } from 'react';
import EventManager from './EventManager';
import Sidebar from './Sidebar';
import './App.css';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'dark';
  });
  const [countdownUnit, setCountdownUnit] = useState(() => {
    const savedUnit = localStorage.getItem('countdownUnit');
    return savedUnit || 'default';
  });

  useEffect(() => {
    localStorage.setItem('countdownUnit', countdownUnit);
  }, [countdownUnit]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUnitChange = (unit) => {
    setCountdownUnit(unit);
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>Countdown</h1>
        <div className="header-controls">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'light' ? <FaMoon /> : <FaSun />}
          </button>
          <button onClick={toggleSidebar} className="sidebar-toggle">
            <FaBars />
          </button>
        </div>
      </header>
      <div className="main-content">
        <EventManager countdownUnit={countdownUnit} />
        <Sidebar isOpen={isSidebarOpen} countdownUnit={countdownUnit} handleUnitChange={handleUnitChange} />
      </div>
    </div>
  );
}

export default App;