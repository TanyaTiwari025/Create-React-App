// src/App.js

import React, { useState } from 'react'; // Import React and useState hook
import Calculator from './components/Calculator'; // Import Calculator component
import './App.css'; // Import App styles

const App = () => {
  const [theme, setTheme] = useState('dark'); // State to manage theme

  // Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`app ${theme}`}>
      <button className="theme-switcher" onClick={toggleTheme}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <Calculator />
    </div>
  );
};

export default App; // Export App component
