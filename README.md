# 🌾 AgroBuddy AI

> **Empowering Farmers with Intelligent Agricultural AI**

AgroBuddy AI is a modern, responsive, and feature-rich React application designed to assist farmers, agricultural students, and advisors with science-based decision-making. Supporting both **English** and **Telugu**, it leverages data models to provide personalized recommendations for crop selection, disease diagnostic remedies, NPK soil analysis, and state-wide agricultural production insights.

---

## 🌟 Key Features

1. **💬 AgroBuddy AI Chatbot**
   - Interactive agricultural advisor that answers crop management questions.
   - Quick-action shortcuts for swift guidance (crop recommendation, leaf disease help, fertilizer dosage, weather advisory, market price trends).
   
2. **🌾 AI Crop Suitability Advisor**
   - Analyzes soil chemistry parameters (Nitrogen, Phosphorus, Potassium levels) and pH values.
   - Matches soil profile with environmental seasons (Kharif, Rabi, Zaid) to recommend the most optimal crop.
   - Side-by-side comparison matrix for comparing resource requirements, harvesting periods, and market values of multiple crops.

3. **🍂 Leaf Disease Diagnostic Lab**
   - Upload leaf photographs showing spots, wilting, or coloration.
   - Diagnoses diseases (e.g., Tomato Leaf Blight, Rice Leaf Blast, Wheat Rust) and provides organic & chemical remedies along with prevention guidelines.
   - Generates and prints a clean diagnostic report sheet.

4. **🧪 Precision Fertilizer Calculator**
   - Input current NPK values and targets to compute precise fertilizer amounts required.
   - Optimizes fertilizer input to avoid toxic runoff, saving expenses and preserving soil health.

5. **📊 State Crop Analytics**
   - Comprehensive interactive charts visualizing crop production across various Indian states.
   - Sourced from historic crop production data.

---

## 📁 Repository Structure

```text
├── src/                    # Frontend source code (React, Components, Context, Utils)
│   ├── components/         # Reusable UI widgets and layout modules
│   ├── context/            # Multi-lingual context and application state
│   ├── pages/              # Diagnostic Lab, Suitability Advisor, Analytics dashboard
│   ├── utils/              # Data analysis and mathematical helpers
│   ├── App.jsx             # Main Application hub
│   ├── index.css           # Global custom stylesheet
│   └── main.jsx            # React root mount script
├── Crop_recommendation.csv            # Crop suitability threshold dataset
├── India Crop Production – State Wise.csv # State crop productivity historical dataset
├── fertilizer_recommendation.csv      # NPK & crop threshold dataset
├── soil type & soil health.csv        # Soil health profiles dataset
├── deploy_guide.md         # Step-by-step instructions for hosting globally
├── dataset_links.md        # Download instructions for external large datasets
├── vite.config.js          # Vite build environment config
├── package.json            # Project dependencies and script configs
└── README.md               # Project documentation (this file)
```

---

## 🛠️ Quick Start

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed (LTS version recommended).

### Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/PondaraPrabhas/Agrobuddy-AI.git
   cd Agrobuddy-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server locally:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173` to interact with AgroBuddy AI.

---

## 📦 Large Datasets Note

Due to GitHub repository limits, the **Crop Disease and Pest Control Dataset** (~1.33 GB zip file) has been excluded. Please refer to [dataset_links.md](dataset_links.md) for direct download links and placement instructions.

---

## 🚀 Deployment Guide

To deploy this application globally on free hosting providers like Netlify, Vercel, or GitHub Pages, compile the production build:
```bash
npm run build
```
For detailed hosting steps, please see the [Global Hosting Guide](deploy_guide.md).
