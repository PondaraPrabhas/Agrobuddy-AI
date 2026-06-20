import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DashboardLayout from './components/DashboardLayout';

// Import Pages
import Home from './pages/Home';
import Chatbot from './pages/Chatbot';
import CropRecommendation from './pages/CropRecommendation';
import DiseaseGuidance from './pages/DiseaseGuidance';
import FertilizerRecommendation from './pages/FertilizerRecommendation';
import WeatherDashboard from './pages/WeatherDashboard';
import MarketPrice from './pages/MarketPrice';
import About from './pages/About';
import StateAnalytics from './pages/StateAnalytics';

export default function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    // Read page from URL hash on load
    const hash = window.location.hash.replace('#', '');
    const validPages = ['home', 'chat', 'crop', 'disease', 'fertilizer', 'weather', 'market', 'analytics', 'about'];
    return validPages.includes(hash) ? hash : 'home';
  });

  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('agrobuddy_sidebar_collapsed') === 'true';
  });
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      const validPages = ['home', 'chat', 'crop', 'disease', 'fertilizer', 'weather', 'market', 'analytics', 'about'];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('home');
      }
      window.scrollTo(0, 0);
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPageContent = () => {
    switch (currentPage) {
      case 'home':
        return <Home setCurrentPage={setCurrentPage} />;
      case 'chat':
        return <Chatbot setCurrentPage={setCurrentPage} />;
      case 'crop':
        return <CropRecommendation />;
      case 'disease':
        return <DiseaseGuidance />;
      case 'fertilizer':
        return <FertilizerRecommendation />;
      case 'weather':
        return <WeatherDashboard />;
      case 'market':
        return <MarketPrice />;
      case 'analytics':
        return <StateAnalytics />;
      case 'about':
        return <About />;
      default:
        return <Home setCurrentPage={setCurrentPage} />;
    }
  };

  // Home and About pages use a standard full-width layout with offset header
  // All agricultural tools pages are wrapped in the side-nav Dashboard Layout
  const isDashboardPage = ['chat', 'crop', 'disease', 'fertilizer', 'weather', 'market', 'analytics'].includes(currentPage);

  return (
    <LanguageProvider>
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Navbar 
          currentPage={currentPage} 
          setCurrentPage={setCurrentPage} 
          isDashboardPage={isDashboardPage}
          sidebarCollapsed={sidebarCollapsed}
          setSidebarCollapsed={setSidebarCollapsed}
          mobileSidebarOpen={mobileSidebarOpen}
          setMobileSidebarOpen={setMobileSidebarOpen}
        />
        
        {isDashboardPage ? (
          <DashboardLayout 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage}
            sidebarCollapsed={sidebarCollapsed}
            mobileSidebarOpen={mobileSidebarOpen}
            setMobileSidebarOpen={setMobileSidebarOpen}
          >
            {renderPageContent()}
          </DashboardLayout>
        ) : (
          <div style={{ 
            flexGrow: 1, 
            paddingTop: '90px', 
            maxWidth: '1200px', 
            width: '100%',
            margin: '0 auto', 
            paddingLeft: '20px', 
            paddingRight: '20px' 
          }}>
            {renderPageContent()}
          </div>
        )}

        <Footer setCurrentPage={setCurrentPage} />
      </div>
    </LanguageProvider>
  );
}
