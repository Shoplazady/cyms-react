import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './hooks/useDarkMode';
import MainContent from './Components/MainContent';
import Login from './Components/pages/Login';
import Register from './Components/pages/Register';
import Layout from './Components/Layout';
import { AlertProvider } from './Admin/components/AlertContext';
import './styles/tailwind.css';


function App() {
  
  return (
    <DarkModeProvider>
      <Router>
        {/* Wrap the Layout with the AlertProvider */}
        <AlertProvider>
          <Layout>
            <div className='bg-gray-800 dark:bg-gray-100'>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/" element={<MainContent />} />
              </Routes>
            </div>
          </Layout>
        </AlertProvider>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
