import React, { useState } from 'react';
import EventManager from './EventManager';
import './App.css';
import { FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <div className={`app ${theme}`}>
      <header className="app-header">
        <h1>Countdown</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {theme === 'light' ? <FaMoon /> : <FaSun />}
        </button>
      </header>
      <EventManager />
    </div>
  );
}

export default App;
