// Heuristics compiled from Crop_recommendation.csv and fertilizer_recommendation.csv
// Supports English & Telugu localization dynamically based on language state.

export const cropRules = [
  {
    nameEn: "Rice",
    nameTe: "వరి",
    id: "rice",
    season: "kharif",
    soilTypes: ["clayey", "alluvial", "loamy"],
    optimal: { n: 80, p: 47, k: 40, ph: 6.5 },
    minRainfall: 180,
    maxRainfall: 300,
    phRange: [5.0, 7.8],
    expectedYieldEn: "4.5 - 6.2 Tons / Hectare",
    expectedYieldTe: "4.5 - 6.2 టన్నులు / హెక్టారుకు",
    descriptionEn: "Requires high water retaining clayey or alluvial soils and high rainfall. High nitrogen requirement during growth stages.",
    descriptionTe: "నీటిని నిల్వ ఉంచే బంకమట్టి లేదా ఒండ్రు నేలలు మరియు ఎక్కువ వర్షపాతం అవసరం. పంట ఎదుగుదల దశల్లో ఎక్కువ నైట్రోజన్ అవసరం.",
  },
  {
    nameEn: "Maize",
    nameTe: "మొక్కజొన్న",
    id: "maize",
    season: "summer",
    soilTypes: ["loamy", "alluvial", "sandy"],
    optimal: { n: 78, p: 48, k: 20, ph: 6.2 },
    minRainfall: 60,
    maxRainfall: 110,
    phRange: [5.5, 7.5],
    expectedYieldEn: "3.5 - 5.0 Tons / Hectare",
    expectedYieldTe: "3.5 - 5.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Grows best in well-drained loamy soils. Moderate rainfall and temperature are ideal.",
    descriptionTe: "నీరు నిల్వ ఉండకుండా ఇంకిపోయే దుమ్ము నేలల్లో బాగా పెరుగుతుంది. మధ్యస్థ వర్షపాతం మరియు వేడి వాతావరణం అనుకూలం.",
  },
  {
    nameEn: "Chickpea",
    nameTe: "శనగలు",
    id: "chickpea",
    season: "rabi",
    soilTypes: ["black", "loamy", "clayey"],
    optimal: { n: 40, p: 68, k: 80, ph: 7.2 },
    minRainfall: 65,
    maxRainfall: 95,
    phRange: [6.0, 8.8],
    expectedYieldEn: "1.8 - 2.5 Tons / Hectare",
    expectedYieldTe: "1.8 - 2.5 టన్నులు / హెక్టారుకు",
    descriptionEn: "A winter (rabi) crop that grows best in residual moisture. Prefers neutral to alkaline soils.",
    descriptionTe: "చలికాలంలో పండే పంట, నేలలో ఉండే తేమ ఆధారంగా పెరుగుతుంది. తటస్థ లేదా క్షార గుణం కలిగిన నేలలు అనుకూలం.",
  },
  {
    nameEn: "Kidney Beans",
    nameTe: "రాజ్మా",
    id: "kidneybeans",
    season: "rabi",
    soilTypes: ["loamy", "alluvial", "red"],
    optimal: { n: 20, p: 65, k: 20, ph: 5.7 },
    minRainfall: 60,
    maxRainfall: 150,
    phRange: [5.5, 6.0],
    expectedYieldEn: "1.2 - 2.0 Tons / Hectare",
    expectedYieldTe: "1.2 - 2.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Requires moderate climate and slightly acidic to neutral soils with good drainage.",
    descriptionTe: "మితమైన శీతోష్ణస్థితి, కొద్దిగా ఆమ్ల గుణం కలిగిన బాగా ఎండిపోయే నేలలు దీనికి అనుకూలం.",
  },
  {
    nameEn: "Pigeon Peas",
    nameTe: "కందులు",
    id: "pigeonpeas",
    season: "kharif",
    soilTypes: ["red", "loamy", "black"],
    optimal: { n: 20, p: 68, k: 20, ph: 5.8 },
    minRainfall: 90,
    maxRainfall: 200,
    phRange: [4.5, 7.5],
    expectedYieldEn: "1.5 - 2.2 Tons / Hectare",
    expectedYieldTe: "1.5 - 2.2 టన్నులు / హెక్టారుకు",
    descriptionEn: "Highly drought-tolerant legume. Excellent for intercropping in dry regions.",
    descriptionTe: "అతి తక్కువ వర్షపాతం గల ప్రాంతాల్లో కూడా పండే కరువు తట్టుకునే పంట. ఇతర పంటలతో కలిపి వేయడానికి అనుకూలం.",
  },
  {
    nameEn: "Mungbean",
    nameTe: "పెసర్లు",
    id: "mungbean",
    season: "summer",
    soilTypes: ["sandy", "loamy", "black"],
    optimal: { n: 18, p: 48, k: 20, ph: 6.7 },
    minRainfall: 36,
    maxRainfall: 60,
    phRange: [6.2, 7.2],
    expectedYieldEn: "1.0 - 1.6 Tons / Hectare",
    expectedYieldTe: "1.0 - 1.6 టన్నులు / హెక్టారుకు",
    descriptionEn: "Short duration crop that requires minimal water and thrives in warm temperatures.",
    descriptionTe: "తక్కువ వ్యవధిలో పండే పంట, తక్కువ నీరు అవసరం. అధిక ఉష్ణోగ్రత ఉన్న వేసవిలో బాగా పెరుగుతుంది.",
  },
  {
    nameEn: "Cotton",
    nameTe: "పత్తి",
    id: "cotton",
    season: "kharif",
    soilTypes: ["black", "clayey"],
    optimal: { n: 100, p: 50, k: 40, ph: 7.5 },
    minRainfall: 500,
    maxRainfall: 1000,
    phRange: [6.0, 8.5],
    expectedYieldEn: "2.0 - 3.2 Tons / Hectare",
    expectedYieldTe: "2.0 - 3.2 టన్నులు / హెక్టారుకు",
    descriptionEn: "Deep black soil (Regur) is ideal for retaining moisture during hot weather.",
    descriptionTe: "తేమను నిల్వ ఉంచే లోతైన నల్లరేగడి నేలలు దీనికి ఎంతో అనుకూలం.",
  },
  {
    nameEn: "Wheat",
    nameTe: "గోధుమ",
    id: "wheat",
    season: "rabi",
    soilTypes: ["loamy", "clayey", "alluvial"],
    optimal: { n: 90, p: 50, k: 35, ph: 6.8 },
    minRainfall: 400,
    maxRainfall: 800,
    phRange: [6.0, 7.5],
    expectedYieldEn: "3.8 - 4.5 Tons / Hectare",
    expectedYieldTe: "3.8 - 4.5 టన్నులు / హెక్టారుకు",
    descriptionEn: "Cool weather crop. Requires moderate irrigation during critical crown root initiation stages.",
    descriptionTe: "చలి వాతావరణంలో పండే పంట. వేర్లు వచ్చే దశల్లో తగిన మోతాదులో నీటి పారుదల అవసరం.",
  },
  {
    nameEn: "Tomato",
    nameTe: "టమోటా",
    id: "tomato",
    season: "summer",
    soilTypes: ["loamy", "alluvial", "sandy"],
    optimal: { n: 90, p: 40, k: 90, ph: 6.2 },
    minRainfall: 50,
    maxRainfall: 100,
    phRange: [5.5, 7.0],
    expectedYieldEn: "15.0 - 25.0 Tons / Hectare",
    expectedYieldTe: "15.0 - 25.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Thrives in warm weather and well-drained loamy soils. Requires consistent watering and high Potassium for fruit sizing.",
    descriptionTe: "వెచ్చని వాతావరణం మరియు నీరు నిల్వ ఉండని లోమీ నేలల్లో బాగా పెరుగుతుంది. కాయ సైజు పెరగడానికి స్థిరంగా నీటి తడులు మరియు ఎక్కువ పొటాషియం అవసరం.",
  },
  {
    nameEn: "Potato",
    nameTe: "ఆలుగడ్డ",
    id: "potato",
    season: "rabi",
    soilTypes: ["sandy", "loamy"],
    optimal: { n: 120, p: 60, k: 120, ph: 5.5 },
    minRainfall: 40,
    maxRainfall: 80,
    phRange: [5.0, 6.5],
    expectedYieldEn: "20.0 - 30.0 Tons / Hectare",
    expectedYieldTe: "20.0 - 30.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Cool-season tuber crop. Prefers loose, sandy loam soil with acidic pH to prevent scab diseases. Heavy potash feeder.",
    descriptionTe: "చలికాలంలో పండే దుంప పంట. బంగాళాదుంపకు గజ్జి తెగులు రాకుండా ఉండటానికి కొద్దిగా ఆమ్ల గుణం గల ఇసుక నేలలు అనుకూలం. ఎక్కువ పొటాష్ అవసరం.",
  },
  {
    nameEn: "Onion",
    nameTe: "ఉల్లిపాయ",
    id: "onion",
    season: "rabi",
    soilTypes: ["loamy", "alluvial", "sandy"],
    optimal: { n: 80, p: 50, k: 80, ph: 6.5 },
    minRainfall: 40,
    maxRainfall: 80,
    phRange: [5.8, 7.2],
    expectedYieldEn: "15.0 - 25.0 Tons / Hectare",
    expectedYieldTe: "15.0 - 25.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Shallow-rooted crop that prefers loose, fertile soil. Requires regular weeding and split Nitrogen application.",
    descriptionTe: "బాగా దున్నిన సారవంతమైన తేలికపాటి నేలల్లో బాగా పెరుగుతుంది. క్రమం తప్పకుండా కలుపు తీయడం మరియు నత్రజని విడతలుగా వేయడం అవసరం.",
  },
  {
    nameEn: "Brinjal",
    nameTe: "వంకాయ",
    id: "brinjal",
    season: "kharif",
    soilTypes: ["loamy", "sandy", "clayey"],
    optimal: { n: 100, p: 50, k: 50, ph: 6.0 },
    minRainfall: 60,
    maxRainfall: 120,
    phRange: [5.5, 6.8],
    expectedYieldEn: "18.0 - 25.0 Tons / Hectare",
    expectedYieldTe: "18.0 - 25.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Long-duration warm crop. Requires organic compost manure and well-aerated fertile soils for maximum yield.",
    descriptionTe: "ఎక్కువ కాలపరిమితి గల పంట. గరిష్ట దిగుబడి కొరకు సేంద్రీయ ఎరువులు మరియు సారవంతమైన నేలలు అవసరం.",
  },
  {
    nameEn: "Chilli",
    nameTe: "మిరప",
    id: "chilli",
    season: "kharif",
    soilTypes: ["black", "loamy", "alluvial"],
    optimal: { n: 90, p: 60, k: 60, ph: 6.3 },
    minRainfall: 70,
    maxRainfall: 140,
    phRange: [5.5, 7.0],
    expectedYieldEn: "2.0 - 3.5 Tons / Hectare (Dry)",
    expectedYieldTe: "2.0 - 3.5 టన్నులు / హెక్టారుకు (ఎండుమిర్చి)",
    descriptionEn: "Demands well-drained, warm sandy-loamy soil. Sensitive to waterlogging. High phosphorus triggers flower retention.",
    descriptionTe: "వెచ్చని ఉష్ణోగ్రత మరియు నీరు త్వరగా ఇంకిపోయే ఇసుక-దుమ్ము నేలలు అనుకూలం. నీరు నిల్వ ఉంటే పంట దెబ్బతింటుంది, భాస్వరం పూత రాలకుండా కాపాడుతుంది.",
  },
  {
    nameEn: "Okra",
    nameTe: "బెండకాయ",
    id: "okra",
    season: "summer",
    soilTypes: ["alluvial", "loamy", "clayey"],
    optimal: { n: 80, p: 50, k: 50, ph: 6.5 },
    minRainfall: 60,
    maxRainfall: 110,
    phRange: [6.0, 7.5],
    expectedYieldEn: "8.0 - 12.0 Tons / Hectare",
    expectedYieldTe: "8.0 - 12.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Warm-season crop that thrives in highly organic soils. Requires rapid harvesting to maintain tenderness.",
    descriptionTe: "వేసవి కాలపు పంట, సేంద్రీయ పదార్థాలు గల నేలల్లో బాగా పెరుగుతుంది. కాయలు ముదరకుండా త్వరగా కోయడం అవసరం.",
  },
  {
    nameEn: "Cabbage",
    nameTe: "క్యాబేజీ",
    id: "cabbage",
    season: "rabi",
    soilTypes: ["loamy", "clayey", "alluvial"],
    optimal: { n: 120, p: 60, k: 80, ph: 6.5 },
    minRainfall: 80,
    maxRainfall: 150,
    phRange: [6.0, 7.2],
    expectedYieldEn: "25.0 - 35.0 Tons / Hectare",
    expectedYieldTe: "25.0 - 35.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Cool-season leafy crop. Demands heavy nitrogen fertilization and continuous moisture to form solid heads.",
    descriptionTe: "చలికాలంలో పండే ఆకుకూర పంట. గట్టి గడ్డలు కట్టడానికి ఎక్కువ నత్రజని మరియు నిరంతర తేమ అవసరం.",
  },
  {
    nameEn: "Cauliflower",
    nameTe: "క్యాలీఫ్లవర్",
    id: "cauliflower",
    season: "rabi",
    soilTypes: ["loamy", "clayey", "alluvial"],
    optimal: { n: 120, p: 60, k: 80, ph: 6.5 },
    minRainfall: 80,
    maxRainfall: 150,
    phRange: [6.0, 7.2],
    expectedYieldEn: "20.0 - 30.0 Tons / Hectare",
    expectedYieldTe: "20.0 - 30.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Highly sensitive cool-season curd crop. Requires micronutrients like Boron and stable moisture to prevent curd yellowing.",
    descriptionTe: "ఎంతో సున్నితమైన శీతాకాలపు పంట. పువ్వు పసుపు రంగులోకి మారకుండా ఉండటానికి బోరాన్ వంటి సూక్ష్మపోషకాలు మరియు సమానమైన తేమ అవసరం.",
  },
  {
    nameEn: "Carrot",
    nameTe: "క్యారెట్",
    id: "carrot",
    season: "rabi",
    soilTypes: ["sandy", "loamy"],
    optimal: { n: 60, p: 50, k: 100, ph: 6.0 },
    minRainfall: 50,
    maxRainfall: 90,
    phRange: [5.5, 7.0],
    expectedYieldEn: "15.0 - 22.0 Tons / Hectare",
    expectedYieldTe: "15.0 - 22.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Requires deep, loose, stone-free sandy soils for long, straight root development. Highly sensitive to excess Nitrogen which causes root branching.",
    descriptionTe: "వంకరలు లేకుండా నిలువుగా పెరగడానికి రాళ్ళు లేని లోతైన తేలికపాటి ఇసుక నేలలు అవసరం. ఎక్కువ నత్రజని వేస్తే వేర్లు చీలిపోతాయి.",
  },
  {
    nameEn: "Garlic",
    nameTe: "వెల్లుల్లి",
    id: "garlic",
    season: "rabi",
    soilTypes: ["loamy", "sandy", "alluvial"],
    optimal: { n: 70, p: 50, k: 60, ph: 6.5 },
    minRainfall: 40,
    maxRainfall: 80,
    phRange: [6.0, 7.5],
    expectedYieldEn: "8.0 - 12.0 Tons / Hectare",
    expectedYieldTe: "8.0 - 12.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Requires cool growing phase and dry harvesting phase. Loose loamy soil prevents bulb deformation.",
    descriptionTe: "పెరిగేటప్పుడు చలి వాతావరణం, కోత దశలో పొడి వాతావరణం అవసరం. గడ్డలు వంకర పోకుండా ఉండటానికి తేలికపాటి నేలలు అనుకూలం.",
  },
  {
    nameEn: "Ginger",
    nameTe: "అల్లం",
    id: "ginger",
    season: "kharif",
    soilTypes: ["loamy", "red", "alluvial"],
    optimal: { n: 80, p: 50, k: 80, ph: 6.0 },
    minRainfall: 150,
    maxRainfall: 250,
    phRange: [5.5, 6.5],
    expectedYieldEn: "12.0 - 18.0 Tons / Hectare",
    expectedYieldTe: "12.0 - 18.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Rhizomatous spice crop that requires partial shade, high organic carbon content, and excellent soil drainage to prevent soft rot.",
    descriptionTe: "కొద్దిగా నీడ, ఎక్కువ సేంద్రీయ కర్భనం మరియు దుంప కుళ్ళు తెగులు రాకుండా ఉండటానికి ఖచ్చితమైన నీటి పారుదల గల నేలలు అవసరం.",
  },
  {
    nameEn: "Cucumber",
    nameTe: "దోసకాయ",
    id: "cucumber",
    season: "summer",
    soilTypes: ["loamy", "alluvial", "sandy"],
    optimal: { n: 60, p: 40, k: 80, ph: 6.2 },
    minRainfall: 50,
    maxRainfall: 100,
    phRange: [5.5, 7.0],
    expectedYieldEn: "8.0 - 15.0 Tons / Hectare",
    expectedYieldTe: "8.0 - 15.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Thrives in warm weather with sandy-loam soils. Requires high soil moisture and nitrogen for vine growth.",
    descriptionTe: "ఇసుకతో కూడిన లోమీ నేలల్లో మరియు వేడి వాతావరణంలో బాగా పెరుగుతుంది. తీగ ఎదుగుదలకు ఎక్కువ తేమ మరియు నత్రజని అవసరం.",
  },
  {
    nameEn: "Bitter Gourd",
    nameTe: "కాకరకాయ",
    id: "bittergourd",
    season: "summer",
    soilTypes: ["loamy", "sandy", "alluvial"],
    optimal: { n: 50, p: 50, k: 60, ph: 6.5 },
    minRainfall: 60,
    maxRainfall: 120,
    phRange: [6.0, 7.5],
    expectedYieldEn: "10.0 - 15.0 Tons / Hectare",
    expectedYieldTe: "10.0 - 15.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Requires trellising for high fruit yield. Warm temperatures and well-aerated sandy loam are ideal.",
    descriptionTe: "ఎక్కువ కాయల దిగుబడి కొరకు పందిరి అవసరం. వేడి వాతావరణం మరియు గాలి చొరబడే ఇసుక నేలలు అనుకూలం.",
  },
  {
    nameEn: "Bottle Gourd",
    nameTe: "సొరకాయ",
    id: "bottlegourd",
    season: "summer",
    soilTypes: ["loamy", "alluvial", "clayey"],
    optimal: { n: 60, p: 45, k: 50, ph: 6.3 },
    minRainfall: 50,
    maxRainfall: 110,
    phRange: [5.5, 7.0],
    expectedYieldEn: "20.0 - 35.0 Tons / Hectare",
    expectedYieldTe: "20.0 - 35.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Fast-growing vine crop. Requires rich compost-fed soils and regular watering.",
    descriptionTe: "వేగంగా పెరిగే తీగ పంట. ఎక్కువ సేంద్రీయ ఎరువులు ఉన్న నేలలు మరియు క్రమంతప్పకుండా నీటి తడులు అవసరం.",
  },
  {
    nameEn: "Ridge Gourd",
    nameTe: "బీరకాయ",
    id: "ridgegourd",
    season: "kharif",
    soilTypes: ["loamy", "sandy", "clayey"],
    optimal: { n: 60, p: 40, k: 50, ph: 6.5 },
    minRainfall: 70,
    maxRainfall: 150,
    phRange: [6.0, 7.5],
    expectedYieldEn: "12.0 - 18.0 Tons / Hectare",
    expectedYieldTe: "12.0 - 18.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Prefers warm, humid climate and well-drained fertile soils. Responds well to organic mulching.",
    descriptionTe: "వేడి, తేమతో కూడిన వాతావరణం మరియు నీరు నిల్వ ఉండని సారవంతమైన నేలలు అనుకూలం. మల్చింగ్ పద్ధతి ద్వారా మంచి ఫలితాలు వస్తాయి.",
  },
  {
    nameEn: "Spinach",
    nameTe: "పాలకూర",
    id: "spinach",
    season: "rabi",
    soilTypes: ["loamy", "alluvial", "clayey"],
    optimal: { n: 80, p: 30, k: 60, ph: 6.8 },
    minRainfall: 40,
    maxRainfall: 80,
    phRange: [6.0, 7.5],
    expectedYieldEn: "10.0 - 15.0 Tons / Hectare",
    expectedYieldTe: "10.0 - 15.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Quick cool-season leafy green. Requires high nitrogen fertilization for tender, dark green leaves.",
    descriptionTe: "తక్కువ కాలవ్యవధిలో పండే శీతాకాలపు ఆకుకూర. లేతగా, ముదురు ఆకుపచ్చ రంగులో ఆకులు రావడానికి ఎక్కువ నత్రజని అవసరం.",
  },
  {
    nameEn: "Coriander",
    nameTe: "కొత్తిమీర",
    id: "coriander",
    season: "rabi",
    soilTypes: ["loamy", "alluvial", "sandy"],
    optimal: { n: 40, p: 30, k: 40, ph: 6.5 },
    minRainfall: 30,
    maxRainfall: 70,
    phRange: [6.0, 7.2],
    expectedYieldEn: "6.0 - 10.0 Tons / Hectare",
    expectedYieldTe: "6.0 - 10.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Thrives in cool climates and well-drained loamy soils. Sensitive to frost and waterlogging.",
    descriptionTe: "చల్లని శీతోష్ణస్థితి మరియు నీరు నిల్వ ఉండని దుమ్ము నేలల్లో బాగా పెరుగుతుంది. తుషారము (మంచు) మరియు అధిక నీటి నిల్వను తట్టుకోలేదు.",
  },
  {
    nameEn: "Radish",
    nameTe: "ముల్లంగి",
    id: "radish",
    season: "rabi",
    soilTypes: ["sandy", "loamy"],
    optimal: { n: 50, p: 40, k: 60, ph: 6.0 },
    minRainfall: 40,
    maxRainfall: 80,
    phRange: [5.5, 6.8],
    expectedYieldEn: "15.0 - 25.0 Tons / Hectare",
    expectedYieldTe: "15.0 - 25.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Very short duration root crop. Loose, stone-free soil is essential to prevent deformed, branched roots.",
    descriptionTe: "చాలా తక్కువ వ్యవధి గల దుంప పంట. వేర్లు వంకర పోకుండా మరియు శాఖలుగా చీలకుండా ఉండటానికి రాళ్ళు లేని మెత్తటి ఇసుక నేలలు అవసరం.",
  },
  {
    nameEn: "Capsicum",
    nameTe: "క్యాప్సికమ్",
    id: "capsicum",
    season: "rabi",
    soilTypes: ["loamy", "alluvial", "sandy"],
    optimal: { n: 90, p: 50, k: 80, ph: 6.3 },
    minRainfall: 50,
    maxRainfall: 120,
    phRange: [5.8, 6.8],
    expectedYieldEn: "12.0 - 20.0 Tons / Hectare",
    expectedYieldTe: "12.0 - 20.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Requires mild cool climate. Sensitive to high temperatures which cause blossom drop. Potassium is key for cell wall strength.",
    descriptionTe: "మితమైన చల్లని వాతావరణం అవసరం. ఎక్కువ ఎండలు ఉంటే పూత రాలిపోతుంది, కాయల బలానికి పొటాషియం ఎంతో అవసరం.",
  },
  {
    nameEn: "French Beans",
    nameTe: "చిక్కుడుకాయ",
    id: "frenchbeans",
    season: "rabi",
    soilTypes: ["loamy", "clayey", "red"],
    optimal: { n: 30, p: 60, k: 50, ph: 6.2 },
    minRainfall: 50,
    maxRainfall: 100,
    phRange: [5.5, 7.0],
    expectedYieldEn: "8.0 - 12.0 Tons / Hectare",
    expectedYieldTe: "8.0 - 12.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Leguminous crop that fixes nitrogen but requires moderate phosphorus for pod formation. Drains well.",
    descriptionTe: "నత్రజనిని స్వయంగా నిల్వ చేసుకునే లెగ్యూమ్ జాతి పంట. కాయలు పెరగడానికి భాస్వరం అవసరం, నీరు బాగా ఇంకాలి.",
  },
  {
    nameEn: "Pumpkin",
    nameTe: "గుమ్మడికాయ",
    id: "pumpkin",
    season: "kharif",
    soilTypes: ["loamy", "sandy", "clayey"],
    optimal: { n: 70, p: 50, k: 80, ph: 6.5 },
    minRainfall: 80,
    maxRainfall: 150,
    phRange: [5.5, 7.5],
    expectedYieldEn: "25.0 - 40.0 Tons / Hectare",
    expectedYieldTe: "25.0 - 40.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Hardy vine crop requiring space. Thrives in highly fertile organic compost soils with moderate rainfall.",
    descriptionTe: "పెరగడానికి ఎక్కువ స్థలం కావలసిన గట్టి తీగ పంట. మితమైన వర్షపాతం మరియు ఎక్కువ ఎరువులు గల సారవంతమైన నేలలు అనుకూలం.",
  },
  {
    nameEn: "Sweet Potato",
    nameTe: "చిలగడదుంప",
    id: "sweetpotato",
    season: "rabi",
    soilTypes: ["sandy", "loamy", "red"],
    optimal: { n: 50, p: 40, k: 90, ph: 5.8 },
    minRainfall: 60,
    maxRainfall: 100,
    phRange: [5.2, 6.5],
    expectedYieldEn: "18.0 - 25.0 Tons / Hectare",
    expectedYieldTe: "18.0 - 25.0 టన్నులు / హెక్టారుకు",
    descriptionEn: "Tuber crop that grows well in acidic sandy soils. High Potassium promotes tuber expansion and starch density.",
    descriptionTe: "కొద్దిగా ఆమ్ల గుణం గల ఇసుక నేలల్లో బాగా పెరిగే దుంప పంట. పొటాషియం ఎక్కువగా ఉంటే దుంపలు లావుగా తయారవుతాయి.",
  }
];

