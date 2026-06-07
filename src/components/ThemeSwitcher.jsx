import React, { useState, useEffect } from 'react';
import { Award } from 'lucide-react';

const THEMES = [
  { id: 'cyan',   name: 'Neon Cyan',   color: '#06b6d4', class: 'theme-cyan' },
  { id: 'pink',   name: 'Cyber Pink',  color: '#ec4899', class: 'theme-pink' },
  { id: 'green',  name: 'Teal Green',  color: '#10b981', class: 'theme-green' },
  { id: 'orange', name: 'Sunset Gold', color: '#f97316', class: 'theme-orange' }
];

const ThemeSwitcher = () => {
  const [activeTheme, setActiveTheme] = useState('cyan');

  useEffect(() => {
    // Load persisted theme
    const savedTheme = localStorage.getItem('portfolio-theme') || 'cyan';
    changeTheme(savedTheme);
  }, []);

  const changeTheme = (themeId) => {
    const root = document.documentElement;
    
    // Remove other theme classes
    THEMES.forEach((theme) => {
      root.classList.remove(theme.class);
    });

    // Add selected theme class
    const selected = THEMES.find((t) => t.id === themeId);
    if (selected) {
      root.classList.add(selected.class);
      setActiveTheme(themeId);
      localStorage.setItem('portfolio-theme', themeId);
    }
  };

  return (
    <div className="theme-switcher-wrap">
      <Award size={14} style={{ color: 'var(--text-muted)', opacity: 0.7 }} title="Select Theme Color" />
      <div style={{ display: 'flex', gap: '0.4rem' }}>
        {THEMES.map((theme) => (
          <button
            key={theme.id}
            onClick={() => changeTheme(theme.id)}
            title={theme.name}
            style={{
              width: '14px',
              height: '14px',
              borderRadius: '50%',
              backgroundColor: theme.color,
              border: activeTheme === theme.id ? '2px solid #ffffff' : '1px solid rgba(0,0,0,0.3)',
              cursor: 'pointer',
              padding: 0,
              boxShadow: activeTheme === theme.id ? `0 0 8px ${theme.color}` : 'none',
              transform: activeTheme === theme.id ? 'scale(1.15)' : 'scale(1)',
              transition: 'transform 0.2s, border-color 0.2s, box-shadow 0.2s'
            }}
            aria-label={`Change accent theme to ${theme.name}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSwitcher;
