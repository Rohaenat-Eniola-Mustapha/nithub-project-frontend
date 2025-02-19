// src/App.js
import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false); // Initial state: light mode

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode'); // Toggle class on body
  };

  return (
    <div className="app">
      <button onClick={toggleTheme}>
        {isDarkMode ? 'Light Mode' : 'Dark Mode'}
      </button>
      <Dashboard />
    </div>
  );
}

export default App;