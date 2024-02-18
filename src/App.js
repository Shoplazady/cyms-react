import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './hooks/useDarkMode';
import MainContent from './Components/MainContent';
import Login from './Components/pages/Login';
import Createorder from './Components/pages/Createorder';
import Register from './Components/pages/Register';
import Layout from './Components/Layout';
import AuthGuard from './Components/AuthGuard';
import { AlertProvider } from './Admin/components/AlertContext';
import { AuthProvider } from './Components/useAuth';
import './styles/tailwind.css';


function App() {
  
  return (
    <DarkModeProvider>
    <Router>
      <AlertProvider>
        <AuthProvider>
          <Routes>
            <Route
              path="/*"
              element={
                <Layout>
                  <Routes>
                    <Route path="/login" element={<AuthGuard element={<Login />} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/" element={<MainContent />} />
                    <Route path="/create" element={<Createorder />} />
                  </Routes>
                </Layout>
              }
            />
          </Routes>
        </AuthProvider>
      </AlertProvider>
    </Router>
  </DarkModeProvider>
  );
}

export default App;