// Recommends crops matching inputs and returns scores
export const recommendCrop = (soilType, ph, n, p, k, season, language = 'en') => {
  const parsedPh = parseFloat(ph);
  const parsedN = parseInt(n) || 0;
  const parsedP = parseInt(p) || 0;
  const parsedK = parseInt(k) || 0;

  const results = cropRules.map(crop => {
    let score = 100;
    const reasons = [];

    // Season match
    if (crop.season !== season.toLowerCase()) {
      score -= 30;
      if (language === 'te') {
        reasons.push(`పంటకు అనుకూల సీజన్ ${crop.season.toUpperCase()} కానీ మీరు ${season.toUpperCase()} ఎంచుకున్నారు.`);
      } else {
        reasons.push(`Preferred season is ${crop.season.toUpperCase()} but selected ${season.toUpperCase()}.`);
      }
    } else {
      if (language === 'te') {
        reasons.push(`ఈ పంట విత్తడానికి ${season.toUpperCase()} సీజన్ చాలా అనుకూలం.`);
      } else {
        reasons.push(`Perfect match for the ${season.toUpperCase()} season.`);
      }
    }

    // Soil type match
    if (!crop.soilTypes.includes(soilType.toLowerCase())) {
      score -= 20;
      if (language === 'te') {
        reasons.push(`ఈ పంట సాధారణంగా ${crop.soilTypes.join('/')} నేలల్లో పండుతుంది; ప్రస్తుత నేల: ${soilType.toUpperCase()}.`);
      } else {
        reasons.push(`Growers prefer ${crop.soilTypes.join('/')} soil; current soil: ${soilType.toUpperCase()}.`);
      }
    } else {
      if (language === 'te') {
        reasons.push(`ఎంచుకున్న ${soilType.toUpperCase()} నేల ఈ పంటకు అవసరమైన నీటి పారుదల, పోషకాలు అందిస్తుంది.`);
      } else {
        reasons.push(`Soil type ${soilType.toUpperCase()} has excellent drainage and chemistry for this crop.`);
      }
    }

    // pH match
    const [minPh, maxPh] = crop.phRange;
    if (parsedPh < minPh || parsedPh > maxPh) {
      score -= 15;
      if (language === 'te') {
        reasons.push(`నేల pH విలువ ${parsedPh} గా ఉంది, కానీ పంటకు అనుకూల పరిధి ${minPh} - ${maxPh}.`);
      } else {
        reasons.push(`pH is ${parsedPh}, while optimal range is ${minPh} - ${maxPh}.`);
      }
    } else {
      if (language === 'te') {
        reasons.push(`నేల pH విలువ ${parsedPh} ఈ పంటకు ఎంతో అనుకూలం.`);
      } else {
        reasons.push(`Soil pH of ${parsedPh} is in the optimal range.`);
      }
    }

    // NPK compatibility match
    const diffN = Math.abs(parsedN - crop.optimal.n);
    const diffP = Math.abs(parsedP - crop.optimal.p);
    const diffK = Math.abs(parsedK - crop.optimal.k);

    if (diffN > 30) {
      score -= 10;
      if (language === 'te') {
        reasons.push(`నైట్రోజన్ నిల్వలు (${parsedN}) పంటకు కావలసిన విలువ కంటే (${crop.optimal.n}) తేడాగా ఉన్నాయి.`);
      } else {
        reasons.push(`Nitrogen level (${parsedN}) deviates significantly from optimal (${crop.optimal.n}).`);
      }
    }
    if (diffP > 25) {
      score -= 10;
      if (language === 'te') {
        reasons.push(`ఫాస్ఫరస్ నిల్వలు (${parsedP}) పంటకు కావలసిన విలువ కంటే (${crop.optimal.p}) తేడాగా ఉన్నాయి.`);
      } else {
        reasons.push(`Phosphorus level (${parsedP}) deviates significantly from optimal (${crop.optimal.p}).`);
      }
    }
    if (diffK > 25) {
      score -= 10;
      if (language === 'te') {
        reasons.push(`పొటాషియం నిల్వలు (${parsedK}) పంటకు కావలసిన విలువ కంటే (${crop.optimal.k}) తేడాగా ఉన్నాయి.`);
      } else {
        reasons.push(`Potassium level (${parsedK}) deviates significantly from optimal (${crop.optimal.k}).`);
      }
    }

    if (diffN <= 30 && diffP <= 25 && diffK <= 25) {
      if (language === 'te') {
        reasons.push(`నేలలోని N-P-K పోషకాల విలువలు ఈ పంటకు అత్యంత అనుకూలంగా ఉన్నాయి.`);
      } else {
        reasons.push(`Soil N-P-K nutrient levels are highly compatible with this crop's uptake needs.`);
      }
    }

    const finalScore = Math.max(15, score);

    return {
      name: language === 'te' ? crop.nameTe : crop.nameEn,
      id: crop.id,
      score: finalScore,
      expectedYield: language === 'te' ? crop.expectedYieldTe : crop.expectedYieldEn,
      reasons: reasons.slice(0, 4), // Top reasons
      optimalNPK: crop.optimal,
      description: language === 'te' ? crop.descriptionTe : crop.descriptionEn
    };
  });

  // Sort by highest suitability score
  return results.sort((a, b) => b.score - a.score);
};

