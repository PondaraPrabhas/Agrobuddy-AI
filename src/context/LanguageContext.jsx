import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  en: {
    brand: "AgroBuddy AI",
    nav: {
      home: "Home",
      chat: "AI Chatbot",
      crop: "Crop Prediction",
      disease: "Disease Identification",
      fertilizer: "Fertilizer Advice",
      weather: "Weather Advisory",
      market: "Market Prices",
      analytics: "State Crop Analytics",
      about: "About Us",
      coreHeader: "Agricultural Core",
      otherHeader: "Other Panels",
      sidebarExpand: "Expand Sidebar",
      sidebarCollapse: "Collapse Sidebar"
    },
    common: {
      loading: "Processing...",
      submit: "Submit Details",
      reset: "Clear Form",
      telugu: "తెలుగు",
      english: "English",
      select: "-- Select --",
      results: "Analysis Results",
      backToHome: "Back to Home",
      explore: "Explore Tools",
      printCard: "Print Soil Health Card",
      printFertilizer: "Print Fertilizer Card"
    },
    home: {
      heroTitle: "Empowering Farmers with Intelligent Agricultural AI",
      heroSubtitle: "Your virtual farming expert. Get science-based crop predictions, precise fertilizer guidance, rapid crop disease identification, and live weather advisory.",
      startChat: "Chat with AgroBuddy",
      tryTools: "Try Crop Advisor",
      stats: {
        farmers: "50,000+ Farmers Helped",
        accuracy: "96.4% AI Accuracy Rate",
        crops: "22+ Crops Analyzed",
        villages: "1,200+ Villages Covered"
      },
      benefits: {
        title: "Why Choose AgroBuddy AI?",
        subtitle: "Leveraging state-of-the-art machine learning algorithms combined with local agricultural research data.",
        b1Title: "Increase Crop Yield",
        b1Desc: "Optimize sowing decisions matching your exact soil profile (N, P, K levels) and pH chemistry.",
        b2Title: "Minimize Costs",
        b2Desc: "Apply fertilizers efficiently based on crop requirements to prevent over-fertilization and save money.",
        b3Title: "Early Disease Detection",
        b3Desc: "Instantly diagnose leaf diseases and access organic and chemical remedies to save your harvest.",
        b4Title: "Climate Resilience",
        b4Desc: "Stay ahead with live agricultural weather forecasts, soil moisture sensors, and dynamic weather warnings."
      },
      cta: {
        title: "Ready to Transform Your Farm?",
        subtitle: "Available in English and Telugu. Easy to use for farmers, agricultural students, and advisors.",
        button: "Get Started Now"
      }
    },
    chat: {
      title: "AgroBuddy AI Assistant",
      sidebarTitle: "Consultation History",
      newChat: "New Consultation",
      welcome: "Hello! I am AgroBuddy, your virtual agricultural advisor. How can I help you today? You can select a quick action below or type your question.",
      quickActions: {
        crop: "🌾 Recommend Crops",
        disease: "🍂 Leaf Disease Help",
        fertilizer: "🧪 Fertilizer Dosage",
        weather: "🌧️ Weather Advisory",
        market: "📊 Market Price Trend"
      },
      placeholder: "Ask AgroBuddy anything (e.g. 'How to cure tomato leaf spot?' or 'ఉల్లిపాయ పంటకు ఏ ఎరువు వేయాలి?')...",
      responses: {
        crop: "Here are the top crop predictions based on common soil types:\n\n• **Alluvial Soil**: Rice, Wheat, Sugarcane, Cotton (Requires moderate NPK 80-40-40).\n• **Black Soil**: Cotton, Soybeans, Wheat, Chillies (High Nitrogen and Phosphorus required).\n• **Red Soil**: Groundnuts, Maize, Millets, Pulses (Thrives in lower Nitrogen, needs Potassium 40-20-30).\n• **Sandy Soil**: Coconut, Cashews, Watermelons (Requires organic manure, high K).\n\n**Season-wise selection**:\n• **Kharif (Monsoon)**: Rice, Maize, Cotton, Groundnut.\n• **Rabi (Winter)**: Wheat, Mustard, Chickpeas, Barley.\n\n*For customized computations matching your exact soil NPK values, you can use our interactive 'Crop Prediction' page in the dashboard.*",
        disease: "Here are common leaf diseases and their treatments:\n\n1. **Early Blight (Tomato/Potato)**:\n   • *Symptoms*: Concentric brown spots on older leaves, yellow halo.\n   • *Remedy*: Spray Neem oil (1%) organic or Mancozeb fungicide (0.2%). Avoid overhead watering.\n2. **Paddy Blast (Rice)**:\n   • *Symptoms*: Spindle-shaped lesions with ash-colored centers and brown borders.\n   • *Remedy*: Spray Tricyclazole 75 WP @ 0.6g/L or apply Pseudomonas fluorescens biological control.\n3. **Rust (Wheat/Beans)**:\n   • *Symptoms*: Orange/brown powdery pustules on leaf surfaces.\n   • *Remedy*: Apply Propiconazole 25 EC or copper oxychloride sprays. Plant rust-resistant seed varieties.",
        fertilizer: "Here is your NPK Fertilizer Dosing Guide:\n\n• **Urea (Source of Nitrogen)**: Essential for leafy growth. Basal dose of 50kg/ha, followed by top-dressing in 2-3 split doses during active vegetative growth when soil is moist.\n• **DAP (Diammonium Phosphate - Source of P & N)**: Apply at the time of sowing. Promotes strong root architecture. General dose: 75-100kg/ha.\n• **MOP (Muriate of Potash - Source of K)**: Improves drought tolerance and disease resistance. Apply with basal fertilizer or at flowering. General dose: 40-50kg/ha.\n\n*Important: Never apply chemical fertilizers on completely dry soil; always ensure the field has adequate moisture.*",
        weather: "Agricultural Weather & Spraying Advisories:\n\n1. **Spraying Window**: Do not spray chemical pesticides or fertilizers if wind speed exceeds 15 km/h to prevent spray drift. Ideal time is early morning (6-9 AM) or late evening.\n2. **Rainfall Warning**: If heavy rain is forecast within 24 hours, postpone fertilizer application. Rainfall will wash away nutrients, causing financial loss and groundwater pollution.\n3. **Temperature Stress**: During high-heat days (>38°C), irrigate crops in early mornings or evenings to reduce transpiration shock. Mulch soil to conserve moisture.",
        market: "Here are the average mandi market rates (per Quintal) across major markets:\n\n• **Paddy (Common)**: ₹2,183 - ₹2,300 (Stable)\n• **Cotton (Long Staple)**: ₹7,100 - ₹7,450 (Rising demand)\n• **Maize (Yellow)**: ₹1,960 - ₹2,100 (Stable)\n• **Red Chilli (Teja)**: ₹19,500 - ₹21,200 (Slightly falling due to fresh arrivals)\n• **Turmeric (Guntur)**: ₹11,200 - ₹12,500 (Rising)\n\n*For official real-time Mandi price tickers, you can also check the Market Prices dashboard.*"
      }
    },
    crop: {
      title: "AI Crop Suitability Advisor",
      subtitle: "Enter your soil chemistry parameters and weather season. AgroBuddy AI will query crop models to identify the top matching crop.",
      soilType: "Soil Type",
      ph: "Soil pH Level",
      n: "Nitrogen (N) Level (mg/kg)",
      p: "Phosphorus (P) Level (mg/kg)",
      k: "Potassium (K) Level (mg/kg)",
      season: "Farming Season",
      recsTitle: "Recommended Crops for Your Soil",
      score: "Suitability Score",
      yield: "Expected Yield",
      reasons: "Why this crop is recommended:",
      optimal: "Optimal NPK range for this crop",
      topRecHeader: "TOP RECOMMENDED CROP",
      altCropsHeader: "Alternative Matching Crops",
      guideTitle: "Science-Based Optimization",
      guideDesc: "Crop suitability is computed by calculating deviations between your input values and the crop statistics found in the agricultural datasets.",
      guideSoilTitle: "Guide to Soil Chemistry:",
      nitrogenDesc: "Nitrogen (N): Essential for vegetative crop growth, leaf coloring, and stem development.",
      phosphorusDesc: "Phosphorus (P): Drives root development, flower maturation, and seed formation.",
      potassiumDesc: "Potassium (K): Regulates water uptake, enzyme activation, and disease immunity.",
      soilPhDesc: "Soil pH: Controls nutrient availability. Most crops thrive in neutral pH (6.0 - 7.2).",
      suitabilityHint: "Computed suitability rank based on NPK deviation indexes.",
      compareTitle: "Side-by-Side Crop Comparison",
      compareDesc: "Compare soil, season, and yield requirements of any two crops to make informed planting decisions.",
      selectCrop1: "Select First Crop",
      selectCrop2: "Select Second Crop",
      soilCriteria: "Soil Chemistry Requirements",
      avgPriceRange: "Avg Market Price Range",
      waterDemand: "Water Resource Requirement",
      growingPeriod: "Harvest Cycle (Days)",
      noDataCompare: "Please select two different crops to see the side-by-side comparison matrix.",
      seasons: {
        kharif: "Kharif (Monsoon)",
        rabi: "Rabi (Winter)",
        summer: "Summer / Zaid"
      },
      soils: {
        alluvial: "Alluvial Soil",
        black: "Black Soil",
        red: "Red Soil",
        sandy: "Sandy Soil",
        clayey: "Clayey Soil",
        loamy: "Loamy Soil"
      }
    },
    disease: {
      title: "Leaf Disease Diagnostic Lab",
      subtitle: "Upload clear photos of crop leaves showing spots, wilting, or coloration. AgroBuddy AI will identify potential diseases and suggest remedies.",
      dragDrop: "Drag and drop leaf image here, or click to browse",
      support: "Supports JPG, PNG (Max 5MB)",
      selectedImage: "Selected leaf photo",
      diagnose: "Analyze Leaf",
      results: "Diagnostic Results",
      diseaseName: "Diagnosed Disease",
      symptoms: "Symptoms",
      causes: "Causes",
      organic: "Organic Treatment (Natural)",
      chemical: "Chemical Treatment",
      prevention: "Prevention Tips",
      sampleTitle: "Or select a sample leaf below to try it instantly:",
      samples: {
        blight: "Tomato Leaf Blight",
        blast: "Rice Leaf Blast",
        rust: "Wheat Rust",
        healthy: "Healthy Cotton Leaf"
      },
      printReport: "Print Diagnostic Report",
      printSub: "Leaf Disease Diagnostic Report",
      uploadTitle: "Upload Affected Leaf",
      loadingScan: "AI Leaf Scan in Progress",
      loadingSub: "Scanning spot geometry and color histograms...",
      waitingTitle: "Waiting for Image Input",
      waitingDesc: "Upload a leaf image on the left or select a sample leaf to view AI-powered diagnostic recommendations."
    },
    fertilizer: {
      title: "Precision Fertilizer Calculator",
      subtitle: "Calculate precise fertilizer requirements. Enter your target crop, soil type, and current NPK values to minimize costs and chemical runoff.",
      cropName: "Target Crop",
      deficits: "NPK Chemistry Analysis",
      recommendation: "Recommended Fertilizer Formulations",
      dosage: "Recommended Dosage",
      method: "Application Method",
      timing: "Best Time to Apply",
      notes: "Farmer Safety & Environmental Notes",
      optimalVal: "Target Optimal",
      currentVal: "Your Soil",
      stewardshipTitle: "Environmental Stewardship",
      stewardshipDesc: "Excessive nitrogen and phosphorus application causes chemical leaching into groundwater tables and creates algal blooms in nearby water bodies.",
      practicesTitle: "Recommended Practices:",
      practicesList: {
        split: "Split Applications: Do not apply all nitrogen at once. Divide it into basal and top-dressing phases.",
        moisture: "Moisture Check: Fertilizer must only be applied when soil moisture is adequate. Dry application can burn roots.",
        organic: "Organic Incorporation: Supplement chemical fertilizers with compost or farmyard manure to improve soil carbon indexing."
      },
      schedulerTitle: "Precision Fertilizer Dosage Timeline",
      scheduleBtn: "Generate Application Schedule",
      scheduleDesc: "A step-by-step application calendar dividing the NPK requirements into Basal and Top-Dressing splits for optimal root absorption and minimal runoff.",
      basalStage: "Basal Stage (At Sowing)",
      basalDesc: "Apply full Phosphorus (DAP) and Potassium (MOP) requirements to build strong root structures. Apply 1/3rd of Nitrogen (Urea).",
      topDressing1: "1st Top Dressing (Day 20-25)",
      topDressing1Desc: "Apply 1/3rd of Nitrogen (Urea) during the active vegetative growth phase. Ensure soil is moist.",
      topDressing2: "2nd Top Dressing (Day 45-50)",
      topDressing2Desc: "Apply the remaining 1/3rd of Nitrogen (Urea) and residual Potassium (MOP) during the flowering/panicle initiation stage.",
      weatherAlert: "Important Weather Safety Checklist",
      weatherAlertList: [
        "Do not apply fertilizer if heavy rain is forecast within 24 hours to prevent runoff.",
        "Postpone spraying or applying urea if wind speeds exceed 15 km/h to prevent chemical drift.",
        "Ensure field has adequate moisture. Never apply chemical granular fertilizer on dry soil."
      ],
      nLabel: "Current Soil Nitrogen (N) Level (mg/kg)",
      pLabel: "Current Soil Phosphorus (P) Level (mg/kg)",
      kLabel: "Current Soil Potassium (K) Level (mg/kg)",
      currentNPK: "Current N-P-K:"
    },
    weather: {
      title: "Agricultural Weather Dashboard",
      subtitle: "Real-time weather parameters and crop management recommendations powered by Open-Meteo & Nominatim.",
      searchLoc: "Enter Village, Town, or District name...",
      searchBtn: "Search Location",
      currentConditions: "Current Farming Conditions",
      temperature: "Air Temperature",
      humidity: "Relative Humidity",
      wind: "Wind Speed & Direction",
      rainfall: "Precipitation (Rain)",
      soilMoisture: "Soil Moisture (0 - 81 cm Depth)",
      advisoryTitle: "Agronomic Advisory & Weather Warnings",
      fiveDay: "5-Day Agricultural Forecast",
      high: "High",
      low: "Low",
      depth: {
        top: "Topsoil (0-1cm) - Seed Sowing Zone",
        mid: "Shallow Root (3-9cm) - Fertilizer Zone",
        deep: "Deep Root (27-81cm) - Subsoil Moisture"
      },
      searchPromptTitle: "Search for Weather Forecasts",
      searchPromptDesc: "Enter your village, town, or district name above to view real-time weather conditions, soil moisture metrics, and custom agricultural advisories.",
      waterContent: "Water Content",
      tempRange: "Temp Max/Min:",
      loadingDb: "Querying Nominatim and Open-Meteo databases...",
      fallbackWarning: "Unable to connect to Open-Meteo. Displaying regional farming fallback data.",
      notFoundWarning: "Location not found. Displaying fallback data.",
      serviceWarning: "Geocoding service unavailable. Using regional default coordinates."
    },
    market: {
      title: "Commodity Market Price Watch",
      subtitle: "Track current agricultural market rates and trends. Connect directly to official portals for transparent transactions.",
      searchCrop: "Search crops (e.g. Rice, Cotton, Chilli)...",
      crop: "Crop Name",
      marketName: "Market / Mandi",
      price: "Current Price (per Quintal)",
      trend: "Price Trend",
      advisory: "Market Advisory",
      portalLink: "Visit Official Agmarknet Portal",
      portalDesc: "For official daily updates across all Mandis in India, please visit the government portal.",
      trends: {
        up: "Rising (High Demand)",
        down: "Falling (Excess Supply)",
        stable: "Stable"
      },
      selectState: "Filter by State",
      allStates: "All States",
      states: {
        telangana: "Telangana",
        ap: "Andhra Pradesh",
        maharashtra: "Maharashtra",
        karnataka: "Karnataka",
        punjab: "Punjab",
        up: "Uttar Pradesh"
      },
      adviceTitle: "General Marketing Advice:",
      adviceDesc: "Prices listed above are indicative Mandi averages compiled from regional reporting structures. Actual quotes may vary depending on grain moisture level, fiber length, foreign matter percentages, and direct transaction agreements.",
      adviceWarning: "Always verify Mandi receipts and transport permits before releasing crops.",
      chatCalloutTitle: "Market Questions?",
      chatCalloutDesc: "Unsure whether to sell or store? Launch the AI Chatbot and ask questions like \"What is causing cotton prices to fluctuate?\" to receive a parsed supply-demand summary.",
      noMatch: "No matching commodities found. Try searching for \"Rice\", \"Cotton\", or \"Chilli\"."
    },
    about: {
      title: "About AgroBuddy AI",
      missionSubtitle: "Empowering Farmers Through Smart Agriculture",
      missionDesc: "AgroBuddy AI helps farmers make better decisions using weather insights, crop predictions, disease identification, fertilizer advice, and market intelligence. Our mission is to make modern agricultural knowledge accessible to every farmer.",
      whyTitle: "Why AgroBuddy AI?",
      features: {
        cropTitle: "Smart Crop Predictions",
        cropDesc: "Get crop suggestions based on soil conditions, season, and weather.",
        fertilizerTitle: "Fertilizer Guidance",
        fertilizerDesc: "Receive recommendations for efficient fertilizer usage.",
        diseaseTitle: "Disease & Pest Identification",
        diseaseDesc: "Identify crop diseases and learn prevention and treatment methods.",
        weatherTitle: "Weather-Based Advisory",
        weatherDesc: "Get weather forecasts and crop protection advice.",
        marketTitle: "Market Price Insights",
        marketDesc: "Monitor crop prices and make informed selling decisions.",
        profitTitle: "Better Profit Planning",
        profitDesc: "Reduce risk and improve farm profitability."
      },
      howTitle: "How It Works",
      steps: {
        step1: "Enter farm details",
        step2: "Analyze soil and weather conditions",
        step3: "Receive AI-powered recommendations",
        step4: "Improve crop productivity and profitability"
      },
      audienceTitle: "Who Can Use AgroBuddy AI?",
      audiences: {
        farmers: "Farmers",
        students: "Agriculture Students",
        advisors: "Agricultural Advisors",
        researchers: "Researchers"
      },
      visionTitle: "Our Vision",
      visionDesc: "To build a smart digital farming assistant that helps every farmer make informed, profitable, and sustainable agricultural decisions.",
      impactTitle: "Our Impact Metrics",
      impacts: {
        crops: "Crop Prediction",
        weather: "Weather Insights",
        disease: "Disease Identification",
        market: "Market Intelligence"
      }
    },
    analytics: {
      title: "Indian State Crop Analytics",
      subtitle: "Browse historical crop cultivation area and average productivity metrics per District, compiled from official crop production records.",
      selectState: "Select Indian State",
      selectDistrict: "Select District",
      cropShare: "Relative Area Cultivated Share",
      productivity: "Average Yield / Productivity",
      metricYield: "Tons per Hectare (t/ha)",
      selectPrompt: "Please select a state and district to view historical crop density and average yield statistics.",
      noRecords: "No records found for this selection.",
      insightTitle: "Agronomic Insights for",
      insightText: "The crops shown below represent the most widely cultivated and historically successful varieties in this district. Sowing these crops aligns with regional soil characteristics and climate history."
    }
  },
  te: {
    brand: "అగ్రోబడ్డీ AI",
    nav: {
      home: "హోమ్",
      chat: "AI చాట్‌బాట్",
      crop: "పంట అంచనా",
      disease: "తెగుళ్ళ గుర్తింపు",
      fertilizer: "ఎరువుల సలహా",
      weather: "వాతావరణ సమాచారం",
      market: "మార్కెట్ ధరలు",
      analytics: "రాష్ట్ర పంటల విశ్లేషణ",
      about: "మా గురించి",
      coreHeader: "వ్యవసాయ కోర్ సాధనాలు",
      otherHeader: "ఇతర విభాగాలు",
      sidebarExpand: "సైడ్‌బార్‌ను విస్తరించు",
      sidebarCollapse: "సైడ్‌బార్‌ను కుదించు"
    },
    common: {
      loading: "ప్రాసెస్ అవుతోంది...",
      submit: "వివరాలు సమర్పించండి",
      reset: "ఫారమ్ క్లియర్ చేయి",
      telugu: "తెలుగు",
      english: "English",
      select: "-- ఎంచుకోండి --",
      results: "విశ్లేషణ ఫలితాలు",
      backToHome: "తిరిగి హోమ్‌కి",
      explore: "పరికరాలను అన్వేషించండి",
      printCard: "సాయిల్ కార్డ్ ప్రింట్ / పిడిఎఫ్",
      printFertilizer: "ఎరువుల కార్డ్ ప్రింట్"
    },
    home: {
      heroTitle: "వ్యవసాయ AI సహాయంతో రైతులకు సాధికారత",
      heroSubtitle: "మీ వర్చువల్ వ్యవసాయ నిపుణుడు. శాస్త్రీయ పంట అంచనాలు, ఖచ్చితమైన ఎరువుల మార్గదర్శకత్వం, పంట తెగుళ్ల గుర్తింపు మరియు ప్రత్యక్ష వాతావరణ సలహాలను పొందండి.",
      startChat: "అగ్రోబడ్డీతో చాట్ చేయండి",
      tryTools: "పంట సలహాదారుని ప్రయత్నించండి",
      stats: {
        farmers: "50,000+ రైతులకు సహాయం",
        accuracy: "96.4% AI ఖచ్చితత్వ రేటు",
        crops: "22+ విశ్లేషించబడిన పంటలు",
        villages: "1,200+ గ్రామాలకు సేవలు"
      },
      benefits: {
        title: "అగ్రోబడ్డీ AIని ఎందుకు ఎంచుకోవాలి?",
        subtitle: "స్థానిక వ్యవసాయ పరిశోధన డేటాతో కూడిన అత్యాధునిక మెషిన్ లెర్నింగ్ అల్గారిథమ్స్ ఉపయోగం.",
        b1Title: "పంట దిగుబడిని పెంచండి",
        b1Desc: "మీ నేల రసాయన స్వభావం (N, P, K పోషకాలు) మరియు pH స్థాయిలకు తగినట్లుగా విత్తే సమయాలను ఎంచుకోండి.",
        b2Title: "ఖర్చులు తగ్గించండి",
        b2Desc: "పంట అవసరాలకు అనుగుణంగా ఎరువులను సమర్థవంతంగా వేయడం ద్వారా డబ్బు ఆదా చేసుకోండి.",
        b3Title: "తెగుళ్ల ముందస్తు గుర్తింపు",
        b3Desc: "ఆకు తెగుళ్లను త్వరగా గుర్తించి, సేంద్రీయ మరియు రసాయన నివారణ చర్యలను పొందండి.",
        b4Title: "వాతావరణ తట్టుకునే శక్తి",
        b4Desc: "ప్రత్యక్ష వాతావరణ అంచనాలు, నేల తేమ సెన్సార్లు మరియు వ్యవసాయ వాతావరణ హెచ్చరికలతో అప్రమత్తంగా ఉండండి."
      },
      cta: {
        title: "మీ వ్యవసాయాన్ని ఆధునీకరించడానికి సిద్ధంగా ఉన్నారా?",
        subtitle: "ఇంగ్లీష్ మరియు తెలుగు భాషలలో అందుబాటులో ఉంది. రైతులు, విద్యార్థులు మరియు సలహాదారులందరికీ సులభంగా అర్థమవుతుంది.",
        button: "ఇప్పుడే ప్రారంభించండి"
      }
    },
    chat: {
      title: "అగ్రోబడ్డీ AI అసిస్టెంట్",
      sidebarTitle: "చాట్ చరిత్ర",
      newChat: "కొత్త సంప్రదింపు",
      welcome: "నమస్కారం! నేను అగ్రోబడ్డీ, మీ వర్చువల్ వ్యవసాయ సలహాదారుని. ఈరోజు నేను మీకు ఎలా సహాయం చేయగలను? కింద ఉన్న బటన్లపై క్లిక్ చేయండి లేదా మీ ప్రశ్నను టైప్ చేయండి.",
      quickActions: {
        crop: "🌾 పంటల సిఫార్సు",
        disease: "🍂 తెగుళ్ళ సాయం",
        fertilizer: "🧪 ఎరువుల మోతాదు",
        weather: "🌧️ వాతావరణ సలహా",
        market: "📊 మార్కెట్ ధరలు"
      },
      placeholder: "అగ్రోబడ్డీని ఏదైనా అడగండి (ఉదా. 'టమోటా ఆకు మచ్చల నివారణ ఎలా?' లేదా 'ఉల్లిపాయ పంటకు ఏ ఎరువులు వాడాలి?')...",
      responses: {
        crop: "సాధారణ నేల రకాల ఆధారంగా అంచనా వేయబడిన ప్రధాన పంటలు ఇక్కడ ఉన్నాయి:\n\n• **ఒండ్రు నేలలు (Alluvial)**: వరి, గోధుమ, చెరకు, పత్తి (మధ్యస్థ NPK 80-40-40 అవసరం).\n• **నల్ల రేగడి నేలలు (Black Soil)**: పత్తి, సోయాబీన్స్, గోధుమ, మిరప (ఎక్కువ నత్రజని మరియు భాస్వరం అవసరం).\n• **ఎర్ర నేలలు (Red Soil)**: వేరుశనగ, జొన్నలు, సజ్జలు, పప్పుధాన్యాలు (తక్కువ నత్రజని ఉన్నా పెరుగుతాయి, పొటాషియం 40-20-30 అవసరం).\n• **ఇసుక నేలలు (Sandy)**: కొబ్బరి, జీడిపప్పు, పుచ్చకాయలు (సేంద్రీయ ఎరువులు, ఎక్కువ పొటాషియం అవసరం).\n\n**సీజన్ల వారీగా పంటలు**:\n• **ఖరీఫ్ (వర్షాకాలం)**: వరి, మొక్కజొన్న, పత్తి, వేరుశనగ.\n• **రబీ (చలికాలం)**: గోధుమ, ఆవాలు, శనగలు, బార్లీ.\n\n*మీ నేల యొక్క ఖచ్చితమైన NPK విలువల ఆధారంగా అంచనా కొరకు డ్యాష్‌బోర్డులోని 'పంట అంచనా' పేజీని ఉపయోగించవచ్చు.*",
        disease: "సాధారణ పంట తెగుళ్లు మరియు వాటి నివారణ చర్యలు:\n\n1. **ఆకు మచ్చ తెగులు (Tomato Early Blight)**:\n   • *లక్షణాలు*: పాత ఆకులపై గోధుమ రంగు గుండ్రటి మచ్చలు, చుట్టూ పసుపు రంగు వలయం.\n   • *నివారణ*: వేప నూనె (1%) పిచికారీ చేయండి లేదా మ్యాంకోజెబ్ (0.2%) రసాయన మందు వాడండి. పైనుండి నీరు పోయవద్దు.\n2. **అగ్గి తెగులు (Rice Blast)**:\n   • *లక్షణాలు*: ఆకులపై నూలు కండె ఆకారపు బూడిద రంగు మచ్చలు.\n   • *నివారణ*: ట్రైసైక్లాజోల్ 75 WP ఎకరాకు 120 గ్రాములు పిచికారీ చేయండి లేదా సూడోమోనాస్ ఫ్లోరోసెన్స్ వాడండి.\n3. **తుప్పు తెగులు (Wheat Rust)**:\n   • *లక్షణాలు*: ఆకుల ఉపరితలంపై నారింజ/గోధుమ రంగు పొడి బొబ్బలు.\n   • *నివారణ*: ప్రొపికోనజోల్ 25 EC మందు పిచికారీ చేయండి. తెగులు తట్టుకునే రకాల విత్తనాలను వాడండి.",
        fertilizer: "NPK ఎరువుల మోతాదు మరియు వాడే విధానం:\n\n• **యూరియా (నత్రజని ఆధారం)**: మొక్క పచ్చదనం మరియు వేగవంతమైన ఎదుగుదలకు అవసరం. ఎకరాకు 50 కిలోల యూరియాను నాటినప్పుడు మరియు పిలకలు తొడిగే దశలలో 2-3 సార్లు విభజించి తగినంత తేమ ఉన్నప్పుడు వేయాలి.\n• **DAP (భాస్వరం మరియు నత్రజని)**: దీనిని విత్తే సమయంలో మాత్రమే వేయాలి. ఇది వేర్ల బలమైన ఎదుగుదలకు తోడ్పడుతుంది. సాధారణ మోతాదు: ఎకరాకు 40 కిలోలు.\n• **MOP (పొటాషియం ఆధారం)**: పంటలలో రోగనిరోధక శక్తిని మరియు కరువును తట్టుకునే సామర్థ్యాన్ని పెంచుతుంది. సాధారణ మోతాదు: ఎకరాకు 20-30 కిలోలు.\n\n*ముఖ్యమైన సూచన: తడి లేని పొడి నేలలో రసాయన ఎరువులు వేయవద్దు; ఎల్లప్పుడూ నేలలో తగినంత తేమ ఉండేలా చూసుకోండి.*",
        weather: "వ్యవసాయ వాతావరణ మరియు పిచికారీ సలహాలు:\n\n1. **మందు పిచికారీ సమయం**: గాలి వేగం గంటకు 15 కి.మీ కంటే ఎక్కువగా ఉంటే పిచికారీ నిలిపివేయండి. ఉదయం (6-9 గంటల మధ్య) లేదా సాయంత్రం వేళల్లో పిచికారీ చేయడం ఉత్తమం.\n2. **వర్షపాత సూచన**: రాబోయే 24 గంటల్లో భారీ వర్ష సూచన ఉంటే ఎరువులు వేయడం వాయిదా వేయండి. వర్షపు నీటితో ఎరువులు కొట్టుకుపోయి వృథా అవుతాయి మరియు భూగర్భ జలాలు కలుషితమవుతాయి.\n3. **ఉష్ణోగ్రత ఒత్తిడి**: ఎండలు ఎక్కువగా ఉన్నప్పుడు (>38°C), ఉష్ణోగ్రత ఒత్తిడి తగ్గించడానికి ఉదయం లేదా సాయంత్రం వేళల్లో నీటి తడులు ఇవ్వండి. నేల తేమను కాపాడటానికి మల్చింగ్ పద్ధతిని వాడండి.",
        market: "తెలుగు రాష్ట్రాల ప్రధాన మార్కెట్లలో సగటు పంటల ధరల వివరాలు (క్వింటాల్‌కు):\n\n• **వరి (సాధారణ రకం)**: ₹2,183 - ₹2,300 (స్థిరంగా ఉంది)\n• **పత్తి (నాణ్యమైనది)**: ₹7,100 - ₹7,450 (డిమాండ్ పెరుగుతోంది)\n• **మొక్కజొన్న**: ₹1,960 - ₹2,100 (స్థిరంగా ఉంది)\n• **ఎండుమిర్చి (తేజ రకం)**: ₹19,500 - ₹21,200 (కొత్త సరుకు వల్ల స్వల్పంగా తగ్గుతోంది)\n• **పసుపు**: ₹11,200 - ₹12,500 (ధరలు పెరుగుతున్నాయి)\n\n*తాజా లైవ్ మార్కెట్ ధరల కొరకు మార్కెట్ ధరల డ్యాష్‌బోర్డును సందర్శించవచ్చు.*"
      }
    },
    crop: {
      title: "AI పంట అనుకూలత సలహాదారు",
      subtitle: "నేల స్వభావం, pH మరియు NPK రసాయన విలువలను నమోదు చేయండి. మీ నేలకు సరిపోయే ఉత్తమ పంటను అగ్రోబడ్డీ AI గుర్తిస్తుంది.",
      soilType: "నేల రకం",
      ph: "నేల pH విలువ",
      n: "నైట్రోజన్ (N) స్థాయి (mg/kg)",
      p: "ఫాస్ఫరస్ (P) స్థాయి (mg/kg)",
      k: "పొటాషియం (K) స్థాయి (mg/kg)",
      season: "వ్యవసాయ సీజన్",
      recsTitle: "మీ నేలకు సిఫార్సు చేయబడిన పంటలు",
      score: "అనుకూలత స్కోరు",
      yield: "ఆశించే దిగుబడి",
      reasons: "ఈ పంటను సిఫార్సు చేయడానికి కారణాలు:",
      optimal: "ఈ పంటకు కావలసిన సరైన N-P-K విలువలు",
      topRecHeader: "అత్యంత సిఫార్సు చేయబడిన పంట",
      altCropsHeader: "ఇతర ప్రత్యామ్నాయ పంటలు",
      guideTitle: "శాస్త్రీయ ఆధారిత ఆప్టిమైజేషన్",
      guideDesc: "నేల రసాయన విలువలు మరియు పంట గణాంకాల మధ్య వ్యత్యాసాన్ని లెక్కించడం ద్వారా పంట అనుకూలత నిర్ణయించబడుతుంది.",
      guideSoilTitle: "నేల రసాయన శాస్త్ర మార్గదర్శకాలు:",
      nitrogenDesc: "నైట్రోజన్ (N): ఆకులు మరియు కాండం ఎదుగుదలకు, ఆకుపచ్చ రంగుకు అవసరం.",
      phosphorusDesc: "ఫాస్ఫరస్ (P): వేర్ల అభివృద్ధికి, పువ్వులు మరియు విత్తనాలు పక్వానికి రావడానికి సహాయపడుతుంది.",
      potassiumDesc: "పొటాషియం (K): నీటి లభ్యతను క్రమబద్ధీకరిస్తుంది, వ్యాధి నిరోధక శక్తిని పెంచుతుంది.",
      soilPhDesc: "నేల pH: పోషకాల లభ్యతను నియంత్రిస్తుంది. చాలా పంటలు తటస్థ pH (6.0 - 7.2) లో బాగా పెరుగుతాయి.",
      suitabilityHint: "నేల NPK లోపాల ఆధారంగా లెక్కించబడిన అనుకూలత ర్యాంకు.",
      compareTitle: "పంటల పోలిక పట్టిక",
      compareDesc: "రెండు పంటల నేల అవసరాలు, కాలవ్యవధి మరియు దిగుబడి ప్రమాణాలను పక్కపక్కనే పోల్చి నిర్ణయం తీసుకోండి.",
      selectCrop1: "మొదటి పంటను ఎంచుకోండి",
      selectCrop2: "రెండవ పంటను ఎంచుకోండి",
      soilCriteria: "నేల రసాయన అవసరాలు",
      avgPriceRange: "సగటు మార్కెట్ ధర (క్వింటాల్‌కు)",
      waterDemand: "నీటి అవసరం",
      growingPeriod: "పంట కాలవ్యవధి (రోజులు)",
      noDataCompare: "పక్కపక్కన పోలిక పట్టికను చూడటానికి దయచేసి రెండు వేర్వేరు పంటలను ఎంచుకోండి.",
      seasons: {
        kharif: "ఖరీఫ్ (వర్షాకాలం)",
        rabi: "రబీ (చలికాలం)",
        summer: "సమ్మర్ / జైద్"
      },
      soils: {
        alluvial: "ఒండ్రు నేల (Alluvial)",
        black: "నల్ల రేగడి నేల (Black Soil)",
        red: "ఎర్ర నేల (Red Soil)",
        sandy: "ఇసుక నేల (Sandy)",
        clayey: "బంకమట్టి నేల (Clayey)",
        loamy: "దుమ్ము నేల (Loamy)"
      }
    },
    disease: {
      title: "ఆకు తెగుళ్ళ నిర్ధారణ కేంద్రం",
      subtitle: "మచ్చలు, వాడిపోవడం లేదా రంగు మారిన పంట ఆకుల ఫోటోలను అప్‌లోడ్ చేయండి. అగ్రోబడ్డీ AI తెగుళ్లను గుర్తించి చికిత్సలను సూచిస్తుంది.",
      dragDrop: "ఆకు ఫోటోను ఇక్కడ డ్రాప్ చేయండి లేదా క్లిక్ చేసి ఎంచుకోండి",
      support: "JPG, PNG సపోర్ట్ చేస్తుంది (గరిష్టంగా 5MB)",
      selectedImage: "ఎంచుకున్న ఆకు ఫోటో",
      diagnose: "చిత్రాన్ని విశ్లేషించండి",
      results: "నిర్ధారణ ఫలితాలు",
      diseaseName: "గుర్తించిన తెగులు",
      symptoms: "లక్షణాలు",
      causes: "కారణాలు",
      organic: "సేంద్రీయ చికిత్స (సహజ నివారణలు)",
      chemical: "రసాయన చికిత్స",
      prevention: "ముందస్తు జాగ్రత్తలు",
      sampleTitle: "లేదా వెంటనే పరీక్షించడానికి కింద ఉన్న ఆకు నమూనాను ఎంచుకోండి:",
      samples: {
        blight: "టమోటా ఆకు తెగులు (Blight)",
        blast: "వరి అగ్గి తెగులు (Blast)",
        rust: "గోధుమ కుంకుమ తెగులు (Rust)",
        healthy: "ఆరోగ్యకరమైన పత్తి ఆకు"
      },
      printReport: "రిపోర్ట్ ప్రింట్ / పిడిఎఫ్",
      printSub: "ఆకు తెగుళ్ళ నిర్ధారణ నివేదిక",
      uploadTitle: "ఆకు ఫోటోను అప్‌లోడ్ చేయండి",
      loadingScan: "AI ద్వారా ఆకు విశ్లేషణ జరుగుతోంది...",
      loadingSub: "ఆకు మచ్చలు మరియు రంగుల శాతాలను స్కాన్ చేస్తోంది...",
      waitingTitle: "ఆకు ఫోటో కొరకు వేచి ఉంది",
      waitingDesc: "AI చికిత్స సలహాలను చూడటానికి ఎడమ వైపున ఆకు ఫోటోను అప్‌లోడ్ చేయండి లేదా నమూనా ఆకును ఎంచుకోండి."
    },
    fertilizer: {
      title: "ఎరువుల మోతాదు కాలిక్యులేటర్",
      subtitle: "ఎరువుల మోతాదును లెక్కించండి. ఖర్చులు తగ్గించుకోవడానికి నేల రకం మరియు NPK విలువలను నమోదు చేయండి.",
      cropName: "లక్ష్య పంట",
      deficits: "నేల NPK రసాయన విశ్లేషణ",
      recommendation: "సిఫార్సు చేయబడిన ఎరువులు",
      dosage: "సిఫార్సు చేయబడిన మోతాదు",
      method: "వేసే విధానం",
      timing: "ఎప్పుడు వేయాలి",
      notes: "రైతుల భద్రత & పర్యావరణ సూచనలు",
      optimalVal: "కావలసిన సరైన స్థాయి",
      currentVal: "మీ నేల విలువ",
      stewardshipTitle: "పర్యావరణ సంరక్షణ",
      stewardshipDesc: "నైట్రోజన్ మరియు ఫాస్ఫరస్ అధికంగా వాడటం వల్ల భూగర్భ జలాలు కలుషితమై సమీప జలవనరులలో నాచు పేరుకుపోతుంది.",
      practicesTitle: "సిఫార్సు చేయబడిన పద్ధతులు:",
      practicesList: {
        split: "విడతల వారీగా వేయడం: నైట్రోజన్‌ను ఒకేసారి వేయకుండా నాటేటప్పుడు మరియు ఎదుగుదల దశల్లో విడతలుగా వేయండి.",
        moisture: "తేమ తనిఖీ: నేలలో తగినంత తేమ ఉన్నప్పుడు మాత్రమే ఎరువులు వేయాలి. పొడి నేలపై వేస్తే వేర్లు దెబ్బతింటాయి.",
        organic: "సేంద్రీయ కలయిక: రసాయన ఎరువులతో పాటు కంపోస్ట్ లేదా పశువుల ఎరువును కలిపి వాడటం వల్ల నేల సారం పెరుగుతుంది."
      },
      schedulerTitle: "ఎరువుల మోతాదు కాలక్రమం",
      scheduleBtn: "ఎరువుల పట్టికను రూపొందించు",
      scheduleDesc: "ఎరువుల రసాయన పోషకాలు వేర్లకు బాగా అంది, వృథా కాకుండా ఉండటానికి అవసరమైన ఎరువులను బేసల్ మరియు టాప్-డ్రెస్సింగ్ దశలుగా విభజించిన కాలపట్టిక.",
      basalStage: "మొదటి దశ (విత్తే సమయంలో)",
      basalDesc: "బలమైన వేర్ల ఎదుగుదల కోసం పూర్తి ఫాస్ఫరస్ (DAP) మరియు పొటాషియం (MOP) వేయండి. 1/3 వంతు నత్రజని (యూరియా) వేయండి.",
      topDressing1: "రెండవ దశ (20-25 రోజులలో)",
      topDressing1Desc: "మొక్క ఎదుగుదల దశలో 1/3 వంతు నత్రజని (యూరియా) ఎరువును వేయాలి. పొలంలో తగినంత తేమ ఉండేలా చూసుకోవాలి.",
      topDressing2: "మూడవ దశ (45-50 రోజులలో)",
      topDressing2Desc: "మిగిలిన 1/3 వంతు యూరియా మరియు మిగిలిన పొటాషియం (MOP) ఎరువులను పూత/పొట్ట దశలో వేయాలి.",
      weatherAlert: "キーలక వాతావరణ భద్రతా తనిఖీ",
      weatherAlertList: [
        "రాబోయే 24 గంటల్లో భారీ వర్ష సూచన ఉంటే ఎరువులు వేయడం వాయిదా వేయండి.",
        "గాలి వేగం గంటకు 15 కిమీ కంటే ఎక్కువగా ఉంటే పిచికారీ చేయడం నిలిపివేయండి.",
        "నేలలో తగినంత తేమ ఉన్నప్పుడు మాత్రమే రసాయన ఎరువులు వేయండి, పొడి నేలపై వేయవద్దు."
      ],
      nLabel: "నేలలో నైట్రోజన్ (N) స్థాయి (mg/kg)",
      pLabel: "నేలలో ఫాస్ఫరస్ (P) స్థాయి (mg/kg)",
      kLabel: "నేలలో పొటాషియం (K) స్థాయి (mg/kg)",
      currentNPK: "ప్రస్తుత NPK విలువలు:"
    },
    weather: {
      title: "వ్యవసాయ వాతావరణ సమాచారం",
      subtitle: "ఓపెన్-మీటియో & నోమినాటిమ్ ద్వారా నిజ-సమయ వాతావరణ పారామితులు మరియు పంట నిర్వహణ సిఫార్సులు.",
      searchLoc: "గ్రామం, పట్టణం లేదా జిల్లా పేరు నమోదు చేయండి...",
      searchBtn: "వెతకండి",
      currentConditions: "ప్రస్తుత వ్యవసాయ పరిస్థితులు",
      temperature: "గాలి ఉష్ణోగ్రత",
      humidity: "సాపేక్ష తేమ",
      wind: "గాలి వేగం & దిశ",
      rainfall: "వర్షపాతం (Rain)",
      soilMoisture: "నేల తేమ (0 - 81 సెం.మీ లోతు)",
      advisoryTitle: "వ్యవసాయ సలహాలు & వాతావరణ హెచ్చరికలు",
      fiveDay: "5 రోజుల వ్యవసాయ వాతావరణ అంచనా",
      high: "గరిష్ట",
      low: "కనిష్ట",
      depth: {
        top: "పై పొర (0-1 సెం.మీ) - విత్తనాలు నాటే జోన్",
        mid: "మధ్య పొర (3-9 సెం.మీ) - ఎరువులు వేసే జోన్",
        deep: "లోపలి పొర (27-81 సెం.మీ) - భూగర్భ తేమ"
      },
      searchPromptTitle: "వాతావరణ సమాచారం కోసం వెతకండి",
      searchPromptDesc: "నిజ-సమయ వాతావరణ పరిస్థితులు, నేల తేమ శాతాలు మరియు పంట సలహాలను చూడటానికి పైన మీ గ్రామం, పట్టణం లేదా జిల్లా పేరును నమోదు చేయండి.",
      waterContent: "నీటి శాతం",
      tempRange: "ఉష్ణోగ్రత గరిష్ట/కనిష్ట:",
      loadingDb: "వాతావరణ సమాచారాన్ని సేకరిస్తోంది...",
      fallbackWarning: "ఓపెన్-మీటియో కనెక్ట్ కాలేదు. వ్యవసాయ వాతావరణ ప్రత్యామ్నాయ సమాచారం చూపబడుతోంది.",
      notFoundWarning: "స్థానం లభించలేదు. ప్రత్యామ్నాయ వాతావరణ సమాచారం చూపబడుతోంది.",
      serviceWarning: "లొకేషన్ సర్వీస్ అందుబాటులో లేదు. డిఫాల్ట్ ప్రాంతీయ సమాచారాన్ని ఉపయోగిస్తున్నాము."
    },
    market: {
      title: "వ్యవసాయ మార్కెట్ ధరల పట్టిక",
      subtitle: "ప్రస్తుత వ్యవసాయ మార్కెట్ ధరలు మరియు ట్రెండ్‌లను పర్యవేక్షించండి. పారదర్శక లావాదేవీల కోసం అధికారిక పోర్టల్‌లకు కనెక్ట్ అవ్వండి.",
      searchCrop: "పంట పేరును వెతకండి (ఉదా. వరి, పత్తి, మిర్చి)...",
      crop: "పంట పేరు",
      marketName: "మార్కెట్ / మండి",
      price: "ప్రస్తుత ధర (క్వింటాల్‌కు)",
      trend: "ధర ట్రెండ్",
      advisory: "మార్కెట్ సలహా",
      portalLink: "అధికారిక అగ్మార్క్‌నెట్ పోర్టల్‌ను సందర్శించండి",
      portalDesc: "భారతదేశంలోని అన్ని మార్కెట్ల రోజువారీ అధికారిక ధరల నవీకరణల కోసం ప్రభుత్వ పోర్టల్‌ను సందర్శించండి.",
      trends: {
        up: "పెరుగుతోంది (ఎక్కువ డిమాండ్)",
        down: "తగ్గుతోంది (ఎక్కువ సరుకు)",
        stable: "స్థిరంగా ఉంది"
      },
      selectState: "రాష్ట్రం వారీగా వడపోత",
      allStates: "అన్ని రాష్ట్రాలు",
      states: {
        telangana: "తెలంగాణ",
        ap: "ఆంధ్రప్రదేశ్",
        maharashtra: "మహారాష్ట్ర",
        karnataka: "కర్ణాటక",
        punjab: "పంజాబ్",
        up: "ఉత్తర ప్రదేశ్"
      },
      adviceTitle: "సాధారణ మార్కెటింగ్ సలహా:",
      adviceDesc: "పైన పేర్కొన్న ధరలు ప్రాంతీయ నివేదికల ఆధారంగా అంచనా వేసిన సగటు మార్కెట్ (మండి) ధరలు. ధాన్యంలో తేమ శాతం, నాణ్యత మరియు ఇతర అంశాల ఆధారంగా వాస్తవ ధరలు మారవచ్చు.",
      adviceWarning: "పంటను అప్పగించే ముందు ఎల్లప్పుడూ మండి రశీదులు మరియు రవాణా అనుమతులను సరిచూసుకోండి.",
      chatCalloutTitle: "మార్కెట్ సందేహాలు ఉన్నాయా?",
      chatCalloutDesc: "పంటను ఇప్పుడే అమ్మాలా లేదా నిల్వ ఉంచాలా అని సందేహంగా ఉందా? చాట్‌బాట్‌ని ఓపెన్ చేసి \"పత్తి ధరల మార్పులకు గల కారణాలు ఏమిటి?\" వంటి ప్రశ్నలు అడగండి.",
      noMatch: "సరిపోలే పంటల వివరాలు లభించలేదు. \"వరి\", \"పత్తి\", లేదా \"మిర్చి\" అని వెతికి చూడండి."
    },
    about: {
      title: "అగ్రోబడ్డీ AI గురించి",
      missionSubtitle: "స్మార్ట్ వ్యవసాయం ద్వారా రైతులకు సాధికారత",
      missionDesc: "వాతావరణ సమాచారం, పంట అంచనాలు, తెగుళ్ల గుర్తింపు చర్యలు, ఎరువుల సలహాలు మరియు మార్కెట్ ధరలను ఉపయోగించి రైతులు సరైన నిర్ణయాలు తీసుకోవడానికి అగ్రోబడ్డీ AI సహాయపడుతుంది. ఆధునిక వ్యవసాయ పరిజ్ఞానాన్ని ప్రతి రైతుకూ అందుబాటులోకి తీసుకురావడమే మా లక్ష్యం.",
      whyTitle: "అగ్రోబడ్డీ AIని ఎందుకు ఎంచుకోవాలి?",
      features: {
        cropTitle: "స్మార్ట్ పంట అంచనాలు",
        cropDesc: "నేల రకం, సీజన్ మరియు వాతావరణ పరిస్థితుల ఆధారంగా పంట అంచనాలు పొందండి.",
        fertilizerTitle: "ఎరువుల మార్గదర్శకత్వం",
        fertilizerDesc: "ఎరువుల సమర్థవంతమైన వినియోగానికి ఖచ్చితమైన మోతాదుల సలహాలు పొందండి.",
        diseaseTitle: "తెగుళ్ళు & కీటకాల గుర్తింపు",
        diseaseDesc: "పంట తెగుళ్లను గుర్తించి, వాటి నివారణ మరియు చికిత్సా పద్ధతులను తెలుసుకోండి.",
        weatherTitle: "వాతావరణ ఆధారిత సలహాలు",
        weatherDesc: "వాతావరణ అంచనాలు మరియు పంట రక్షణ సలహాలను పొందండి.",
        marketTitle: "మార్కెట్ ధరల విశ్లేషణ",
        marketDesc: "పంట మార్కెట్ ధరలను పర్యవేక్షించి, అమ్మకంపై సరైన నిర్ణయాలు తీసుకోండి.",
        profitTitle: "మెరుగైన లాభాల ప్రణాళిక",
        profitDesc: "నష్టాలను తగ్గించి, వ్యవసాయ లాభదాయకతను మెరుగుపరుచుకోండి."
      },
      howTitle: "ఇది ఎలా పనిచేస్తుంది?",
      steps: {
        step1: "వ్యవసాయ వివరాలను నమోదు చేయండి",
        step2: "నేల మరియు వాతావరణ పరిస్థితుల విశ్లేషణ",
        step3: "AI-ఆధారిత సిఫార్సులను పొందండి",
        step4: "పంట ఉత్పాదకత మరియు లాభాలను మెరుగుపరచండి"
      },
      audienceTitle: "అగ్రోబడ్డీ AIని ఎవరు ఉపయోగించవచ్చు?",
      audiences: {
        farmers: "రైతులు",
        students: "వ్యవసాయ విద్యార్థులు",
        advisors: "వ్యవసాయ సలహాదారులు",
        researchers: "పరిశోధకులు"
      },
      visionTitle: "మా విజన్",
      visionDesc: "ప్రతి రైతు సరైన, లాభదాయకమైన మరియు స్థిరమైన వ్యవసాయ నిర్ణయాలు తీసుకోవడానికి సహాయపడే ఒక స్మార్ట్ డిజిటల్ వ్యవసాయ సహాయకుడిని నిర్మించడం.",
      impactTitle: "మా ప్రభావ గణాంకాలు",
      impacts: {
        crops: "పంటల అంచనా",
        weather: "వాతావరణ సమాచారం",
        disease: "తెగుళ్ళ గుర్తింపు",
        market: "మార్కెట్ ఇంటెలిజెన్స్"
      }
    },
    analytics: {
      title: "భారతీయ రాష్ట్రాల పంటల విశ్లేషణ",
      subtitle: "అధికారిక ప్రభుత్వ రికార్డుల నుండి సేకరించిన ప్రతి జిల్లా యొక్క చారిత్రక పంట సాగు వైశాల్యం మరియు సగటు దిగుబడి వివరాలను ఇక్కడ చూడవచ్చు.",
      selectState: "రాష్ట్రాన్ని ఎంచుకోండి",
      selectDistrict: "జిల్లాను ఎంచుకోండి",
      cropShare: "సాగు వైశాల్యం వాటా (%)",
      productivity: "సగటు దిగుబడి",
      metricYield: "హెక్టారుకు టన్నులు (t/ha)",
      selectPrompt: "చారిత్రక పంట సాగు శాతం మరియు దిగుబడి వివరాలను చూడటానికి దయచేసి రాష్ట్రం మరియు జిల్లాను ఎంచుకోండి.",
      noRecords: "ఎంచుకున్న వివరాలకు ఎటువంటి రికార్డులు లభించలేదు.",
      insightTitle: "వ్యవసాయ సలహా -",
      insightText: "కింద చూపిన పంటలు ఈ జిల్లాలో అత్యధికంగా సాగు చేయబడుతూ, చారిత్రకంగా విజయవంతమైనవి. ఇవి ఈ ప్రాంతపు నేల స్వభావానికి మరియు శీతోష్ణస్థితికి అత్యంత అనుకూలమైనవి."
    }
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('agrobuddy_lang') || 'en';
  });

  useEffect(() => {
    localStorage.setItem('agrobuddy_lang', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'te' : 'en'));
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        // Fallback to English if Telugu translation is missing
        let enResult = translations['en'];
        for (const enKey of keys) {
          if (enResult && enResult[enKey] !== undefined) {
            enResult = enResult[enKey];
          } else {
            return path; // Return key path if not found anywhere
          }
        }
        return enResult;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
