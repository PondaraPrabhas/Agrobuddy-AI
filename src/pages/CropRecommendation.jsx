import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { recommendCrop, cropRules } from '../utils/datasetHelper';
import { Sprout, CheckCircle2, AlertCircle, Printer, ArrowLeftRight } from 'lucide-react';

export default function CropRecommendation() {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState('advisor'); // 'advisor' or 'compare'
  
  // Advisor Tab State
  const [soilType, setSoilType] = useState('loamy');
  const [ph, setPh] = useState('6.5');
  const [n, setN] = useState(50);
  const [p, setP] = useState(50);
  const [k, setK] = useState(40);
  const [season, setSeason] = useState('kharif');
  
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  // Comparator Tab State
  const [crop1Id, setCrop1Id] = useState('');
  const [crop2Id, setCrop2Id] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    setTimeout(() => {
      const recommendations = recommendCrop(soilType, ph, n, p, k, season, language);
      setResults(recommendations);
      setLoading(false);
      
      setTimeout(() => {
        document.getElementById('analysis-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  };

  const handleReset = () => {
    setSoilType('loamy');
    setPh('6.5');
    setN(50);
    setP(50);
    setK(40);
    setSeason('kharif');
    setResults(null);
  };

  const handlePrint = () => {
    window.print();
  };

  // Find crop details for comparator
  const crop1 = cropRules.find(c => c.id === crop1Id);
  const crop2 = cropRules.find(c => c.id === crop2Id);

  return (
    <div className="animate-fade">
      {/* Title */}
      <div style={{ marginBottom: '24px' }} className="no-print">
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('crop.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t('crop.subtitle')}</p>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--border-color)',
        marginBottom: '30px',
        gap: '20px'
      }} className="no-print">
        <button
          onClick={() => setActiveTab('advisor')}
          style={{
            padding: '12px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'advisor' ? '3px solid var(--primary)' : 'none',
            color: activeTab === 'advisor' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Sprout size={18} />
          <span>{language === 'te' ? 'పంట అంచనా' : 'Crop Suitability Advisor'}</span>
        </button>
        <button
          onClick={() => setActiveTab('compare')}
          style={{
            padding: '12px 20px',
            background: 'transparent',
            border: 'none',
            borderBottom: activeTab === 'compare' ? '3px solid var(--primary)' : 'none',
            color: activeTab === 'compare' ? 'var(--primary)' : 'var(--text-muted)',
            fontWeight: 700,
            cursor: 'pointer',
            fontSize: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <ArrowLeftRight size={18} />
          <span>{t('crop.compareTitle')}</span>
        </button>
      </div>

      {/* TAB CONTENT: ADVISOR */}
      {activeTab === 'advisor' && (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }} className="grid-2 no-print">
            {/* Input Form Card */}
            <div className="card card-premium">
              <form onSubmit={handleSubmit}>
                <div className="grid-2">
                  {/* Soil Selector */}
                  <div className="form-group">
                    <label className="form-label">{t('crop.soilType')}</label>
                    <select className="form-select" value={soilType} onChange={(e) => setSoilType(e.target.value)}>
                      <option value="alluvial">{t('crop.soils.alluvial')}</option>
                      <option value="black">{t('crop.soils.black')}</option>
                      <option value="red">{t('crop.soils.red')}</option>
                      <option value="sandy">{t('crop.soils.sandy')}</option>
                      <option value="clayey">{t('crop.soils.clayey')}</option>
                      <option value="loamy">{t('crop.soils.loamy')}</option>
                    </select>
                  </div>

                  {/* Season Selector */}
                  <div className="form-group">
                    <label className="form-label">{t('crop.season')}</label>
                    <select className="form-select" value={season} onChange={(e) => setSeason(e.target.value)}>
                      <option value="kharif">{t('crop.seasons.kharif')}</option>
                      <option value="rabi">{t('crop.seasons.rabi')}</option>
                      <option value="summer">{t('crop.seasons.summer')}</option>
                    </select>
                  </div>
                </div>

                {/* pH Slider */}
                <div className="form-group">
                  <label className="form-label" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>{t('crop.ph')}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                      (Optimal: 5.5 - 7.5)
                    </span>
                  </label>
                  <div className="slider-container">
                    <input 
                      type="range" 
                      min="0" 
                      max="14" 
                      step="0.1" 
                      className="slider-input" 
                      value={ph} 
                      onChange={(e) => setPh(e.target.value)} 
                    />
                    <span className="slider-value">{ph}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>0 (Acidic)</span>
                    <span>7 (Neutral)</span>
                    <span>14 (Alkaline)</span>
                  </div>
                </div>

                {/* Nitrogen Input */}
                <div className="form-group">
                  <label className="form-label">{t('crop.n')}</label>
                  <div className="slider-container">
                    <input 
                      type="range" 
                      min="0" 
                      max="140" 
                      className="slider-input" 
                      value={n} 
                      onChange={(e) => setN(parseInt(e.target.value))} 
                    />
                    <span className="slider-value">{n}</span>
                  </div>
                </div>

                {/* Phosphorus Input */}
                <div className="form-group">
                  <label className="form-label">{t('crop.p')}</label>
                  <div className="slider-container">
                    <input 
                      type="range" 
                      min="0" 
                      max="100" 
                      className="slider-input" 
                      value={p} 
                      onChange={(e) => setP(parseInt(e.target.value))} 
                    />
                    <span className="slider-value">{p}</span>
                  </div>
                </div>

                {/* Potassium Input */}
                <div className="form-group">
                  <label className="form-label">{t('crop.k')}</label>
                  <div className="slider-container">
                    <input 
                      type="range" 
                      min="0" 
                      max="120" 
                      className="slider-input" 
                      value={k} 
                      onChange={(e) => setK(parseInt(e.target.value))} 
                    />
                    <span className="slider-value">{k}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flexGrow: 2 }} disabled={loading}>
                    {loading ? t('common.loading') : t('common.submit')}
                  </button>
                  <button type="button" onClick={handleReset} className="btn btn-outline" style={{ flexGrow: 1 }} disabled={loading}>
                    {t('common.reset')}
                  </button>
                </div>
              </form>
            </div>

            {/* Info & Instructions Card */}
            <div className="card glass" style={{ height: '100%' }}>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
                <div style={{ background: 'var(--accent-glow)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Sprout style={{ color: 'var(--primary)' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{t('crop.guideTitle')}</h3>
                  <p style={{ fontSize: '0.9rem' }}>{t('crop.guideDesc')}</p>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
                <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--primary-light)' }}>{t('crop.guideSoilTitle')}</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  <li style={{ marginBottom: '8px' }}>{t('crop.nitrogenDesc')}</li>
                  <li style={{ marginBottom: '8px' }}>{t('crop.phosphorusDesc')}</li>
                  <li style={{ marginBottom: '8px' }}>{t('crop.potassiumDesc')}</li>
                  <li style={{ marginBottom: '8px' }}>{t('crop.soilPhDesc')}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Loading status */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0' }} className="no-print">
              <div style={{
                width: '50px',
                height: '50px',
                border: '5px solid var(--border-color)',
                borderTop: '5px solid var(--accent)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 20px'
              }}></div>
              <p style={{ fontWeight: 600 }}>Analyzing NPK soil models...</p>
            </div>
          )}

          {/* Sowing Suitability Results */}
          {results && !loading && (
            <div id="analysis-results" style={{ marginTop: '50px' }} className="print-card-layout animate-fade">
              {/* Header block for printing */}
              <div className="print-only" style={{ borderBottom: '2px solid #1b4332', paddingBottom: '15px', marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ color: '#1b4332', margin: '0 0 5px 0' }}>{t('brand')}</h2>
                <h4 style={{ color: '#52b788', margin: '0 0 15px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {language === 'te' ? 'వ్యవసాయ భూసార ఆరోగ్య కార్డు' : 'Soil Health & Crop Card'}
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '10px', fontSize: '0.8rem', textAlign: 'left', background: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
                  <div><strong>{language === 'te' ? 'నేల రకం:' : 'Soil Type:'}</strong> {t(`crop.soils.${soilType}`)}</div>
                  <div><strong>{language === 'te' ? 'సీజన్:' : 'Season:'}</strong> {t(`crop.seasons.${season}`)}</div>
                  <div><strong>pH:</strong> {ph}</div>
                  <div><strong>N-P-K:</strong> {n}-{p}-{k}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }} className="no-print">
                <h3 style={{ fontSize: '1.8rem', margin: 0 }}>
                  {t('common.results')}
                </h3>
                <button onClick={handlePrint} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Printer size={16} />
                  <span>{t('common.printCard')}</span>
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '30px' }} className="grid-2">
                {/* Top Recommended Crop Detail */}
                <div className="card card-premium">
                  <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', marginBottom: '20px' }}>
                    <div>
                      <span style={{ color: 'var(--accent)', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>{t('crop.topRecHeader')}</span>
                      <h4 className="crop-title-main" style={{ fontSize: '2.2rem', marginTop: '4px' }}>{results[0].name}</h4>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('crop.yield')}</span>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>{results[0].expectedYield}</div>
                    </div>
                  </div>

                  <p style={{ fontSize: '1.05rem', marginBottom: '25px', color: 'var(--text-dark)' }}>{results[0].description}</p>

                  <h5 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--primary)' }}>{t('crop.reasons')}</h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {results[0].reasons.map((reason, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.9rem' }}>
                        <CheckCircle2 size={16} style={{ color: 'var(--accent)', flexShrink: 0, marginTop: '2px' }} />
                        <span>{reason}</span>
                      </div>
                    ))}
                  </div>

                  {/* Optimal NPK indicator */}
                  <div style={{
                    background: 'var(--bg-light)',
                    borderRadius: 'var(--border-radius-sm)',
                    padding: '16px',
                    marginTop: '30px',
                    border: '1px solid var(--border-color)'
                  }} className="glass">
                    <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', display: 'block', marginBottom: '10px' }}>
                      {t('crop.optimal')}
                    </span>
                    <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px', textAlign: 'center' }}>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>N</span>
                        <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{results[0].optimalNPK.n}</strong>
                      </div>
                      <div style={{ borderLeft: '1px solid var(--border-color)' }}></div>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>P</span>
                        <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{results[0].optimalNPK.p}</strong>
                      </div>
                      <div style={{ borderLeft: '1px solid var(--border-color)' }}></div>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>K</span>
                        <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{results[0].optimalNPK.k}</strong>
                      </div>
                      <div style={{ borderLeft: '1px solid var(--border-color)' }}></div>
                      <div>
                        <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>pH</span>
                        <strong style={{ color: 'var(--primary)', fontSize: '1.1rem' }}>{results[0].optimalNPK.ph}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gauge Score Card */}
                <div className="card text-center" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.95rem' }}>
                    {t('crop.score')}
                  </span>
                  
                  <div className="gauge-container">
                    <svg className="gauge-svg">
                      <circle className="gauge-track" cx="75" cy="75" r="60"></circle>
                      <circle 
                        className="gauge-indicator" 
                        cx="75" 
                        cy="75" 
                        r="60"
                        style={{
                          strokeDasharray: `${2 * Math.PI * 60}`,
                          strokeDashoffset: `${2 * Math.PI * 60 * (1 - results[0].score / 100)}`
                        }}
                      ></circle>
                    </svg>
                    <div className="gauge-text">{results[0].score}%</div>
                  </div>

                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginTop: '25px', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                    <AlertCircle size={16} />
                    <span>{t('crop.suitabilityHint')}</span>
                  </div>
                </div>
              </div>

              {/* Secondary Crop Alternatives List */}
              <div style={{ marginTop: '40px' }} className="no-print">
                <h4 style={{ fontSize: '1.3rem', marginBottom: '20px' }}>{t('crop.altCropsHeader')}</h4>
                <div className="grid-3">
                  {results.slice(1, 4).map((crop, idx) => (
                    <div key={idx} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <h5 className="crop-title-analytics" style={{ fontSize: '1.15rem' }}>{crop.name}</h5>
                          <span style={{ 
                            background: 'var(--bg-light)', 
                            padding: '4px 8px', 
                            borderRadius: '12px', 
                            fontSize: '0.75rem', 
                            fontWeight: 700, 
                            color: 'var(--accent)'
                          }} className="glass">
                            {crop.score}% Match
                          </span>
                        </div>
                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '15px' }}>{crop.description}</p>
                      </div>
                      <div style={{ fontSize: '0.8rem', borderTop: '1px solid var(--border-color)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between' }}>
                        <span>{t('crop.yield')}:</span>
                        <strong style={{ color: 'var(--primary)' }}>{crop.expectedYield.split(' ')[0]} t/ha</strong>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: SIDE-BY-SIDE COMPARISON */}
      {activeTab === 'compare' && (
        <div className="no-print animate-fade">
          <div className="card shadow-sm" style={{ padding: '24px', marginBottom: '30px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '8px' }}>{t('crop.compareTitle')}</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>{t('crop.compareDesc')}</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
              {/* Select 1 */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>{t('crop.selectCrop1')}</label>
                <select 
                  className="form-control"
                  value={crop1Id}
                  onChange={(e) => setCrop1Id(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-white)', color: 'var(--text-main)', fontSize: '0.95rem' }}
                >
                  <option value="">{t('common.select')}</option>
                  {cropRules.map(c => (
                    <option key={c.id} value={c.id}>{language === 'te' ? c.nameTe : c.nameEn}</option>
                  ))}
                </select>
              </div>

              {/* Select 2 */}
              <div>
                <label style={{ display: 'block', fontWeight: 600, marginBottom: '6px', fontSize: '0.9rem' }}>{t('crop.selectCrop2')}</label>
                <select 
                  className="form-control"
                  value={crop2Id}
                  onChange={(e) => setCrop2Id(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--border-radius-sm)', border: '1px solid var(--border-color)', background: 'var(--bg-white)', color: 'var(--text-main)', fontSize: '0.95rem' }}
                >
                  <option value="">{t('common.select')}</option>
                  {cropRules.map(c => (
                    <option key={c.id} value={c.id}>{language === 'te' ? c.nameTe : c.nameEn}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Matrix table */}
          {crop1 && crop2 && crop1.id !== crop2.id ? (
            <div className="card shadow-sm" style={{ padding: '0', overflowX: 'auto', border: '1px solid var(--border-color)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
                <thead>
                  <tr style={{ background: 'var(--primary-dark)', color: '#ffffff' }}>
                    <th style={{ padding: '16px 20px', fontWeight: 700 }}>{language === 'te' ? 'పోలిక ప్రమాణం' : 'Comparison Metric'}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700, width: '35%' }}>{language === 'te' ? crop1.nameTe : crop1.nameEn}</th>
                    <th style={{ padding: '16px 20px', fontWeight: 700, width: '35%' }}>{language === 'te' ? crop2.nameTe : crop2.nameEn}</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '0.95rem' }}>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{language === 'te' ? 'పంట సీజన్' : 'Farming Season'}</td>
                    <td style={{ padding: '16px 20px' }}>{t(`crop.seasons.${crop1.season}`)}</td>
                    <td style={{ padding: '16px 20px' }}>{t(`crop.seasons.${crop2.season}`)}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.01)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{language === 'te' ? 'అనుకూల నేలలు' : 'Suitable Soils'}</td>
                    <td style={{ padding: '16px 20px' }}>{crop1.soilTypes.map(s => t(`crop.soils.${s}`)).join(', ')}</td>
                    <td style={{ padding: '16px 20px' }}>{crop2.soilTypes.map(s => t(`crop.soils.${s}`)).join(', ')}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{t('crop.soilCriteria')} (N - P - K)</td>
                    <td style={{ padding: '16px 20px' }}>
                      <strong>N:</strong> {crop1.optimal.n} | <strong>P:</strong> {crop1.optimal.p} | <strong>K:</strong> {crop1.optimal.k} (mg/kg)
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      <strong>N:</strong> {crop2.optimal.n} | <strong>P:</strong> {crop2.optimal.p} | <strong>K:</strong> {crop2.optimal.k} (mg/kg)
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.01)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{language === 'te' ? 'నేల pH విలువ పరిధి' : 'Optimal Soil pH'}</td>
                    <td style={{ padding: '16px 20px' }}>{crop1.phRange[0]} - {crop1.phRange[1]}</td>
                    <td style={{ padding: '16px 20px' }}>{crop2.phRange[0]} - {crop2.phRange[1]}</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{language === 'te' ? 'ఆశించే సగటు దిగుబడి' : 'Expected Yield Rate'}</td>
                    <td style={{ padding: '16px 20px', color: 'var(--primary)', fontWeight: 700 }}>
                      {language === 'te' ? crop1.expectedYieldTe : crop1.expectedYieldEn}
                    </td>
                    <td style={{ padding: '16px 20px', color: 'var(--primary)', fontWeight: 700 }}>
                      {language === 'te' ? crop2.expectedYieldTe : crop2.expectedYieldEn}
                    </td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid var(--border-color)', background: 'rgba(0,0,0,0.01)' }}>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{language === 'te' ? 'నీటి అవసరం సూచీ' : 'Water Demand Index'}</td>
                    <td style={{ padding: '16px 20px' }}>
                      {crop1.minRainfall} - {crop1.maxRainfall} mm
                    </td>
                    <td style={{ padding: '16px 20px' }}>
                      {crop2.minRainfall} - {crop2.maxRainfall} mm
                    </td>
                  </tr>
                  <tr>
                    <td style={{ padding: '16px 20px', fontWeight: 600 }}>{language === 'te' ? 'పంట వివరణ' : 'General Crop Description'}</td>
                    <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {language === 'te' ? crop1.descriptionTe : crop1.descriptionEn}
                    </td>
                    <td style={{ padding: '16px 20px', fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                      {language === 'te' ? crop2.descriptionTe : crop2.descriptionEn}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          ) : (
            <div className="card text-center" style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--border-color)', background: 'transparent' }}>
              <ArrowLeftRight size={48} style={{ color: 'var(--border-color)', marginBottom: '15px' }} />
              <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem' }}>{t('crop.noDataCompare')}</p>
            </div>
          )}
        </div>
      )}

      {/* Printing Styles Localized */}
      <style>{`
        .print-only {
          display: none;
        }
        @media print {
          .no-print {
            display: none !important;
          }
          .print-only {
            display: block !important;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .dashboard-container {
            display: block !important;
          }
          .dashboard-content, main {
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          .print-card-layout {
            border: 3px double #1b4332 !important;
            padding: 30px !important;
            margin: 0 auto !important;
            max-width: 800px !important;
            background: #ffffff !important;
            border-radius: 8px !important;
            box-shadow: none !important;
          }
          .card {
            border: 1px solid #cccccc !important;
            box-shadow: none !important;
            background: #ffffff !important;
          }
          .gauge-container {
            page-break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
}
