import React, { useState, useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Send, Bot, User, MessageSquare, Plus, Trash2, Paperclip, Image, FileText, Database, X, Mic, MicOff, Volume2, VolumeX, Square, Play } from 'lucide-react';
import { recommendCrop, recommendFertilizer, diseaseDB, cropRules } from '../utils/datasetHelper';

const rawMarketData = [
  { crop: "Paddy/Rice (వరి)", state: "ap", market: "Guntur Mandi", price: "₹2,250 - ₹2,400", trend: "up", advisoryEn: "Strong demand. Hold stock for another 2 weeks for optimal profits.", advisoryTe: "ఎక్కువ డిమాండ్. గరిష్ట లాభాల కోసం మరో 2 వారాలు నిల్వ ఉంచుకోవచ్చు." },
  { crop: "Paddy/Rice (వరి)", state: "telangana", market: "Suryapet Mandi", price: "₹2,180 - ₹2,320", trend: "stable", advisoryEn: "Stable retail flow. Release stock to maintain regular cash flow.", advisoryTe: "ధరలు స్థిరంగా ఉన్నాయి. ఖర్చుల నిమిత్తం విడతల వారీగా అమ్ముకోవచ్చు." },
  { crop: "Paddy/Rice (వరి)", state: "punjab", market: "Ludhiana Mandi", price: "₹2,300 - ₹2,450", trend: "up", advisoryEn: "Government buying is active. Sell at Minimum Support Price (MSP).", advisoryTe: "ప్రభుత్వ కొనుగోళ్లు చురుగ్గా సాగుతున్నాయి. మద్దతుధరకు అమ్ముకోండి." },
  { crop: "Paddy/Rice (వరి)", state: "up", market: "Kanpur Mandi", price: "₹2,150 - ₹2,280", trend: "stable", advisoryEn: "Steady wholesale volume. Monitor national export policies.", advisoryTe: "సరుకు సరఫరా సమానంగా ఉంది. ప్రభుత్వ ఎగుమతి విధానాలను గమనించండి." },
  
  { crop: "Wheat (గోధుమ)", state: "punjab", market: "Ludhiana Mandi", price: "₹2,275 - ₹2,400", trend: "up", advisoryEn: "Government buying active. Clear stocks for premium price before season end.", advisoryTe: "మద్దతు కొనుగోలు బాగుంది. సీజన్ ముగిసేలోపు నిల్వలను మంచిధరకు విక్రయించండి." },
  { crop: "Wheat (గోధుమ)", state: "up", market: "Kanpur Mandi", price: "₹2,200 - ₹2,350", trend: "stable", advisoryEn: "Moderate arrivals. Retail demand matches output.", advisoryTe: "మార్కెట్లోకి సరుకు రాక సాధారణం. స్థానిక అవసరాలకు అనుగుణంగా ఉంది." },
  { crop: "Wheat (గోధుమ)", state: "maharashtra", market: "Pune Mandi", price: "₹2,400 - ₹2,600", trend: "up", advisoryEn: "Strong bakery and flour mill demand. Grade grain quality for best bids.", advisoryTe: "పిండి మిల్లుల నుండి మంచి డిమాండ్ ఉంది. గ్రేడింగ్ చేసి అమ్మితే ఎక్కువ లాభం." },

  { crop: "Cotton (పత్తి)", state: "telangana", market: "Adilabad Mandi", price: "₹6,800 - ₹7,200", trend: "stable", advisoryEn: "Market is stable. Sell in batches to maintain regular cash flow.", advisoryTe: "ధరలు స్థిరంగా ఉన్నాయి. ఖర్చుల నిమిత్తం విడతల వారీగా అమ్ముకోవచ్చు." },
  { crop: "Cotton (పత్తి)", state: "ap", market: "Adoni Mandi", price: "₹6,700 - ₹7,100", trend: "stable", advisoryEn: "Steady spinning mill bids. Keep moisture level below 8%.", advisoryTe: "మిల్లుల నుండి కొనుగోళ్లు స్థిరంగా ఉన్నాయి. తేమ శాతం 8% కంటే తక్కువగా ఉంచండి." },
  { crop: "Cotton (పత్తి)", state: "maharashtra", market: "Nagpur Mandi", price: "₹7,000 - ₹7,450", trend: "up", advisoryEn: "High export demand. Avoid selling dirty or wet cotton.", advisoryTe: "ఎగుమతి డిమాండ్ చాలా ఎక్కువగా ఉంది. తడిచిన పత్తిని తక్కువధరకు అమ్మవద్దు." },

  { crop: "Red Chilli (ఎండు మిర్చి)", state: "ap", market: "Guntur Mirchi Yard", price: "₹18,500 - ₹21,000", trend: "up", advisoryEn: "Export demand is high. Grade your crop quality to fetch premium rates.", advisoryTe: "ఎగుమతి డిమాండ్ చాలా ఎక్కువగా ఉంది. రకాలను బట్టి గ్రేడింగ్ చేసి అమ్మండి." },
  { crop: "Red Chilli (ఎండు మిర్చి)", state: "telangana", market: "Warangal Mandi", price: "₹18,000 - ₹20,200", trend: "up", advisoryEn: "High demand from spice processors. Dry thoroughly to prevent mold.", advisoryTe: "మసాలా దినుసుల వ్యాపారుల నుండి డిమాండ్ బాగుంది. బూజు పట్టకుండా ఆరబెట్టండి." },

  { crop: "Maize (మొక్కజొన్న)", state: "telangana", market: "Warangal Mandi", price: "₹1,950 - ₹2,100", trend: "down", advisoryEn: "Supply influx is high. Avoid panic selling; rates expected to rebound next month.", advisoryTe: "మార్కెట్లో సరుకు ఎక్కువైంది. తొందరపడి తక్కువ ధరకు అమ్మవద్దు, వచ్చే నెల ధర పెరుగుతుంది." },
  { crop: "Maize (మొక్కజొన్న)", state: "ap", market: "Kurnool Mandi", price: "₹1,900 - ₹2,050", trend: "down", advisoryEn: "Feed industries buying slowly. Store safely if moisture is under control.", advisoryTe: "రసాయన ఎరువుల ఖర్చులు పెరిగాయి. నిల్వ వీలైతే ఎండబెట్టి ఆరబెట్టి ఉంచండి." },
  { crop: "Maize (మొక్కజొన్న)", state: "karnataka", market: "Davanagere Mandi", price: "₹1,980 - ₹2,120", trend: "stable", advisoryEn: "Steady poultry feed industry demand. Ensure quality standards.", advisoryTe: "పౌల్ట్రీ ఫీడ్ పరిశ్రమ కొనుగోళ్లు స్థిరంగా ఉన్నాయి. నాణ్యత కాపాడుకోండి." },

  { crop: "Onion (ఉల్లిపాయ)", state: "maharashtra", market: "Lasalgaon Mandi", price: "₹1,400 - ₹1,800", trend: "up", advisoryEn: "Lasalgaon prices setting national trend. Grade bulbs before dispatch.", advisoryTe: "లాసల్‌గావ్ మార్కెట్ పెరిగింది. రవాణాకు ముందే గడ్డలను గ్రేడింగ్ చేయండి." },
  { crop: "Onion (ఉల్లిపాయ)", state: "ap", market: "Kurnool Mandi", price: "₹1,200 - ₹1,450", trend: "down", advisoryEn: "Storage loss warning. Sell moisture-laden stock immediately.", advisoryTe: "నిల్వ ఉంచితే కుళ్ళిపోయే ప్రమాదం ఉంది. తడి ఆరిన వెంటనే అమ్మడం మంచిది." },
  { crop: "Onion (ఉల్లిపాయ)", state: "karnataka", market: "Bengaluru Mandi", price: "₹1,500 - ₹1,850", trend: "up", advisoryEn: "Retail demand is strong. Grade color and sizes for higher bids.", advisoryTe: "నగరాల్లో ఉల్లి డిమాండ్ పెరిగింది. సైజు మరియు రంగు బట్టి వేరు చేసి అమ్మండి." },

  { crop: "Tomato (టమోటా)", state: "ap", market: "Madanapalle Mandi", price: "₹1,800 - ₹2,400", trend: "up", advisoryEn: "Heavy summer demand. Sell graded red tomatoes for highest margin.", advisoryTe: "ఎండల తీవ్రత వల్ల డిమాండ్ పెరిగింది. మంచి లాభాల కోసం గ్రేడింగ్ చేసిన పండ్లను అమ్మండి." },
  { crop: "Tomato (టమోటా)", state: "telangana", market: "Bowenpally Mandi", price: "₹1,500 - ₹1,800", trend: "up", advisoryEn: "Yields reduced due to heat. Bring fresh harvest daily.", advisoryTe: "తీవ్ర ఎండల వల్ల పంట దిగుబడి తగ్గింది. రోజువారీ తాజా కాయలను తీసుకురండి." },
  { crop: "Tomato (టమోటా)", state: "maharashtra", market: "Pune Mandi", price: "₹1,400 - ₹1,750", trend: "up", advisoryEn: "Steady metropolitan demand. Sort damage fruit before dispatch.", advisoryTe: "నగరాల నుండి స్థిరమైన డిమాండ్. పాడైన పండ్లను వేరు చేయండి." },
  
  { crop: "Potato (ఆలుగడ్డ)", state: "up", market: "Agra Mandi", price: "₹1,500 - ₹1,750", trend: "stable", advisoryEn: "Cold storage supplies active. Prices expected to remain stable.", advisoryTe: "కోల్డ్ స్టోరేజ్ సరఫరా బాగుంది. మార్కెట్లో ధరలు స్థిరంగా కొనసాగుతాయి." },
  { crop: "Potato (ఆలుగడ్డ)", state: "ap", market: "Kurnool Mandi", price: "₹1,600 - ₹1,900", trend: "stable", advisoryEn: "Steady demand. Release stocks in calculated intervals.", advisoryTe: "డిమాండ్ స్థిరంగా ఉంది. తగిన విరామాలలో బంగాళాదుంప నిల్వలను అమ్మండి." },
  
  { crop: "Brinjal (వంకాయ)", state: "telangana", market: "Warangal Mandi", price: "₹1,400 - ₹1,650", trend: "up", advisoryEn: "Local demand is strong. Bring fresh, unblemished stock to Mandi.", advisoryTe: "స్థానిక డిమాండ్ బాగుంది. మచ్చలు లేని తాజా సరుకును మార్కెట్కు తీసుకురండి." },
  { crop: "Brinjal (వంకాయ)", state: "maharashtra", market: "Nagpur Mandi", price: "₹1,300 - ₹1,550", trend: "stable", advisoryEn: "Normal arrivals. Keep vegetable moist during transport.", advisoryTe: "సరుకు రాక మామూలుగా ఉంది. రవాణాలో వాడిపోకుండా జాగ్రత్తపడండి." },
  
  { crop: "Okra (బెండకాయ)", state: "ap", market: "Guntur Mandi", price: "₹2,200 - ₹2,500", trend: "down", advisoryEn: "High seasonal yield arrival. Harvest daily to maintain tenderness.", advisoryTe: "దిగుబడి మార్కెట్లోకి ఎక్కువగా వస్తోంది. కాయ ముదరకుండా రోజువారీ కోత కోసి అమ్మండి." },
  { crop: "Okra (బెండకాయ)", state: "karnataka", market: "Hubli Mandi", price: "₹2,300 - ₹2,600", trend: "stable", advisoryEn: "Moderate market volumes. Maintain daily sorting standards.", advisoryTe: "మార్కెట్ నిల్వలు మితంగా ఉన్నాయి. రోజువారీ గ్రేడింగ్ పాటించండి." },
  
  { crop: "Cabbage (క్యాబేజీ)", state: "telangana", market: "Nizamabad Mandi", price: "₹1,100 - ₹1,300", trend: "stable", advisoryEn: "Steady wholesale demand. Keep logistics fast to prevent weight loss.", advisoryTe: "హోల్‌సేల్ డిమాండ్ స్థిరంగా ఉంది. బరువు తగ్గకుండా త్వరగా మార్కెట్కు తరలించండి." },
  { crop: "Cabbage (క్యాబేజీ)", state: "punjab", market: "Jalandhar Mandi", price: "₹1,200 - ₹1,400", trend: "stable", advisoryEn: "Normal winter yields. Avoid damaged outer leaf packs.", advisoryTe: "శీతాకాలపు పంట బాగా వస్తోంది. దెబ్బతిన్న పై ఆకులను వేరు చేయండి." },

  { crop: "Cauliflower (క్యాలీఫ్లవర్)", state: "telangana", market: "Khammam Mandi", price: "₹2,500 - ₹2,800", trend: "up", advisoryEn: "High wedding season demand. Sort curd sizes to capture premium price.", advisoryTe: "శుభకార్యాల సీజన్ కావడంతో డిమాండ్ పెరిగింది. పువ్వు సైజు బట్టి వర్గీకరించి అమ్మండి." },
  { crop: "Cauliflower (క్యాలీఫ్లవర్)", state: "up", market: "Kanpur Mandi", price: "₹2,200 - ₹2,500", trend: "up", advisoryEn: "Strong city demand. Avoid chemical spray directly before harvest.", advisoryTe: "నగర డిమాండ్ బాగుంది. కోతకు ముందు ఎలాంటి మందులు కొట్టవద్దు." },
  
  { crop: "Carrot (క్యారెట్)", state: "ap", market: "Anantapur Mandi", price: "₹3,000 - ₹3,400", trend: "up", advisoryEn: "Strong wholesale rates. Clean soil residue properly for maximum value.", advisoryTe: "ధరలు ఎంతో ఆశాజనకంగా ఉన్నాయి. నేల మట్టిని శుభ్రం చేసి అమ్మితే ఎక్కువ ధర పలుకుతుంది." },
  { crop: "Carrot (క్యారెట్)", state: "punjab", market: "Ludhiana Mandi", price: "₹2,800 - ₹3,200", trend: "stable", advisoryEn: "Winter crop supplies strong. Wash and sort carrots well.", advisoryTe: "శీతాకాల సాగు బాగా వస్తోంది. ముల్లంగిని బాగా కడిగి వర్గీకరించండి." },

  { crop: "Cucumber (దోసకాయ)", state: "ap", market: "Kurnool Mandi", price: "₹1,200 - ₹1,500", trend: "stable", advisoryEn: "High water content. Sell quickly to avoid weight loss.", advisoryTe: "నీటి శాతం ఎక్కువగా ఉంటుంది. బరువు తగ్గకముందే త్వరగా అమ్మండి." },
  { crop: "Cucumber (దోసకాయ)", state: "telangana", market: "Mahbubnagar Mandi", price: "₹1,100 - ₹1,400", trend: "stable", advisoryEn: "Steady local retail demand. Keep crop fresh.", advisoryTe: "స్థానిక అవసరాలు స్థిరంగా ఉన్నాయి. కాయలు తాజాగా ఉండేలా చూడండి." },
  
  { crop: "Bitter Gourd (కాకరకాయ)", state: "telangana", market: "Warangal Mandi", price: "₹2,000 - ₹2,400", trend: "up", advisoryEn: "Export demand is growing. Harvest clean, green fruits.", advisoryTe: "ఎగుమతి డిమాండ్ పెరుగుతోంది. తాజా పచ్చటి కాయలను మార్కెట్కు తీసుకురండి." },
  { crop: "Bitter Gourd (కాకరకాయ)", state: "maharashtra", market: "Pune Mandi", price: "₹2,200 - ₹2,650", trend: "up", advisoryEn: "High fresh demand in city centers. Harvest twice weekly.", advisoryTe: "నగరాల్లో చేదు కాకర కాయకు మంచి ధర ఉంది. వారానికి రెండు సార్లు కోత కోయండి." },
  
  { crop: "Bottle Gourd (సొరకాయ)", state: "ap", market: "Guntur Mandi", price: "₹1,000 - ₹1,200", trend: "stable", advisoryEn: "Steady local consumption. Sort by size for retail buyers.", advisoryTe: "స్థానిక వినియోగం బాగుంది. సైజులను బట్టి వేరు చేసి అమ్మితే మంచిది." },
  { crop: "Bottle Gourd (సొరకాయ)", state: "up", market: "Agra Mandi", price: "₹900 - ₹1,100", trend: "stable", advisoryEn: "Moderate wholesale arrivals. Retain stem length.", advisoryTe: "హోల్‌సేల్ మార్కెట్ బాగుంది. కాయ తొడిమను కత్తిరించకుండా ఉంచండి." },
  
  { crop: "Ridge Gourd (బీరకాయ)", state: "telangana", market: "Nizamabad Mandi", price: "₹1,800 - ₹2,200", trend: "up", advisoryEn: "Limited supply in markets. High quality command premium.", advisoryTe: "మార్కెట్లోకి సరుకు తక్కువగా ఉంది. తాజా బీరకాయలకు మంచి ధర పలుకుతుంది." },
  { crop: "Ridge Gourd (బీరకాయ)", state: "karnataka", market: "Mysore Mandi", price: "₹1,900 - ₹2,300", trend: "up", advisoryEn: "Local demand high. Harvest in early morning.", advisoryTe: "స్థానిక డిమాండ్ చాలా బాగుంది. ఉదయాన్నే కాయ కోసి విక్రయించండి." },
  
  { crop: "Spinach (పాలకూర)", state: "ap", market: "Guntur Mandi", price: "₹800 - ₹1,000", trend: "stable", advisoryEn: "Leafy greens have short shelf life. Transport in ventilated crates.", advisoryTe: "ఆకుకూరలు త్వరగా పాడవుతాయి. గాలి తగిలే గంపలు లేదా పెట్టెలలో రవాణా చేయండి." },
  { crop: "Spinach (పాలకూర)", state: "telangana", market: "Hyderabad Mandi", price: "₹900 - ₹1,100", trend: "stable", advisoryEn: "Consistent daily arrivals. Avoid spray right before harvesting.", advisoryTe: "రోజువారీ సరఫరా బాగుంది. కోతకు ముందు ఎలాంటి పిచికారీ చేయవద్దు." },
  
  { crop: "Coriander (కొత్తిమీర)", state: "telangana", market: "Khammam Mandi", price: "₹1,500 - ₹2,000", trend: "up", advisoryEn: "High fresh demand in urban hubs. Sort out dry or yellow leaves.", advisoryTe: "పట్టణ మార్కెట్లలో డిమాండ్ బాగుంది. ఎండిన మరియు పసుపు రంగు ఆకులను వేరు చేయండి." },
  { crop: "Coriander (కొత్తిమీర)", state: "maharashtra", market: "Pune Mandi", price: "₹1,600 - ₹2,200", trend: "up", advisoryEn: "Metropolitan demand high. Bind in uniform bundle sizes.", advisoryTe: "నగరాల నుండి గిరాకీ బాగుంది. సమాన సైజు కట్టలుగా కట్టి విక్రయించండి." },
  
  { crop: "Radish (ముల్లంగి)", state: "ap", market: "Kurnool Mandi", price: "₹1,100 - ₹1,400", trend: "down", advisoryEn: "Heavy local arrivals. Clean wash leaves and root bulbs before trading.", advisoryTe: "దిగుబడి ఎక్కువగా వస్తోంది. అమ్మే ముందు ఆకులు మరియు దుంపలను బాగా కడిగి అమ్ముకోండి." },
  { crop: "Radish (ముల్లంగి)", state: "up", market: "Kanpur Mandi", price: "₹1,000 - ₹1,250", trend: "down", advisoryEn: "High supply influx. Sell washed roots in bundles.", advisoryTe: "ముల్లంగి సరుకు మార్కెట్లో పెరిగింది. కడిగిన దుంపలను కట్టలుగా వేసి అమ్మండి." },
  
  { crop: "Capsicum (క్యాప్సికమ్)", state: "telangana", market: "Warangal Mandi", price: "₹3,500 - ₹4,200", trend: "up", advisoryEn: "Excellent demand from restaurants. Grade by color and size.", advisoryTe: "హోటళ్ల నుండి మంచి డిమాండ్ ఉంది. రంగు మరియు సైజు బట్టి గ్రేడింగ్ చేసి అమ్మండి." },
  { crop: "Capsicum (క్యాప్సికమ్)", state: "karnataka", market: "Bengaluru Mandi", price: "₹3,800 - ₹4,500", trend: "up", advisoryEn: "High hotel and mall demand. Pack in ventilated crates.", advisoryTe: "హోటళ్లు మరియు మాల్స్ డిమాండ్ బాగుంది. వెంటిలేషన్ పెట్టెలలో ప్యాక్ చేయండి." },
  
  { crop: "French Beans (చిక్కుడుకాయ)", state: "ap", market: "Nellore Mandi", price: "₹3,000 - ₹3,600", trend: "stable", advisoryEn: "Consistent prices. Harvest early to prevent pods from becoming fibrous.", advisoryTe: "ధరలు స్థిరంగా ఉన్నాయి. కాయ పీచు కట్టకముందే కోసి అమ్మితే ఎక్కువ ధర వస్తుంది." },
  { crop: "French Beans (చిక్కుడుకాయ)", state: "maharashtra", market: "Pune Mandi", price: "₹3,200 - ₹3,800", trend: "stable", advisoryEn: "Steady wholesale trades. Grade pods for quality uniformity.", advisoryTe: "హోల్‌సేల్ వ్యాపారం స్థిరంగా ఉంది. కాయ సైజులలో ఏకరూపత ఉండేలా చూసుకోండి." }
];

