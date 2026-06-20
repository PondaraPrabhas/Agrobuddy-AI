import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Menu, X, Sun, Moon, Palette } from 'lucide-react';

const darkThemes = {
  premium: {
    name: 'AgroBuddy Premium',
    bg: '#0B1120',
    card: '#1E293B',
    border: '#334155',
    text: '#F8FAFC',
    textMuted: '#CBD5E1',
    glass: 'rgba(30, 41, 59, 0.7)',
    circle: '#0B1120',
    primary: '#22C55E',
    primaryHover: '#16A34A',
    accent: '#A3E635',
    accentLight: '#A3E635',
    accentGlow: 'rgba(34, 197, 94, 0.15)'
  },
  navy: {
    name: 'Space Cadet Navy',
    bg: '#0b0f19',
    card: '#121826',
    border: '#1e293b',
    text: '#f1f5f9',
    textMuted: '#94a3b8',
    glass: 'rgba(18, 24, 38, 0.7)',
    circle: '#0b0f19',
    primary: '#52b788',
    primaryHover: '#74c69d',
    accent: '#52b788',
    accentLight: '#74c69d',
    accentGlow: 'rgba(82, 183, 136, 0.15)'
  },
  oled: {
    name: 'OLED Pure Black',
    bg: '#000000',
    card: '#0a0a0a',
    border: '#1c1c1e',
    text: '#ffffff',
    textMuted: '#8e8e93',
    glass: 'rgba(10, 10, 10, 0.7)',
    circle: '#000000',
    primary: '#22C55E',
    primaryHover: '#16A34A',
    accent: '#74c69d',
    accentLight: '#74c69d',
    accentGlow: 'rgba(34, 197, 94, 0.15)'
  },
  carbon: {
    name: 'Midnight Carbon',
    bg: '#121212',
    card: '#1e1e1e',
    border: '#2d2d2d',
    text: '#f5f5f7',
    textMuted: '#a1a1a6',
    glass: 'rgba(30, 30, 30, 0.7)',
    circle: '#121212',
    primary: '#94a3b8',
    primaryHover: '#cbd5e1',
    accent: '#94a3b8',
    accentLight: '#cbd5e1',
    accentGlow: 'rgba(148, 163, 184, 0.15)'
  },
  emerald: {
    name: 'Emerald Shadow',
    bg: '#050c08',
    card: '#0c1811',
    border: '#152c1f',
    text: '#ecf3ef',
    textMuted: '#8fa89b',
    glass: 'rgba(12, 24, 17, 0.7)',
    circle: '#050c08',
    primary: '#52b788',
    primaryHover: '#74c69d',
    accent: '#52b788',
    accentLight: '#74c69d',
    accentGlow: 'rgba(82, 183, 136, 0.15)'
  }
};

const applyDarkThemeVariables = (themeKey) => {
  const theme = darkThemes[themeKey] || darkThemes.premium;
  const root = document.documentElement;
  root.style.setProperty('--dark-bg', theme.bg);
  root.style.setProperty('--dark-card', theme.card);
  root.style.setProperty('--dark-border', theme.border);
  root.style.setProperty('--dark-text', theme.text);
  root.style.setProperty('--dark-text-muted', theme.textMuted);
  root.style.setProperty('--dark-glass-bg', theme.glass);
  
  root.style.setProperty('--dark-primary', theme.primary);
  root.style.setProperty('--dark-primary-hover', theme.primaryHover);
  root.style.setProperty('--dark-accent', theme.accent);
  root.style.setProperty('--dark-accent-light', theme.accentLight);
  root.style.setProperty('--dark-accent-glow', theme.accentGlow);
};

