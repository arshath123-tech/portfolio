import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import ThemeSwitcher from './ThemeSwitcher';
import '../styles/components/Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      if (location.pathname === '/') {
        const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certifications', 'contact'];
        const scrollPosition = window.scrollY + 200;

        for (const section of sections) {
          const el = document.getElementById(section);
          if (el) {
            const top = el.offsetTop;
            const height = el.offsetHeight;
            if (scrollPosition >= top && scrollPosition < top + height) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location]);

  // Close drawer when clicking outside (overlay)
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen(prev => !prev);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = (sectionId) => {
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = [
    { id: 'home',           label: 'Home' },
    { id: 'about',          label: 'About' },
    { id: 'skills',         label: 'Skills' },
    { id: 'projects',       label: 'Projects' },
    { id: 'experience',     label: 'Experience' },
    { id: 'certifications', label: 'Certs' },
    { id: 'contact',        label: 'Contact' },
  ];

  return (
    <>
      {/* Dark overlay when drawer is open */}
      <div
        className={`nav-overlay ${menuOpen ? 'active' : ''}`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        {/* Logo */}
        <div className="nav-logo" onClick={() => handleNavClick('home')}>
          <span>Portfolio</span>
          <span style={{
            fontSize: '0.6rem',
            padding: '0.2rem 0.4rem',
            borderRadius: '4px',
            background: 'rgba(6, 182, 212, 0.1)',
            color: 'var(--accent-primary)',
            border: '1px solid rgba(6, 182, 212, 0.2)',
            WebkitTextFillColor: 'var(--accent-primary)',
          }}>Dev</span>
        </div>

        {/* Desktop nav links */}
        <ul className={`nav-links ${menuOpen ? 'active' : ''}`}>
          {navItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleNavClick(item.id); }}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right side: theme switcher + hamburger */}
        <div className="nav-controls">
          <ThemeSwitcher />
          <button
            className="menu-toggle"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
