import React from 'react';
import Header from './Components/Header';
import Sidebar from './Components/Sidebar';
import MainContent from './Components/MainContent';
import Footer from './Components/Footer';
import './styles/tailwind.css';

function App() {
  return (
    <div className="bg-black">
      <Header />
      <Sidebar />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