// Recommends fertilizer formula, dosage, application method based on crop needs
export const recommendFertilizer = (cropName, soilType, n, p, k, language = 'en') => {
  const parsedN = parseInt(n) || 0;
  const parsedP = parseInt(p) || 0;
  const parsedK = parseInt(k) || 0;

  // Find optimal values for the crop (default to generic if not found)
  const crop = cropRules.find(c => 
    c.nameEn.toLowerCase().includes(cropName.toLowerCase()) || 
    c.nameTe.includes(cropName) || 
    c.id === cropName.toLowerCase()
  ) || {
    nameEn: "Generic Crop",
    nameTe: "పంట",
    optimal: { n: 70, p: 50, k: 40 }
  };

  const optN = crop.optimal.n;
  const optP = crop.optimal.p;
  const optK = crop.optimal.k;

  const defN = Math.max(0, optN - parsedN);
  const defP = Math.max(0, optP - parsedP);
  const defK = Math.max(0, optK - parsedK);

  let recommendedFertilizer = "";
  let dosage = "";
  let method = "";
  let timing = "";
  let safetyNotes = "";

  if (defN > defP && defN > defK) {
    recommendedFertilizer = language === 'te' ? "యూరియా (46% నైట్రోజన్)" : "Urea (46% Nitrogen)";
    dosage = language === 'te' ? `${Math.ceil(defN * 2.2)} కేజీలు / హెక్టారుకు` : `${Math.ceil(defN * 2.2)} kg per Hectare`;
    
    method = language === 'te' 
      ? "జల్లుడు పద్ధతి / మొక్క మొదట్లో వేయడం (నేలపై సమానంగా చల్లడం)." 
      : "Broadcasting / Side-dressing (uniformly spreading over the soil near crops).";
    
    timing = language === 'te'
      ? "2-3 విడతలుగా వేయండి: 1/3 వంతు నాటేటప్పుడు, 1/3 వంతు ఎదుగుదల దశలో, మరియు 1/3 వంతు పూత దశలో."
      : "Apply in 2-3 split doses: 1/3 at sowing, 1/3 during vegetative growth, and 1/3 at flowering.";
    
    safetyNotes = language === 'te'
      ? "నేల తేమగా ఉన్నప్పుడు మాత్రమే వేయండి. ఆకులు ఎండిపోకుండా నేరుగా తడి ఆకులపై పడకుండా చూసుకోండి."
      : "Apply when the soil is moist but not waterlogged. Avoid direct contact with wet foliage to prevent leaf burn.";
  } else if (defP > defN && defP > defK) {
    recommendedFertilizer = language === 'te' ? "డి.ఎ.పి (డై అమ్మోనియం ఫాస్ఫేట్ - 18:46:0)" : "DAP (Diammonium Phosphate - 18:46:0)";
    dosage = language === 'te' ? `${Math.ceil(defP * 2.1)} కేజీలు / హెక్టారుకు` : `${Math.ceil(defP * 2.1)} kg per Hectare`;
    
    method = language === 'te'
      ? "నేల లోపల వేసే పద్ధతి (గింజ నాటే లోతుకు 2-3 అంగుళాల లోతులో వేయాలి)."
      : "Basal application (placing fertilizer 2-3 inches deep below the seed level).";
    
    timing = language === 'te'
      ? "వేర్లు బలంగా పెరగడానికి పంట విత్తే సమయంలో మాత్రమే పూర్తిగా వాడాలి."
      : "Apply fully at the time of sowing/planting to stimulate early root development.";
    
    safetyNotes = language === 'te'
      ? "దీనిని మట్టిలో కలిపి వేయాలి. పైన చల్లితే వేర్లకు సరిగ్గా అందదు."
      : "Should be incorporated into the soil. Surface application leads to poor phosphorus uptake.";
  } else if (defK > defN && defK > defP) {
    recommendedFertilizer = language === 'te' ? "మ్యూరియేట్ ఆఫ్ పొటాష్ (MOP - 60% K2O)" : "MOP (Muriate of Potash - 60% K2O)";
    dosage = language === 'te' ? `${Math.ceil(defK * 1.6)} కేజీలు / హెక్టారుకు` : `${Math.ceil(defK * 1.6)} kg per Hectare`;
    
    method = language === 'te'
      ? "నేల లోపల కలపడం లేదా పంట వరుసల మధ్య వేయడం."
      : "Soil incorporation or band placement.";
    
    timing = language === 'te'
      ? "50% విత్తే సమయంలో మరియు మిగిలిన 50% పూత దశలో అందించాలి."
      : "Apply 50% at sowing and 50% at active tillering/flowering stage.";
    
    safetyNotes = language === 'te'
      ? "ఇది పంటకు తెగుళ్లు మరియు కరువును తట్టుకునే శక్తిని ఇస్తుంది. వేసిన తర్వాత నేలలో తగినంత తేమ ఉండేలా చూసుకోండి."
      : "Improves drought and disease resistance. Ensure adequate soil moisture after application.";
  } else {
    recommendedFertilizer = language === 'te' ? "సమతుల్య NPK (19:19:19)" : "Balanced NPK (19:19:19)";
    dosage = language === 'te' ? "150 - 200 కేజీలు / హెక్టారుకు" : "150 - 200 kg per Hectare";
    
    method = language === 'te'
      ? "వరసల పక్కన వేయడం లేదా డ్రిప్ నీటి ద్వారా (ఫెర్టిగేషన్) అందించడం."
      : "Band placement or Fertigation (drip irrigation mixing).";
    
    timing = language === 'te'
      ? "విత్తే సమయంలో, పిలకలు తొడిగేటప్పుడు, మరియు పూతకు ముందు సమాన విడతలుగా వేయండి."
      : "Apply in equal splits at sowing, tillering, and pre-flowering stages.";
    
    safetyNotes = language === 'te'
      ? "పంట సంపూర్ణ ఆరోగ్యానికి ఉపయోగపడుతుంది. క్యాల్షియం ఎరువులతో దీనిని కలపకూడదు."
      : "Ideal for overall crop health. Avoid mixing with calcium-based fertilizers.";
  }

  // Adjust for soil types
  if (soilType.toLowerCase() === "sandy") {
    dosage += language === 'te' ? " + సేంద్రీయ ఎరువు (5 టన్నులు/హెక్టారు)" : " + Organic Compost (5 tons/ha)";
    safetyNotes += language === 'te'
      ? " ఇసుక నేలలో పోషకాలు త్వరగా కొట్టుకుపోతాయి. సేంద్రీయ ఎరువులు వేయడం ద్వారా నీరు మరియు పోషకాలు నేలలో నిలుస్తాయి."
      : " Sandy soil has low nutrient retention. Applying compost helps hold water and fertilizer, preventing leaching.";
  } else if (soilType.toLowerCase() === "clayey") {
    method += language === 'te'
      ? " బంకమట్టి నేలలో పోషకాలు నిలుస్తాయి కానీ నీరు నెమ్మదిగా ఇంకుతుంది కాబట్టి మట్టిలో బాగా కలపాలి."
      : " Deep soil integration is required as clay retains nutrients but drains slowly.";
  }

  return {
    cropName: language === 'te' ? crop.nameTe : crop.nameEn,
    recommendedFertilizer,
    dosage,
    method,
    timing,
    safetyNotes,
    analysis: {
      n: { current: parsedN, optimal: optN, deficit: defN },
      p: { current: parsedP, optimal: optP, deficit: defP },
      k: { current: parsedK, optimal: optK, deficit: defK }
    }
  };
};