export default function Navbar({ 
  currentPage, 
  setCurrentPage,
  isDashboardPage,
  sidebarCollapsed,
  setSidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen
}) {
  const { language, toggleLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('agrobuddy_theme');
    return savedTheme !== 'light';
  });
  const [darkSubtheme, setDarkSubtheme] = useState(() => {
    return localStorage.getItem('agrobuddy_dark_subtheme') || 'premium';
  });
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('agrobuddy_theme');
    if (savedTheme !== 'light') {
      setDarkMode(true);
      document.body.classList.add('dark-mode');
      applyDarkThemeVariables(darkSubtheme);
    } else {
      setDarkMode(false);
      document.body.classList.remove('dark-mode');
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      applyDarkThemeVariables(darkSubtheme);
    }
  }, [darkMode, darkSubtheme]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.dark-theme-dropdown-container')) {
        setShowThemeDropdown(false);
      }
    };
    if (showThemeDropdown) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [showThemeDropdown]);

  const toggleTheme = () => {
    if (darkMode) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('agrobuddy_theme', 'light');
      setDarkMode(false);
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('agrobuddy_theme', 'dark');
      setDarkMode(true);
    }
  };

  const navItems = [
    { id: 'home', label: t('nav.home') },
    { id: 'chat', label: t('nav.chat') },
    { id: 'crop', label: t('nav.crop') },
    { id: 'disease', label: t('nav.disease') },
    { id: 'fertilizer', label: t('nav.fertilizer') },
    { id: 'weather', label: t('nav.weather') },
    { id: 'market', label: t('nav.market') },
    { id: 'about', label: t('nav.about') }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    setMobileMenuOpen(false);
  };

  const handleSidebarToggle = () => {
    if (window.innerWidth < 992) {
      setMobileSidebarOpen(!mobileSidebarOpen);
    } else {
      const nextState = !sidebarCollapsed;
      setSidebarCollapsed(nextState);
      localStorage.setItem('agrobuddy_sidebar_collapsed', String(nextState));
    }
  };

  return (
    <nav className="navbar glass">
      <div style={{ display: 'flex', alignItems: 'center' }}>
        {isDashboardPage && (
          <button
            onClick={handleSidebarToggle}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: darkMode ? 'var(--dark-text)' : 'var(--primary-dark)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px',
              marginRight: '12px',
              borderRadius: '50%',
              transition: 'var(--transition-smooth)'
            }}
            className="sidebar-toggle-btn"
            title={sidebarCollapsed ? t('nav.sidebarExpand') : t('nav.sidebarCollapse')}
          >
            <Menu size={24} />
          </button>
        )}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer' }} onClick={() => handleNavClick('home')}>
          <div style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--accent) 100%)', 
            padding: '8px', 
            borderRadius: '50%', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 0 12px var(--accent-glow)'
          }}>
            <Leaf className="logo-icon animate-pulse-btn" size={20} style={{ color: '#ffffff' }} />
          </div>
          <span style={{ 
            fontSize: '1.5rem', 
            fontWeight: 800, 
            background: 'linear-gradient(to right, var(--primary), var(--accent))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            letterSpacing: '-0.5px'
          }} className="brand-name">
            {t('brand')}
          </span>
        </div>
      </div>

      {/* Desktop Links */}
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="desktop-menu" style={{ display: 'flex', gap: '20px' }}>
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginLeft: '20px' }}>
          {/* Theme Switcher */}
          <button 
            onClick={toggleTheme} 
            style={{ 
              background: 'transparent', 
              border: 'none', 
              cursor: 'pointer', 
              color: darkMode ? 'var(--accent)' : 'var(--primary)', 
              display: 'flex', 
              alignItems: 'center',
              padding: '6px'
            }}
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={20} style={{ color: '#ffb703' }} /> : <Moon size={20} style={{ color: 'var(--primary-light)' }} />}
          </button>

          {/* Dark Subtheme Selector */}
          {darkMode && (
            <div className="dark-theme-dropdown-container" style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button
                onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--accent)',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '6px',
                  transition: 'var(--transition-smooth)'
                }}
                className="theme-palette-trigger"
                title="Select Dark Color Scheme"
              >
                <Palette size={20} />
              </button>
              {showThemeDropdown && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  background: 'var(--dark-card)',
                  border: '1px solid var(--dark-border)',
                  borderRadius: 'var(--border-radius-sm)',
                  boxShadow: 'var(--shadow-premium)',
                  zIndex: 1010,
                  minWidth: '190px',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '8px',
                  gap: '4px'
                }} className="glass">
                  <div style={{ 
                    fontSize: '0.8rem', 
                    fontWeight: 700, 
                    color: 'var(--dark-text-muted)', 
                    padding: '4px 8px', 
                    borderBottom: '1px solid var(--dark-border)',
                    marginBottom: '4px' 
                  }}>
                    Dark Color Schemes
                  </div>
                  {Object.entries(darkThemes).map(([key, theme]) => {
                    const isActive = darkSubtheme === key;
                    return (
                      <button
                        key={key}
                        onClick={() => {
                          setDarkSubtheme(key);
                          localStorage.setItem('agrobuddy_dark_subtheme', key);
                          setShowThemeDropdown(false);
                        }}
                        style={{
                          background: isActive ? 'var(--accent-glow)' : 'transparent',
                          border: 'none',
                          borderRadius: '4px',
                          color: isActive ? 'var(--accent)' : 'var(--dark-text)',
                          padding: '8px 10px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '8px',
                          fontSize: '0.9rem',
                          fontWeight: isActive ? '700' : '500',
                          transition: 'var(--transition-smooth)'
                        }}
                        className="subtheme-option"
                      >
                        <span style={{
                          width: '12px',
                          height: '12px',
                          borderRadius: '50%',
                          background: theme.circle,
                          border: '1px solid var(--dark-text-muted)',
                          display: 'inline-block'
                        }} />
                        {theme.name}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* Language Switcher */}
          <button onClick={toggleLanguage} className="lang-switcher">
            🌐 {language === 'en' ? 'తెలుగు' : 'English'}
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className="mobile-toggle" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          style={{ 
            display: 'none', 
            background: 'transparent', 
            border: 'none', 
            cursor: 'pointer',
            marginLeft: '15px',
            color: 'var(--primary-dark)'
          }}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed',
          top: '70px',
          left: 0,
          width: '100%',
          background: darkMode ? 'var(--dark-card)' : 'var(--bg-white)',
          borderBottom: darkMode ? '2px solid var(--dark-border)' : '2px solid var(--border-color)',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '15px',
          zIndex: 999,
          boxShadow: 'var(--shadow-premium)'
        }} className="mobile-overlay-menu">
          {navItems.map(item => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.id);
              }}
              style={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: currentPage === item.id 
                  ? 'var(--accent)' 
                  : (darkMode ? 'var(--dark-text-muted)' : 'var(--text-muted)'),
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: darkMode ? '1px solid var(--dark-border)' : '1px solid var(--border-color)'
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}

      {/* Responsive Inline CSS to handle toggles */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-menu {
            display: none !important;
          }
          .mobile-toggle {
            display: block !important;
          }
        }
      `}</style>
    </nav>
  );
}
