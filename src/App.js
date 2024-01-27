import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './hooks/useDarkMode';
import Header from './components/Header';
import MainContent from './components/MainContent';
import { DarkModeContext } from './hooks/useDarkMode';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import './styles/tailwind.css';


function App() {
  
  return (
    <DarkModeProvider>
      <Router>
        <div className='bg-stone-800 dark:bg-gray-100'>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} /> 
            <Route path="/" element={<MainContent />} />
          </Routes>
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