export const diseaseDB = {
  blight: {
    name: "Tomato Early Blight (టమోటా ఆకు మచ్చ తెగులు)",
    symptoms: "Dark brown spots with concentric rings ('target' board appearance) on older leaves. Leaves turn yellow and drop.",
    causes: "Fungal pathogen (Alternaria solani). Thrives in warm, humid weather with frequent rainfall.",
    organic: "Spray organic Neem Oil (1% solution) weekly. Apply copper hydroxide spray. Remove lower leaves to increase air circulation.",
    chemical: "Spray Mancozeb (2g/L) or Chlorothalonil (1.5g/L) at the first appearance of spots.",
    prevention: "Practice crop rotation (avoid planting nightshades in the same soil). Use drip irrigation to keep leaves dry. Mulch the soil."
  },
  blast: {
    name: "Rice Leaf Blast (వరి అగ్గి తెగులు)",
    symptoms: "Spindle-shaped (eye-like) spots with reddish-brown borders and grey centers on leaves. Neck rot in severe cases.",
    causes: "Fungal pathogen (Magnaporthe oryzae). Triggered by high humidity, cloudy days, and excessive nitrogen fertilizer.",
    organic: "Use Pseudomonas fluorescens bio-pesticide (10g/L) for seed treatment and foliar spray. Burn infected straw.",
    chemical: "Spray Tricyclazole 75% WP (0.6g/L) or Azoxystrobin (1ml/L) immediately.",
    prevention: "Avoid excessive application of urea. Keep fields properly flooded. Plant blast-resistant paddy varieties."
  },
  rust: {
    name: "Wheat Brown Rust (గోధుమ కుంకుమ తెగులు)",
    symptoms: "Small, oval, orange-brown pustules scattering on leaves, turning blackish as the crop matures.",
    causes: "Fungal pathogen (Puccinia triticina). Spreads rapidly via wind during cool, moist spring weather.",
    organic: "Spray diluted sour buttermilk (fermented curd) mixed with botanical extracts. Apply sulfur dust in mild infestations.",
    chemical: "Spray Propiconazole 25% EC (1ml/L) or Tebuconazole (1ml/L) to arrest fungal spore germination.",
    prevention: "Sow early to escape high rust pressure. Plant certified rust-resistant wheat varieties (e.g., HD-2967, HD-3086)."
  },
  healthy: {
    name: "Healthy Cotton Leaf (ఆరోగ్యకరమైన పత్తి ఆకు)",
    symptoms: "Leaf shows uniform green color, healthy vascular veins, and intact margins. No spots, discoloration, or pest bites.",
    causes: "Excellent soil nutrient balance (NPK), proper water management, and proactive preventative pest management.",
    organic: "Continue spraying vermicompost wash or neem formulation as a preventative pest deterrent.",
    chemical: "No chemical fungicide or pesticide needed. Monitor soil pH and moisture regularly.",
    prevention: "Inspect leaves weekly. Maintain optimal NPK ratios. Keep fields clear of weed hosts."
  }
};
