# AeroCast AI — Weather & Rainfall Prediction
### Pan-India 2-Stage Meteorological Machine Learning Pipeline

An intelligent atmospheric estimation platform leveraging supervised machine learning algorithms (**Random Forest** and **Linear Regression**) to model atmospheric thermodynamic relationships and predict rainfall across Indian states and parliamentary constituencies.

---

## 🚀 Live Running Services

- **Web Dashboard:** [http://127.0.0.1:5173](http://127.0.0.1:5173)
- **FastAPI REST API:** [http://127.0.0.1:8000](http://127.0.0.1:8000)
- **API Swagger Documentation:** [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)

---

## 🌦️ 2-Stage Machine Learning Pipeline

```text
Location (State, Constituency) + Date & Hour
                  │
                  ▼
┌──────────────────────────────────────────────────────────┐
│ STAGE 1: Random Forest Regressor                         │
│ Predicts:                                                │
│ • Surface Temperature (°C)                              │
│   - Summer Season (March–June): 30.0°C to 40.0°C         │
│   - Other Seasons: 25.0°C to 35.0°C                      │
│ • Barometric Pressure (1003 to 1021 hPa)                 │
│ • Relative Humidity (25% to 95%)                         │
│ • Wind Velocity (3.5 to 28.3 km/h)                       │
└──────────────────────────────────────────────────────────┘
                  │
                  ▼ (Feed-Forward Parameter Vector)
┌──────────────────────────────────────────────────────────┐
│ STAGE 2: Linear Regression                               │
│ Predicts:                                                │
│ • Convective & Synoptic Rainfall (mm)                    │
│ • Rain Classification:                                   │
│   - 0 mm: No Rain ☀️                                    │
│   - 0.1 to 2.5 mm: Light Drizzle 🌦️                     │
│   - 2.5 to 10.0 mm: Moderate Rain 🌧️                     │
│   - > 10.0 mm: Heavy Downpour ⛈️                         │
└──────────────────────────────────────────────────────────┘
```

---

## 🇮🇳 Pan-India Geographic Coverage
Supports **all 28 States and 8 Union Territories** with their respective parliamentary constituencies and districts:
- **Telangana:** Hyderabad, Secunderabad, Malkajgiri, Chevella, Medak, Rangareddy, Warangal, Nizamabad, Karimnagar, Khammam...
- **Maharashtra:** Mumbai City, Mumbai Suburban, Pune, Nagpur, Thane, Nashik, Aurangabad, Kolhapur, Solapur...
- **Karnataka:** Bengaluru Urban, Bengaluru Rural, Bengaluru South, Mysuru, Mangaluru, Hubballi-Dharwad, Belagavi...
- **Tamil Nadu:** Chennai, Coimbatore, Madurai, Tiruchirappalli, Salem, Tirunelveli...
- **Delhi (NCT):** New Delhi, North Delhi, South Delhi, East Delhi, West Delhi, Chandni Chowk...
- And all remaining states across Northern, Western, Central, Eastern, Southern, and North-Eastern India.
- Also includes a **"Use Live Location"** geolocation finder!

---

## 📊 Website Navigation & Pages

1. **Home**:
   - Welcome overview, project mission, live ensemble predictor card (24.6°C surface temp, 58% humidity, 1013.2 hPa, 14.2 km/h wind).
   - Atmospheric complexity breakdown: Solar-Cloud Damping, Evaporative Cooling, Barometric Depressions, Wind Chill Convection.
2. **Weather Prediction**:
   - Indian State & Constituency dropdowns + Live Location GPS.
   - Observation Date and 24-hour time selector (Midnight, Noon, Night presets).
   - Instant atmospheric scenario presets:
     - ☀️ *Summer Afternoon (Hyderabad)*
     - 🌧️ *Monsoon Rain Day (Mumbai City)*
     - 🌙 *Autumn Evening (Bengaluru Urban)*
     - ❄️ *Winter Morning (New Delhi)*
   - Dual-stage result cards:
     - **Stage 1 (Random Forest):** Temperature (30–40°C in Summer, 25–35°C in Other seasons), Pressure, Humidity, Wind Speed.
     - **Stage 2 (Linear Regression):** Predicted Rainfall in mm, rain classification, and condition badge.
   - Session prediction history with **"Download Prediction CSV"** button.
3. **Weather Analytics**:
   - Exploratory Data Analysis over 16,514 real station observations.
   - Monthly Temperature Cycle (°C) with seasonal envelope (Jan–Dec).
   - Temperature & Barometric Pressure trend over time (with Last 60 Points toggle).
   - Monthly Average Humidity (%) and Wind Speed (km/h) charts.
   - **Pearson Correlation Heatmap** (exact matrix between Temperature, Pressure, Humidity, Wind Speed, and Rainfall).
   - Dataset Summary Statistics table (Count, Mean, Std Dev, Min, 25%, Median, 75%, Max).
4. **About**:
   - Academic documentation, problem statement, 9 project objectives, 8-step methodology flowchart, complete technology stack matrix, and project contributor credits.
