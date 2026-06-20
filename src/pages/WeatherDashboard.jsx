import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, Thermometer, Droplets, Wind, CloudRain, ShieldAlert, Sparkles, MapPin, Gauge } from 'lucide-react';

export default function WeatherDashboard() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationName, setLocationName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [weatherData, setWeatherData] = useState(null);

  // Fetch weather for a given lat and lon
  const fetchWeather = async (lat, lon, friendlyName) => {
    setLoading(true);
    setError(null);
    try {
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,apparent_temperature_max,apparent_temperature_min,precipitation_sum,rain_sum,showers_sum,sunshine_duration,daylight_duration,wind_direction_10m_dominant,wind_gusts_10m_max,wind_speed_10m_max&hourly=temperature_2m,rain,precipitation_probability,wind_speed_10m,relative_humidity_2m,evapotranspiration,soil_moisture_9_to_27cm,apparent_temperature,dew_point_2m,precipitation,soil_moisture_0_to_1cm,soil_moisture_1_to_3cm,soil_moisture_3_to_9cm,soil_moisture_27_to_81cm,wind_direction_10m,wind_gusts_10m,uv_index,uv_index_clear_sky,is_day,sunshine_duration&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,wind_speed_10m,wind_direction_10m,wind_gusts_10m,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure&timezone=auto`;
      
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch weather data from Open-Meteo.");
      }
      
      const data = await response.json();
      setWeatherData(data);
      if (friendlyName) {
        setLocationName(friendlyName);
      }
    } catch (err) {
      console.error(err);
      setError(t('weather.fallbackWarning'));
      loadMockFallback();
    } finally {
      setLoading(false);
    }
  };

  // Geocode location query via Nominatim API
  const handleSearch = async (e) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    try {
      const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`;
      const response = await fetch(geocodeUrl, {
        headers: {
          'Accept-Language': language === 'en' ? 'en' : 'te'
        }
      });
      
      if (!response.ok) {
        throw new Error("Geocoding failed.");
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        const { lat, lon, display_name } = data[0];
        await fetchWeather(lat, lon, display_name);
      } else {
        setError(`${t('weather.notFoundWarning')} ("${searchQuery}")`);
        loadMockFallback();
      }
    } catch (err) {
      console.error(err);
      setError(t('weather.serviceWarning'));
      // Fallback to Hyderabad coordinates
      await fetchWeather(17.3850, 78.4867, "Hyderabad, Telangana, India");
    } finally {
      setLoading(false);
    }
  };

  const loadMockFallback = () => {
    // Highly realistic agronomic weather fallback data
    setWeatherData({
      current: {
        temperature_2m: 33.4,
        relative_humidity_2m: 64,
        apparent_temperature: 38.2,
        wind_speed_10m: 14.2,
        precipitation: 0.0,
        weather_code: 1 // Clear sky
      },
      hourly: {
        soil_moisture_0_to_1cm: [0.28],
        soil_moisture_3_to_9cm: [0.32],
        soil_moisture_27_to_81cm: [0.38]
      },
      daily: {
        time: ["2026-06-09", "2026-06-10", "2026-06-11", "2026-06-12", "2026-06-13"],
        temperature_2m_max: [35.2, 36.0, 34.8, 33.0, 32.5],
        temperature_2m_min: [26.4, 27.0, 25.8, 24.5, 24.0],
        precipitation_sum: [0.0, 0.0, 2.4, 12.8, 8.4],
        wind_speed_10m_max: [15.2, 16.5, 12.0, 18.4, 14.0]
      }
    });
  };

  // Compute live agricultural warnings based on weather parameters
  const generateAdvisory = () => {
    if (!weatherData) return [];
    
    const advisories = [];
    const temp = weatherData.current.temperature_2m;
    const humidity = weatherData.current.relative_humidity_2m;
    const windSpeed = weatherData.current.wind_speed_10m;
    
    // Check next day's expected rain sum from daily forecast
    const rainSum = weatherData.daily ? weatherData.daily.precipitation_sum[0] + weatherData.daily.precipitation_sum[1] : 0;

    if (temp > 35) {
      advisories.push(
        language === 'en' 
          ? "High Temperature Warning: Evapotranspiration is high. Increase irrigation levels in early morning or late evening. Avoid fertilizer broadcasting today."
          : "అధిక ఉష్ణోగ్రత హెచ్చరిక: ఉష్ణోగ్రత 35°C దాటింది. ఉదయం లేదా సాయంత్రం వేళల్లో పంటలకు నీరు పెట్టండి. మధ్యాహ్నం రసాయన ఎరువులు చల్లవద్దు."
      );
    }

    if (windSpeed > 15) {
      advisories.push(
        language === 'en'
          ? "High Wind Speed Warning: Wind speed exceeds 15 km/h. Postpone foliar pesticide sprays to prevent chemical drift and save spraying costs."
          : "అధిక గాలి వేగం హెచ్చరిక: గాలి వేగం గంటకు 15 కి.మీ దాటింది. మందులు పిచికారీ చేయడం తాత్కాలికంగా ఆపండి, లేదంటే మందులు పక్క పొలాలకు కొట్టుకుపోతాయి."
      );
    } else {
      advisories.push(
        language === 'en'
          ? "Optimal Wind Speed: Winds are calm. Safe conditions for foliar spray of micro-nutrients or crop protection chemicals."
          : "అనుకూల గాలి వేగం: గాలి ప్రశాంతంగా ఉంది. పంట రక్షణ మందులు లేదా పోషకాలు పిచికారీ చేయడానికి ఇది సరైన సమయం."
      );
    }

    if (rainSum > 10) {
      advisories.push(
        language === 'en'
          ? "Heavy Rainfall expected within 24-48 hours. Postpone immediate fertilizer broadcasting and pesticide applications to avoid leaching or runoff."
          : "భారీ వర్షపాత హెచ్చరిక: రాబోయే 24 గంటల్లో వర్షం కురిసే అవకాశం ఉంది. ఎరువులు వేయడం వాయిదా వేయండి, లేకపోతే వర్షపు నీటిలో కొట్టుకుపోతాయి."
      );
    } else if (rainSum > 0 && rainSum <= 10) {
      advisories.push(
        language === 'en'
          ? "Light Showers Expected: Ideal soil moisture boost. Good time to plant seedlings or prepare seedbeds."
          : "తేలికపాటి జల్లులు: మట్టిలో తేమ పెరుగుతుంది. విత్తనాలు నాటడానికి లేదా నారు మడులు సిద్ధం చేయడానికి మంచి సమయం."
      );
    } else {
      advisories.push(
        language === 'en'
          ? "Dry Weather forecast: Maintain normal irrigation rotations. Monitor deep root zone moisture."
          : "పొడి వాతావరణం: సాధారణ పద్ధతిలో నీటి తడులు అందించండి. నేలలోని లోపలి పొర తేమను పర్యవేక్షించండి."
      );
    }

    return advisories;
  };

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('weather.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t('weather.subtitle')}</p>
      </div>

      {/* Geocoding Search Form */}
      <div className="card glass" style={{ marginBottom: '30px', padding: '16px 24px' }}>
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <div style={{ position: 'relative', flexGrow: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '44px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('weather.searchLoc')}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ flexShrink: 0 }}>
            {t('weather.searchBtn')}
          </button>
        </form>

        {error && (
          <div style={{ color: 'var(--secondary)', display: 'flex', gap: '5px', alignItems: 'center', marginTop: '10px', fontSize: '0.85rem' }}>
            <ShieldAlert size={14} />
            <span>{error}</span>
          </div>
        )}
      </div>

      {loading && (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '5px solid var(--border-color)',
            borderTop: '5px solid var(--accent)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p style={{ fontWeight: 600 }}>{t('weather.loadingDb')}</p>
        </div>
      )}

      {!loading && !weatherData && (
        <div className="card glass text-center animate-fade" style={{ padding: '60px 40px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'var(--bg-light)',
            display: 'flex',
            alignItems: 'center',
            justify: 'center',
            marginBottom: '24px',
            boxShadow: 'var(--shadow-light)',
            border: '2px dashed var(--accent)',
            animation: 'pulse 2.5s infinite'
          }}>
            <CloudRain size={40} style={{ color: 'var(--accent)' }} />
          </div>
          <h3 style={{ fontSize: '1.6rem', fontWeight: 700, marginBottom: '12px' }}>
            {t('weather.searchPromptTitle')}
          </h3>
          <p style={{ maxWidth: '500px', lineHeight: '1.6', fontSize: '1.05rem', margin: '0 auto 24px' }}>
            {t('weather.searchPromptDesc')}
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '20px', background: 'rgba(82, 183, 136, 0.1)', border: '1px solid rgba(82, 183, 136, 0.3)', fontWeight: 600 }}>
              📍 {language === 'te' ? 'వరంగల్' : 'Warangal'}
            </span>
            <span style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '20px', background: 'rgba(82, 183, 136, 0.1)', border: '1px solid rgba(82, 183, 136, 0.3)', fontWeight: 600 }}>
              📍 {language === 'te' ? 'విజయవాడ' : 'Vijayawada'}
            </span>
            <span style={{ fontSize: '0.85rem', padding: '8px 16px', borderRadius: '20px', background: 'rgba(82, 183, 136, 0.1)', border: '1px solid rgba(82, 183, 136, 0.3)', fontWeight: 600 }}>
              📍 {language === 'te' ? 'నెల్లూరు' : 'Nellore'}
            </span>
          </div>
        </div>
      )}

      {!loading && weatherData && (
        <div className="animate-fade">
          
          {/* Location details bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', color: 'var(--primary)' }}>
            <MapPin size={22} style={{ color: 'var(--accent)' }} />
            <span style={{ fontSize: '1.2rem', fontWeight: 700 }}>{locationName}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.8fr 1.2fr', gap: '30px' }} className="grid-2">
            
            {/* Current Weather Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div className="card card-premium">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{t('weather.currentConditions')}</h3>
                
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }} className="grid-4">
                  
                  {/* Temp */}
                  <div style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }} className="glass">
                    <Thermometer size={28} style={{ color: 'var(--secondary)', margin: '0 auto 10px' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>{t('weather.temperature')}</span>
                    <strong style={{ fontSize: '1.25rem' }}>{weatherData.current.temperature_2m}°C</strong>
                  </div>

                  {/* Humidity */}
                  <div style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }} className="glass">
                    <Droplets size={28} style={{ color: 'var(--accent)', margin: '0 auto 10px' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>{t('weather.humidity')}</span>
                    <strong style={{ fontSize: '1.25rem' }}>{weatherData.current.relative_humidity_2m}%</strong>
                  </div>

                  {/* Wind */}
                  <div style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }} className="glass">
                    <Wind size={28} style={{ color: 'var(--primary-light)', margin: '0 auto 10px' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>{t('weather.wind')}</span>
                    <strong style={{ fontSize: '1.25rem' }}>{weatherData.current.wind_speed_10m} km/h</strong>
                  </div>

                  {/* Rainfall */}
                  <div style={{ background: 'var(--bg-light)', padding: '16px', borderRadius: 'var(--border-radius-sm)', textAlign: 'center' }} className="glass">
                    <CloudRain size={28} style={{ color: '#4cc9f0', margin: '0 auto 10px' }} />
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block' }}>{t('weather.rainfall')}</span>
                    <strong style={{ fontSize: '1.25rem' }}>{weatherData.current.precipitation} mm</strong>
                  </div>

                </div>
              </div>

              {/* Soil Moisture Widgets */}
              <div className="card glass">
                <h3 style={{ fontSize: '1.2rem', marginBottom: '20px' }}>{t('weather.soilMoisture')}</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  
                  {/* Topsoil */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{t('weather.depth.top')}</span>
                      <strong>{Math.round(weatherData.hourly.soil_moisture_0_to_1cm[0] * 100)}% {t('weather.waterContent')}</strong>
                    </div>
                    <div className="graph-bar-container" style={{ height: '12px' }}>
                      <div className="graph-bar-current" style={{ width: `${Math.round(weatherData.hourly.soil_moisture_0_to_1cm[0] * 100)}%`, background: '#4cc9f0' }}></div>
                    </div>
                  </div>

                  {/* Midsoil */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{t('weather.depth.mid')}</span>
                      <strong>{Math.round(weatherData.hourly.soil_moisture_3_to_9cm[0] * 100)}% {t('weather.waterContent')}</strong>
                    </div>
                    <div className="graph-bar-container" style={{ height: '12px' }}>
                      <div className="graph-bar-current" style={{ width: `${Math.round(weatherData.hourly.soil_moisture_3_to_9cm[0] * 100)}%`, background: 'var(--accent)' }}></div>
                    </div>
                  </div>

                  {/* Deepsoil */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '6px' }}>
                      <span style={{ fontWeight: 600 }}>{t('weather.depth.deep')}</span>
                      <strong>{Math.round(weatherData.hourly.soil_moisture_27_to_81cm[0] * 100)}% {t('weather.waterContent')}</strong>
                    </div>
                    <div className="graph-bar-container" style={{ height: '12px' }}>
                      <div className="graph-bar-current" style={{ width: `${Math.round(weatherData.hourly.soil_moisture_27_to_81cm[0] * 100)}%`, background: 'var(--primary-light)' }}></div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Advisory Section */}
            <div>
              <div className="card card-premium" style={{ height: '100%', borderTopColor: 'var(--accent)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
                  <Sparkles size={20} style={{ color: 'var(--accent)' }} />
                  <h3 style={{ fontSize: '1.25rem' }}>{t('weather.advisoryTitle')}</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                  {generateAdvisory().map((advisory, idx) => (
                    <div key={idx} className="advisory-box animate-slide">
                      <p style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--primary-dark)' }}>{advisory}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* 5-Day Forecast Grid */}
          <div style={{ marginTop: '40px' }}>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>{t('weather.fiveDay')}</h3>
            
            <div className="grid-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '20px' }}>
              {weatherData.daily.time.map((date, idx) => {
                const maxTemp = weatherData.daily.temperature_2m_max[idx];
                const minTemp = weatherData.daily.temperature_2m_min[idx];
                const rain = weatherData.daily.precipitation_sum[idx];
                
                // Format date to local readable format
                const formattedDate = new Date(date).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' });
                
                return (
                  <div key={idx} className="card text-center" style={{ padding: '16px', textAlign: 'center' }}>
                    <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '10px' }}>{formattedDate}</div>
                    
                    <div style={{ fontSize: '1.5rem', marginBottom: '8px' }}>
                      {rain > 5 ? "🌧️" : rain > 0 ? "🌦️" : "☀️"}
                    </div>

                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{t('weather.tempRange')}</div>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--primary-dark)', margin: '4px 0' }}>
                      {maxTemp}° / {minTemp}°
                    </div>

                    {rain > 0 && (
                      <div style={{ 
                        background: '#e8f7ff', 
                        padding: '4px 8px', 
                        borderRadius: '10px', 
                        fontSize: '0.75rem', 
                        fontWeight: 700, 
                        color: '#0077b6',
                        display: 'inline-block',
                        marginTop: '5px'
                      }}>
                        💧 {rain} mm
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 992px) {
          .grid-5 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (max-width: 576px) {
          .grid-5 {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
