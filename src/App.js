import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './hooks/useDarkMode';
import MainContent from './Components/MainContent';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
import Layout from './Components/Layout';
import './styles/tailwind.css';


function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Layout>
          <div className='bg-stone-800 dark:bg-gray-100'>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> 
              <Route path="/" element={<MainContent />} />
            </Routes>
          </div>
        </Layout>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
