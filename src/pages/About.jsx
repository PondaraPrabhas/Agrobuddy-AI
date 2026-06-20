import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sprout, 
  Beaker, 
  ShieldAlert, 
  CloudSun, 
  TrendingUp, 
  DollarSign,
  Compass,
  Users,
  BookOpen,
  ClipboardList,
  Sparkles
} from 'lucide-react';

export default function About() {
  const { t, language } = useLanguage();

  const features = [
    {
      title: t('about.features.cropTitle'),
      desc: t('about.features.cropDesc'),
      icon: Sprout,
      color: '#22C55E'
    },
    {
      title: t('about.features.fertilizerTitle'),
      desc: t('about.features.fertilizerDesc'),
      icon: Beaker,
      color: '#A3E635'
    },
    {
      title: t('about.features.diseaseTitle'),
      desc: t('about.features.diseaseDesc'),
      icon: ShieldAlert,
      color: '#EF4444'
    },
    {
      title: t('about.features.weatherTitle'),
      desc: t('about.features.weatherDesc'),
      icon: CloudSun,
      color: '#3B82F6'
    },
    {
      title: t('about.features.marketTitle'),
      desc: t('about.features.marketDesc'),
      icon: TrendingUp,
      color: '#F59E0B'
    },
    {
      title: t('about.features.profitTitle'),
      desc: t('about.features.profitDesc'),
      icon: DollarSign,
      color: '#EC4899'
    }
  ];

  const steps = [
    {
      num: "1",
      title: language === 'te' ? 'వివరాలు నమోదు' : 'Enter details',
      desc: t('about.steps.step1'),
      icon: ClipboardList
    },
    {
      num: "2",
      title: language === 'te' ? 'పరిస్థితుల విశ్లేషణ' : 'Analyze conditions',
      desc: t('about.steps.step2'),
      icon: CloudSun
    },
    {
      num: "3",
      title: language === 'te' ? 'AI సిఫార్సులు' : 'AI recommendations',
      desc: t('about.steps.step3'),
      icon: Sparkles
    },
    {
      num: "4",
      title: language === 'te' ? 'దిగుబడి పెంపు' : 'Improve yields',
      desc: t('about.steps.step4'),
      icon: TrendingUp
    }
  ];

  const audiences = [
    {
      name: t('about.audiences.farmers'),
      icon: Users,
      desc: language === 'te' ? 'రోజువారీ వ్యవసాయ సలహాలు మరియు తెగుళ్ల సహాయం కోసం' : 'For daily farm management and crop advisory'
    },
    {
      name: t('about.audiences.students'),
      icon: BookOpen,
      desc: language === 'te' ? 'సాంకేతిక ఆధారిత స్మార్ట్ వ్యవసాయ విధానాలను అభ్యసించడానికి' : 'For learning modern tech-driven agricultural practices'
    },
    {
      name: t('about.audiences.advisors'),
      icon: Compass,
      desc: language === 'te' ? 'రైతులకు ఖచ్చితమైన విశ్లేషణలతో సలహాలు అందించడానికి' : 'For guiding farmers with data-driven decision points'
    },
    {
      name: t('about.audiences.researchers'),
      icon: Beaker,
      desc: language === 'te' ? 'పంట సాగు గణాంకాలు మరియు ఉత్పాదకతను పరిశోధించడానికి' : 'For analyzing regional crop area shares and yields'
    }
  ];

  const metrics = [
    {
      name: t('about.impacts.crops'),
      value: "50,000+",
      desc: language === 'te' ? 'సిఫార్సులు అందించబడ్డాయి' : 'Farmer suggestions provided',
      icon: Sprout
    },
    {
      name: t('about.impacts.weather'),
      value: "150,000+",
      desc: language === 'te' ? 'వాతావరణ విచారణలు' : 'Daily forecast calls',
      icon: CloudSun
    },
    {
      name: t('about.impacts.disease'),
      value: "20,000+",
      desc: language === 'te' ? 'నిర్ధారణలు పూర్తిచేశారు' : 'Leaf scans analyzed',
      icon: ShieldAlert
    },
    {
      name: t('about.impacts.market'),
      value: "80,000+",
      desc: language === 'te' ? 'మార్కెట్ ధరల తనిఖీలు' : 'Mandi quote lookups',
      icon: TrendingUp
    }
  ];

  return (
    <div className="animate-fade">
      {/* Title */}
      <div style={{ marginBottom: '32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '8px', fontWeight: 800 }}>{t('about.title')}</h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>
          {language === 'te' ? 'స్మార్ట్ మరియు స్థిరమైన వ్యవసాయం కోసం డిజిటల్ సహాయకుడు' : 'A smart digital platform driving sustainable agricultural productivity'}
        </p>
      </div>

      {/* Mission Section */}
      <div className="card card-premium" style={{ marginBottom: '50px', padding: '32px', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          top: '-20px',
          right: '-20px',
          width: '120px',
          height: '120px',
          background: 'radial-gradient(circle, var(--accent-glow) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
          <Sparkles size={20} style={{ color: 'var(--primary)' }} />
          <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase', letterSpacing: '1px' }}>
            {language === 'te' ? 'మా లక్ష్యం' : 'Our Mission'}
          </span>
        </div>
        <h3 style={{ fontSize: '1.8rem', marginBottom: '16px', fontWeight: 800 }}>
          {t('about.missionSubtitle')}
        </h3>
        <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: 'var(--text-muted)', margin: 0 }}>
          {t('about.missionDesc')}
        </p>
      </div>

      {/* Why AgroBuddy AI? Section */}
      <section style={{ marginBottom: '50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{t('about.whyTitle')}</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {language === 'te' ? 'రైతులకు ప్రయోజనం చేకూర్చేందుకు ప్రత్యేకంగా రూపొందించబడిన సేవలు' : 'Tailored intelligence suites built exclusively to support agricultural yields'}
          </p>
        </div>
        <div className="grid-3">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div key={idx} className="card" style={{ display: 'flex', gap: '16px', padding: '24px' }}>
                <div style={{
                  background: `${feat.color}15`,
                  width: '48px',
                  height: '48px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: feat.color,
                  flexShrink: 0
                }}>
                  <Icon size={24} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.15rem', marginBottom: '6px', fontWeight: 700 }}>{feat.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>{feat.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{ marginBottom: '50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{t('about.howTitle')}</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {language === 'te' ? 'కేవలం 4簡単なదశల్లో పంట ఉత్పాదకతను మెరుగుపరచుకోండి' : 'Four simple operational modules guiding you to smarter harvest cycles'}
          </p>
        </div>
        <div className="grid-4" style={{ position: 'relative' }}>
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={idx} className="card text-center" style={{ textAlign: 'center', padding: '24px', position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  top: '12px',
                  left: '16px',
                  fontSize: '0.85rem',
                  fontWeight: 800,
                  background: 'var(--accent-glow)',
                  color: 'var(--primary)',
                  padding: '4px 10px',
                  borderRadius: '12px'
                }}>
                  Step {step.num}
                </span>
                <div style={{
                  background: 'var(--accent-glow)',
                  width: '56px',
                  height: '56px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  margin: '12px auto 16px auto'
                }}>
                  <Icon size={24} />
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '8px', fontWeight: 700 }}>{step.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.5' }}>{step.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Who Can Use Section */}
      <section style={{ marginBottom: '50px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{t('about.audienceTitle')}</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {language === 'te' ? 'వ్యవసాయ రంగంలోని ప్రతి ఒక్కరి కోసం తయారుచేయబడింది' : 'A flexible system designed for everyone in the farming community'}
          </p>
        </div>
        <div className="grid-4">
          {audiences.map((aud, idx) => {
            const Icon = aud.icon;
            return (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px', padding: '24px' }}>
                <div style={{
                  background: 'var(--accent-glow)',
                  width: '40px',
                  height: '40px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)'
                }}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 style={{ fontSize: '1.1rem', marginBottom: '4px', fontWeight: 700 }}>{aud.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0, lineHeight: '1.4' }}>{aud.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Our Vision Section */}
      <section style={{ 
        marginBottom: '50px', 
        padding: '40px 24px', 
        background: 'var(--accent-glow)', 
        borderRadius: 'var(--border-radius-lg)', 
        borderLeft: '4px solid var(--accent)', 
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }} className="insight-banner">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '16px', fontWeight: 800, color: 'var(--primary)' }}>
            {t('about.visionTitle')}
          </h3>
          <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-dark)', lineHeight: '1.6', margin: 0 }}>
            "{t('about.visionDesc')}"
          </p>
        </div>
      </section>

      {/* Impact Section */}
      <section style={{ marginBottom: '30px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '8px' }}>{t('about.impactTitle')}</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            {language === 'te' ? 'రైతులకు మెరుగైన ఫలితాలు అందించడంలో మా ప్రయాణం' : 'Quantifiable results helping agricultural communities protect crops and increase profits'}
          </p>
        </div>
        <div className="grid-4">
          {metrics.map((metric, idx) => {
            const Icon = metric.icon;
            return (
              <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '24px', textAlign: 'center' }}>
                <div style={{
                  background: 'var(--accent-glow)',
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary)',
                  marginBottom: '16px'
                }}>
                  <Icon size={24} />
                </div>
                <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px', lineHeight: '1.25' }}>
                  {metric.value}
                </div>
                <div style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '4px' }}>{metric.name}</div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{metric.desc}</div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
