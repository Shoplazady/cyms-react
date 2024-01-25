import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { DarkModeProvider } from './hooks/useDarkMode';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Login from './components/pages/Login';
import Footer from './components/Footer';
import './styles/tailwind.css';

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <div>
          <Header />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<MainContent />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
