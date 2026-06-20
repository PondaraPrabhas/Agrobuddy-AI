import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import cropData from '../utils/stateCropData.json';
import { MapPin, Sprout, BarChart3, TrendingUp, Info } from 'lucide-react';

export default function StateAnalytics() {
  const { t, language } = useLanguage();
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');

  // Get list of unique states
  const states = Object.keys(cropData).sort();

  // Get list of districts for selected state
  const districts = selectedState ? Object.keys(cropData[selectedState]).sort() : [];

  const handleStateChange = (e) => {
    setSelectedState(e.target.value);
    setSelectedDistrict(''); // Reset district when state changes
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
  };

  // Retrieve top crops data
  const topCrops = (selectedState && selectedDistrict) 
    ? cropData[selectedState][selectedDistrict] 
    : [];

  // Calculate total area for relative percentage gauge
  const totalArea = topCrops.reduce((sum, item) => sum + item.area, 0);

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('analytics.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t('analytics.subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }} className="grid-2">
        {/* State Selection */}
        <div className="card shadow-sm" style={{ padding: '20px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.95rem' }}>
            <MapPin size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--primary)' }} />
            {t('analytics.selectState')}
          </label>
          <select 
            className="form-select" 
            value={selectedState} 
            onChange={handleStateChange}
            style={{ width: '100%', borderRadius: 'var(--border-radius-sm)' }}
          >
            <option value="">{t('common.select')}</option>
            {states.map(state => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
        </div>

        {/* District Selection */}
        <div className="card shadow-sm" style={{ padding: '20px' }}>
          <label style={{ display: 'block', fontWeight: 600, marginBottom: '8px', fontSize: '0.95rem' }}>
            <MapPin size={16} style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle', color: 'var(--primary)' }} />
            {t('analytics.selectDistrict')}
          </label>
          <select 
            className="form-select" 
            value={selectedDistrict} 
            onChange={handleDistrictChange}
            disabled={!selectedState}
            style={{ width: '100%', borderRadius: 'var(--border-radius-sm)' }}
          >
            <option value="">{t('common.select')}</option>
            {districts.map(dist => (
              <option key={dist} value={dist}>{dist}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Display */}
      {selectedState && selectedDistrict ? (
        topCrops.length > 0 ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            {/* Agronomic insight banner */}
            <div className="insight-banner">
              <Info size={20} className="insight-icon" style={{ flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.05rem', fontWeight: 700 }}>
                  {t('analytics.insightTitle')} {selectedDistrict}, {selectedState}
                </h4>
                <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.4' }}>
                  {t('analytics.insightText')}
                </p>
              </div>
            </div>

            {/* List of crops */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
              {topCrops.map((item, idx) => {
                const percentShare = totalArea > 0 ? ((item.area / totalArea) * 100).toFixed(1) : 0;
                
                return (
                  <div key={item.crop} className="card shadow-sm" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                    {/* Background decoration index */}
                    <span style={{
                      position: 'absolute',
                      right: '20px',
                      top: '10px',
                      fontSize: '4.5rem',
                      fontWeight: 900,
                      color: 'rgba(82, 183, 136, 0.04)',
                      lineHeight: 1,
                      pointerEvents: 'none'
                    }}>
                      #{idx + 1}
                    </span>

                    <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px', marginBottom: '16px' }}>
                      <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          background: 'var(--accent-glow)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--primary)'
                        }}>
                          <Sprout size={20} />
                        </div>
                        <div>
                          <h3 className="crop-title-analytics" style={{ fontSize: '1.3rem', margin: 0, fontWeight: 700 }}>{item.crop}</h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase' }}>
                            {language === 'te' ? 'జిల్లా సాగు రికార్డు' : 'District Sowing Record'}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '30px' }}>
                        <div>
                          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {language === 'te' ? 'సాగు విస్తీర్ణం' : 'Cultivated Area'}
                          </span>
                          <span style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                            {item.area.toLocaleString()} {language === 'te' ? 'హెక్టార్లు' : 'Hectares'}
                          </span>
                        </div>

                        <div>
                          <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                            {t('analytics.productivity')}
                          </span>
                          <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--accent)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <TrendingUp size={16} />
                            {item.yield} {t('analytics.metricYield')}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar of area share */}
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '6px' }}>
                        <span style={{ color: 'var(--text-muted)', fontWeight: 500 }}>{t('analytics.cropShare')}</span>
                        <span style={{ fontWeight: 700 }}>{percentShare}%</span>
                      </div>
                      <div style={{
                        width: '100%',
                        height: '10px',
                        borderRadius: '5px',
                        background: 'rgba(0,0,0,0.05)',
                        overflow: 'hidden'
                      }}>
                        <div style={{
                          width: `${percentShare}%`,
                          height: '100%',
                          background: 'linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%)',
                          borderRadius: '5px',
                          transition: 'width 1s ease-out'
                        }} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="card text-center" style={{ padding: '40px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-muted)', margin: 0 }}>{t('analytics.noRecords')}</p>
          </div>
        )
      ) : (
        <div className="card text-center" style={{ padding: '60px', textAlign: 'center', border: '1px dashed var(--border-color)', background: 'transparent' }}>
          <BarChart3 size={48} style={{ color: 'var(--border-color)', marginBottom: '15px' }} />
          <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem' }}>{t('analytics.selectPrompt')}</p>
        </div>
      )}
    </div>
  );
}
