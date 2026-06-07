import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CursorFollower from './components/CursorFollower';
import './styles/global.css';

// Scroll control helper component
const ScrollToSection = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/' && location.state?.scrollTo) {
      const el = document.getElementById(location.state.scrollTo);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
      window.history.replaceState({}, document.title);
    } else if (location.pathname !== '/') {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
};

function App() {
  return (
    <Router>
      <ScrollToSection />
      <CursorFollower />
      <Navbar />
      <main style={{ minHeight: 'calc(100vh - 80px)' }}>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
