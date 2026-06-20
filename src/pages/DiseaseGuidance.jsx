import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { diseaseDB } from '../utils/datasetHelper';
import { UploadCloud, CheckCircle, AlertTriangle, HelpCircle, Activity, Sparkles, Printer } from 'lucide-react';

export default function DiseaseGuidance() {
  const { t, language } = useLanguage();
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  // Pre-configured leaf sample images using local styling placeholders
  const sampleLeaves = [
    { key: 'blight', label: t('disease.samples.blight'), emoji: "🍅" },
    { key: 'blast', label: t('disease.samples.blast'), emoji: "🌾" },
    { key: 'rust', label: t('disease.samples.rust'), emoji: "🌾" },
    { key: 'healthy', label: t('disease.samples.healthy'), emoji: "🌿" }
  ];

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = () => {
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const processFile = (file) => {
    setSelectedFile({
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
      type: file.type
    });
    setResult(null);
  };

  const triggerDiagnosis = () => {
    if (!selectedFile) return;
    setLoading(true);

    // Simulate ML leaf texture classification processing
    setTimeout(() => {
      // Pick a random disease result for the custom file upload
      const diseaseKeys = ['blight', 'blast', 'rust'];
      const randomKey = diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)];
      setResult(diseaseDB[randomKey]);
      setLoading(false);
    }, 1500);
  };

  const selectSample = (sampleKey) => {
    setLoading(true);
    setSelectedFile({
      name: `sample_${sampleKey}_leaf.png`,
      size: '1.24 MB',
      type: 'image/png',
      isSample: true,
      emoji: diseaseDB[sampleKey].name.includes('tomato') || diseaseDB[sampleKey].name.includes('టమోటా') ? "🍅" : diseaseDB[sampleKey].name.includes('cotton') || diseaseDB[sampleKey].name.includes('పత్తి') ? "🌿" : "🌾"
    });
    setResult(null);

    setTimeout(() => {
      setResult(diseaseDB[sampleKey]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '24px' }} className="no-print">
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('disease.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t('disease.subtitle')}</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1.8fr', gap: '30px' }} className="grid-2">
        {/* Upload Zone Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }} className="no-print">
          <div className="card card-premium">
            <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>{t('disease.uploadTitle')}</h3>
            <div 
              className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload-input').click()}
            >
              <input 
                id="file-upload-input"
                type="file" 
                accept="image/*" 
                style={{ display: 'none' }}
                onChange={handleFileChange}
              />
              <UploadCloud className="upload-icon" />
              <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '8px' }}>{t('disease.dragDrop')}</p>
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t('disease.support')}</span>
            </div>

            {selectedFile && (
              <div style={{ 
                marginTop: '20px', 
                background: 'var(--bg-light)', 
                padding: '16px', 
                borderRadius: 'var(--border-radius-sm)',
                border: '1px solid var(--border-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }} className="glass">
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ fontSize: '2rem' }}>{selectedFile.emoji || "🍂"}</div>
                  <div>
                    <strong style={{ fontSize: '0.9rem', display: 'block', wordBreak: 'break-all' }}>{selectedFile.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{selectedFile.size}</span>
                  </div>
                </div>
                {!selectedFile.isSample && (
                  <button 
                    onClick={triggerDiagnosis} 
                    className="btn btn-primary" 
                    style={{ padding: '8px 16px', fontSize: '0.85rem' }}
                    disabled={loading}
                  >
                    {t('disease.diagnose')}
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Preset Sample Selector */}
          <div className="card glass">
            <h3 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--primary)' }}>
              {t('disease.sampleTitle')}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {sampleLeaves.map(sample => (
                <button 
                  key={sample.key}
                  onClick={() => selectSample(sample.key)}
                  className="btn btn-outline"
                  style={{ justifyContent: 'flex-start', padding: '10px 16px', fontSize: '0.9rem' }}
                >
                  <span style={{ marginRight: '8px', fontSize: '1.2rem' }}>{sample.emoji}</span>
                  <span>{sample.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Diagnostic Results Panel */}
        <div style={{ minHeight: '400px' }} className="print-card-layout">
          {loading && (
            <div className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', padding: '60px 20px' }}>
              <div style={{
                width: '60px',
                height: '60px',
                border: '5px solid var(--border-color)',
                borderTop: '5px solid var(--accent)',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                marginBottom: '20px'
              }}></div>
              <Activity className="animate-pulse-btn" size={24} style={{ color: 'var(--accent)', marginBottom: '10px' }} />
              <h4 style={{ fontSize: '1.25rem' }}>{t('disease.loadingScan')}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginTop: '5px' }}>{t('disease.loadingSub')}</p>
            </div>
          )}

          {!loading && !result && (
            <div className="card glass text-center no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '300px', textAlign: 'center', color: 'var(--text-muted)' }}>
              <HelpCircle size={48} style={{ color: 'var(--border-color)', marginBottom: '16px' }} />
              <h4 style={{ color: 'var(--text-muted)' }}>{t('disease.waitingTitle')}</h4>
              <p style={{ fontSize: '0.9rem', maxWidth: '300px', marginTop: '5px' }}>{t('disease.waitingDesc')}</p>
            </div>
          )}

          {!loading && result && (
            <div className="card animate-fade card-premium" style={{ borderTopColor: result.name.includes('Healthy') || result.name.includes('ఆరోగ్యకరమైన') ? 'var(--accent)' : 'red' }}>
              
              {/* Header block for printing */}
              <div className="print-only" style={{ borderBottom: '2px solid #1b4332', paddingBottom: '15px', marginBottom: '30px', textAlign: 'center' }}>
                <h2 style={{ color: '#1b4332', margin: '0 0 5px 0' }}>{t('brand')}</h2>
                <h4 style={{ color: '#52b788', margin: '0 0 15px 0', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {t('disease.printSub')}
                </h4>
                {selectedFile && (
                  <div style={{ fontSize: '0.9rem', background: '#f8f9fa', padding: '8px 12px', borderRadius: '4px', display: 'inline-block', color: '#333333' }}>
                    <strong>{language === 'te' ? 'ఎంచుకున్న ఆకు ఫోటో:' : 'Selected Leaf Photo:'}</strong> {selectedFile.name}
                  </div>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }} className="no-print">
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={20} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    {t('disease.results')}
                  </span>
                </div>
                <button onClick={() => window.print()} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Printer size={16} />
                  <span>{t('disease.printReport')}</span>
                </button>
              </div>

              <h3 className="crop-title-main" style={{ fontSize: '1.8rem', marginBottom: '15px' }}>
                {result.name}
              </h3>

              {/* Diagnosis details */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '6px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                    <AlertTriangle size={16} style={{ color: 'var(--secondary)' }} />
                    <span>{t('disease.symptoms')}</span>
                  </h4>
                  <p style={{ fontSize: '0.9rem' }}>{result.symptoms}</p>
                </div>

                <div>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '6px' }}>{t('disease.causes')}</h4>
                  <p style={{ fontSize: '0.9rem' }}>{result.causes}</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }} className="grid-2">
                  <div style={{ background: '#f4fbf7', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px dashed #52b788' }}>
                    <h5 style={{ fontSize: '0.95rem', color: '#1b4332', marginBottom: '8px', display: 'flex', gap: '6px', alignItems: 'center' }}>
                      <CheckCircle size={14} style={{ color: '#52b788' }} />
                      <span>{t('disease.organic')}</span>
                    </h5>
                    <p style={{ fontSize: '0.85rem', color: '#1b4332' }}>{result.organic}</p>
                  </div>

                  <div style={{ background: '#fff9f6', padding: '16px', borderRadius: 'var(--border-radius-sm)', border: '1px dashed var(--secondary)' }}>
                    <h5 style={{ fontSize: '0.95rem', color: 'var(--primary-dark)', marginBottom: '8px' }}>{t('disease.chemical')}</h5>
                    <p style={{ fontSize: '0.85rem' }}>{result.chemical}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '20px' }}>
                  <h4 style={{ fontSize: '1rem', color: 'var(--primary)', marginBottom: '8px' }}>{t('disease.prevention')}</h4>
                  <p style={{ fontSize: '0.9rem' }}>{result.prevention}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

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
          .grid-2 {
            display: block !important;
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
        }
      `}</style>
    </div>
  );
}
