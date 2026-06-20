import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  MessageSquare, 
  Sprout, 
  ShieldAlert, 
  Beaker, 
  CloudSun, 
  TrendingUp, 
  ChevronRight,
  ShieldCheck,
  TrendingDown,
  DollarSign,
  TrendingUp as TrendUpIcon
} from 'lucide-react';

export default function Home({ setCurrentPage }) {
  const { t } = useLanguage();

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    window.location.hash = pageId;
    window.scrollTo(0, 0);
  };

  const features = [
    {
      id: 'chat',
      title: t('nav.chat'),
      desc: t('chat.welcome').substring(0, 100) + '...',
      icon: MessageSquare,
      color: '#4cc9f0'
    },
    {
      id: 'crop',
      title: t('nav.crop'),
      desc: t('crop.subtitle'),
      icon: Sprout,
      color: '#4361ee'
    },
    {
      id: 'disease',
      title: t('nav.disease'),
      desc: t('disease.subtitle'),
      icon: ShieldAlert,
      color: '#f72585'
    },
    {
      id: 'fertilizer',
      title: t('nav.fertilizer'),
      desc: t('fertilizer.subtitle'),
      icon: Beaker,
      color: '#7209b7'
    },
    {
      id: 'weather',
      title: t('nav.weather'),
      desc: t('weather.subtitle'),
      icon: CloudSun,
      color: '#ffb703'
    },
    {
      id: 'market',
      title: t('nav.market'),
      desc: t('market.subtitle'),
      icon: TrendingUp,
      color: '#2d6a4f'
    }
  ];

  return (
    <div className="animate-fade">
      {/* Hero Section */}
      <section className="hero-section">
        {/* Abstract Leaf Vectors Background */}
        <div style={{
          position: 'absolute',
          top: '-50px',
          right: '-50px',
          width: '200px',
          height: '200px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span style={{
            background: 'var(--accent-glow)',
            color: 'var(--primary-light)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '1px',
            display: 'inline-block',
            marginBottom: '20px'
          }}>
            🌱 NEXT-GEN AGRICULTURE PLATFORM
          </span>
          <h1 style={{
            fontSize: '3.2rem',
            fontWeight: 800,
            marginBottom: '24px',
            lineHeight: 1.15,
            letterSpacing: '-1px'
          }} className="hero-title">
            {t('home.heroTitle')}
          </h1>
          <p style={{
            fontSize: '1.25rem',
            color: 'var(--text-muted)',
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px'
          }}>
            {t('home.heroSubtitle')}
          </p>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <button onClick={() => handleNavClick('chat')} className="btn btn-primary animate-pulse-btn" style={{ padding: '16px 32px' }}>
              <MessageSquare size={20} /> {t('home.startChat')}
            </button>
            <button onClick={() => handleNavClick('crop')} className="btn btn-outline" style={{ padding: '16px 32px' }}>
              <Sprout size={20} /> {t('home.tryTools')}
            </button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section style={{ marginBottom: '60px' }}>
        <div className="grid-4">
          <div className="card text-center" style={{ textAlign: 'center' }}>
            <div className="stat-number">50,000+</div>
            <div className="stat-label">{t('home.stats.farmers')}</div>
          </div>
          <div className="card text-center" style={{ textAlign: 'center' }}>
            <div className="stat-number">96.4%</div>
            <div className="stat-label">{t('home.stats.accuracy')}</div>
          </div>
          <div className="card text-center" style={{ textAlign: 'center' }}>
            <div className="stat-number">22+</div>
            <div className="stat-label">{t('home.stats.crops')}</div>
          </div>
          <div className="card text-center" style={{ textAlign: 'center' }}>
            <div className="stat-number">1,200+</div>
            <div className="stat-label">{t('home.stats.villages')}</div>
          </div>
        </div>
      </section>

      {/* Feature Navigation Cards Grid */}
      <section style={{ marginBottom: '60px' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>Smart Agricultural Dashboard</h2>
          <p style={{ color: 'var(--text-muted)' }}>Choose any tool below to begin analyzing your soil chemistry, weather, crop, and market conditions.</p>
        </div>

        <div className="grid-3">
          {features.map(feat => {
            const Icon = feat.icon;
            return (
              <div 
                key={feat.id} 
                className="card card-premium" 
                style={{ 
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '240px'
                }}
                onClick={() => handleNavClick(feat.id)}
              >
                <div>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    background: `${feat.color}15`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: feat.color,
                    marginBottom: '20px'
                  }}>
                    <Icon size={24} />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', marginBottom: '8px' }}>{feat.title}</h3>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
                    {feat.desc}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: 'var(--accent)', fontWeight: 600, fontSize: '0.9rem', marginTop: '15px' }}>
                  <span>Launch Tool</span>
                  <ChevronRight size={16} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Benefits Section */}
      <section style={{
        padding: '60px 40px',
        marginBottom: '60px'
      }} className="card">
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{ fontSize: '2.2rem', marginBottom: '12px' }}>{t('home.benefits.title')}</h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>{t('home.benefits.subtitle')}</p>
        </div>

        <div className="grid-2">
          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--accent-glow)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <TrendUpIcon size={22} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('home.benefits.b1Title')}</h3>
              <p style={{ fontSize: '0.95rem' }}>{t('home.benefits.b1Desc')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--accent-glow)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <DollarSign size={22} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('home.benefits.b2Title')}</h3>
              <p style={{ fontSize: '0.95rem' }}>{t('home.benefits.b2Desc')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--accent-glow)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <ShieldCheck size={22} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('home.benefits.b3Title')}</h3>
              <p style={{ fontSize: '0.95rem' }}>{t('home.benefits.b3Desc')}</p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--accent-glow)', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <CloudSun size={22} style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{t('home.benefits.b4Title')}</h3>
              <p style={{ fontSize: '0.95rem' }}>{t('home.benefits.b4Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ color: '#ffffff', fontSize: '2.2rem', marginBottom: '15px' }}>{t('home.cta.title')}</h2>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1.1rem', marginBottom: '35px' }}>
            {t('home.cta.subtitle')}
          </p>
          <button onClick={() => handleNavClick('chat')} className="btn btn-accent animate-pulse-btn" style={{ padding: '16px 32px' }}>
            <MessageSquare size={20} /> {t('home.cta.button')}
          </button>
        </div>
      </section>
    </div>
  );
}
