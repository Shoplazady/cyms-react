import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './hooks/useDarkMode';
import MainContent from './components/MainContent';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import Layout from './components/Layout';
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
