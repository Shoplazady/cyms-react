import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './hooks/useDarkMode';
import MainContent from './Components/MainContent';
import Login from './Components/pages/Login';
import Profilepage from './Components/pages/Profilepage';
import Createorder from './Components/pages/Createorder';
import Orderlist from './Components/pages/Orderlist';
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
              {/* Wrap the whole application in a Layout */}
              <Route
                path="/*"
                element={
                  <Layout>
                    {/* Use a nested route for better organization */}
                    <Routes>
                      {/* Login route with AuthGuard */}
                      <Route
                        path="/login"
                        element={<AuthGuard element={<Login />} />}
                      />
                      {/* Register route */}
                      <Route path="/register" element={<Register />} />
                      {/* MainContent route */}
                      <Route path="/" element={<MainContent />} />
                      {/* Createorder route */}
                      <Route path="/create" element={<Createorder />} />
                      {/* Orderlist route */}
                      <Route path="/list" element={<Orderlist />} />
                      {/* Profilepage route */}
                      <Route path="/profile" element={<Profilepage />} />
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