export default function Chatbot() {
  const { t, language } = useLanguage();
  const [inputValue, setInputValue] = useState('');
  const [activeChatId, setActiveChatId] = useState('current');

  const [attachedFile, setAttachedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const fileInputImageRef = useRef(null);
  const fileInputDocRef = useRef(null);
  const fileInputDataRef = useRef(null);

  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speakActiveId, setSpeakActiveId] = useState(null);
  const [autoVoice, setAutoVoice] = useState(false);
  const [voiceError, setVoiceError] = useState(null);
  const recognitionRef = useRef(null);
  
  const [stagedVoiceTranscript, setStagedVoiceTranscript] = useState('');
  const [showVoiceConfirm, setShowVoiceConfirm] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const recordingStartTimeRef = useRef(null);

  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem('agrobuddy_chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      } catch (e) {
        console.error("Error parsing chat history:", e);
      }
    }
    return [
      { 
        id: 'chat_tomato', 
        title: language === 'en' ? "Tomato Blight Help" : "టమోటా తెగుళ్ళ నివారణ", 
        messages: [
          { sender: 'user', text: language === 'en' ? "How to cure tomato leaf spots?" : "టమోటా ఆకు మచ్చల నివారణ ఎలా?", timestamp: "10:15 AM" },
          { sender: 'bot', text: language === 'en' ? "That looks like Early Blight. Spray organic Neem Oil (1%) weekly or use Mancozeb fungicide." : "ఇది ఆకు మచ్చ తెగులుగా కనిపిస్తోంది. వారానికి ఒకసారి వేప నూనె చల్లండి లేదా మ్యాంకోజెబ్ మందును వాడండి.", timestamp: "10:16 AM" }
        ] 
      },
      { 
        id: 'chat_rice', 
        title: language === 'en' ? "Rice NPK Advice" : "వరి ఎరువుల నివారణ", 
        messages: [
          { sender: 'user', text: language === 'en' ? "My paddy leaves are yellowing." : "నా వరి ఆకులు పసుపు రంగులోకి మారుతున్నాయి.", timestamp: "11:20 AM" },
          { sender: 'bot', text: language === 'en' ? "Yellowing leaves typically mean Nitrogen deficiency. Apply 20-30 kg of Urea per acre during split doses." : "వరి ఆకులు పసుపు రంగులోకి మారడం నత్రజని లోపాన్ని సూచిస్తుంది. ఎకరాకు 20-30 కిలోల యూరియాను చల్లండి.", timestamp: "11:22 AM" }
        ] 
      }
    ];
  });

  const [typingChatId, setTypingChatId] = useState(null);
  const messagesEndRef = useRef(null);
  const [sessionStartTime] = useState(() => new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    localStorage.setItem('agrobuddy_chat_history', JSON.stringify(history));
  }, [history]);

  const activeChat = history.find(h => h.id === activeChatId);
  const currentMessages = activeChat ? activeChat.messages : [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentMessages, typingChatId]);

  const stageFile = (file, category) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert(language === 'te' ? 'దయచేసి 10MB కంటే తక్కువ పరిమాణం ఉన్న ఫైల్‌ను అప్‌లోడ్ చేయండి.' : 'Please upload a file smaller than 10MB.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          const reader = new FileReader();
          reader.onload = (e) => {
            setAttachedFile({
              name: file.name,
              size: file.size,
              type: file.type,
              category: category,
              dataUrl: e.target.result
            });
          };
          reader.readAsDataURL(file);
          return 100;
        }
        return prev + 25; 
      });
    }, 150);
  };

  const handleAttachmentSelect = (category) => {
    setShowAttachMenu(false);
    if (category === 'image') {
      fileInputImageRef.current?.click();
    } else if (category === 'doc') {
      fileInputDocRef.current?.click();
    } else if (category === 'data') {
      fileInputDataRef.current?.click();
    }
  };

  const onFileChange = (e, category) => {
    const file = e.target.files?.[0];
    if (file) {
      stageFile(file, category);
    }
    e.target.value = '';
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.relatedTarget === null || !e.currentTarget.contains(e.relatedTarget)) {
      setIsDragging(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      let category = 'doc';
      const fileType = file.type.toLowerCase();
      const ext = file.name.split('.').pop().toLowerCase();

      if (fileType.startsWith('image/') || ['jpg', 'jpeg', 'png', 'webp'].includes(ext)) {
        category = 'image';
      } else if (['csv', 'xlsx', 'xls'].includes(ext) || fileType.includes('csv') || fileType.includes('spreadsheet') || fileType.includes('excel')) {
        category = 'data';
      } else if (['pdf', 'docx', 'doc', 'txt'].includes(ext) || fileType.includes('pdf') || fileType.includes('word') || fileType.startsWith('text/')) {
        category = 'doc';
      }
      
      stageFile(file, category);
    }
  };

  const detectIntent = (text) => {
    const lowerText = text.toLowerCase();
    
    // Soil Health
    if ((lowerText.includes('soil') || lowerText.includes('మట్టి') || lowerText.includes('nela')) && 
        (lowerText.includes('health') || lowerText.includes('test') || lowerText.includes('report') || lowerText.includes('carbon') || lowerText.includes('npk') || lowerText.includes('ph') || lowerText.includes('ఆరోగ్య') || lowerText.includes('పరీక్ష'))) {
      return 'soil_health';
    }
    
    // Crop Recommendation
    if (lowerText.includes('crop') || lowerText.includes('suitable') || lowerText.includes('recommend') || 
        lowerText.includes('grow') || lowerText.includes('sow') || lowerText.includes('plant') || 
        lowerText.includes('పంట') || lowerText.includes('సిఫార్సు') || 
        lowerText.includes('వేయాలి') || lowerText.includes('పండించాలి') ||
        lowerText.includes('panta') || lowerText.includes('pantalu') || lowerText.includes('natali')) {
      return 'crop_recommendation';
    }
    
    // Fertilizer Guidance
    if (lowerText.includes('fertilizer') || lowerText.includes('urea') || lowerText.includes('dap') || 
        lowerText.includes('mop') || lowerText.includes('potash') || lowerText.includes('dosage') ||
        lowerText.includes('ఎరువు') || lowerText.includes('యూరియా') || lowerText.includes('పొటాష్') ||
        lowerText.includes('eruvu') || lowerText.includes('eruvulu') || lowerText.includes('challali') || lowerText.includes('dosage')) {
      return 'fertilizer_guidance';
    }
    
    // Pest Management
    if (lowerText.includes('pest') || lowerText.includes('purugu') || lowerText.includes('pattindi') || 
        lowerText.includes('worm') || lowerText.includes('borer') || lowerText.includes('insect') ||
        lowerText.includes('పురుగు') || lowerText.includes('పురుగులు') || lowerText.includes('krimulu') || 
        lowerText.includes('pesticide') || lowerText.includes('insecticide')) {
      return 'pest_management';
    }

    // Disease Diagnosis
    if (lowerText.includes('disease') || lowerText.includes('leaf') || lowerText.includes('spots') || 
        lowerText.includes('yellow') || lowerText.includes('blight') || lowerText.includes('blast') || 
        lowerText.includes('rust') || lowerText.includes('leaves') || lowerText.includes('fungus') || 
        lowerText.includes('rot') || lowerText.includes('treatment') || lowerText.includes('cure') ||
        lowerText.includes('ఆకు') || lowerText.includes('మచ్చ') || lowerText.includes('తెగులు') || 
        lowerText.includes('పసుపు') || lowerText.includes('akulu') || lowerText.includes('macha') || lowerText.includes('spots')) {
      return 'disease_diagnosis';
    }
    
    // Weather Advisory
    if (lowerText.includes('weather') || lowerText.includes('rain') || lowerText.includes('temperature') || 
        lowerText.includes('forecast') || lowerText.includes('precipitation') || 
        lowerText.includes('వాతావరణం') || lowerText.includes('వర్షం') || lowerText.includes('ఎండ') || 
        lowerText.includes('varsham') || lowerText.includes('varshaalu') || lowerText.includes('temperature')) {
      return 'weather_advisory';
    }
    
    // Market Prices
    if (lowerText.includes('price') || lowerText.includes('market') || lowerText.includes('mandi') || 
        lowerText.includes('cost') || lowerText.includes('rate') ||
        lowerText.includes('ధర') || lowerText.includes('మార్కెట్') || lowerText.includes('రేటు') || 
        lowerText.includes('dhara') || lowerText.includes('rate entha')) {
      return 'market_prices';
    }
    
    // Profit Estimation
    if (lowerText.includes('profit') || lowerText.includes('yield') || lowerText.includes('income') || 
        lowerText.includes('investment') || lowerText.includes('earnings') ||
        lowerText.includes('లాభం') || lowerText.includes('దిగుబడి') || lowerText.includes('ఖర్చు') ||
        lowerText.includes('labham') || lowerText.includes('digubadi') || lowerText.includes('karchu')) {
      return 'profit_estimation';
    }

    // Soil Health General
    if (lowerText.includes('soil') || lowerText.includes('మట్టి') || lowerText.includes('nela')) {
      return 'soil_health';
    }
    
    return 'general_agriculture';
  };

  const generateAIResponse = async (text, activeLanguage, file) => {
    const hasTelugu = /[\u0C00-\u0C7F]/.test(text);
    const isTrans = /purugu|pattindi|cheyali|cheyaali|vadali|vadaali|baguntundi|baaguntundi|varsham|padutunda|paduthundha|\bki\b|\be\b|\bnaa\b|\bna\b|\bundhi\b|\bundi\b|eruvu|panta|dhara|rate|mandi|sutavainadi|em\s+cheyali|puri|puruvu/i.test(text);
    const currentLang = (hasTelugu || isTrans) ? 'te' : activeLanguage;
    const isTransMode = isTrans && !hasTelugu;
    const lowerText = text.toLowerCase();

    // Regex parsers for soil parameters
    const phMatch = text.match(/ph\s*(?:value|is|undi|undhi)?\s*[:=]?\s*([0-9.]+)/i);
    const nMatch = text.match(/(?:n|nitrogen)\s*(?:value|is)?\s*[:=]?\s*([0-9]+)/i);
    const pMatch = text.match(/(?:p|phosphorus)\s*(?:value|is)?\s*[:=]?\s*([0-9]+)/i);
    const kMatch = text.match(/(?:k|potassium)\s*(?:value|is)?\s*[:=]?\s*([0-9]+)/i);

    // Helper to format structured response uniformly
    const formatResponse = (problem, cause, whatToDo, organic, treatment, precautions, additional) => {
      return `🌾 **Problem:**\n${problem}\n\n` +
             `🔍 **Cause:**\n${cause}\n\n` +
             `✅ **What To Do:**\n${whatToDo}\n\n` +
             `🧪 **Organic Method:**\n${organic}\n\n` +
             `💊 **Recommended Treatment:**\n${treatment}\n\n` +
             `⚠️ **Precautions:**\n${precautions}\n\n` +
             `📌 **Additional Advice:**\n${additional}`;
    };

    if (file) {
      const fileNameLower = file.name.toLowerCase();
      
      // A. IMAGE FILE ANALYSIS
      if (file.category === 'image') {
        if (fileNameLower.includes('tomato')) {
          if (currentLang === 'te') {
            return formatResponse(
              "టమోటా ఆకులకు శిలీంధ్ర మచ్చల తెగులు (Early Blight) ఆశించింది.",
              "అల్టెర్నేరియా సొలాని శిలీంధ్ర వ్యాప్తి. అధిక తేమ, చినుకులు మరియు నీరు నిలవడం ఈ తెగులుకు అనుకూల పరిస్థితులు.",
              "రోగం సోకిన క్రింది ఆకులను కత్తిరించి నాశనం చేయండి, తద్వారా నేల నుండి వ్యాప్తి చెందే శిలీంధ్ర బీజాలను అరికట్టవచ్చు.",
              "లీటర్ నీటికి 5 మి.లీ వేప నూనెను కలిపి వారానికోసారి ఆకులపై పిచికారీ చేయండి.",
              "మ్యాంకోజెబ్ (Mancozeb - 2.5 గ్రా/లీటర్) లేదా కాపర్ ఆక్సిక్లోరైడ్ (3 గ్రా/లీటర్) పిచికారీ చేయండి.",
              "పంట ఆకులు పొడిగా ఉన్నప్పుడు మాత్రమే పిచికారీ చేయాలి. మధ్యాహ్నం వేడిలో పిచికారీ చేయడం ఆపండి.",
              "పొలంలో సరైన దూరాన్ని పాటించడం ద్వారా గాలి ప్రసరణను మెరుగుపరచండి మరియు పంట మార్పిడి చేపట్టండి."
            );
          } else {
            return formatResponse(
              "Tomato foliage exhibits concentric dark target-spots, indicating Early Blight (Alternaria solani) infestation.",
              "High relative humidity and wet soil conditions promoting fungal spore germination.",
              "Prune and safely destroy lower leaves to block soil-borne spore splashing.",
              "Spray Neem Oil (1% concentration or 5ml/liter of water) at weekly intervals.",
              "Apply Mancozeb 75% WP (2.5g/liter) or Copper Oxychloride 50% WP (3.0g/liter) under dry foliage conditions.",
              "Do not overhead-water the crops. Always use safety gloves during chemical spraying.",
              "Practice crop rotation with non-solanaceous crops (like legumes) next season."
            );
          }
        }
        
        if (fileNameLower.includes('pest') || fileNameLower.includes('purugu') || fileNameLower.includes('worm') || fileNameLower.includes('borer')) {
          if (currentLang === 'te') {
            return formatResponse(
              "పంటకు కాయ తొలిచే పురుగు (Fruit/Shoot Borer) ఆశించింది.",
              "హెలికోవెర్పా ఆర్మిగెరా అనే రెక్కల పురుగు వేసిన గుడ్ల నుండి వచ్చిన లార్వా పూమొగ్గలను మరియు కాయలను తిని నాశనం చేస్తుంది.",
              "పురుగు ఆశించిన రెమ్మలను, రాలిన పూమొగ్గలను మరియు దెబ్బతిన్న కాయలను ఏరివేసి పొలానికి దూరంగా గుంతలో వేసి నాశనం చేయండి.",
              "ఎకరాకు 5 లింగాకర్షక బుట్టలను (Pheromone traps) అమర్చండి. వేప గింజల కషాయం (5%) పిచికారీ చేయండి.",
              "ఎకరాకు ఎమామెక్టిన్ బెంజోయేట్ 5% SG (80 గ్రాములు) లేదా క్లోరాంట్రానిలిప్రోల్ (Coragen - 60 మి.లీ) పిచికారీ చేయాలి.",
              "కోతకు 10 రోజులు ముందు ఎలాంటి రసాయన పిచికారీ చేయవద్దు. పిచికారీ చేసేటప్పుడు రక్షణ మాస్క్ ధరించండి.",
              "భవిష్యత్తులో పొలం గట్ల వెంబడి బంతి మొక్కలను (Trap crop) నాటడం ద్వారా తల్లి పురుగులను ఆకర్షించవచ్చు."
            );
          } else {
            return formatResponse(
              "Pest infestation detected on the crop, consistent with Fruit and Shoot Borer (Helicoverpa armigera).",
              "Larvae hatch from moth eggs and bore into fruits and shoots, feeding internally and rendering produce unmarketable.",
              "Regularly scout fields, manually collect, and destroy infested shoots and bored fruits.",
              "Install Pheromone traps (5-6 traps per acre) to monitor moths. Spray Neem Seed Kernel Extract (NSKE 5%).",
              "Apply Emamectin Benzoate 5% SG (80g/acre) or Chlorantraniliprole (Coragen - 60ml/acre) mixed in 200 liters of water.",
              "Observe a strict waiting period (withholding period) of at least 7-10 days between spraying and harvesting.",
              "Grow marigold flowers around field borders as trap crops to divert adult moths."
            );
          }
        }
        
        if (fileNameLower.includes('soil') || fileNameLower.includes('nela')) {
          if (currentLang === 'te') {
            return formatResponse(
              "ఇది తేమ నిలుపుదల శక్తి తక్కువగా ఉండే ఎర్ర ఇసుక లోమ్ నేల (Red Sandy Loam Soil).",
              "ఎర్రనేలలో ఇసుక రేణువులు ఎక్కువగా ఉండటం వల్ల నీటి పారుదల చాలా వేగంగా జరిగి పోషకాలు కడిగివేయబడతాయి.",
              "నేల తేమను పెంచడానికి సేంద్రీయ పదార్థాలు మరియు పశువుల ఎరువును ఎక్కువగా చేర్చాలి.",
              "ఎకరాకు 5-10 టన్నుల పశువుల ఎరువు (FYM) లేదా వర్మీ కంపోస్ట్ చల్లి నేలలో బాగా కలపండి.",
              "పోషకాల లోపాలను భర్తీ చేయడానికి నేల పరీక్ష ఆధారంగా సిఫార్సు చేసిన NPK ఎరువులను విడతల వారీగా వేయండి.",
              "భారీ మోతాదులో ఒకేసారి ఎరువులను వేయవద్దు, ఎందుకంటే అవి కడిగివేయబడి వృథా అవుతాయి. నీటి తడులు తేలికగా ఇవ్వాలి.",
              "ఈ నేలకు వేరుశనగ, మొక్కజొన్న, జొన్నలు మరియు పత్తి పంటలు అత్యంత అనుకూలం."
            );
          } else {
            return formatResponse(
              "Red Sandy Loam Soil identified, exhibiting high percolation rates and low moisture holding capacity.",
              "High quartz/sand fraction leading to rapid water drainage and leaching of essential crop nutrients.",
              "Incorporate heavy organic compost or mulching to build soil structure and retain rootzone moisture.",
              "Incorporate 5-8 tons/acre of farmyard manure or well-decomposed vermicompost during initial land preparation.",
              "Apply synthetic fertilizers in split doses to match plant growth stages rather than in one heavy basal dose.",
              "Avoid heavy flooding irrigation, which causes severe nutrient run-off. Use light and frequent irrigation rounds.",
              "Crops like Groundnut, Pearl Millet, and Cotton are agronomically optimal for this soil type."
            );
          }
        }

        // Default image
        if (currentLang === 'te') {
          return formatResponse(
            "చిత్రం ఆధారంగా ఎలాంటి అసాధారణ తెగుళ్లు లేదా సమస్యలు స్పష్టంగా కనిపించడం లేదు.",
            "పంట ఆకులు మరియు కొమ్మలు ఆరోగ్యకరమైన పచ్చదనంతో కనిపిస్తున్నాయి.",
            "పంట ఆరోగ్యాన్ని కాపాడుకోవడానికి సాధారణ యాజమాన్య పద్ధతులను కొనసాగించండి.",
            "ముందస్తు రక్షణగా 10 రోజుల వ్యవధిలో 3% వేపనూనె ద్రావణాన్ని చల్లవచ్చు.",
            "తెగుళ్ల సంకేతాలు కనిపించనందున ప్రస్తుతానికి రసాయన పురుగుమందుల వాడకం అవసరం లేదు.",
            "ఆరోగ్యకరమైన పంటలపై అనవసరంగా రసాయన స్ప్రేలు చల్లి మిత్ర పురుగులను చంపవద్దు.",
            "రోగం లేదా సమస్య ఉన్న భాగాన్ని (ఆకులు/కాయలు) దగ్గరగా ఫోటో తీసి పంపితే మరింత ఖచ్చితమైన విశ్లేషణ చేయగలను."
          );
        } else {
          return formatResponse(
            "Image analysis indicates healthy foliage with no visible pathological symptoms or chlorosis.",
            "Balanced nutrition and optimal plant turgidity in the photographed specimen.",
            "Continue regular monitoring and crop maintenance protocols.",
            "Apply a preventive botanical spray of Neem seed kernel extract (3%) if minor insect activity is suspected.",
            "No chemical interventions or fungicide applications are required at this stage.",
            "Avoid prophylactic chemical sprays to preserve beneficial predatory insects in your ecosystem.",
            "For precise diagnostics, ensure close-up shots of leaf margins or affected stems under bright daylight."
          );
        }
      }

      // B. DOCUMENT FILE ANALYSIS
      if (file.category === 'doc') {
        if (fileNameLower.includes('soil') || fileNameLower.includes('report') || fileNameLower.includes('health') || fileNameLower.includes('npk')) {
          if (currentLang === 'te') {
            return formatResponse(
              "నేల ఆరోగ్య పరీక్ష రిపోర్టు ప్రకారం మట్టిలో పోషక లోపాలు ఉన్నాయి. pH విలువ 5.8 వద్ద ఆమ్ల గుణాన్ని సూచిస్తోంది.",
              "ఎరువుల అసమతుల్య వాడకం, సేంద్రీయ కర్బనం (0.42%) క్షీణించడం మరియు ఆమ్ల గుణాల వల్ల పోషకాలు కడిగివేయబడటం.",
              "నేల ఆమ్లత్వాన్ని తగ్గించి pH విలువను తటస్థ స్థాయికి (6.5) తీసుకురావడానికి వ్యవసాయ సున్నాన్ని కలపాలి.",
              "ఎకరాకు 10 బండ్ల పశువుల ఎరువు లేదా పచ్చిరొట్ట ఎరువులైన జీలుగ/జనుము నాటి పూతదశలో కలియదున్నండి.",
              "తక్కువగా ఉన్న నత్రజనిని భర్తీ చేయడానికి యూరియాను మూడు విడతలుగా చల్లండి. పొటాష్ స్థాయి సమృద్ధిగా ఉన్నందున ఎంపిఎఫ్ రికమండేషన్ ప్రకారం వాడకాన్ని తగ్గించండి.",
              "నేల చౌడుగా లేదా పొడిగా ఉన్నప్పుడు సున్నం వేయవద్దు. తగిన తేమ ఉన్నప్పుడే వేయాలి.",
              "ఆమ్లత్వ నేలల్లో వరి, వేరుశనగ మరియు బంగాళాదుంప పంటలు సమృద్ధిగా పండుతాయి."
            );
          } else {
            return formatResponse(
              "Soil test report reveals moderately acidic soil (pH 5.8) with low Nitrogen (N) and low Organic Carbon (0.42%).",
              "Excessive leaching of basic cations and continuous chemical-heavy cropping without organic manure replenishment.",
              "Apply liming materials to raise soil pH closer to the neutral 6.5 zone and improve nutrient availability.",
              "Sow green manure crops like Sunnhemp or Dhaincha and incorporate them into the soil at the 45-day flowering stage.",
              "Broadcast Urea (46% N) in three split doses (basal, tillering, and panicle initiation). Keep Phosphatic fertilizers at medium levels.",
              "Do not apply agricultural lime on completely dry soil; ensure optimum moisture content for active lime reaction.",
              "Acid-tolerant crops like Paddy, Potato, and Groundnuts will thrive well in this current soil environment."
            );
          }
        }

        if (fileNameLower.includes('fertilizer') || fileNameLower.includes('eruvu')) {
          if (currentLang === 'te') {
            return formatResponse(
              "ఎరువుల అసమతుల్య యాజమాన్యం వల్ల పిచికారీ ఖర్చులు పెరగడం మరియు పోషకాల నష్టం జరుగుతోంది.",
              "పంట పెరుగుదల దశల ఆధారంగా కాకుండా ఒకేసారి పెద్ద మొత్తంలో నైట్రోజన్ మరియు ఫాస్ఫరస్ వేయడం.",
              "పంట కీలక దశలలో (నారు, చిరుపొట్ట, గింజ కట్టే దశ) ఎరువులను విభజించి సమతుల్యంగా వేయండి.",
              "ఎరువుల సామర్థ్యాన్ని పెంచడానికి కెమికల్ ఎరువులతో పాటుగా జీవ ఎరువులైన అజోస్పైరిల్లం మరియు పిఎస్‌బి (PSB) వాడండి.",
              "నాటేటప్పుడు: ఎకరాకు 50 కిలోల DAP మరియు 30 కిలోల MOP. 25వ రోజు: ఎకరాకు 35 కిలోల యూరియా. 45వ రోజు: ఎకరాకు 35 కిలోల యూరియా మరియు 10 కిలోల జింక్ సల్ఫేట్.",
              "యూరియా ఎరువును మధ్యాహ్నం వేడి ఎండలో చల్లవద్దు. ఆకులపై నీటి తుంపర్లు లేనప్పుడే చల్లాలి.",
              "సముచిత ఫలితాల కోసం వేప కోటెడ్ యూరియా (Neem Coated Urea) ఎంచుకోండి, ఇది నత్రజని నిదానంగా విడుదలయ్యేలా చేస్తుంది."
            );
          } else {
            return formatResponse(
              "Improper fertilizer split timing causing high application costs and low nutrient use efficiency.",
              "Heavy single basal dosage of nitrogenous fertilizers, causing volatilization and leaching losses.",
              "Adopt a split application schedule aligning with the crop's physiological growth stages.",
              "Co-apply bio-fertilizers like Azotobacter and Phosphorus Solubilizing Bacteria (PSB) alongside compost.",
              "Basal Dose: Apply 50 kg DAP and 30 kg MOP per acre. Vegetative (25 Days): Top-dress 35 kg Urea per acre. Flowering (45 Days): Top-dress 35 kg Urea and 10 kg Zinc Sulfate per acre.",
              "Never broadcast granular Urea on standing water. Drain excess water before broadcasting and re-irrigate after 24 hours.",
              "Use Neem-coated Urea to reduce nitrogen losses and ensure slow-release availability to the rootzone."
            );
          }
        }

        // Default document
        if (currentLang === 'te') {
          return formatResponse(
            "అప్‌లోడ్ చేసిన డాక్యుమెంట్ విజయవంతంగా అందింది. దీని నుండి సమాచారాన్ని ఇండెక్స్ చేస్తున్నాను.",
            "వ్యవసాయ నివేదికలు, సలహాలు లేదా మార్గదర్శకాల పత్రం విశ్లేషించబడింది.",
            "ఈ పత్రంలోని నిర్దిష్ట అంశాలపై మీకు ఏదైనా ప్రశ్న ఉంటే చాట్‌లో నేరుగా టైప్ చేయండి లేదా అడగండి.",
            "పత్రంలో పేర్కొన్న ఏవైనా సేంద్రీయ మార్గదర్శకాలు ఉంటే వాటిని ఇక్కడ విశ్లేషిస్తాను.",
            "పత్రంలో సూచించిన రసాయన విలువల విశ్లేషణను ఇక్కడ తెలియజేస్తాను.",
            "పత్రంలోని మోతాదు పట్టికలను మీ స్థానిక వాతావరణ పరిస్థితులకు అనుగుణంగా సరిపోల్చుకోండి.",
            "మరింత ఖచ్చితమైన విశ్లేషణ కోసం మీ పంట రకం మరియు ప్రాంతాన్ని కూడా ఇక్కడ పేర్కొనండి."
          );
        } else {
          return formatResponse(
            "Document matrix received. The file contains agricultural details waiting for indexed semantic parsing.",
            "Uploading advisory documents, farming manuals, or localized crop schedules.",
            "Please query the assistant with specific questions regarding the contents of this document.",
            "Any organic advisory mentioned inside the document will be filtered and structured on-demand.",
            "Dosage recommendations inside the file can be calculated and customized according to your acreage.",
            "Cross-reference the document guidelines with local agricultural extension offices prior to heavy usage.",
            "Add details about your crop age and target yield so the assistant can give you the best advice."
          );
        }
      }

      // C. DATASET FILE ANALYSIS
      if (file.category === 'data') {
        if (currentLang === 'te') {
          return formatResponse(
            "అప్‌లోడ్ చేసిన పంట డేటాసెట్ పట్టికలో ప్రాంతీయ దిగుబడి క్షీణత మరియు విక్రయ ధరల హెచ్చుతగ్గులు కనిపిస్తున్నాయి.",
            "అసమతుల్య ఎరువుల వాడకం వల్ల దిగుబడి తగ్గడం మరియు మార్కెట్ ధరలలో కాలానుగుణ మార్పులు.",
            "తక్కువ దిగుబడి గల మండలాల్లో నేల పరీక్షలు జరిపించి అవసరమైన సూక్ష్మ పోషకాలను అందించాలి.",
            "నేల సారాన్ని పెంచడానికి జీవ ఎరువులు మరియు సేంద్రీయ కంపోస్ట్ వాడకాన్ని పెంచాలి.",
            "డేటా ఆధారంగా, రసాయన ఎరువులను నేల అవసరాలకు అనుగుణంగా సమతుల్యంగా వేయాలి.",
            "మార్కెట్ ధరలు తక్కువగా ఉన్నప్పుడు పంటను హడావుడిగా అమ్మవద్దు. నిల్వ సదుపాయం ఉపయోగించుకోండి.",
            "డేటా ప్రకారం వాణిజ్య పంటలైన పత్తి మరియు ఎండుమిర్చి ధరలలో సానుకూల ధోరణి (+5% నుండి +8%) కనిపిస్తోంది."
          );
        } else {
          return formatResponse(
            "Dataset upload shows regional crop yield variations and potential market price fluctuations.",
            "Nutrient deficiencies in low-yielding zones and high seasonal crop influxes in mandi yards.",
            "Address yield deficits by conducting micro-nutrient mapping across low-yield coordinates.",
            "Improve organic carbon scores using green manuring and compost in poor performance zones.",
            "Utilize NPK blends dynamically corresponding to soil deficit patterns identified in the dataset.",
            "Do not rush sell during glut periods. Grade and store your crop for premium bids.",
            "Data indicates grain prices are stable, while cash crops (Cotton, Chilli) show positive price trends (+5% to +8%)."
          );
        }
      }
    }

    // Check if the user is asking about the chatbot identity/capabilities explicitly
    const isIdentityQuery = lowerText.includes('who are you') || lowerText.includes('what can you do') || 
                            lowerText.includes('capabilities') || lowerText.includes('features') ||
                            lowerText.includes('నీవు ఎవరు') || lowerText.includes('ఏం చేయగలవు') ||
                            lowerText.includes('who is agrobuddy') || lowerText.includes('agrobuddy ante') ||
                            lowerText.includes('features list') || lowerText.includes('help me') ||
                            lowerText.trim() === 'help' || lowerText.trim() === 'సహాయం';

    if (isIdentityQuery) {
      if (currentLang === 'te') {
        if (isTransMode) {
          return `Nenu Mee AgroBuddy agricultural AI assistant ni. Nenu kindha cheppina panulalo help cheyagalanu:\n` +
                 `1. 🌾 **Panta Sifarsu (Crop suitability)**: Mee soil type, pH leda NPK input batti best crops recommend chesthanu.\n` +
                 `2. 🧪 **Eruvula timeline (Fertilizer calculator)**: Urea, DAP, leda Potash dosage calculation chesthanu.\n` +
                 `3. 🍂 **Aku Tegullu (Disease advisor)**: Leaf spots, blight, leda insect pests ki treatment remedies chepthanu.\n` +
                 `4. 🌦️ **Varshala information (Weather report)**: Live forecast mariyu spraying alerts isthanu.\n` +
                 `5. 📊 **Mandi dharalu (Market prices)**: Rice, cotton, chilli crops mandi prices chepthanu.`;
        } else {
          return `నమస్కారం! నేను మీ అగ్రోబడ్డీ వ్యవసాయ AI సహాయకుడిని. \n\n` +
                 `కింది విభాగాలపై నేను మీకు తక్షణ సలహాలు ఇవ్వగలను:\n` +
                 `1. 🌾 **పంటల సిఫార్సు**: మీ నేల రకం, pH మరియు NPK విలువల ఆధారంగా ఏ పంట వేయాలో తెలుసుకోండి.\n` +
                 `2. 🧪 **ఎరువుల సలహాలు**: పంటకు అవసరమైన యూరియా, DAP లేదా పొటాష్ మోతాదులను లెక్కించండి.\n` +
                 `3. 🍂 **తెగుళ్ళ నివారణ**: పంటల ఆకు తెగుళ్లు మరియు వాటి సహజ/రసాయన చికిత్సల వివరాలు పొందండి.\n` +
                 `4. 🌦️ **వాతావరణ సమాచారం**: రాబోయే వర్షపాత సూచన మరియు పంట స్ప్రేయింగ్ సలహాలు తెలుసుకోండి.\n` +
                 `5. 📊 **మార్కెట్ ధరలు**: వరి, పత్తి, ఎండుమిర్చి వంటి పంటల తాజా మండి ధరలను పర్యవేక్షించండి.`;
        }
      } else {
        return `I am AgroBuddy, your friendly virtual agricultural advisor. I can assist you with the following:\n` +
               `1. 🌾 **Crop Suitability**: Suggest ideal crops matching your soil, pH, and season.\n` +
               `2. 🧪 **Fertilizer Calculator**: Calculate recommended DAP, Urea, and MOP dosages based on crop type and soil deficits.\n` +
               `3. 🍂 **Disease Diagnostic Lab**: Identify causes, symptoms, and organic/chemical remedies for leaf spots and pests.\n` +
               `4. 🌦️ **Agricultural Weather**: Provide live forecast summaries and crop protection alerts from Open-Meteo.\n` +
               `5. 📊 **Market Price Watch**: Check real-time Mandi price tickers, price trends, and selling advisories.`;
      }
    }

    // MULTI-STEP UNDERSTANDING PIPELINE: INTENT DETECTION
    const intent = detectIntent(text);

    // Weather advisory intent
    if (intent === 'weather_advisory') {
      const commonLocations = [
        { en: "Hyderabad", te: "హైదరాబాద్", lat: 17.3850, lon: 78.4867 },
        { en: "Warangal", te: "వరంగల్", lat: 17.9784, lon: 79.5941 },
        { en: "Vijayawada", te: "విజయవాడ", lat: 16.5062, lon: 80.6480 },
        { en: "Guntur", te: "గుంటూరు", lat: 16.3067, lon: 80.4365 },
        { en: "Nellore", te: "నెల్లూరు", lat: 14.4426, lon: 79.9865 },
        { en: "Kurnool", te: "కర్నూలు", lat: 15.8281, lon: 78.0373 },
        { en: "Nizamabad", te: "నిజామాబాద్", lat: 18.6725, lon: 78.0941 },
        { en: "Khammam", te: "ఖమ్మం", lat: 17.2473, lon: 80.1514 },
        { en: "Suryapet", te: "సూర్యాపేట", lat: 17.1353, lon: 79.6238 },
        { en: "Adilabad", te: "ఆదిలాబాద్", lat: 19.6641, lon: 78.5320 },
        { en: "Visakhapatnam", te: "విశాఖపట్నం", lat: 17.6868, lon: 83.2185 },
        { en: "Tirupati", te: "తిరుపతి", lat: 13.6288, lon: 79.4192 }
      ];

      let selectedLoc = null;
      for (const loc of commonLocations) {
        if (lowerText.includes(loc.en.toLowerCase()) || lowerText.includes(loc.te)) {
          selectedLoc = loc;
          break;
        }
      }

      const inMatch = text.match(/(?:in|at|near|location|city|town|village|లో|దగ్గర)\s+([a-zA-Z\u0C00-\u0C7F\s]+)/i);
      let searchQuery = inMatch ? inMatch[1].trim() : "";
      
      let lat = 17.3850, lon = 78.4867, displayName = currentLang === 'te' ? "హైదరాబాద్, తెలంగాణ" : "Hyderabad, Telangana, India";

      if (selectedLoc) {
        lat = selectedLoc.lat;
        lon = selectedLoc.lon;
        displayName = currentLang === 'te' ? selectedLoc.te : `${selectedLoc.en}, India`;
      } else if (searchQuery && searchQuery.length > 2) {
        try {
          const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchQuery)}&format=json&limit=1`;
          const geoResponse = await fetch(geocodeUrl);
          if (geoResponse.ok) {
            const geoData = await geoResponse.json();
            if (geoData && geoData.length > 0) {
              lat = geoData[0].lat;
              lon = geoData[0].lon;
              displayName = geoData[0].display_name.split(',').slice(0, 3).join(',');
            }
          }
        } catch (err) {
          console.error("Geocoding failed inside chatbot:", err);
        }
      }

      try {
        const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,weather_code&timezone=auto`;
        const weatherResponse = await fetch(weatherUrl);
        if (weatherResponse.ok) {
          const data = await weatherResponse.json();
          const temp = data.current.temperature_2m;
          const humidity = data.current.relative_humidity_2m;
          const windSpeed = data.current.wind_speed_10m;
          const rainSum = data.daily ? data.daily.precipitation_sum[0] + data.daily.precipitation_sum[1] : 0;

          if (isTransMode) {
            return formatResponse(
              `Weather details for ${displayName}: Temperature ${temp}°C, Humidity ${humidity}%, Wind Speed ${windSpeed} km/h, Rain ${rainSum > 0 ? `${rainSum} mm` : 'No rain forecast'}.`,
              "Seasonal climate patterns.",
              temp > 35 ? "Water crops early morning or evening." : "Maintain normal crop irrigation schedule.",
              "Apply mulching to conserve moisture in high temperatures.",
              windSpeed > 15 ? "Delay any chemical sprays due to high wind speed." : rainSum > 10 ? "Delay any fertilizer broadcasting as heavy rain is expected." : "Wind and rain levels are suitable for foliar sprays if needed.",
              "Avoid chemical applications during midday heat.",
              "Keep monitoring localized weather changes."
            );
          } else if (currentLang === 'te') {
            return formatResponse(
              `వాతావరణ సూచన - ${displayName}: ఉష్ణోగ్రత ${temp}°C, తేమ ${humidity}%, గాలి వేగం ${windSpeed} కి.మీ/గం, వర్షపాతం ${rainSum > 0 ? `${rainSum} మి.మీ` : 'లేదు'}.`,
              "ప్రస్తుత కాలానుగుణ శీతోష్ణస్థితి పరిస్థితులు.",
              temp > 35 ? "ఎండ తీవ్రత ఎక్కువగా ఉన్నందున ఉదయం లేదా సాయంత్రం మాత్రమే నీటి తడులు ఇవ్వండి." : "సాధారణ పద్ధతిలో నీటి తడులు అందించండి.",
              "నేలలో తేమను నిలిపి ఉంచడానికి ఆకులు లేదా గడ్డితో మల్చింగ్ చేయండి.",
              windSpeed > 15 ? "గాలి వేగం ఎక్కువగా ఉన్నందున పిచికారీని వాయిదా వేయండి." : rainSum > 10 ? "భారీ వర్ష సూచన ఉన్నందున ఎరువులు చల్లడం వాయిదా వేయండి." : "వాతావరణం అనుకూలంగా ఉన్నందున రసాయన/ద్రవ పోషక పిచికారీలు చేపట్టవచ్చు.",
              "మధ్యాహ్నపు వేడి ఎండలో పిచికారీ చేయడం ఆపండి.",
              "నియమిత కాలంలో స్థానిక వాతావరణ మార్పులను గమనిస్తూ ఉండండి."
            );
          } else {
            return formatResponse(
              `Weather conditions at ${displayName}: Temperature ${temp}°C, Humidity ${humidity}%, Wind Speed ${windSpeed} km/h, expected Rain ${rainSum > 0 ? `${rainSum} mm` : 'None'}.`,
              "Active atmospheric fluctuations and seasonal patterns.",
              temp > 35 ? "High temperature warning. Irrigate crops in early mornings or evenings." : "Maintain standard crop irrigation rotations.",
              "Apply organic mulch layer over beds to reduce soil moisture evaporation.",
              windSpeed > 15 ? "Do not perform foliar spraying. High wind speed will cause chemical drift." : rainSum > 10 ? "Postpone broadcasting granular urea/DAP. Heavy rain will cause nutrient run-off." : "Wind and rain thresholds are optimal for foliar micro-nutrient or pesticide sprays.",
              "Never spray chemicals in high heat or directly before rain.",
              "Drain excess water from low-lying fields if heavy rain occurs."
            );
          }
        }
      } catch (err) {
        console.error(err);
      }
    }

    // Crop Suitability / Crop Recommendation intent
    if (intent === 'crop_recommendation') {
      const ph = phMatch ? parseFloat(phMatch[1]) : 6.5;
      const n = nMatch ? parseInt(nMatch[1]) : 80;
      const p = pMatch ? parseInt(pMatch[1]) : 45;
      const k = kMatch ? parseInt(kMatch[1]) : 45;

      let soilType = 'loamy';
      if (/black|నల్ల/i.test(text)) soilType = 'black';
      else if (/red|ఎర్ర/i.test(text)) soilType = 'red';
      else if (/clayey|బంకమట్టి/i.test(text)) soilType = 'clayey';
      else if (/sandy|ఇసుక/i.test(text)) soilType = 'sandy';
      else if (/alluvial|ఒండ్రు/i.test(text)) soilType = 'alluvial';

      let season = 'kharif';
      if (/rabi|winter|చలికాలం|రబీ/i.test(text)) season = 'rabi';
      else if (/summer|zaid|വേസവി|సమ్మర్/i.test(text)) season = 'summer';

      const results = recommendCrop(soilType, ph, n, p, k, season, currentLang);
      await new Promise(resolve => setTimeout(resolve, 800));

      let cropsList = results.slice(0, 3).map((r, idx) => `• **${r.name}** (Suitability: **${r.score}%**, Yield: ${r.expectedYield})`).join('\n');
      let cropsListTe = results.slice(0, 3).map((r, idx) => `• **${r.name}** (అనుకూలత: **${r.score}%**, ఆశించే దిగుబడి: ${r.expectedYield})\n  - *వివరణ*: ${r.description}`).join('\n');

      if (isTransMode) {
        return formatResponse(
          `Selecting suitable crops for soil parameters (pH: ${ph}, N: ${n}, P: ${p}, K: ${k}) in ${season} season.`,
          "Soil nutrient variations and seasonal temperature constraints.",
          `Grow these top recommended crops on your farm:\n${cropsList}`,
          "Add 5-10 tons of organic farmyard manure per acre to improve soil structure.",
          "Use balanced basal fertilizer based on target crop requirements before sowing.",
          "Avoid planting crops out of season. Ensure good drainage to prevent seed rot.",
          "Test your soil parameters regularly for accurate cropping decisions."
        );
      } else if (currentLang === 'te') {
        return formatResponse(
          `నేల రసాయన విలువల (pH: ${ph}, N: ${n}, P: ${p}, K: ${k}) మరియు ${season === 'kharif' ? 'ఖరీఫ్' : season === 'rabi' ? 'రబీ' : 'వేసవి'} సీజన్ కు తగిన పంటల ఎంపిక.`,
          "నేలలోని వివిధ పోషకాల వ్యత్యాసాలు మరియు కాలానుగుణ వాతావరణ మార్పులు.",
          `మీ భూమికి అత్యంత అనుకూలమైన కింది పంటలను సాగు చేయండి:\n${cropsListTe}`,
          "నత్రజని మరియు సూక్ష్మ పోషకాలను పెంచడానికి పచ్చిరొట్ట ఎరువులు లేదా పశువుల ఎరువును భూమిలో కలియదున్నండి.",
          "పంటల నాటే సమయంలో సమతుల్య NPK ఎరువులను బేసల్ డోస్‌గా అందించండి.",
          "నిర్దేశిత సమయం దాటిన తర్వాత విత్తవద్దు. వర్షపు నీరు నిలవకుండా చూసుకోండి.",
          "నియమిత కాలంలో నేల పరీక్షలు జరిపించి పంట మార్పిడి పద్ధతిని పాటించండి."
        );
      } else {
        return formatResponse(
          `Optimizing crop selection for soil parameters (pH: ${ph}, N: ${n}, P: ${p}, K: ${k}) in ${season.toUpperCase()} season.`,
          "Varying NPK concentrations in the soil root zone and local climate conditions.",
          `Sow these recommended crops for best economic and yield results:\n${cropsList}`,
          "Incorporate compost or vermicompost during final land preparation to improve water retention.",
          "Correct NPK deficits before sowing. Apply base fertilizer dosage suitable for the chosen crop.",
          "Do not plant water-sensitive crops in clayey soils without adequate drainage systems.",
          "Ask the assistant for a specific fertilizer dosing schedule once you select your crop."
        );
      }
    }

    // Fertilizer Guidance intent
    if (intent === 'fertilizer_guidance') {
      let matchedCrop = null;
      for (const crop of cropRules) {
        const nameEn = crop.nameEn.toLowerCase();
        const nameTe = crop.nameTe;
        const id = crop.id;
        if (lowerText.includes(nameEn) || lowerText.includes(id) || (nameTe && lowerText.includes(nameTe)) || (id === 'rice' && lowerText.includes('paddy'))) {
          matchedCrop = crop;
          break;
        }
      }

      const nVal = nMatch ? parseInt(nMatch[1]) : 40;
      const pVal = pMatch ? parseInt(pMatch[1]) : 25;
      const kVal = kMatch ? parseInt(kMatch[1]) : 25;
      let soilType = 'loamy';
      if (/black|నల్ల/i.test(text)) soilType = 'black';
      else if (/red|ఎర్ర/i.test(text)) soilType = 'red';
      else if (/clayey|బంకమట్టి/i.test(text)) soilType = 'clayey';
      else if (/sandy|ఇసుక/i.test(text)) soilType = 'sandy';

      const cropName = matchedCrop ? matchedCrop.id : "rice";
      const result = recommendFertilizer(cropName, soilType, nVal, pVal, kVal, currentLang);
      await new Promise(resolve => setTimeout(resolve, 800));

      if (isTransMode) {
        return formatResponse(
          `Nutrient planning for ${result.cropName} under soil parameters (N: ${nVal}, P: ${pVal}, K: ${kVal}).`,
          "Nutrient depletion from previous harvest cycle.",
          `Apply recommended fertilizer: **${result.recommendedFertilizer}** at **${result.dosage}** dosage.`,
          "Apply 5-8 tons of compost along with bio-fertilizers like Azotobacter or PSB.",
          `Method: ${result.method}. Timing: ${result.timing}.`,
          "Do not apply Urea on dry soil. Broadcast only when there is moderate moisture.",
          `Use neem-coated urea to prevent nitrogen loss. Deficits are N: -${result.analysis.n.deficit}, P: -${result.analysis.p.deficit}, K: -${result.analysis.k.deficit}.`
        );
      } else if (currentLang === 'te') {
        return formatResponse(
          `${result.cropName} పంట సాగులో మట్టి విశ్లేషణ (N: ${nVal}, P: ${pVal}, K: ${kVal}) ప్రకారం పోషకాల కొరత.`,
          "గత సాగు చక్రం వల్ల కలిగిన పోషకాల క్షీణత మరియు సేంద్రీయ కర్బనం లేకపోవడం.",
          `సిఫార్సు చేసిన ఎరువులు: **${result.recommendedFertilizer}** మోతాదు: **${result.dosage}** వద్ద వేయండి.`,
          "పశువుల ఎరువుతో పాటు అజోస్పైరిల్లం మరియు PSB జీవ ఎరువులను విత్తన శుద్ధిగా లేదా నేలలో కలపండి.",
          `వేసే పద్ధతి: ${result.method}. సమయం: ${result.timing}.`,
          `${result.safetyNotes}`,
          `నత్రజని నష్టాలను తగ్గించడానికి వేప పూత పూసిన యూరియా ఉపయోగించండి. నేలలో లోపాలు N: ${result.analysis.n.deficit} mg/kg, P: ${result.analysis.p.deficit} mg/kg, K: ${result.analysis.k.deficit} mg/kg గా ఉన్నాయి.`
        );
      } else {
        return formatResponse(
          `Nutrient deficiency matching target yield for ${result.cropName} with current soil levels (N: ${nVal}, P: ${pVal}, K: ${kVal}).`,
          "Heavy crop uptake in prior seasons and insufficient organic matter replenishment.",
          `Broadcast/apply: **${result.recommendedFertilizer}** at **${result.dosage}**.`,
          "Incorporate organic compost and bio-fertilizers like Azotobacter or Phosphobacteria.",
          `Method: ${result.method}. Timing: ${result.timing}.`,
          `${result.safetyNotes}`,
          `NPK Balances are N: -${result.analysis.n.deficit} mg/kg, P: -${result.analysis.p.deficit} mg/kg, K: -${result.analysis.k.deficit} mg/kg. Avoid over-application.`
        );
      }
    }

    // Pest Management intent
    if (intent === 'pest_management') {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (lowerText.includes('tomato') || lowerText.includes('tomato ki') || lowerText.includes('tomatoki') || lowerText.includes('టమోటా')) {
        if (currentLang === 'te') {
          return formatResponse(
            "టమోటా ఆకులకు లేదా కాయలకు ఆశించిన కాయ తొలిచే పురుగు (Tomato Fruit Borer).",
            "లార్వాలు పూమొగ్గలను మరియు కాయలను లోపలి నుండి తిని నాశనం చేయడం.",
            "పురుగు ఆశించిన రెమ్మలను మరియు దెబ్బతిన్న కాయలను ఏరివేసి నాశనం చేయండి. ఎకరాకు 5 లింగాకర్షక బుట్టలను అమర్చండి.",
            "వేప గింజల కషాయం (NSKE 5%) లేదా వేప నూనె పిచికారీ చేయండి.",
            "ఎకరాకు ఎమామెక్టిన్ బెంజోయేట్ 5% SG (80 గ్రా) లేదా క్లోరాంట్రానిలిప్రోల్ (Coragen - 60 మి.లీ) పిచికారీ చేయండి.",
            "కోతకు 10 రోజులు ముందు పిచికారీ చేయవద్దు. రక్షణ మాస్క్ ధరించండి.",
            "పొలం గట్ల వెంబడి బంతి మొక్కలను తల్లి పురుగుల నివారణకు నాటండి."
          );
        } else {
          return formatResponse(
            "Pest infestation observed on Tomato crop (Fruit Borer).",
            "Larvae hatching from moth eggs and boring into fruits and shoots.",
            "Inspect fruits and remove damaged portions. Install 5 pheromone traps per acre.",
            "Use neem-based sprays like NSKE 5% or 1% Neem Oil.",
            "Apply Emamectin Box (Emamectin Benzoate 5% SG) or Chlorantraniliprole (Coragen - 60ml/acre).",
            "Observe withholding period of 10 days before harvest. Wear safety goggles.",
            "Grow marigold around borders as trap crop for moths."
          );
        }
      } else if (lowerText.includes('rice') || lowerText.includes('paddy') || lowerText.includes('వరి')) {
        if (currentLang === 'te') {
          return formatResponse(
            "వరి పంటకు ఆశించిన కాండం తొలిచే పురుగు (Stem Borer) లేదా ఆకు ముడుత పురుగు.",
            "లార్వాలు కాండం లోపలి భాగాన్ని తిని తెల్లకంకి లేదా ఆకులను ముడతగా మార్చడం.",
            "తెల్ల కంకులను పొలం నుండి ఏరి నాశనం చేయండి.",
            "ట్రైకోగ్రామా గుడ్డు పరాన్నజీవులను పొలంలో విడుదల చేయండి.",
            "ఎకరాకు కార్టాప్ హైడ్రోక్లోరైడ్ 4G లేదా క్లోరాంట్రానిలిప్రోల్ పిచికారీ చేయండి.",
            "పిచికారీ చేసేటప్పుడు పొలంలో నీటిని తీసివేసి నిలపాలి.",
            "నత్రజని ఎరువులను అధికంగా వాడటం తగ్గించండి."
          );
        } else {
          return formatResponse(
            "Stem Borer or Leaf Folder infestation observed in Rice/Paddy fields.",
            "Larval stages feeding on inner stem tissues (causing whiteheads) or folding leaves.",
            "Collect and destroy affected whiteheads/infestation signs manually.",
            "Release Trichogramma parasitoids at weekly intervals.",
            "Apply Chlorantraniliprole (Coragen) at 60ml per acre.",
            "Drain excess standing water before chemical broadcasting/spraying.",
            "Avoid excessive Nitrogen applications that make foliage tender and attractive to pests."
          );
        }
      } else {
        if (currentLang === 'te') {
          return formatResponse(
            "పంటకు ఆశించిన కాయ తొలిచే పురుగు లేదా నల్లి తెగులు.",
            "వాతావరణ తేమ మరియు లార్వాల తీవ్రత పెరగడం.",
            "పొలాన్ని నిశితంగా పరిశీలించి ఆశించిన భాగాలను నాశనం చేయండి. లింగాకర్షక బుట్టలు పెట్టండి.",
            "వేప గింజల కషాయం (NSKE 5%) లేదా 3% వేపనూనె పిచికారీ చేయండి.",
            "నల్లి తీవ్రతకు ప్రొఫెనోఫాస్ 50% EC చల్లండి.",
            "キーటకనాశకాలు వాడేటప్పుడు రక్షణ పరికరాలు ధరించండి.",
            "మరింత ఖచ్చితమైన విశ్లేషణ కోసం మీ పంట ఆకుల ఫోటోలను అప్‌లోడ్ చేయండి."
          );
        } else {
          return formatResponse(
            "Insect pest activity detected on the crop foliage/stems.",
            "Favorable humidity triggers larval egg-hatching cycles.",
            "Collect and safely dispose of infested plant debris. Install pheromone traps.",
            "Spray preventive NSKE 5% or biological Neem formulations.",
            "Spray Profenofos 50% EC or target pesticide depending on pest class.",
            "Always follow label safety guidelines. Keep kids away from spraying zone.",
            "Upload leaf/stem images for exact identification."
          );
        }
      }
    }

    // Disease Diagnosis intent
    if (intent === 'disease_diagnosis') {
      let matchedKey = null;
      if (lowerText.includes('blight') || lowerText.includes('tomato') || lowerText.includes('టమోటా') || lowerText.includes('ఆకు మచ్చ')) {
        matchedKey = 'blight';
      } else if (lowerText.includes('blast') || lowerText.includes('rice') || lowerText.includes('paddy') || lowerText.includes('వరి') || lowerText.includes('అగ్గి')) {
        matchedKey = 'blast';
      } else if (lowerText.includes('rust') || lowerText.includes('wheat') || lowerText.includes('గోధుమ') || lowerText.includes('కుంకుమ')) {
        matchedKey = 'rust';
      } else if (lowerText.includes('cotton') || lowerText.includes('healthy') || lowerText.includes('పత్తి')) {
        matchedKey = 'healthy';
      }

      await new Promise(resolve => setTimeout(resolve, 800));

      if (matchedKey && diseaseDB[matchedKey]) {
        const d = diseaseDB[matchedKey];
        if (currentLang === 'te') {
          return formatResponse(
            `గుర్తించిన వ్యాధి/తెగులు: **${d.name}**. లక్షణాలు: ${d.symptoms}`,
            `${d.causes}`,
            "రోగం సోకిన ఆకులను కత్తిరించి నాశనం చేయండి, సరైన నిష్పత్తిలో నీటి తడులు ఇవ్వండి.",
            `${d.organic}`,
            `${d.chemical}`,
            "రసాయన పురుగుమందులు పిచికారీ చేసేటప్పుడు రక్షణ దుస్తులు ధరించండి. కోతకు 10 రోజులు ముందు నిలిపివేయండి.",
            `${d.prevention}`
          );
        } else {
          return formatResponse(
            `Diagnosed Subject: **${d.name}**. Symptoms: ${d.symptoms}`,
            `${d.causes}`,
            "Prune and safely destroy infested foliage. Ensure field sanitation.",
            `${d.organic}`,
            `${d.chemical}`,
            "Wear protective gear during spraying. Respect target safety withholding periods.",
            `${d.prevention}`
          );
        }
      } else {
        if (currentLang === 'te') {
          return formatResponse(
            "సాధారణ ఆకు తెగులు, రంగు మారడం లేదా మచ్చలు ఏర్పడడం.",
            "శిలీంధ్ర తెగుళ్లు, నత్రజని లోపం లేదా మొజాయిక్ వైరస్ వ్యాప్తి.",
            "సమస్య గుర్తింపు కోసం దయచేసి నిర్దిష్ట పంట పేరును (ఉదా. వరి అగ్గి తెగులు, టమోటా తెగులు) చెప్పండి.",
            "సాధారణ సంరక్షణగా 3% వేపనూనె లేదా లీటరు నీటికి 5 మి.లీ వేప నూనెను ఆకులపై చల్లవచ్చు.",
            "శిలీంధ్రాలు కనిపిస్తే మ్యాంకోజెబ్ (2.5 గ్రా/లీ) లేదా ట్రైసైక్లాజోల్ పిచికారీ చేయవచ్చు.",
            "అనవసరంగా రసాయనాలు వాడకండి. మిత్ర పురుగుల సంరక్షణకు ప్రాధాన్యత ఇవ్వండి.",
            "ఆరోగ్యకరమైన మరియు దెబ్బతిన్న భాగాల ఫోటోలను అప్‌లోడ్ చేస్తే మరింత ఖచ్చితంగా విశ్లేషించగలను."
          );
        } else {
          return formatResponse(
            "General crop leaf chlorosis, spotting, or insect infestation symptoms.",
            "Fungal pathogens, Nitrogen starvation, or Mosaic virus transmission by whiteflies.",
            "Specify your target crop (e.g., Rice Blast, Wheat Rust) to receive specific diagnostics.",
            "Apply a preventive spray of Neem Seed Kernel Extract (NSKE 5%) or 1% Neem Oil.",
            "Apply broad-spectrum Mancozeb or Tricyclazole if fungal spots are confirmed.",
            "Avoid chemical overdosing. Always use clean, filtered water for spray solutions.",
            "Upload clear close-up images of leaf margins for accurate computer vision identification."
          );
        }
      }
    }

    // Market Prices intent
    if (intent === 'market_prices') {
      let cropSearch = "";
      if (lowerText.includes('rice') || lowerText.includes('paddy') || lowerText.includes('వరి')) cropSearch = "paddy";
      else if (lowerText.includes('wheat') || lowerText.includes('గోధుమ')) cropSearch = "wheat";
      else if (lowerText.includes('cotton') || lowerText.includes('పత్తి')) cropSearch = "cotton";
      else if (lowerText.includes('chilli') || lowerText.includes('మిర్చి') || lowerText.includes('మిरప')) cropSearch = "chilli";
      else if (lowerText.includes('maize') || lowerText.includes('మొక్కజొన్న')) cropSearch = "maize";
      else if (lowerText.includes('onion') || lowerText.includes('ఉల్లి')) cropSearch = "onion";
      else if (lowerText.includes('tomato') || lowerText.includes('టమోటా')) cropSearch = "tomato";
      else if (lowerText.includes('potato') || lowerText.includes('ఆలు')) cropSearch = "potato";

      const matchedMarketData = rawMarketData.filter(item => {
        const cropLower = item.crop.toLowerCase();
        return cropLower.includes(cropSearch);
      });

      await new Promise(resolve => setTimeout(resolve, 800));

      let priceReport = "";
      let priceReportTe = "";
      
      const targetData = matchedMarketData.length > 0 ? matchedMarketData : rawMarketData.slice(0, 5);

      targetData.forEach(item => {
        priceReport += `• **${item.crop}** at *${item.market}*: **${item.price}** (${item.trend === 'up' ? '📈 Rising' : '➖ Stable'})\n`;
        priceReportTe += `• **${item.crop}** - *${item.market}*: **${item.price}** (${item.trend === 'up' ? '📈 పెరుగుతోంది' : '➖ స్థిరంగా ఉంది'})\n`;
      });

      if (currentLang === 'te') {
        return formatResponse(
          "మార్కెట్ మండి ధరల విశ్లేషణ.",
          "వివిధ మార్కెట్లకు సరుకు రాక మరియు కాలానుగుణ డిమాండ్.",
          `తాజా మండి ధరల వివరాలు (క్వింటాల్‌కు):\n${priceReportTe}`,
          "మార్కెట్ విలువను పెంచడానికి పంటను బాగా ఆరబెట్టి, గ్రేడింగ్ చేయండి.",
          "ధరలు స్థిరంగా ఉన్నప్పుడు విడతల వారీగా అమ్ముకోండి, తక్కువగా ఉంటే కొంతకాలం నిల్వ ఉంచండి.",
          "తేమ ఎక్కువగా ఉన్న పత్తి లేదా ధాన్యాన్ని అమ్మవద్దు, తక్కువ ధర పలుకుతుంది.",
          "రవాణా ఖర్చులను తగ్గించుకోవడానికి దగ్గరి మండిని ఎంచుకోండి."
        );
      } else {
        return formatResponse(
          "Commodity Mandi Price Analysis and Trends.",
          "Varying market supply inflows and regional consumer demand fluctuations.",
          `Current Mandi Price list (per Quintal):\n${priceReport}`,
          "Grade and dry your produce properly post-harvest to secure a 10-15% premium bid.",
          "Sell in calculated split intervals. Avoid panic selling if mandi arrivals spike.",
          "Do not supply wet crops as traders will heavily dock purchase prices.",
          "Check logistical and transport costs before deciding on the mandi location."
        );
      }
    }

    // Soil Health intent
    if (intent === 'soil_health') {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (currentLang === 'te') {
        return formatResponse(
          "మట్టి ఆరోగ్యం మరియు పోషకాల విశ్లేషణ.",
          "నిరంతర సాగు మరియు రసాయన ఎరువుల అతి వాడకం వల్ల సేంద్రీయ కర్బనం క్షీణించడం.",
          "ఎకరాకు 10 బండ్ల పశువుల ఎరువు లేదా వర్మీ కంపోస్ట్ వేయండి. pH విలువను బట్టి సున్నం లేదా జిప్సం వాడండి.",
          "జీలుగ లేదా జనుము వంటి పచ్చిరొట్ట పంటలను నాటి పూతదశలో నేలలో కలియదున్నండి.",
          "ఆమ్ల నేలలకు సున్నం, క్షార నేలలకు జిప్సం చల్లండి.",
          "మట్టి చౌడుగా లేదా తడి లేకుండా ఉన్నప్పుడు సున్నం చల్లవద్దు.",
          "రెండు సంవత్సరాలకు ఒకసారి తప్పనిసరిగా నేల పరీక్షలు జరిపించండి."
        );
      } else {
        return formatResponse(
          "Evaluating soil nutrient profiles and moisture retention capacities.",
          "Intensive cropping cycles depleting macro-nutrients and decreasing soil organic carbon.",
          "Apply compost and biological matter to rebuild topsoil biology.",
          "Incorporate 5-8 tons of organic compost or plant green manure crops like Sunnhemp.",
          "Balance pH deviations. Apply agricultural lime for acidic soils or gypsum for alkaline soils.",
          "Do not broadcast granular fertilizer on dry soils; soil moisture is required for chemical dissolution.",
          "Conduct a standardized laboratory soil health card test every 2 years."
        );
      }
    }

    // Profit Estimation intent
    if (intent === 'profit_estimation') {
      await new Promise(resolve => setTimeout(resolve, 800));
      if (currentLang === 'te') {
        return formatResponse(
          "వ్యవసాయ సాగు ఖర్చులు మరియు లాభాల అంచనా.",
          "పెరుగుతున్న విత్తనాలు, శ్రమ మరియు ఎరువుల ఖర్చులు vs మార్కెట్ ధరల హెచ్చుతగ్గులు.",
          "సగటు పెట్టుబడి ఎకరాకు ₹25,000 - ₹35,000 కావచ్చు. దిగుబడిని బట్టి లాభాలు మారుతాయి.",
          "జీవామృతం లేదా పశువుల ఎరువును సొంతంగా తయారుచేసి సాగు ఖర్చును 20% తగ్గించండి.",
          "ప్రభుత్వ విత్తన సబ్సిడీ మరియు ఉచిత విద్యుత్ వంటి పథకాలను సద్వినియోగం చేసుకోండి.",
          "అధిక వడ్డీలకు రుణాలు తీసుకోకండి. ప్రధానమంత్రి ఫసల్ బీమా యోజన కింద పంట బీమా చేసుకోండి.",
          "మంచి లాభాల కోసం మార్కెట్ గిరాకీని బట్టి వాణిజ్య లేదా అంతర పంటలను సాగు చేయండి."
        );
      } else {
        return formatResponse(
          "Estimating production expenses vs net profit margins.",
          "Rising inputs costs (labor, seeds, chemical fertilizers) combined with volatile wholesale mandi bids.",
          "Average cost of cultivation ranges from ₹25,000 to ₹35,000 per acre. Yield offsets decide net profits.",
          "Formulate organic bio-pesticides on-farm to shave off commercial cost margins by up to 20%.",
          "Acquire government subsidized seeds, solar pumps, and micro-irrigation schemes.",
          "Avoid private money lenders. Insure your fields under PMFBY to guard against drought or flood.",
          "Practice crop diversification or multi-cropping to secure secondary revenue streams."
        );
      }
    }

    // General Fallback
    if (currentLang === 'te') {
      return formatResponse(
        "పంట పేరు లేదా సమస్య వివరాలు స్పష్టంగా లేవు.",
        "అడిగిన ప్రశ్నలో తగినంత వ్యవసాయ సమాచారం నమోదు కాలేదు.",
        "దయచేసి మీ పంట పేరు, ఆకుల లక్షణాలు లేదా నేల రసాయన పరీక్షల వివరాలను చెప్పండి.",
        "సాధారణ నివారణ చర్యగా లీటరు నీటికి 5 మి.లీ వేప నూనెను ఆకులపై పిచికారీ చేయవచ్చు.",
        "సమస్య స్పష్టంగా తెలిసిన తర్వాతే రసాయన పురుగుమందులు వాడాలి.",
        "అనవసరంగా రసాయనాలను మితిమీరి వాడవద్దు, మిత్ర పురుగులకు హాని కలుగుతుంది.",
        "సత్వర నిర్ధారణ కొరకు '+' బటన్ క్లిక్ చేసి తెగులు సోకిన ఆకు ఫోటోను లేదా మట్టి రిపోర్టును అప్‌లోడ్ చేయండి."
      );
    } else {
      return formatResponse(
        "General agricultural query or missing input parameters.",
        "Input query does not specify the target crop, soil measurements, or specific diagnostic signs.",
        "Please specify your crop and question (e.g. fertilizer dosage, pest issues, weather advisory, or market prices).",
        "Consider applying botanical solutions like Neem-based sprays for general leaf health protection.",
        "Avoid chemical application unless a specific pest or disease is identified.",
        "Do not broadcast synthetic fertilizers without ensuring baseline soil moisture.",
        "Upload soil reports or leaf images using the '+' button next to the input for instant advisory analysis."
      );
    }
  };

  // Cleanup voice synthesis and recognition on unmount
  useEffect(() => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
      const handleVoicesChanged = () => {
        window.speechSynthesis.getVoices();
      };
      window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);
      
      return () => {
        window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
        window.speechSynthesis.cancel();
        if (recognitionRef.current) {
          recognitionRef.current.abort();
        }
      };
    }
  }, []);

  const applyVocabularyCorrections = (text) => {
    let corrected = text;
    const correctionMap = {
      "tomato key purugu": "tomato ki purugu",
      "tomato ki puruvu": "tomato ki purugu",
      "tomato key puruvu": "tomato ki purugu",
      "tomato purugu": "tomato ki purugu",
      "tomato ki puri": "tomato ki purugu",
      "paddy key": "paddy ki",
      "paddy ki eruvu": "paddy ki eruvulu",
      "yuria": "urea",
      "yuriya": "urea",
      "dep": "DAP",
      "tab": "DAP",
      "coragen": "Coragen",
      "mancozeb": "Mancozeb",
      "warsham": "varsham",
      "barsham": "varsham",
      "eruvulu": "eruvu",
      "panta": "panta",
      "purugu pattindi": "purugu pattindi em cheyali"
    };

    // Case-insensitive replacements
    Object.keys(correctionMap).forEach(key => {
      const regex = new RegExp(`\\b${key}\\b`, 'gi');
      corrected = corrected.replace(regex, correctionMap[key]);
    });

    return corrected;
  };

  // Speech-to-Text: Start Speech Recognition
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setVoiceError(language === 'te' ? 'మీ బ్రౌజర్ వాయిస్ రికగ్నిషన్‌ను సపోర్ట్ చేయదు. గూగుల్ క్రోమ్ ఉపయోగించండి.' : 'Speech Recognition is not supported in this browser. Please use Google Chrome.');
      return;
    }

    stopSpeaking(); // Stop any playback

    try {
      const recognition = new SpeechRecognition();
      recognitionRef.current = recognition;
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = language === 'te' ? 'te-IN' : 'en-US';

      let finalTranscript = '';

      recognition.onstart = () => {
        setIsListening(true);
        setVoiceError(null);
        recordingStartTimeRef.current = Date.now();
      };

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('');
        
        finalTranscript = transcript;
        setInputValue(transcript);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setVoiceError(language === 'te' ? 'మైక్రోఫోన్ అనుమతి నిరసించబడింది. బ్రౌజర్ సెట్టింగ్స్‌లో మైక్‌ను ఆన్ చేయండి.' : 'Microphone access denied. Please enable microphone permissions in your browser settings.');
        } else if (event.error === 'no-speech') {
          // ignore
        } else {
          setVoiceError(language === 'te' ? `వాయిస్ ఎర్రర్: ${event.error}` : `Voice Recognition Error: ${event.error}`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        const duration = Date.now() - recordingStartTimeRef.current;
        if (duration < 1000 && !finalTranscript.trim()) {
          // Ignore short accidental noise/empty clicks
          return;
        }

        if (finalTranscript.trim()) {
          const correctedText = applyVocabularyCorrections(finalTranscript);
          setStagedVoiceTranscript(correctedText);
          setShowVoiceConfirm(true);
        }
      };

      recognition.start();
    } catch (e) {
      console.error(e);
      setVoiceError(e.message);
      setIsListening(false);
    }
  };

  // Speech-to-Text: Stop Speech Recognition
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Text-to-Speech: Speak Bot Response
  const speakText = (text, messageId) => {
    if (!('speechSynthesis' in window)) {
      setVoiceError(language === 'te' ? 'మీ బ్రౌజర్ వాయిస్ సింథసిస్‌ను సపోర్ట్ చేయదు.' : 'Speech synthesis is not supported in this browser.');
      return;
    }

    // Toggle stop if already playing the same message
    if (isSpeaking && speakActiveId === messageId) {
      stopSpeaking();
      return;
    }

    stopSpeaking(); // Stop any active reading

    // Clean formatting for a natural read aloud
    const cleanText = text
      .replace(/[\*\#\_`~>]/g, '') // Remove formatting characters
      .replace(/•/g, ', ')         // Replace bullets with pause
      .replace(/\d\./g, ', ')       // Replace numbers with pause
      .trim();

    try {
      const utterance = new SpeechSynthesisUtterance(cleanText);
      const isTeluguText = /[\u0C00-\u0C7F]/.test(text);
      utterance.lang = isTeluguText ? 'te-IN' : 'en-US';

      // Select voice
      const voices = window.speechSynthesis.getVoices();
      let voice = null;
      if (isTeluguText) {
        voice = voices.find(v => v.lang.startsWith('te') || v.name.toLowerCase().includes('telugu'));
      } else {
        voice = voices.find(v => v.lang.startsWith('en-US') && v.name.toLowerCase().includes('google')) ||
                voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('natural')) ||
                voices.find(v => v.lang.startsWith('en-US'));
      }
      if (voice) {
        utterance.voice = voice;
      }

      utterance.onstart = () => {
        setIsSpeaking(true);
        setSpeakActiveId(messageId);
      };

      utterance.onend = () => {
        setIsSpeaking(false);
        setSpeakActiveId(null);
      };

      utterance.onerror = (e) => {
        console.error('Speech synthesis error:', e);
        setIsSpeaking(false);
        setSpeakActiveId(null);
      };

      window.speechSynthesis.speak(utterance);
    } catch (e) {
      console.error(e);
      setIsSpeaking(false);
      setSpeakActiveId(null);
    }
  };

  // Text-to-Speech: Stop current readout
  const stopSpeaking = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setSpeakActiveId(null);
  };

  const handleSend = async (textToSend) => {
    const text = textToSend !== undefined ? textToSend : inputValue;
    if (!text.trim() && !attachedFile) return;

    // Stop any active Speech synthesis playing
    stopSpeaking();

    // Create user message
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const userMsgId = 'msg_' + Date.now();
    const userMsg = {
      id: userMsgId,
      sender: 'user',
      text: text.trim() || (attachedFile ? `[Uploaded file: ${attachedFile.name}]` : ''),
      timestamp: timestamp,
      file: attachedFile ? { ...attachedFile } : null
    };

    let targetChatId = activeChatId;

    if (activeChatId === 'current') {
      // Create new chat session immediately in history list
      const newId = 'chat_' + Date.now();
      const firstLine = text.trim() 
        ? (text.substring(0, 22) + (text.length > 22 ? '...' : ''))
        : (attachedFile ? attachedFile.name.substring(0, 22) : 'New Chat');
      const newHistoryItem = {
        id: newId,
        title: firstLine,
        messages: [userMsg]
      };
      
      setHistory(prev => [newHistoryItem, ...prev]);
      setActiveChatId(newId);
      targetChatId = newId;
    } else {
      // Append user message immediately to existing chat
      setHistory(prev => prev.map(item => {
        if (item.id === activeChatId) {
          return { ...item, messages: [...item.messages, userMsg] };
        }
        return item;
      }));
    }

    setInputValue('');
    setAttachedFile(null); // Clear attached file state
    setTypingChatId(targetChatId);

    // Simulate AI thinking and response
    try {
      const botResponseText = await generateAIResponse(userMsg.text, language, userMsg.file);
      
      const botMsgId = 'botMsg_' + Date.now();
      const botMsg = {
        id: botMsgId,
        sender: 'bot',
        text: botResponseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      // Append bot response to the target conversation in history
      setHistory(prev => prev.map(item => {
        if (item.id === targetChatId) {
          return { ...item, messages: [...item.messages, botMsg] };
        }
        return item;
      }));

      // Automatically speak the bot response if autoVoice mode is turned on
      if (autoVoice) {
        // Delay speaking slightly so UI updates and screen readers settle
        setTimeout(() => {
          speakText(botResponseText, botMsgId);
        }, 100);
      }
    } catch (e) {
      console.error("Error generating response:", e);
    } finally {
      setTypingChatId(null);
    }
  };

  const handleQuickAction = (actionKey) => {
    let question = "";
    if (actionKey === 'crop') {
      question = language === 'en' ? "Can you recommend a crop for my farm?" : "నా పొలానికి ఏ పంట అనుకూలంగా ఉంటుంది?";
    } else if (actionKey === 'disease') {
      question = language === 'en' ? "How do I diagnose leaf disease?" : "ఆకు తెగుళ్లను ఎలా గుర్తించాలి?";
    } else if (actionKey === 'fertilizer') {
      question = language === 'en' ? "What fertilizer dosage should I use?" : "నా పంటకు ఎరువుల మోతాదు ఎంత వేయాలి?";
    } else if (actionKey === 'weather') {
      question = language === 'en' ? "Show me the weather advisory." : "ఈరోజు వ్యవసాయ వాతావరణ సలహాలు ఏమిటి?";
    } else if (actionKey === 'market') {
      question = language === 'en' ? "What are the latest crop prices?" : "పంటల తాజా మార్కెట్ ధరలు ఎంత?";
    }

    handleSend(question);
  };

  const startNewChat = () => {
    setActiveChatId('current');
  };

  const switchConversation = (conv) => {
    setActiveChatId(conv.id);
  };

  const deleteConversation = (e, idToDelete) => {
    e.stopPropagation(); // Prevent trigger active chat selection
    setHistory(prev => prev.filter(item => item.id !== idToDelete));
    if (activeChatId === idToDelete) {
      startNewChat();
    }
  };

  return (
    <div className="animate-fade" onDragEnter={handleDragEnter}>
      {showVoiceConfirm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(11, 17, 32, 0.85)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10000,
          animation: 'fadeIn 0.2s ease-in-out'
        }}>
          <div style={{
            background: 'var(--bg-white)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            boxShadow: '0 20px 25px -5px rgba(0,0,0,0.5), 0 10px 10px -5px rgba(0,0,0,0.5)',
            width: '95%',
            maxWidth: '500px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--primary)', fontWeight: 700 }}>
              {language === 'te' ? 'మీరు ఉద్దేశించింది ఇదేనా?' : 'Did you mean:'}
            </h3>
            
            <textarea
              value={stagedVoiceTranscript}
              onChange={(e) => setStagedVoiceTranscript(e.target.value)}
              style={{
                width: '100%',
                height: '100px',
                background: 'rgba(0,0,0,0.2)',
                border: '1px solid var(--border-color)',
                borderRadius: '8px',
                padding: '12px',
                color: 'var(--text-dark)',
                fontSize: '1rem',
                lineHeight: '1.5',
                resize: 'none',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <button
                onClick={() => {
                  setShowVoiceConfirm(false);
                  setStagedVoiceTranscript('');
                  startListening();
                }}
                className="btn btn-secondary"
                style={{
                  padding: '10px 16px',
                  fontSize: '0.875rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                🔄 {language === 'te' ? 'మళ్ళీ రికార్డ్' : 'Re-record'}
              </button>
              <button
                onClick={() => {
                  setShowVoiceConfirm(false);
                  setStagedVoiceTranscript('');
                }}
                className="btn btn-secondary"
                style={{
                  padding: '10px 16px',
                  fontSize: '0.875rem',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {language === 'te' ? 'రద్దు' : 'Cancel'}
              </button>
              <button
                onClick={async () => {
                  const textToSend = stagedVoiceTranscript;
                  setShowVoiceConfirm(false);
                  setStagedVoiceTranscript('');
                  setIsProcessing(true);
                  await handleSend(textToSend);
                  setIsProcessing(false);
                }}
                className="btn btn-primary"
                style={{
                  padding: '10px 20px',
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                ✅ {language === 'te' ? 'నిర్ధారించు & పంపు' : 'Confirm & Send'}
              </button>
            </div>
          </div>
        </div>
      )}
      {isDragging && (
        <div 
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(11, 17, 32, 0.95)',
            border: '4px dashed var(--accent)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999,
            color: 'var(--accent)',
            gap: '16px',
            animation: 'fadeIn 0.2s ease-in-out'
          }}
        >
          <Paperclip size={48} style={{ animation: 'bounce 1s infinite' }} />
          <h3 style={{ fontSize: '1.8rem', color: '#fff', margin: 0 }}>
            {language === 'te' ? 'వ్యవసాయ ఫైళ్లను ఇక్కడ వదలండి' : 'Drop agricultural files here'}
          </h3>
          <p style={{ color: 'var(--text-muted)', margin: 0 }}>
            {language === 'te' ? 'చిత్రాలు, డాక్యుమెంట్లు మరియు డేటాసెట్ రిపోర్టులు (గరిష్టంగా 10MB)' : 'Supports Images, Reports, and Datasets (Max 10MB)'}
          </p>
        </div>
      )}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>{t('chat.title')}</h2>
        <p style={{ color: 'var(--text-muted)' }}>
          {language === 'te' ? 'వ్యవసాయ సందేహాలకు తెలుగు మరియు ఇంగ్లీషులో తక్షణ సమాధానాలు పొందండి.' : 'Get instant answers to agricultural doubts in English and Telugu.'}
        </p>
      </div>

      <div className="chat-container">
        {/* Sidebar History Panel */}
        <div className="chat-history shadow-sm">
          <button 
            onClick={startNewChat}
            className="btn btn-primary" 
            style={{ 
              width: '100%', 
              fontSize: '0.85rem', 
              padding: '10px 14px',
              marginBottom: '20px',
              borderRadius: 'var(--border-radius-sm)',
              justifyContent: 'center'
            }}
          >
            <Plus size={16} />
            <span>{t('chat.newChat')}</span>
          </button>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {t('chat.sidebarTitle')}
            </span>
            {history.length > 0 && (
              <button
                onClick={() => {
                  if (window.confirm(language === 'te' ? 'నిజంగా అన్ని సంభాషణలను తొలగించాలా?' : 'Are you sure you want to clear all consultation history?')) {
                    setHistory([]);
                    startNewChat();
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-muted)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '2px 6px',
                  borderRadius: '4px'
                }}
                onMouseOver={(e) => e.currentTarget.style.color = '#ef476f'}
                onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                title={language === 'te' ? 'చరిత్రను క్లియర్ చేయండి' : 'Clear All History'}
              >
                <Trash2 size={12} />
                <span>{language === 'te' ? 'అన్నీ క్లియర్' : 'Clear All'}</span>
              </button>
            )}
          </div>
          
          <div className="history-list">
            {/* Current Active Chat indicator if it's new */}
            {activeChatId === 'current' && (
              <div className="history-item active-chat">
                <MessageSquare size={14} style={{ display: 'inline', marginRight: '8px', verticalAlign: 'middle' }} />
                <span>{language === 'te' ? 'ప్రస్తుత చాట్' : 'Active Consultation'}</span>
              </div>
            )}

            {history.map(item => (
              <div 
                key={item.id} 
                className={`history-item ${activeChatId === item.id ? 'active-chat' : ''}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingRight: '6px'
                }}
                onClick={() => switchConversation(item)}
              >
                <div style={{ display: 'flex', alignItems: 'center', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginRight: '8px' }}>
                  <MessageSquare size={14} style={{ flexShrink: 0, marginRight: '8px' }} />
                  <span>{item.title}</span>
                </div>
                
                {/* Trash Delete button */}
                <button 
                  onClick={(e) => deleteConversation(e, item.id)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '4px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = '#ef476f'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--text-muted)'}
                  title={language === 'te' ? 'సంభాషణను తొలగించండి' : 'Delete Consultation'}
                >
                  <Trash2 size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Chatting Panel */}
        <div className="chat-panel shadow-sm">
          {/* Active Chat Header with Export Utility & Voice Mode Toggle */}
          <div style={{ 
            padding: '12px 20px', 
            borderBottom: '1px solid var(--border-color)', 
            background: 'var(--bg-light)', 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center' 
          }} className="chat-header">
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--primary-dark)' }}>
              {activeChatId === 'current' 
                ? (language === 'te' ? 'కొత్త సంప్రదింపు' : 'New Consultation') 
                : (history.find(c => c.id === activeChatId)?.title || (language === 'te' ? 'సంభాషణ' : 'Consultation'))}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              {/* Auto Voice Toggle */}
              <button
                onClick={() => {
                  const newAutoVoice = !autoVoice;
                  setAutoVoice(newAutoVoice);
                  if (!newAutoVoice) {
                    stopSpeaking();
                  }
                }}
                style={{
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: autoVoice ? 'var(--primary)' : 'var(--text-muted)',
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  transition: 'color 0.2s'
                }}
                title={language === 'te' ? (autoVoice ? 'ఆటో వాయిస్ ఆఫ్ చేయి' : 'ఆటో వాయిస్ ఆన్ చేయి') : (autoVoice ? 'Mute Auto Voice' : 'Enable Auto Voice')}
              >
                {autoVoice ? <Volume2 size={16} /> : <VolumeX size={16} />}
                <span>{language === 'te' ? 'వాయిస్ సమాధానాలు' : 'Voice Mode'}</span>
              </button>

              {currentMessages.length > 1 && (
                <button 
                  onClick={() => {
                    // Generate TXT transcript
                    const title = activeChatId === 'current' 
                      ? 'New_Consultation' 
                      : (history.find(c => c.id === activeChatId)?.title || 'Consultation').replace(/[^a-zA-Z0-9]/g, '_');
                    
                    let transcript = `AgroBuddy AI Consultation - ${new Date().toLocaleDateString()}\n`;
                    transcript += `==============================================\n\n`;
                    
                    currentMessages.forEach(msg => {
                      const senderName = msg.sender === 'bot' ? 'AgroBuddy AI' : 'Farmer';
                      transcript += `[${msg.timestamp}] ${senderName}:\n${msg.text}\n\n`;
                    });
                    
                    const element = document.createElement("a");
                    const file = new Blob([transcript], { type: 'text/plain;charset=utf-8' });
                    element.href = URL.createObjectURL(file);
                    element.download = `AgroBuddy_Consultation_${title}.txt`;
                    document.body.appendChild(element);
                    element.click();
                    document.body.removeChild(element);
                  }}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--primary)',
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                  onMouseOut={(e) => e.currentTarget.style.color = 'var(--primary)'}
                >
                  <span>{language === 'te' ? 'సంప్రదింపును డౌన్‌లోడ్ చేయి' : 'Export Consultation'}</span>
                </button>
              )}
            </div>
          </div>

          <div className="chat-messages">
            {currentMessages.map((msg, index) => (
              <div 
                key={index} 
                className={`chat-bubble ${msg.sender === 'bot' ? 'chat-bubble-bot' : 'chat-bubble-user'}`}
              >
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {msg.sender === 'bot' ? (
                      <Bot size={18} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                    ) : (
                      <User size={18} style={{ color: 'rgba(255,255,255,0.8)', flexShrink: 0 }} />
                    )}
                    <span style={{ fontSize: '0.75rem', fontWeight: 600, color: msg.sender === 'bot' ? 'var(--text-muted)' : 'rgba(255,255,255,0.7)' }}>
                      {msg.sender === 'bot' ? t('brand') : (language === 'te' ? 'రైతు' : 'Farmer')}
                    </span>
                  </div>

                  {/* Replay/Speak Button for Bot Messages */}
                  {msg.sender === 'bot' && (
                    <button
                      onClick={() => speakText(msg.text, msg.id || ('bot_idx_' + index))}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: (isSpeaking && speakActiveId === (msg.id || ('bot_idx_' + index))) ? 'var(--accent)' : 'var(--text-muted)',
                        padding: '2px 6px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'color 0.2s',
                        borderRadius: '4px'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = 'var(--accent)'}
                      onMouseOut={(e) => {
                        if (!(isSpeaking && speakActiveId === (msg.id || ('bot_idx_' + index)))) {
                          e.currentTarget.style.color = 'var(--text-muted)';
                        }
                      }}
                      title={language === 'te' ? 'వాయిస్ విను' : 'Listen to Voice'}
                    >
                      {isSpeaking && speakActiveId === (msg.id || ('bot_idx_' + index)) ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px', height: '10px' }}>
                          <div className="mini-wave-bar wave-bar-1"></div>
                          <div className="mini-wave-bar wave-bar-2"></div>
                          <div className="mini-wave-bar wave-bar-3"></div>
                        </div>
                      ) : (
                        <Volume2 size={14} />
                      )}
                    </button>
                  )}
                </div>
                {msg.file && (
                  <div style={{ 
                    marginTop: '8px', 
                    marginBottom: '10px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    maxWidth: '100%',
                    background: msg.sender === 'user' ? 'rgba(0,0,0,0.2)' : 'var(--bg-light)',
                    border: '1px solid var(--border-color)',
                    padding: msg.file.category === 'image' ? '0' : '10px 14px'
                  }}>
                    {msg.file.category === 'image' ? (
                      <div style={{ position: 'relative', overflow: 'hidden' }}>
                        <img 
                          src={msg.file.dataUrl} 
                          alt={msg.file.name} 
                          style={{ 
                            maxWidth: '100%', 
                            maxHeight: '260px', 
                            objectFit: 'contain',
                            display: 'block',
                            borderRadius: '8px'
                          }} 
                        />
                        <div style={{
                          position: 'absolute',
                          bottom: 0,
                          left: 0,
                          right: 0,
                          backgroundColor: 'rgba(0,0,0,0.5)',
                          color: '#fff',
                          fontSize: '0.75rem',
                          padding: '4px 8px',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden'
                        }}>
                          📷 {msg.file.name} ({(msg.file.size / 1024).toFixed(0)} KB)
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '6px',
                          background: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff'
                        }}>
                          {msg.file.category === 'data' ? <Database size={20} /> : <FileText size={20} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: '0.85rem', fontWeight: 600, textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden', color: msg.sender === 'user' ? '#fff' : 'var(--text-dark)' }}>
                            {msg.file.name}
                          </div>
                          <div style={{ fontSize: '0.7rem', color: msg.sender === 'user' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)', marginTop: '2px' }}>
                            {msg.file.category === 'data' ? 'Spreadsheet Dataset' : 'Document Report'} • {(msg.file.size / 1024).toFixed(0)} KB
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                <p style={{ fontSize: '0.95rem', whiteSpace: 'pre-wrap', color: 'inherit' }}>{msg.text}</p>
                <span style={{ 
                  display: 'block', 
                  textAlign: 'right', 
                  fontSize: '0.7rem', 
                  marginTop: '8px', 
                  color: msg.sender === 'bot' ? 'var(--text-muted)' : 'rgba(255,255,255,0.6)' 
                }}>
                  {msg.timestamp}
                </span>
              </div>
            ))}

            {(typingChatId === activeChatId || isProcessing) && (
              <div className="chat-bubble chat-bubble-bot">
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '6px' }}>
                  <Bot size={18} style={{ color: 'var(--accent)' }} />
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)' }}>{t('brand')}</span>
                </div>
                {isProcessing ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <div className="mini-wave-bar wave-bar-1"></div>
                    <div className="mini-wave-bar wave-bar-2"></div>
                    <div className="mini-wave-bar wave-bar-3"></div>
                    <span>{language === 'te' ? 'నిర్ధారించిన వాయిస్‌ని విశ్లేషిస్తోంది...' : 'Processing confirmed query...'}</span>
                  </div>
                ) : (
                  <div className="typing-dots">
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                    <div className="typing-dot"></div>
                  </div>
                )}
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Action prompts */}
          <div className="chat-quick-prompts">
            <button onClick={() => handleQuickAction('crop')} className="quick-prompt-btn">
              {t('chat.quickActions.crop')}
            </button>
            <button onClick={() => handleQuickAction('disease')} className="quick-prompt-btn">
              {t('chat.quickActions.disease')}
            </button>
            <button onClick={() => handleQuickAction('fertilizer')} className="quick-prompt-btn">
              {t('chat.quickActions.fertilizer')}
            </button>
            <button onClick={() => handleQuickAction('weather')} className="quick-prompt-btn">
              {t('chat.quickActions.weather')}
            </button>
            <button onClick={() => handleQuickAction('market')} className="quick-prompt-btn">
              {t('chat.quickActions.market')}
            </button>
          </div>

          {/* Hidden inputs */}
          <input 
            type="file" 
            ref={fileInputImageRef} 
            onChange={(e) => onFileChange(e, 'image')} 
            accept="image/png, image/jpeg, image/jpg, image/webp" 
            style={{ display: 'none' }} 
          />
          <input 
            type="file" 
            ref={fileInputDocRef} 
            onChange={(e) => onFileChange(e, 'doc')} 
            accept=".pdf, .docx, .doc, .txt, text/plain, application/pdf, application/vnd.openxmlformats-officedocument.wordprocessingml.document" 
            style={{ display: 'none' }} 
          />
          <input 
            type="file" 
            ref={fileInputDataRef} 
            onChange={(e) => onFileChange(e, 'data')} 
            accept=".csv, .xlsx, .xls, text/csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" 
            style={{ display: 'none' }} 
          />

          {/* Upload Progress Indicator */}
          {isUploading && (
            <div style={{
              padding: '10px 20px',
              background: 'var(--bg-light)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--primary)', flexShrink: 0 }}>
                {language === 'te' ? 'అప్‌లోడ్ అవుతోంది...' : 'Uploading File...'} {uploadProgress}%
              </div>
              <div style={{ flexGrow: 1, height: '4px', background: 'var(--border-color)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${uploadProgress}%`, background: 'var(--primary)', transition: 'width 0.15s ease-out' }}></div>
              </div>
            </div>
          )}

          {/* Staged File Preview Banner */}
          {attachedFile && (
            <div style={{
              padding: '12px 20px',
              background: 'var(--bg-light)',
              borderTop: '1px solid var(--border-color)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 }}>
                {attachedFile.category === 'image' ? (
                  <img 
                    src={attachedFile.dataUrl} 
                    alt="staged-preview" 
                    style={{ width: '36px', height: '36px', borderRadius: '4px', objectFit: 'cover', border: '1px solid var(--border-color)' }} 
                  />
                ) : (
                  <div style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '4px',
                    background: 'var(--primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0
                  }}>
                    {attachedFile.category === 'data' ? <Database size={16} /> : <FileText size={16} />}
                  </div>
                )}
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-dark)', textOverflow: 'ellipsis', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {attachedFile.name}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                    {(attachedFile.size / 1024).toFixed(0)} KB
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setAttachedFile(null)}
                style={{
                  background: 'rgba(239, 71, 111, 0.15)',
                  border: 'none',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#ef476f',
                  cursor: 'pointer',
                  transition: 'background 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239, 71, 111, 0.3)'}
                onMouseOut={(e) => e.currentTarget.style.background = 'rgba(239, 71, 111, 0.15)'}
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* Voice Error Alert */}
          {voiceError && (
            <div style={{
              padding: '10px 20px',
              background: 'rgba(239, 71, 111, 0.1)',
              borderTop: '1px solid rgba(239, 71, 111, 0.3)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px'
            }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#ef476f' }}>
                ⚠️ {voiceError}
              </div>
              <button 
                onClick={() => setVoiceError(null)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#ef476f',
                  cursor: 'pointer',
                  fontWeight: 'bold',
                  fontSize: '0.8rem'
                }}
              >
                {language === 'te' ? 'మూసివేయి' : 'Dismiss'}
              </button>
            </div>
          )}

          {/* Input field with attachment trigger */}
          <div className="chat-input-area" style={{ position: 'relative', display: 'flex', gap: '8px', alignItems: 'center' }}>
            
            {/* Attachment popover menu */}
            {showAttachMenu && (
              <div 
                style={{
                  position: 'absolute',
                  bottom: '60px',
                  left: '16px',
                  background: 'var(--bg-white)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  boxShadow: 'var(--box-shadow)',
                  zIndex: 100,
                  width: '180px',
                  padding: '6px 0',
                  animation: 'slideUp 0.15s ease-out'
                }}
              >
                <button 
                  onClick={() => handleAttachmentSelect('image')}
                  className="attach-menu-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--text-dark)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-light)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Image size={15} style={{ color: 'var(--primary)' }} />
                  <span>{language === 'te' ? '📷 చిత్రం అప్‌లోడ్' : '📷 Upload Image'}</span>
                </button>
                <button 
                  onClick={() => handleAttachmentSelect('doc')}
                  className="attach-menu-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--text-dark)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-light)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <FileText size={15} style={{ color: 'var(--primary)' }} />
                  <span>{language === 'te' ? '📄 పత్రం అప్‌లోడ్' : '📄 Upload Document'}</span>
                </button>
                <button 
                  onClick={() => handleAttachmentSelect('data')}
                  className="attach-menu-item"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    width: '100%',
                    padding: '10px 16px',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    color: 'var(--text-dark)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.background = 'var(--bg-light)'}
                  onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <Database size={15} style={{ color: 'var(--primary)' }} />
                  <span>{language === 'te' ? '📊 డేటాసెట్ అప్‌లోడ్' : '📊 Upload Dataset'}</span>
                </button>
              </div>
            )}

            {/* Attachment Button */}
            <button 
              onClick={() => setShowAttachMenu(!showAttachMenu)}
              className="btn btn-secondary"
              style={{ 
                padding: '12px', 
                borderRadius: 'var(--border-radius-sm)', 
                width: '48px', 
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--bg-light)',
                border: '1px solid var(--border-color)',
                color: 'var(--text-muted)',
                flexShrink: 0
              }}
              title={language === 'te' ? 'ఫైల్ అటాచ్ చేయి' : 'Attach File'}
            >
              <Plus size={18} style={{ transform: showAttachMenu ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }} />
            </button>

            {/* Text Input with Listening waveform state overlay */}
            <div style={{ flexGrow: 1, position: 'relative', height: '48px', minWidth: 0 }}>
              {isListening ? (
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: 'var(--bg-light)',
                  border: '1px solid var(--primary)',
                  borderRadius: 'var(--border-radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 16px',
                  color: 'var(--primary)',
                  animation: 'fadeIn 0.2s ease-in-out'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="voice-record-pulse"></div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>
                      {language === 'te' ? 'మాట్లాడండి, వింటున్నాను...' : 'Listening, speak now...'}
                    </span>
                  </div>
                  {/* Waveform Animation */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '24px' }}>
                    <div className="wave-bar wave-bar-1"></div>
                    <div className="wave-bar wave-bar-2"></div>
                    <div className="wave-bar wave-bar-3"></div>
                    <div className="wave-bar wave-bar-4"></div>
                    <div className="wave-bar wave-bar-5"></div>
                  </div>
                </div>
              ) : (
                <input 
                  type="text" 
                  className="chat-input"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder={t('chat.placeholder')}
                  style={{ width: '100%', height: '100%', border: '1px solid var(--border-color)', borderRadius: 'var(--border-radius-sm)', padding: '0 16px', background: 'transparent', color: 'var(--text-dark)' }}
                />
              )}
            </div>

            {/* Microphone Voice Input Button */}
            <button
              onClick={isListening ? stopListening : startListening}
              className={`btn ${isListening ? 'btn-danger pulsing-mic-btn' : 'btn-secondary'}`}
              style={{
                padding: '12px',
                borderRadius: 'var(--border-radius-sm)',
                width: '48px',
                height: '48px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                background: isListening ? '#ef476f' : 'var(--bg-light)',
                border: '1px solid var(--border-color)',
                color: isListening ? '#fff' : 'var(--text-muted)',
                transition: 'all 0.2s'
              }}
              title={language === 'te' ? (isListening ? 'రికార్డింగ్ ఆపు' : 'గళం వినిపించు') : (isListening ? 'Stop Listening' : 'Speak to AgroBuddy')}
            >
              {isListening ? <MicOff size={18} /> : <Mic size={18} />}
            </button>

            <button 
              onClick={() => handleSend()} 
              className="btn btn-primary"
              style={{ padding: '12px', borderRadius: 'var(--border-radius-sm)', width: '48px', height: '48px', flexShrink: 0 }}
              disabled={isListening}
            >
              <Send size={18} />
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { transform: translateY(10px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounce {
          0%, 100% {
            transform: translateY(-25%);
            animation-timing-function: cubic-bezier(0.8,0,1,1);
          }
          50% {
            transform: none;
            animation-timing-function: cubic-bezier(0,0,0.2,1);
          }
        }
        
        /* Voice Assistant styles */
        @keyframes pulse-mic {
          0% { box-shadow: 0 0 0 0 rgba(239, 71, 111, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 71, 111, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 71, 111, 0); }
        }
        .pulsing-mic-btn {
          animation: pulse-mic 1.5s infinite;
        }
        
        @keyframes pulse-red-dot {
          0%, 100% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1.2); opacity: 1; }
        }
        .voice-record-pulse {
          width: 8px;
          height: 8px;
          background-color: #ef476f;
          border-radius: 50%;
          animation: pulse-red-dot 1s infinite ease-in-out;
        }

        @keyframes wave-bounce {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .wave-bar {
          width: 3px;
          height: 100%;
          background-color: var(--primary);
          border-radius: 2px;
          transform-origin: bottom;
          animation: wave-bounce 1.2s infinite ease-in-out;
        }
        .wave-bar-1 { animation-delay: 0.1s; }
        .wave-bar-2 { animation-delay: 0.3s; }
        .wave-bar-3 { animation-delay: 0.6s; }
        .wave-bar-4 { animation-delay: 0.2s; }
        .wave-bar-5 { animation-delay: 0.4s; }

        @keyframes mini-wave-bounce {
          0%, 100% { transform: scaleY(0.4); }
          50% { transform: scaleY(1); }
        }
        .mini-wave-bar {
          width: 2px;
          height: 10px;
          background-color: var(--accent);
          border-radius: 1px;
          transform-origin: bottom;
          animation: mini-wave-bounce 0.8s infinite ease-in-out;
        }
        .mini-wave-bar.wave-bar-1 { animation-delay: 0.1s; }
        .mini-wave-bar.wave-bar-2 { animation-delay: 0.3s; }
        .mini-wave-bar.wave-bar-3 { animation-delay: 0.5s; }

        @media (max-width: 768px) {
          .chat-container {
            flex-direction: column;
            height: calc(100vh - 120px);
          }
          .chat-history {
            width: 100%;
            height: 120px;
            margin-bottom: 10px;
          }
          .chat-messages {
            padding: 15px;
          }
          .chat-bubble {
            max-width: 90%;
          }
        }
      `}</style>
    </div>
  );
}
