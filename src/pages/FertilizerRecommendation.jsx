import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { recommendFertilizer, cropRules } from '../utils/datasetHelper';
import { Beaker, ShieldAlert, Calendar, Printer, CheckCircle2, AlertCircle } from 'lucide-react';

export default function FertilizerRecommendation() {
  const { t, language } = useLanguage();
  const [cropName, setCropName] = useState('Rice (వరి)');
  const [soilType, setSoilType] = useState('loamy');
  const [n, setN] = useState(30);
  const [p, setP] = useState(25);
  const [k, setK] = useState(20);

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [showSchedule, setShowSchedule] = useState(false);

  const cropsList = cropRules.map(c => `${c.nameEn} (${c.nameTe})`);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setShowSchedule(false);

    // Simulate analysis calculations
    setTimeout(() => {
      const recommendation = recommendFertilizer(cropName, soilType, n, p, k, language);
      setResult(recommendation);
      setLoading(false);

      setTimeout(() => {
        document.getElementById('fertilizer-results')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }, 1000);
  };

  const handleReset = () => {
    setCropName('Rice (వరి)');
    setSoilType('loamy');
    setN(30);
    setP(25);
    setK(20);
    setResult(null);
    setShowSchedule(false);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '24px' }} className="no-print">
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('fertilizer.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t('fertilizer.subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }} className="grid-2 no-print">
        {/* Form Input Card */}
        <div className="card card-premium">
          <form onSubmit={handleSubmit}>
            {/* Target Crop Selector */}
            <div className="form-group">
              <label className="form-label">{t('fertilizer.cropName')}</label>
              <select className="form-select" value={cropName} onChange={(e) => setCropName(e.target.value)}>
                {cropsList.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            {/* Soil Type Selector */}
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

            {/* Current Nitrogen Input */}
            <div className="form-group">
              <label className="form-label">{t('fertilizer.nLabel')}</label>
              <div className="slider-container">
                <input 
                  type="range" 
                  min="0" 
                  max="120" 
                  className="slider-input" 
                  value={n} 
                  onChange={(e) => setN(parseInt(e.target.value))} 
                />
                <span className="slider-value">{n}</span>
              </div>
            </div>

            {/* Current Phosphorus Input */}
            <div className="form-group">
              <label className="form-label">{t('fertilizer.pLabel')}</label>
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

            {/* Current Potassium Input */}
            <div className="form-group">
              <label className="form-label">{t('fertilizer.kLabel')}</label>
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

        {/* Chemical Runoff Advisory Card */}
        <div className="card glass" style={{ height: '100%' }}>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <div style={{ background: 'var(--accent-glow)', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Beaker style={{ color: 'var(--primary)' }} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{t('fertilizer.stewardshipTitle')}</h3>
              <p style={{ fontSize: '0.9rem' }}>{t('fertilizer.stewardshipDesc')}</p>
            </div>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px', marginTop: '20px' }}>
            <h4 style={{ fontSize: '1rem', marginBottom: '10px', color: 'var(--primary-light)' }}>{t('fertilizer.practicesTitle')}</h4>
            <ul style={{ paddingLeft: '20px', fontSize: '0.85rem', color: 'var(--text-muted)', listStyle: 'none' }}>
              <li style={{ marginBottom: '8px' }}>
                • {t('fertilizer.practicesList.split')}
              </li>
              <li style={{ marginBottom: '8px' }}>
                • {t('fertilizer.practicesList.moisture')}
              </li>
              <li style={{ marginBottom: '8px' }}>
                • {t('fertilizer.practicesList.organic')}
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Loading view */}
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
          <p style={{ fontWeight: 600 }}>{language === 'te' ? 'ఎరువుల లోటు నిష్పత్తులను లెక్కిస్తోంది...' : 'Calculating fertilizer deficit ratios...'}</p>
        </div>
      )}

      {/* Results Viewport */}
      {result && !loading && (
        <div id="fertilizer-results" style={{ marginTop: '50px' }} className="print-card-layout animate-fade">
          
          {/* Header block for printing */}
          <div className="print-only" style={{ borderBottom: '2px solid #1b4332', paddingBottom: '15px', marginBottom: '30px', textAlign: 'center' }}>
            <h2 style={{ color: '#1b4332', margin: '0 0 5px 0' }}>{t('brand')}</h2>
            <h4 style={{ color: '#52b788', margin: '0 0 15px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {language === 'te' ? 'భూసార ఎరువుల మోతాదు నివేదిక' : 'Precision Fertilizer Dosage Report'}
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px', fontSize: '0.8rem', textAlign: 'left', background: '#f8f9fa', padding: '12px', borderRadius: '4px' }}>
              <div><strong>{t('fertilizer.cropName')}:</strong> {cropName}</div>
              <div><strong>{t('crop.soilType')}:</strong> {t(`crop.soils.${soilType}`)}</div>
              <div><strong>{t('fertilizer.currentNPK')}</strong> {n}-{p}-{k} mg/kg</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }} className="no-print">
            <h3 style={{ fontSize: '1.8rem', margin: 0 }}>
              {t('common.results')}
            </h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button 
                onClick={() => setShowSchedule(!showSchedule)} 
                className="btn btn-outline" 
                style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Calendar size={16} />
                <span>{t('fertilizer.scheduleBtn')}</span>
              </button>
              <button 
                onClick={handlePrint} 
                className="btn btn-primary" 
                style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Printer size={16} />
                <span>{t('common.printFertilizer')}</span>
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1.7fr', gap: '30px' }} className="grid-2">
            
            {/* Deficit Visualizer Graphic */}
            <div className="card glass">
              <h4 style={{ fontSize: '1.1rem', marginBottom: '20px', color: 'var(--primary)' }}>
                {t('fertilizer.deficits')}
              </h4>

              <div className="deficits-graph">
                {/* Nitrogen row */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{language === 'te' ? 'నైట్రోజన్ (N)' : 'Nitrogen (N)'}</span>
                    <span>{result.analysis.n.current} / {result.analysis.n.optimal} mg/kg</span>
                  </div>
                  <div className="graph-bar-container">
                    <div className="graph-bar-current animate-slide" style={{ width: `${Math.min(100, (result.analysis.n.current / result.analysis.n.optimal) * 100)}%` }}></div>
                    {result.analysis.n.deficit > 0 && (
                      <div className="graph-bar-deficit" style={{ 
                        left: `${(result.analysis.n.current / result.analysis.n.optimal) * 100}%`,
                        width: `${(result.analysis.n.deficit / result.analysis.n.optimal) * 100}%` 
                      }}></div>
                    )}
                  </div>
                </div>

                {/* Phosphorus row */}
                <div style={{ marginBottom: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{language === 'te' ? 'ఫాస్ఫరస్ (P)' : 'Phosphorus (P)'}</span>
                    <span>{result.analysis.p.current} / {result.analysis.p.optimal} mg/kg</span>
                  </div>
                  <div className="graph-bar-container">
                    <div className="graph-bar-current animate-slide" style={{ width: `${Math.min(100, (result.analysis.p.current / result.analysis.p.optimal) * 100)}%` }}></div>
                    {result.analysis.p.deficit > 0 && (
                      <div className="graph-bar-deficit" style={{ 
                        left: `${(result.analysis.p.current / result.analysis.p.optimal) * 100}%`,
                        width: `${(result.analysis.p.deficit / result.analysis.p.optimal) * 100}%` 
                      }}></div>
                    )}
                  </div>
                </div>

                {/* Potassium row */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 600 }}>{language === 'te' ? 'పొటాషియం (K)' : 'Potassium (K)'}</span>
                    <span>{result.analysis.k.current} / {result.analysis.k.optimal} mg/kg</span>
                  </div>
                  <div className="graph-bar-container">
                    <div className="graph-bar-current animate-slide" style={{ width: `${Math.min(100, (result.analysis.k.current / result.analysis.k.optimal) * 100)}%` }}></div>
                    {result.analysis.k.deficit > 0 && (
                      <div className="graph-bar-deficit" style={{ 
                        left: `${(result.analysis.k.current / result.analysis.k.optimal) * 100}%`,
                        width: `${(result.analysis.k.deficit / result.analysis.k.optimal) * 100}%` 
                      }}></div>
                    )}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '15px', marginTop: '25px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', background: 'var(--primary)', borderRadius: '2px' }}></div>
                  <span>{language === 'te' ? 'అందుబాటులో ఉంది' : 'Available'}</span>
                </div>
                <div style={{ display: 'flex', gap: '5px', alignItems: 'center' }}>
                  <div style={{ width: '12px', height: '12px', background: 'var(--secondary)', borderRadius: '2px' }}></div>
                  <span>{language === 'te' ? 'లోపం (కావాలి)' : 'Deficit (Needed)'}</span>
                </div>
              </div>
            </div>

            {/* Recommendation detail card */}
            <div className="card card-premium" style={{ borderTopColor: 'var(--accent)' }}>
              <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', gap: '10px', marginBottom: '20px' }}>
                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {t('fertilizer.recommendation')}
                  </span>
                  <h4 className="crop-title-main" style={{ fontSize: '1.8rem', marginTop: '4px' }}>
                    {result.recommendedFertilizer}
                  </h4>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{t('fertilizer.dosage')}</span>
                  <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--accent)' }}>{result.dosage}</div>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {t('fertilizer.method')}
                  </span>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)' }}>{result.method}</p>
                </div>

                <div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', display: 'flex', gap: '5px', alignItems: 'center' }}>
                    <Calendar size={14} /> {t('fertilizer.timing')}
                  </span>
                  <p style={{ fontSize: '0.95rem', color: 'var(--text-dark)', marginTop: '4px' }}>{result.timing}</p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '15px', marginTop: '10px' }} className="no-print">
                  <span style={{ display: 'flex', gap: '5px', alignItems: 'center', fontSize: '0.8rem', fontWeight: 700, color: 'var(--secondary)', textTransform: 'uppercase', marginBottom: '6px' }}>
                    <ShieldAlert size={16} /> {t('fertilizer.notes')}
                  </span>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{result.safetyNotes}</p>
                </div>
              </div>
            </div>

          </div>

          {/* DYNAMIC DOSAGE SCHEDULER TIMELINE */}
          {(showSchedule || window.matchMedia('print').matches) && (
            <div style={{ marginTop: '40px', borderTop: '1px solid var(--border-color)', paddingTop: '30px' }} className="animate-fade">
              <h4 style={{ fontSize: '1.4rem', marginBottom: '8px' }}>
                {t('fertilizer.schedulerTitle')}
              </h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
                {t('fertilizer.scheduleDesc')}
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }} className="grid-2">
                {/* Timeline display */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', position: 'relative', paddingLeft: '20px', borderLeft: '2px solid var(--border-color)' }}>
                  
                  {/* Step 1 */}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-29px',
                      top: '2px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--primary)',
                      border: '4px solid var(--bg-white)',
                      boxShadow: '0 0 0 2px var(--primary)'
                    }} />
                    <h5 style={{ fontSize: '1.1rem', margin: '0 0 6px 0', color: 'var(--primary-dark)' }}>
                      {t('fertilizer.basalStage')}
                    </h5>
                    <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-main)', lineHeight: '1.4' }}>
                      {t('fertilizer.basalDesc')}
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-29px',
                      top: '2px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--accent)',
                      border: '4px solid var(--bg-white)',
                      boxShadow: '0 0 0 2px var(--accent)'
                    }} />
                    <h5 style={{ fontSize: '1.1rem', margin: '0 0 6px 0', color: 'var(--primary-dark)' }}>
                      {t('fertilizer.topDressing1')}
                    </h5>
                    <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-main)', lineHeight: '1.4' }}>
                      {t('fertilizer.topDressing1Desc')}
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div style={{ position: 'relative' }}>
                    <div style={{
                      position: 'absolute',
                      left: '-29px',
                      top: '2px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      background: 'var(--secondary)',
                      border: '4px solid var(--bg-white)',
                      boxShadow: '0 0 0 2px var(--secondary)'
                    }} />
                    <h5 style={{ fontSize: '1.1rem', margin: '0 0 6px 0', color: 'var(--primary-dark)' }}>
                      {t('fertilizer.topDressing2')}
                    </h5>
                    <p style={{ fontSize: '0.9rem', margin: 0, color: 'var(--text-main)', lineHeight: '1.4' }}>
                      {t('fertilizer.topDressing2Desc')}
                    </p>
                  </div>

                </div>

                {/* Weather guidelines box */}
                <div className="card glass" style={{ height: 'fit-content', background: '#fff9e6', border: '1px solid #ffe8cc' }}>
                  <h5 style={{ margin: '0 0 12px 0', fontSize: '1rem', display: 'flex', gap: '6px', alignItems: 'center', color: '#b26a00' }}>
                    <AlertCircle size={18} />
                    {t('fertilizer.weatherAlert')}
                  </h5>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    {t('fertilizer.weatherAlertList').map((item, idx) => (
                      <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', fontSize: '0.85rem' }}>
                        <CheckCircle2 size={15} style={{ color: '#b26a00', flexShrink: 0, marginTop: '2px' }} />
                        <span style={{ color: '#5c3e00' }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
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
          .graph-bar-container {
            border: 1px solid #999999 !important;
            background: #e9ecef !important;
          }
        }
      `}</style>
    </div>
  );
}
