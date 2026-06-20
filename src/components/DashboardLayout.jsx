import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MessageSquare, 
  Sprout, 
  ShieldAlert, 
  Beaker, 
  CloudSun, 
  TrendingUp, 
  Home, 
  Info,
  Menu,
  X,
  BarChart2
} from 'lucide-react';

export default function DashboardLayout({ 
  children, 
  currentPage, 
  setCurrentPage,
  sidebarCollapsed,
  mobileSidebarOpen,
  setMobileSidebarOpen
}) {
  const { t } = useLanguage();

  const menuItems = [
    { id: 'chat', label: t('nav.chat'), icon: MessageSquare },
    { id: 'crop', label: t('nav.crop'), icon: Sprout },
    { id: 'disease', label: t('nav.disease'), icon: ShieldAlert },
    { id: 'fertilizer', label: t('nav.fertilizer'), icon: Beaker },
    { id: 'weather', label: t('nav.weather'), icon: CloudSun },
    { id: 'market', label: t('nav.market'), icon: TrendingUp },
  ];

  const secondaryItems = [
    { id: 'home', label: t('nav.home'), icon: Home },
    { id: 'analytics', label: t('nav.analytics'), icon: BarChart2 },
    { id: 'about', label: t('nav.about'), icon: Info }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    setMobileSidebarOpen(false);
  };

  return (
    <div className={`dashboard-container ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Mobile Drawer Backdrop */}
      {mobileSidebarOpen && (
        <div 
          onClick={() => setMobileSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.4)',
            backdropFilter: 'blur(4px)',
            zIndex: 850,
            transition: 'opacity 0.3s ease'
          }}
          className="sidebar-backdrop"
        />
      )}

      {/* Sidebar Navigation */}
      <aside className={`sidebar ${mobileSidebarOpen ? 'mobile-open' : ''} glass`}>
        {/* Mobile Close Button inside Sidebar */}
        <div className="sidebar-mobile-header" style={{ display: 'none', justifyContent: 'flex-end', padding: '10px 16px', borderBottom: '1px solid var(--border-color)', marginBottom: '15px' }}>
          <button 
            onClick={() => setMobileSidebarOpen(false)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '6px'
            }}
            title="Close Menu"
          >
            <X size={24} />
          </button>
        </div>

        <div className="sidebar-nav">
          <div className="sidebar-section-header" style={{ padding: '0 16px 15px 16px', borderBottom: '1px solid var(--border-color)', marginBottom: '15px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {t('nav.coreHeader')}
            </span>
          </div>
          <div className="sidebar-section-divider" style={{ display: 'none', borderBottom: '1px solid var(--border-color)', margin: '10px 0' }} />

          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                title={sidebarCollapsed ? item.label : ""}
              >
                <Icon size={20} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                <span>{item.label}</span>
              </a>
            );
          })}

          <div className="sidebar-section-header" style={{ padding: '20px 16px 10px 16px', borderBottom: '1px solid var(--border-color)', marginBottom: '10px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {t('nav.otherHeader')}
            </span>
          </div>
          <div className="sidebar-section-divider" style={{ display: 'none', borderBottom: '1px solid var(--border-color)', margin: '10px 0' }} />

          {secondaryItems.map(item => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.id);
                }}
                className={`sidebar-link ${isActive ? 'active' : ''}`}
                title={sidebarCollapsed ? item.label : ""}
              >
                <Icon size={20} style={{ color: isActive ? 'var(--primary)' : 'var(--text-muted)' }} />
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>
      </aside>

      {/* Main Content Pane */}
      <main className="dashboard-content">
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          {children}
        </div>
      </main>

      {/* Responsive styling inside sidebar component */}
      <style>{`
        @media (max-width: 992px) {
          .mobile-sidebar-trigger {
            display: none !important;
          }
          .sidebar-mobile-header {
            display: flex !important;
          }
          .sidebar {
            transform: translateX(-100%);
            width: 280px !important;
            box-shadow: var(--shadow-premium);
            z-index: 900;
          }
          .sidebar.mobile-open {
            transform: translateX(0);
          }
          .dashboard-content {
            margin-left: 0 !important;
            padding: 24px 16px;
          }
        }

        /* Desktop collapsed styles */
        @media (min-width: 992px) {
          .sidebar-collapsed {
            --sidebar-width: 70px;
          }
          .sidebar-collapsed .sidebar-section-header {
            display: none !important;
          }
          .sidebar-collapsed .sidebar-section-divider {
            display: block !important;
          }
          .sidebar-collapsed .sidebar-link {
            padding: 12px 0;
            justify-content: center;
            gap: 0;
          }
          .sidebar-collapsed .sidebar-link span {
            display: none !important;
          }
          .sidebar-collapsed .sidebar {
            padding: 30px 10px;
          }
        }
      `}</style>
    </div>
  );
}
