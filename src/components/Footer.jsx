import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Leaf, Info, HelpCircle } from 'lucide-react';

export default function Footer({ setCurrentPage }) {
  const { t } = useLanguage();

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo(0, 0);
  };

  return (
    <footer style={{
      background: 'var(--primary-dark)',
      color: '#ffffff',
      padding: '50px 40px 30px',
      marginTop: '60px',
      borderTop: '5px solid var(--accent)'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '40px'
      }}>
        {/* Info Column */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '15px' }}>
            <Leaf size={24} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#ffffff' }}>{t('brand')}</span>
          </div>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.9rem', marginBottom: '15px' }}>
            {t('home.heroSubtitle')}
          </p>
        </div>

        {/* Quick Links Column */}
        <div>
          <h4 style={{ color: 'var(--accent)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.95rem' }}>
            {t('common.explore')}
          </h4>
          <ul style={{ listStyle: 'none' }}>
            {['home', 'chat', 'crop', 'disease', 'fertilizer', 'weather', 'market', 'about'].map(page => (
              <li key={page} style={{ marginBottom: '8px' }}>
                <a 
                  href={`#${page}`} 
                  onClick={(e) => { e.preventDefault(); handleNavClick(page); }} 
                  style={{ color: 'rgba(255, 255, 255, 0.8)', textDecoration: 'none', transition: 'var(--transition-smooth)' }}
                  onMouseOver={(e) => e.target.style.color = 'var(--accent)'}
                  onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.8)'}
                >
                  {t(`nav.${page === 'chat' ? 'chat' : page === 'crop' ? 'crop' : page === 'disease' ? 'disease' : page === 'fertilizer' ? 'fertilizer' : page === 'weather' ? 'weather' : page === 'market' ? 'market' : page === 'about' ? 'about' : 'home'}`)}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Government Portals / Open Data References */}
        <div>
          <h4 style={{ color: 'var(--accent)', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.95rem' }}>
            {t('about.portalTitle')}
          </h4>
          <ul style={{ listStyle: 'none' }}>
            <li style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Info size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <a href="https://agmarknet.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'underline', fontSize: '0.85rem' }}>
                  Agmarknet Portal
                </a>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Live Indian Mandi Prices</div>
              </div>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Info size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <a href="https://soilhealth.dac.gov.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'underline', fontSize: '0.85rem' }}>
                  Soil Health Portal
                </a>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Ministry of Agriculture & Farmers Welfare</div>
              </div>
            </li>
            <li style={{ marginBottom: '10px', display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
              <Info size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '3px' }} />
              <div>
                <a href="https://icar.org.in/" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.9)', textDecoration: 'underline', fontSize: '0.85rem' }}>
                  ICAR Website
                </a>
                <div style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '0.75rem' }}>Council of Agricultural Research</div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        paddingTop: '20px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '15px',
        fontSize: '0.85rem',
        color: 'rgba(255, 255, 255, 0.5)'
      }}>
        <span>&copy; {new Date().getFullYear()} AgroBuddy AI. All Rights Reserved. Built for Indian Farmers & Agriculture Scholars.</span>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <HelpCircle size={14} /> National Advisory Core
          </span>
        </div>
      </div>
    </footer>
  );
}
