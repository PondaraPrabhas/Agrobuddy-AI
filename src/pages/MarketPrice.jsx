import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Search, TrendingUp, TrendingDown, ArrowRightLeft, ExternalLink, HelpCircle, AlertCircle } from 'lucide-react';

export default function MarketPrice() {
  const { t, language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('');

  // Sample data derived from standard Mandi reports across multiple Indian states
  const rawMarketData = [
    // RICE
    { crop: "Paddy/Rice (వరి)", state: "ap", market: "Guntur Mandi", price: "₹2,250 - ₹2,400", trend: "up", advisory: language === 'en' ? "Strong demand. Hold stock for another 2 weeks for optimal profits." : "ఎక్కువ డిమాండ్. గరిష్ట లాభాల కోసం మరో 2 వారాలు నిల్వ ఉంచుకోవచ్చు." },
    { crop: "Paddy/Rice (వరి)", state: "telangana", market: "Suryapet Mandi", price: "₹2,180 - ₹2,320", trend: "stable", advisory: language === 'en' ? "Stable retail flow. Release stock to maintain regular cash flow." : "ధరలు స్థిరంగా ఉన్నాయి. ఖర్చుల నిమిత్తం విడతల వారీగా అమ్ముకోవచ్చు." },
    { crop: "Paddy/Rice (వరి)", state: "punjab", market: "Ludhiana Mandi", price: "₹2,300 - ₹2,450", trend: "up", advisory: language === 'en' ? "Government buying is active. Sell at Minimum Support Price (MSP)." : "ప్రభుత్వ కొనుగోళ్లు చురుగ్గా సాగుతున్నాయి. మద్దతుధరకు అమ్ముకోండి." },
    { crop: "Paddy/Rice (వరి)", state: "up", market: "Kanpur Mandi", price: "₹2,150 - ₹2,280", trend: "stable", advisory: language === 'en' ? "Steady wholesale volume. Monitor national export policies." : "సరుకు సరఫరా సమానంగా ఉంది. ప్రభుత్వ ఎగుమతి విధానాలను గమనించండి." },
    
    // WHEAT
    { crop: "Wheat (గోధుమ)", state: "punjab", market: "Ludhiana Mandi", price: "₹2,275 - ₹2,400", trend: "up", advisory: language === 'en' ? "Government buying active. Clear stocks for premium price before season end." : "మద్దతు కొనుగోలు బాగుంది. సీజన్ ముగిసేలోపు నిల్వలను మంచి ధరకు విక్రయించండి." },
    { crop: "Wheat (గోధుమ)", state: "up", market: "Kanpur Mandi", price: "₹2,200 - ₹2,350", trend: "stable", advisory: language === 'en' ? "Moderate arrivals. Retail demand matches output." : "మార్కెట్లోకి సరుకు రాక సాధారణం. స్థానిక అవసరాలకు అనుగుణంగా ఉంది." },
    { crop: "Wheat (గోధుమ)", state: "maharashtra", market: "Pune Mandi", price: "₹2,400 - ₹2,600", trend: "up", advisory: language === 'en' ? "Strong bakery and flour mill demand. Grade grain quality for best bids." : "పిండి మిల్లుల నుండి మంచి డిమాండ్ ఉంది. గ్రేడింగ్ చేసి అమ్మితే ఎక్కువ లాభం." },

    // COTTON
    { crop: "Cotton (పత్తి)", state: "telangana", market: "Adilabad Mandi", price: "₹6,800 - ₹7,200", trend: "stable", advisory: language === 'en' ? "Market is stable. Sell in batches to maintain regular cash flow." : "ధరలు స్థిరంగా ఉన్నాయి. ఖర్చుల నిమిత్తం విడతల వారీగా అమ్ముకోవచ్చు." },
    { crop: "Cotton (పత్తి)", state: "ap", market: "Adoni Mandi", price: "₹6,700 - ₹7,100", trend: "stable", advisory: language === 'en' ? "Steady spinning mill bids. Keep moisture level below 8%." : "మిల్లుల నుండి కొనుగోళ్లు స్థిరంగా ఉన్నాయి. తేమ శాతం 8% కంటే తక్కువగా ఉంచండి." },
    { crop: "Cotton (పత్తి)", state: "maharashtra", market: "Nagpur Mandi", price: "₹7,000 - ₹7,450", trend: "up", advisory: language === 'en' ? "High export demand. Avoid selling dirty or wet cotton." : "ఎగుమతి డిమాండ్ చాలా ఎక్కువగా ఉంది. తడిచిన పత్తిని తక్కువ ధరకు అమ్మవద్దు." },

    // RED CHILLI
    { crop: "Red Chilli (ఎండు మిర్చి)", state: "ap", market: "Guntur Mirchi Yard", price: "₹18,500 - ₹21,000", trend: "up", advisory: language === 'en' ? "Export demand is high. Grade your crop quality to fetch premium rates." : "ఎగుమతి డిమాండ్ చాలా ఎక్కువగా ఉంది. రకాలను బట్టి గ్రేడింగ్ చేసి అమ్మండి." },
    { crop: "Red Chilli (ఎండు మిర్చి)", state: "telangana", market: "Warangal Mandi", price: "₹18,000 - ₹20,200", trend: "up", advisory: language === 'en' ? "High demand from spice processors. Dry thoroughly to prevent mold." : "మసాలా దినుసుల వ్యాపారుల నుండి డిమాండ్ బాగుంది. బూజు పట్టకుండా ఆరబెట్టండి." },

    // MAIZE
    { crop: "Maize (మొక్కజొన్న)", state: "telangana", market: "Warangal Mandi", price: "₹1,950 - ₹2,100", trend: "down", advisory: language === 'en' ? "Supply influx is high. Avoid panic selling; rates expected to rebound next month." : "మార్కెట్లో సరుకు ఎక్కువైంది. తొందరపడి తక్కువ ధరకు అమ్మవద్దు, వచ్చే నెల ధర పెరుగుతుంది." },
    { crop: "Maize (మొక్కజొన్న)", state: "ap", market: "Kurnool Mandi", price: "₹1,900 - ₹2,050", trend: "down", advisory: language === 'en' ? "Feed industries buying slowly. Store safely if moisture is under control." : "రసాయన ఎరువుల ఖర్చులు పెరిగాయి. నిల్వ వీలైతే ఎండబెట్టి ఆరబెట్టి ఉంచండి." },
    { crop: "Maize (మొక్కజొన్న)", state: "karnataka", market: "Davanagere Mandi", price: "₹1,980 - ₹2,120", trend: "stable", advisory: language === 'en' ? "Steady poultry feed industry demand. Ensure quality standards." : "పౌల్ట్రీ ఫీడ్ పరిశ్రమ కొనుగోళ్లు స్థిరంగా ఉన్నాయి. నాణ్యత కాపాడుకోండి." },

    // ONION
    { crop: "Onion (ఉల్లిపాయ)", state: "maharashtra", market: "Lasalgaon Mandi", price: "₹1,400 - ₹1,800", trend: "up", advisory: language === 'en' ? "Lasalgaon prices setting national trend. Grade bulbs before dispatch." : "లాసల్‌గావ్ మార్కెట్ పెరిగింది. రవాణాకు ముందే గడ్డలను గ్రేడింగ్ చేయండి." },
    { crop: "Onion (ఉల్లిపాయ)", state: "ap", market: "Kurnool Mandi", price: "₹1,200 - ₹1,450", trend: "down", advisory: language === 'en' ? "Storage loss warning. Sell moisture-laden stock immediately." : "నిల్వ ఉంచితే కుళ్ళిపోయే ప్రమాదం ఉంది. తడి ఆరిన వెంటనే అమ్మడం మంచిది." },
    { crop: "Onion (ఉల్లిపాయ)", state: "karnataka", market: "Bengaluru Mandi", price: "₹1,500 - ₹1,850", trend: "up", advisory: language === 'en' ? "Retail demand is strong. Grade color and sizes for higher bids." : "నగరాల్లో ఉల్లి డిమాండ్ పెరిగింది. సైజు మరియు రంగు బట్టి వేరు చేసి అమ్మండి." },

    // VEGETABLES
    { crop: "Tomato (టమోటా)", state: "ap", market: "Madanapalle Mandi", price: "₹1,800 - ₹2,400", trend: "up", advisory: language === 'en' ? "Heavy summer demand. Sell graded red tomatoes for highest margin." : "ఎండల తీవ్రత వల్ల డిమాండ్ పెరిగింది. మంచి లాభాల కోసం గ్రేడింగ్ చేసిన పండ్లను అమ్మండి." },
    { crop: "Tomato (టమోటా)", state: "telangana", market: "Bowenpally Mandi", price: "₹1,500 - ₹1,800", trend: "up", advisory: language === 'en' ? "Yields reduced due to heat. Bring fresh harvest daily." : "తీవ్ర ఎండల వల్ల పంట దిగుబడి తగ్గింది. రోజువారీ తాజా కాయలను తీసుకురండి." },
    { crop: "Tomato (టమోటా)", state: "maharashtra", market: "Pune Mandi", price: "₹1,400 - ₹1,750", trend: "up", advisory: language === 'en' ? "Steady metropolitan demand. Sort damage fruit before dispatch." : "నగరాల నుండి స్థిరమైన డిమాండ్. పాడైన పండ్లను వేరు చేయండి." },
    
    { crop: "Potato (ఆలుగడ్డ)", state: "up", market: "Agra Mandi", price: "₹1,500 - ₹1,750", trend: "stable", advisory: language === 'en' ? "Cold storage supplies active. Prices expected to remain stable." : "కోల్డ్ స్టోరేజ్ సరఫరా బాగుంది. మార్కెట్లో ధరలు స్థిరంగా కొనసాగుతాయి." },
    { crop: "Potato (ఆలుగడ్డ)", state: "ap", market: "Kurnool Mandi", price: "₹1,600 - ₹1,900", trend: "stable", advisory: language === 'en' ? "Steady demand. Release stocks in calculated intervals." : "డిమాండ్ స్థిరంగా ఉంది. తగిన విరామాలలో బంగాళాదుంప నిల్వలను అమ్మండి." },
    
    { crop: "Brinjal (వంకాయ)", state: "telangana", market: "Warangal Mandi", price: "₹1,400 - ₹1,650", trend: "up", advisory: language === 'en' ? "Local demand is strong. Bring fresh, unblemished stock to Mandi." : "స్థానిక డిమాండ్ బాగుంది. మచ్చలు లేని తాజా సరుకును మార్కెట్కు తీసుకురండి." },
    { crop: "Brinjal (వంకాయ)", state: "maharashtra", market: "Nagpur Mandi", price: "₹1,300 - ₹1,550", trend: "stable", advisory: language === 'en' ? "Normal arrivals. Keep vegetable moist during transport." : "సరుకు రాక మామూలుగా ఉంది. రవాణాలో వాడిపోకుండా జాగ్రత్తపడండి." },
    
    { crop: "Okra (బెండకాయ)", state: "ap", market: "Guntur Mandi", price: "₹2,200 - ₹2,500", trend: "down", advisory: language === 'en' ? "High seasonal yield arrival. Harvest daily to maintain tenderness." : "దిగుబడి మార్కెట్లోకి ఎక్కువగా వస్తోంది. కాయ ముదరకుండా రోజువారీ కోత కోసి అమ్మండి." },
    { crop: "Okra (బెండకాయ)", state: "karnataka", market: "Hubli Mandi", price: "₹2,300 - ₹2,600", trend: "stable", advisory: language === 'en' ? "Moderate market volumes. Maintain daily sorting standards." : "మార్కెట్ నిల్వలు మితంగా ఉన్నాయి. రోజువారీ గ్రేడింగ్ పాటించండి." },
    
    { crop: "Cabbage (క్యాబేజీ)", state: "telangana", market: "Nizamabad Mandi", price: "₹1,100 - ₹1,300", trend: "stable", advisory: language === 'en' ? "Steady wholesale demand. Keep logistics fast to prevent weight loss." : "హోల్‌సేల్ డిమాండ్ స్థిరంగా ఉంది. బరువు తగ్గకుండా త్వరగా మార్కెట్కు తరలించండి." },
    { crop: "Cabbage (క్యాబేజీ)", state: "punjab", market: "Jalandhar Mandi", price: "₹1,200 - ₹1,400", trend: "stable", advisory: language === 'en' ? "Normal winter yields. Avoid damaged outer leaf packs." : "శీతాకాలపు పంట బాగా వస్తోంది. దెబ్బతిన్న పై ఆకులను వేరు చేయండి." },

    { crop: "Cauliflower (క్యాలీఫ్లవర్)", state: "telangana", market: "Khammam Mandi", price: "₹2,500 - ₹2,800", trend: "up", advisory: language === 'en' ? "High wedding season demand. Sort curd sizes to capture premium price." : "శుభకార్యాల సీజన్ కావడంతో డిమాండ్ పెరిగింది. పువ్వు సైజు బట్టి వర్గీకరించి అమ్మండి." },
    { crop: "Cauliflower (క్యాలీఫ్లవర్)", state: "up", market: "Kanpur Mandi", price: "₹2,200 - ₹2,500", trend: "up", advisory: language === 'en' ? "Strong city demand. Avoid chemical spray directly before harvest." : "నగర డిమాండ్ బాగుంది. కోతకు ముందు ఎలాంటి మందులు కొట్టవద్దు." },
    
    { crop: "Carrot (క్యారెట్)", state: "ap", market: "Anantapur Mandi", price: "₹3,000 - ₹3,400", trend: "up", advisory: language === 'en' ? "Strong wholesale rates. Clean soil residue properly for maximum value." : "ధరలు ఎంతో ఆశాజనకంగా ఉన్నాయి. నేల మట్టిని శుభ్రం చేసి అమ్మితే ఎక్కువ ధర పలుకుతుంది." },
    { crop: "Carrot (క్యారెట్)", state: "punjab", market: "Ludhiana Mandi", price: "₹2,800 - ₹3,200", trend: "stable", advisory: language === 'en' ? "Winter crop supplies strong. Wash and sort carrots well." : "శీతాకాల సాగు బాగా వస్తోంది. ముల్లంగిని బాగా కడిగి వర్గీకరించండి." },

    { crop: "Cucumber (దోసకాయ)", state: "ap", market: "Kurnool Mandi", price: "₹1,200 - ₹1,500", trend: "stable", advisory: language === 'en' ? "High water content. Sell quickly to avoid weight loss." : "నీటి శాతం ఎక్కువగా ఉంటుంది. బరువు తగ్గకముందే త్వరగా అమ్మండి." },
    { crop: "Cucumber (దోసకాయ)", state: "telangana", market: "Mahbubnagar Mandi", price: "₹1,100 - ₹1,400", trend: "stable", advisory: language === 'en' ? "Steady local retail demand. Keep crop fresh." : "స్థానిక అవసరాలు స్థిరంగా ఉన్నాయి. కాయలు తాజాగా ఉండేలా చూడండి." },
    
    { crop: "Bitter Gourd (కాకరకాయ)", state: "telangana", market: "Warangal Mandi", price: "₹2,000 - ₹2,400", trend: "up", advisory: language === 'en' ? "Export demand is growing. Harvest clean, green fruits." : "ఎగుమతి డిమాండ్ పెరుగుతోంది. తాజా పచ్చటి కాయలను మార్కెట్కు తీసుకురండి." },
    { crop: "Bitter Gourd (కాకరకాయ)", state: "maharashtra", market: "Pune Mandi", price: "₹2,200 - ₹2,650", trend: "up", advisory: language === 'en' ? "High fresh demand in city centers. Harvest twice weekly." : "నగరాల్లో చేదు కాకర కాయకు మంచి ధర ఉంది. వారానికి రెండు సార్లు కోత కోయండి." },
    
    { crop: "Bottle Gourd (సొరకాయ)", state: "ap", market: "Guntur Mandi", price: "₹1,000 - ₹1,200", trend: "stable", advisory: language === 'en' ? "Steady local consumption. Sort by size for retail buyers." : "స్థానిక వినియోగం బాగుంది. సైజులను బట్టి వేరు చేసి అమ్మితే మంచిది." },
    { crop: "Bottle Gourd (సొరకాయ)", state: "up", market: "Agra Mandi", price: "₹900 - ₹1,100", trend: "stable", advisory: language === 'en' ? "Moderate wholesale arrivals. Retain stem length." : "హోల్‌సేల్ మార్కెట్ బాగుంది. కాయ తొడిమను కత్తిరించకుండా ఉంచండి." },
    
    { crop: "Ridge Gourd (బీరకాయ)", state: "telangana", market: "Nizamabad Mandi", price: "₹1,800 - ₹2,200", trend: "up", advisory: language === 'en' ? "Limited supply in markets. High quality command premium." : "మార్కెట్లోకి సరుకు తక్కువగా ఉంది. తాజా బీరకాయలకు మంచి ధర పలుకుతుంది." },
    { crop: "Ridge Gourd (బీరకాయ)", state: "karnataka", market: "Mysore Mandi", price: "₹1,900 - ₹2,300", trend: "up", advisory: language === 'en' ? "Local demand high. Harvest in early morning." : "స్థానిక డిమాండ్ చాలా బాగుంది. ఉదయాన్నే కాయ కోసి విక్రయించండి." },
    
    { crop: "Spinach (పాలకూర)", state: "ap", market: "Guntur Mandi", price: "₹800 - ₹1,000", trend: "stable", advisory: language === 'en' ? "Leafy greens have short shelf life. Transport in ventilated crates." : "ఆకుకూరలు త్వరగా పాడవుతాయి. గాలి తగిలే గంపలు లేదా పెట్టెలలో రవాణా చేయండి." },
    { crop: "Spinach (పాలకూర)", state: "telangana", market: "Hyderabad Mandi", price: "₹900 - ₹1,100", trend: "stable", advisory: language === 'en' ? "Consistent daily arrivals. Avoid spray right before harvesting." : "రోజువారీ సరఫరా బాగుంది. కోతకు ముందు ఎలాంటి పిచికారీ చేయవద్దు." },
    
    { crop: "Coriander (కొత్తిమీర)", state: "telangana", market: "Khammam Mandi", price: "₹1,500 - ₹2,000", trend: "up", advisory: language === 'en' ? "High fresh demand in urban hubs. Sort out dry or yellow leaves." : "పట్టణ మార్కెట్లలో డిమాండ్ బాగుంది. ఎండిన మరియు పసుపు రంగు ఆకులను వేరు చేయండి." },
    { crop: "Coriander (కొత్తిమీర)", state: "maharashtra", market: "Pune Mandi", price: "₹1,600 - ₹2,200", trend: "up", advisory: language === 'en' ? "Metropolitan demand high. Bind in uniform bundle sizes." : "నగరాల నుండి గిరాకీ బాగుంది. సమాన సైజు కట్టలుగా కట్టి విక్రయించండి." },
    
    { crop: "Radish (ముల్లంగి)", state: "ap", market: "Kurnool Mandi", price: "₹1,100 - ₹1,400", trend: "down", advisory: language === 'en' ? "Heavy local arrivals. Clean wash leaves and root bulbs before trading." : "దిగుబడి ఎక్కువగా వస్తోంది. అమ్మే ముందు ఆకులు మరియు దుంపలను బాగా కడిగి అమ్ముకోండి." },
    { crop: "Radish (ముల్లంగి)", state: "up", market: "Kanpur Mandi", price: "₹1,000 - ₹1,250", trend: "down", advisory: language === 'en' ? "High supply influx. Sell washed roots in bundles." : "ముల్లంగి సరుకు మార్కెట్లో పెరిగింది. కడిగిన దుంపలను కట్టలుగా వేసి అమ్మండి." },
    
    { crop: "Capsicum (క్యాప్సికమ్)", state: "telangana", market: "Warangal Mandi", price: "₹3,500 - ₹4,200", trend: "up", advisory: language === 'en' ? "Excellent demand from restaurants. Grade by color and size." : "హోటళ్ల నుండి మంచి డిమాండ్ ఉంది. రంగు మరియు సైజు బట్టి గ్రేడింగ్ చేసి అమ్మండి." },
    { crop: "Capsicum (క్యాప్సికమ్)", state: "karnataka", market: "Bengaluru Mandi", price: "₹3,800 - ₹4,500", trend: "up", advisory: language === 'en' ? "High hotel and mall demand. Pack in ventilated crates." : "హోటళ్లు మరియు మాల్స్ డిమాండ్ బాగుంది. వెంటిలేషన్ పెట్టెలలో ప్యాక్ చేయండి." },
    
    { crop: "French Beans (చిక్కుడుకాయ)", state: "ap", market: "Nellore Mandi", price: "₹3,000 - ₹3,600", trend: "stable", advisory: language === 'en' ? "Consistent prices. Harvest early to prevent pods from becoming fibrous." : "ధరలు స్థిరంగా ఉన్నాయి. కాయ పీచు కట్టకముందే కోసి అమ్మితే ఎక్కువ ధర వస్తుంది." },
    { crop: "French Beans (చిక్కుడుకాయ)", state: "maharashtra", market: "Pune Mandi", price: "₹3,200 - ₹3,800", trend: "stable", advisory: language === 'en' ? "Steady wholesale trades. Grade pods for quality uniformity." : "హోల్‌సేల్ వ్యాపారం స్థిరంగా ఉంది. కాయ సైజులలో ఏకరూపత ఉండేలా చూసుకోండి." },
    
    { crop: "Pumpkin (గుమ్మడికాయ)", state: "telangana", market: "Khammam Mandi", price: "₹900 - ₹1,200", trend: "stable", advisory: language === 'en' ? "Long shelf life. Store in dry shade if current prices are unfavorable." : "చాలా కాలం నిల్వ ఉంటుంది. ధర తక్కువగా ఉంటే నీడ గల పొడి ప్రదేశంలో నిల్వ ఉంచండి." },
    { crop: "Pumpkin (గుమ్మడికాయ)", state: "up", market: "Varanasi Mandi", price: "₹850 - ₹1,100", trend: "stable", advisory: language === 'en' ? "Slow prices. Store pumpkins in airy layers." : "ధర నెమ్మదిగా ఉంది. గాలి తగిలేలా నిల్వ అమరికలు చేయండి." },
    
    { crop: "Sweet Potato (చిలగడదుంప)", state: "telangana", market: "Adilabad Mandi", price: "₹2,200 - ₹2,600", trend: "up", advisory: language === 'en' ? "Good demand during religious festivals. Avoid skin bruising during washing." : "పండుగల సమయంలో డిమాండ్ బాగుంది. కడిగేటప్పుడు దుంపల తోలు పోకుండా జాగ్రత్తపడండి." },
    { crop: "Sweet Potato (చిలగడదుంప)", state: "maharashtra", market: "Pune Mandi", price: "₹2,400 - ₹2,850", trend: "up", advisory: language === 'en' ? "Solid city retail demand. Sort rotten tubers." : "నగర రిటైల్ డిమాండ్ బాగుంది. కుళ్లిన దుంపలను వేరు చేయండి." },

    // PULSES & OTHER
    { crop: "Bengal Gram (శనగలు)", state: "telangana", market: "Khammam Mandi", price: "₹5,400 - ₹5,800", trend: "up", advisory: language === 'en' ? "Festive season demand building up. Good time to negotiate trades." : "పండుగల సీజన్ డిమాండ్ పెరుగుతోంది. వ్యాపారులతో బేరసారాలు చేయడానికి అనుకూల సమయం." },
    { crop: "Bengal Gram (శనగలు)", state: "ap", market: "Kurnool Mandi", price: "₹5,300 - ₹5,700", trend: "up", advisory: language === 'en' ? "Steady local seed and flour demands." : "పిండి మిల్లుల నుండి స్థిరమైన కొనుగోళ్లు సాగుతున్నాయి." },
    { crop: "Bengal Gram (శనగలు)", state: "maharashtra", market: "Akola Mandi", price: "₹5,500 - ₹5,900", trend: "up", advisory: language === 'en' ? "Strong pulse mill demands nationwide." : "దేశవ్యాప్తంగా పప్పు మిల్లుల నుండి మంచి డిమాండ్ ఉంది." },
    
    { crop: "Turmeric (పసుపు)", state: "ap", market: "Guntur Mandi", price: "₹12,500 - ₹13,800", trend: "stable", advisory: language === 'en' ? "Steady spice index. Sell dry finger roots for premium prices." : "పసుపు ధరలు ఆశాజనకంగా ఉన్నాయి. ఎండిన కొమ్ములను మంచి ధరకు విక్రయించండి." },
    { crop: "Turmeric (పసుపు)", state: "telangana", market: "Nizamabad Mandi", price: "₹12,200 - ₹13,500", trend: "stable", advisory: language === 'en' ? "Rates matching expectations. Clear old stocks before the fresh harvest arrivals." : "ధరలు ఆశాజనకంగా ఉన్నాయి. కొత్త పంట వచ్చేలోగా పాత నిల్వలను అమ్మేయండి." },
    
    { crop: "Mungbean (పెసర్లు)", state: "telangana", market: "Suryapet Mandi", price: "₹6,800 - ₹7,200", trend: "stable", advisory: language === 'en' ? "Normal arrivals. Avoid panic selling." : "సరుకు రాక మామూలుగా ఉంది. తొందరపడి తక్కువ ధరకు అమ్మవద్దు." },
    { crop: "Mungbean (పెసర్లు)", state: "maharashtra", market: "Latur Mandi", price: "₹7,000 - ₹7,400", trend: "up", advisory: language === 'en' ? "Mill buying active. Clear stocks for best returns." : "మిల్లుల కొనుగోళ్లు చురుగ్గా ఉన్నాయి. మంచి లాభాలకు అమ్ముకోండి." },
    
    { crop: "Pigeon Peas (కందులు)", state: "telangana", market: "Tandur Mandi", price: "₹8,200 - ₹8,800", trend: "up", advisory: language === 'en' ? "Tandur red gram commands GI premium price. Strong miller demands." : "తాండూరు కందులకు ప్రసిద్ధి. మిల్లుల నుండి కొనుగోళ్లు చురుగ్గా ఉన్నాయి." },
    { crop: "Pigeon Peas (కందులు)", state: "maharashtra", market: "Latur Mandi", price: "₹8,000 - ₹8,600", trend: "up", advisory: language === 'en' ? "Strong demand. Release crop stocks." : "ఎక్కువ డిమాండ్. పంట నిల్వలను విడుదల చేయండి." },
    
    { crop: "Kidney Beans (రాజ్మా)", state: "up", market: "Kanpur Mandi", price: "₹6,500 - ₹7,200", trend: "stable", advisory: language === 'en' ? "Steady wholesale queries. Ensure seeds are dried properly." : "హోల్‌సేల్ కొనుగోళ్లు సాగుతున్నాయి. గింజలు బాగా ఎండినవని నిర్ధారించుకోండి." }
  ];

  const filteredData = rawMarketData.filter(item => {
    const matchesSearch = item.crop.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.market.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesState = selectedState === '' || item.state === selectedState;
    return matchesSearch && matchesState;
  });

  return (
    <div className="animate-fade">
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('market.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>{t('market.subtitle')}</p>
      </div>



      {/* Search Input & State Filter */}
      <div className="card glass" style={{ marginBottom: '20px', padding: '16px 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '20px' }} className="grid-2">
          <div style={{ position: 'relative' }}>
            <Search size={18} style={{ position: 'absolute', left: '16px', top: '15px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              className="form-input" 
              style={{ paddingLeft: '44px' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t('market.searchCrop')}
            />
          </div>
          <div>
            <select 
              className="form-select"
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
            >
              <option value="">{t('market.allStates')}</option>
              <option value="telangana">{t('market.states.telangana')}</option>
              <option value="ap">{t('market.states.ap')}</option>
              <option value="maharashtra">{t('market.states.maharashtra')}</option>
              <option value="karnataka">{t('market.states.karnataka')}</option>
              <option value="punjab">{t('market.states.punjab')}</option>
              <option value="up">{t('market.states.up')}</option>
            </select>
          </div>
        </div>
      </div>

      {/* Official Agmarknet Link Banner */}
      <div className="card card-premium" style={{ 
        borderTopColor: 'var(--accent)',
        background: 'linear-gradient(90deg, rgba(82,183,136,0.08) 0%, rgba(27,67,50,0.04) 100%)',
        marginBottom: '30px' 
      }}>
        <div style={{ display: 'flex', justifyItems: 'center', justifyContent: 'space-between', gap: '20px', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
            <div style={{
              background: 'var(--accent)',
              padding: '10px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--primary-dark)',
              marginTop: '4px'
            }}>
              <ArrowRightLeft size={20} />
            </div>
            <div>
              <h4 style={{ fontSize: '1.1rem', color: 'var(--primary-dark)' }}>{t('market.portalLink')}</h4>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '4px' }}>{t('market.portalDesc')}</p>
            </div>
          </div>
          <div>
            <a 
              href="https://agmarknet.gov.in/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="btn btn-primary"
              style={{ padding: '10px 20px', fontSize: '0.9rem' }}
            >
              <span>Agmarknet Mandi Rates</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>



      {/* Pricing Watchlist Table */}
      <div className="card" style={{ padding: 0 }}>
        <div className="market-table-container">
          <table className="market-table">
            <thead>
              <tr>
                <th>{t('market.crop')}</th>
                <th>{t('market.marketName')}</th>
                <th>{t('market.price')}</th>
                <th>{t('market.trend')}</th>
                <th>{t('market.advisory')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong className="crop-title-table">{row.crop}</strong>
                    </td>
                    <td>{row.market}</td>
                    <td style={{ fontWeight: 800, color: 'var(--primary-light)' }}>{row.price}</td>
                    <td>
                      <span className={`trend-badge ${
                        row.trend === 'up' ? 'trend-up' : row.trend === 'down' ? 'trend-down' : 'trend-stable'
                      }`}>
                        {row.trend === 'up' ? <TrendingUp size={14} /> : row.trend === 'down' ? <TrendingDown size={14} /> : null}
                        <span style={{ marginLeft: '4px' }}>{t(`market.trends.${row.trend}`)}</span>
                      </span>
                    </td>
                    <td style={{ fontSize: '0.85rem', maxWidth: '300px' }}>{row.advisory}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '40px', color: 'var(--text-muted)' }}>
                    {t('market.noMatch')}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advisory bulletin */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1.3fr', gap: '30px', marginTop: '30px' }} className="grid-2">
        <div className="card glass">
          <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', color: 'var(--primary)' }}>{t('market.adviceTitle')}</h4>
          <p style={{ fontSize: '0.9rem', marginBottom: '15px' }}>
            {t('market.adviceDesc')}
          </p>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center', color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            <AlertCircle size={16} />
            <span>{t('market.adviceWarning')}</span>
          </div>
        </div>

        <div className="card" style={{ borderLeft: '4px solid var(--secondary)' }}>
          <h4 style={{ fontSize: '1.1rem', marginBottom: '12px', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <HelpCircle size={18} style={{ color: 'var(--secondary)' }} />
            <span>{t('market.chatCalloutTitle')}</span>
          </h4>
          <p style={{ fontSize: '0.85rem' }}>
            {t('market.chatCalloutDesc')}
          </p>
        </div>
      </div>
    </div>
  );
}
