import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Calendar,
  Clock,
  Sparkles,
  Droplets,
  Gauge,
  Wind,
  Thermometer,
  CloudRain,
  Sun,
  SunMedium,
  CloudDrizzle,
  Download,
  AlertCircle,
  CheckCircle2,
  Navigation,
  RotateCcw,
  Layers,
  ArrowRight
} from 'lucide-react';
import GlassCard from '../components/GlassCard';
import { weatherApi } from '../services/api';

// Comprehensive Indian States and Constituencies fallback
const DEFAULT_LOCATIONS = {
  "Telangana": [
    "Hyderabad", "Secunderabad", "Malkajgiri", "Chevella", "Medak",
    "Rangareddy", "Warangal", "Nizamabad", "Karimnagar", "Khammam",
    "Mahbubnagar", "Nalgonda", "Adilabad", "Zahirabad", "Peddapalle"
  ],
  "Maharashtra": [
    "Mumbai City", "Mumbai Suburban", "Pune", "Nagpur", "Thane",
    "Nashik", "Aurangabad", "Kolhapur", "Solapur", "Amravati",
    "Nanded", "Jalgaon", "Akola", "Latur", "Raigad", "Satara"
  ],
  "Karnataka": [
    "Bengaluru Urban", "Bengaluru Rural", "Bengaluru South", "Bengaluru Central",
    "Mysuru", "Mangaluru (Dakshina Kannada)", "Hubballi-Dharwad", "Belagavi",
    "Kalaburagi", "Ballari", "Shivamogga", "Tumakuru", "Udupi Chikmagalur"
  ],
  "Tamil Nadu": [
    "Chennai North", "Chennai South", "Chennai Central", "Coimbatore",
    "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli", "Tiruppur",
    "Erode", "Vellore", "Kanyakumari", "Kanchipuram"
  ],
  "Delhi (NCT)": [
    "New Delhi", "North Delhi", "South Delhi", "East Delhi", "West Delhi",
    "Chandni Chowk"
  ],
  "Andhra Pradesh": [
    "Visakhapatnam", "Vijayawada", "Guntur", "Tirupati", "Kurnool",
    "Nellore", "Kadapa", "Kakinada", "Rajahmundry", "Anantapur"
  ],
  "Gujarat": [
    "Ahmedabad East", "Ahmedabad West", "Surat", "Vadodara", "Rajkot",
    "Bhavnagar", "Jamnagar", "Gandhinagar", "Junagadh", "Kutch"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur",
    "Bhilwara", "Alwar", "Barmer", "Jaisalmer"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Varanasi", "Kanpur", "Agra", "Prayagraj", "Noida (GB Nagar)",
    "Ghaziabad", "Meerut", "Gorakhpur", "Ayodhya", "Jhansi"
  ],
  "West Bengal": [
    "Kolkata North", "Kolkata South", "Howrah", "Darjeeling", "Siliguri",
    "Asansol", "Durgapur", "Malda", "Murshidabad"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi (Ernakulam)", "Kozhikode", "Thrissur",
    "Kollam", "Palakkad", "Alappuzha", "Kannur", "Wayanad"
  ],
  "Punjab": [
    "Amritsar", "Ludhiana", "Jalandhar", "Patiala", "Bathinda"
  ],
  "Haryana": [
    "Gurugram", "Faridabad", "Panipat", "Ambala", "Karnal", "Hisar"
  ],
  "Madhya Pradesh": [
    "Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain"
  ],
  "Bihar": [
    "Patna Sahib", "Pataliputra", "Gaya", "Muzaffarpur", "Bhagalpur"
  ],
  "Odisha": [
    "Bhubaneswar", "Cuttack", "Rourkela", "Puri", "Sambalpur"
  ],
  "Assam": [
    "Guwahati", "Dibrugarh", "Silchar", "Jorhat", "Tezpur"
  ],
  "Jammu & Kashmir": [
    "Srinagar", "Jammu", "Anantnag", "Baramulla"
  ],
  "Uttarakhand": [
    "Dehradun", "Haridwar", "Nainital"
  ],
  "Goa": [
    "North Goa", "South Goa"
  ]
};

export default function Prediction({
  isDarkMode,
  predictionHistory,
  setPredictionHistory,
}) {
  const [locations, setLocations] = useState(DEFAULT_LOCATIONS);
  const [selectedState, setSelectedState] = useState('Telangana');
  const [selectedConstituency, setSelectedConstituency] = useState('Hyderabad');
  const [date, setDate] = useState('2026-11-03');
  const [hour, setHour] = useState(12);

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [predictionResult, setPredictionResult] = useState(null);
  const [liveLocationLoading, setLiveLocationLoading] = useState(false);

  // Fetch full Indian locations dictionary from backend on mount
  useEffect(() => {
    weatherApi.getLocations()
      .then((data) => {
        if (data && Object.keys(data).length > 0) {
          setLocations(data);
        }
      })
      .catch((err) => console.warn('Using embedded India locations dictionary:', err));
  }, []);

  // Update constituency options when state changes
  const constituencies = locations[selectedState] || [];
  useEffect(() => {
    if (constituencies.length > 0 && !constituencies.includes(selectedConstituency)) {
      setSelectedConstituency(constituencies[0]);
    }
  }, [selectedState, locations]);

  // Atmospheric Presets
  const presets = [
    {
      title: 'Summer Afternoon',
      subtitle: 'Hyderabad',
      state: 'Telangana',
      constituency: 'Hyderabad',
      date: '2026-05-18',
      hour: 14,
      icon: Sun,
      color: 'from-amber-500/20 to-orange-500/20 text-amber-400 border-amber-500/30'
    },
    {
      title: 'Monsoon Rain Day',
      subtitle: 'Mumbai City',
      state: 'Maharashtra',
      constituency: 'Mumbai City',
      date: '2026-07-22',
      hour: 11,
      icon: CloudRain,
      color: 'from-blue-500/20 to-indigo-500/20 text-blue-400 border-blue-500/30'
    },
    {
      title: 'Autumn Evening',
      subtitle: 'Bengaluru Urban',
      state: 'Karnataka',
      constituency: 'Bengaluru Urban',
      date: '2026-10-15',
      hour: 18,
      icon: SunMedium,
      color: 'from-purple-500/20 to-pink-500/20 text-purple-400 border-purple-500/30'
    },
    {
      title: 'Winter Morning',
      subtitle: 'New Delhi',
      state: 'Delhi (NCT)',
      constituency: 'New Delhi',
      date: '2026-01-10',
      hour: 8,
      icon: Sun,
      color: 'from-sky-500/20 to-cyan-500/20 text-sky-400 border-sky-500/30'
    }
  ];

  const applyPreset = (preset) => {
    setSelectedState(preset.state);
    setSelectedConstituency(preset.constituency);
    setDate(preset.date);
    setHour(preset.hour);
    setError(null);
  };

  const handleUseLiveLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser.');
      return;
    }
    setLiveLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLiveLocationLoading(false);
        // Default to regional hub based on rough coordinates or fallback to Telangana
        setSelectedState('Telangana');
        setSelectedConstituency('Hyderabad');
      },
      (err) => {
        setLiveLocationLoading(false);
        console.warn('Geolocation error:', err);
        // Fallback gracefully
        setSelectedState('Telangana');
        setSelectedConstituency('Hyderabad');
      }
    );
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const payload = {
        state: selectedState,
        constituency: selectedConstituency,
        date: date,
        hour: parseInt(hour),
      };

      const result = await weatherApi.predictStagePipeline(payload);
      setPredictionResult(result);

      // Add to session history
      const newEntry = {
        id: Date.now(),
        timestamp: new Date().toLocaleTimeString(),
        location: `${selectedConstituency}, ${selectedState}`,
        date: date,
        hour: `${String(hour).padStart(2, '0')}:00`,
        temperature: result.stage1_predicted_weather.temperature,
        pressure: result.stage1_predicted_weather.pressure,
        humidity: result.stage1_predicted_weather.humidity,
        wind_speed: result.stage1_predicted_weather.wind_speed,
        rainfall: result.stage2_rainfall_prediction.rainfall,
        condition: result.weather_condition,
      };
      setPredictionHistory((prev) => [newEntry, ...prev.slice(0, 49)]);
    } catch (err) {
      setError(err.message || 'Failed to predict weather. Ensure the FastAPI backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Page Title & Subtitle */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
            Pan-India 2-Stage Meteorological Pipeline
          </span>
          <span className="text-slate-500">•</span>
          <span className="text-xs text-slate-400">Random Forest & Linear Regression</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
          Weather & Rainfall Prediction
        </h1>
        <p className="text-sm text-slate-400 mt-1 max-w-3xl">
          Choose any State & Constituency across India, or use your Live Location. The AI predicts Temperature (30–40°C Summer, 25–35°C Other Seasons), Pressure, Humidity, and Wind Speed using Random Forest, then predicts Rainfall using Linear Regression.
        </p>
      </div>

      {/* Atmospheric Presets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {presets.map((p) => {
          const Icon = p.icon;
          return (
            <button
              key={p.title}
              type="button"
              onClick={() => applyPreset(p)}
              className={`p-3.5 rounded-2xl border flex items-center gap-3 transition-all text-left bg-gradient-to-r ${p.color} hover:scale-[1.02] active:scale-95`}
            >
              <div className="p-2.5 rounded-xl bg-white/10 backdrop-blur-md">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-bold text-white">{p.title}</div>
                <div className="text-[11px] text-slate-300">{p.subtitle}</div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Main Grid: Input Form on Left (5 cols) & Prediction Outputs on Right (7 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Controls */}
        <div className="lg:col-span-5">
          <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-7 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-rose-400" />
                <h3 className="text-sm font-bold text-white">Select Location in India</h3>
              </div>
              <button
                type="button"
                onClick={handleUseLiveLocation}
                disabled={liveLocationLoading}
                className="text-[11px] font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20"
              >
                <Navigation className={`w-3 h-3 ${liveLocationLoading ? 'animate-spin' : ''}`} />
                <span>Use Live Location</span>
              </button>
            </div>

            <form onSubmit={handlePredict} className="space-y-4">
              {/* State Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  State / UT
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    isDarkMode
                      ? 'bg-slate-950 border-white/10 text-white focus:border-indigo-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                >
                  {Object.keys(locations).map((st) => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

              {/* Constituency Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Constituency / District
                </label>
                <select
                  value={selectedConstituency}
                  onChange={(e) => setSelectedConstituency(e.target.value)}
                  className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-semibold transition-all ${
                    isDarkMode
                      ? 'bg-slate-950 border-white/10 text-white focus:border-indigo-500'
                      : 'bg-white border-slate-300 text-slate-900 focus:border-indigo-600'
                  }`}
                >
                  {constituencies.map((con) => (
                    <option key={con} value={con}>
                      {con}
                    </option>
                  ))}
                </select>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Select Date & Time
                  </h4>
                </div>

                {/* Observation Date */}
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Observation Date
                  </label>
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                      isDarkMode
                        ? 'bg-slate-950/70 border-white/10 text-white focus:border-blue-500'
                        : 'bg-white border-slate-300 text-slate-900 focus:border-blue-600'
                    }`}
                  />
                </div>

                {/* Hour of Day Slider */}
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-purple-400" /> Hour of Day
                    </label>
                    <span className="text-xs font-mono font-bold text-purple-400">
                      {String(hour).padStart(2, '0')}:00
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="23"
                    step="1"
                    value={hour}
                    onChange={(e) => setHour(parseInt(e.target.value))}
                    className="w-full accent-purple-500 h-2 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1.5">
                    <button type="button" onClick={() => setHour(0)} className="hover:text-white">
                      00:00 (Midnight)
                    </button>
                    <button type="button" onClick={() => setHour(12)} className="hover:text-white font-bold text-indigo-400">
                      12:00 (Noon)
                    </button>
                    <button type="button" onClick={() => setHour(23)} className="hover:text-white">
                      23:00 (Night)
                    </button>
                  </div>
                </div>
              </div>

              {/* 2-Stage Pipeline Explainer Note */}
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300 space-y-1">
                <div className="font-bold text-indigo-400 flex items-center gap-1">
                  <Layers className="w-3 h-3" /> 2-Stage ML Pipeline:
                </div>
                <p>• <strong>Stage 1 (Random Forest):</strong> Date/Hour → Temperature (30–40°C Summer, 25–35°C Other), Pressure, Humidity, Wind</p>
                <p>• <strong>Stage 2 (Linear Regression):</strong> Weather Params → Rainfall</p>
              </div>

              {error && (
                <div className="p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Predict Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-extrabold text-base flex items-center justify-center gap-2 shadow-xl shadow-indigo-600/30 transition-all hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Running 2-Stage Pipeline...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5" />
                    <span>Predict Weather & Rainfall</span>
                  </>
                )}
              </button>
            </form>
          </GlassCard>
        </div>

        {/* Right Column: 2-Stage Output Display */}
        <div className="lg:col-span-7 space-y-6">
          {predictionResult ? (
            <div className="space-y-6">
              {/* Location Badge Banner */}
              <div className="p-4 rounded-2xl border flex items-center justify-between backdrop-blur-md bg-gradient-to-r from-blue-900/30 via-indigo-900/20 to-purple-900/30 border-indigo-500/30">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Prediction Location</span>
                    <h3 className="text-base font-extrabold text-white">
                      {predictionResult.location.constituency}, {predictionResult.location.state}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Season Index</span>
                  <div className="text-xs font-bold text-amber-400">
                    {predictionResult.observation.season}
                  </div>
                </div>
              </div>

              {/* Stage 1 Result Card */}
              <GlassCard isDarkMode={isDarkMode} className="p-6">
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 font-bold text-xs">
                      Stage 1
                    </span>
                    <h4 className="font-bold text-sm text-white">Predicted Weather Parameters</h4>
                  </div>
                  <span className="text-xs text-indigo-400 font-semibold">Random Forest</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {/* Temp */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Temperature</span>
                    <div className="text-2xl font-black text-white mt-1">
                      {predictionResult.stage1_predicted_weather.temperature} <span className="text-sm font-bold text-indigo-400">°C</span>
                    </div>
                    <span className="text-[10px] text-amber-400 block mt-0.5">
                      {predictionResult.observation.is_summer ? '30–40°C Summer' : '25–35°C Other'}
                    </span>
                  </div>

                  {/* Pressure */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Pressure</span>
                    <div className="text-2xl font-black text-emerald-400 mt-1">
                      {predictionResult.stage1_predicted_weather.pressure}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">hPa</span>
                  </div>

                  {/* Humidity */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Humidity</span>
                    <div className="text-2xl font-black text-purple-400 mt-1">
                      {predictionResult.stage1_predicted_weather.humidity}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">%</span>
                  </div>

                  {/* Wind Speed */}
                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Wind Speed</span>
                    <div className="text-2xl font-black text-teal-400 mt-1">
                      {predictionResult.stage1_predicted_weather.wind_speed}
                    </div>
                    <span className="text-[10px] text-slate-400 block mt-0.5">km/h</span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 text-[11px] text-slate-400 flex items-center justify-between">
                  <span>Stage 1 parameters feed into Stage 2 for rainfall prediction</span>
                  <span className="text-indigo-400 font-semibold flex items-center gap-1">
                    Feed Forward <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </GlassCard>

              {/* Stage 2 Result Card: Rainfall Prediction */}
              <GlassCard
                isDarkMode={isDarkMode}
                glow
                glowColor="blue"
                className="p-6 sm:p-7 relative overflow-hidden bg-gradient-to-br from-indigo-950/40 via-purple-950/20 to-slate-950/50"
              >
                <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400 font-bold text-xs">
                      Stage 2
                    </span>
                    <h4 className="font-bold text-sm text-white">Rainfall Prediction</h4>
                  </div>
                  <span className="text-xs text-blue-400 font-semibold">Linear Regression</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-semibold text-slate-400">
                      Predicted Rainfall
                    </span>
                    <div className="text-5xl font-black tracking-tight text-white mt-1">
                      {predictionResult.stage2_rainfall_prediction.rainfall}{' '}
                      <span className="text-2xl text-blue-400 font-bold">mm</span>
                    </div>
                    <div className="text-sm font-semibold text-slate-300 mt-2 flex items-center gap-2">
                      <span className="text-blue-400">•</span>
                      <span>Rain Status:</span>
                      <strong className="text-white">
                        {predictionResult.stage2_rainfall_prediction.rain_category}
                      </strong>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center p-5 rounded-2xl bg-white/5 border border-white/10 shadow-lg text-center min-w-[130px]">
                    <div className="text-4xl mb-1">
                      {predictionResult.stage2_rainfall_prediction.rainfall > 0.1 ? '🌧️' : '☀️'}
                    </div>
                    <span className="text-xs font-bold text-white">
                      {predictionResult.weather_condition}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 text-xs text-slate-400 flex items-center justify-between">
                  <span>Location: {predictionResult.location.constituency}, {predictionResult.location.state} | Date: {predictionResult.observation.date} | Hour: {predictionResult.observation.time_label}</span>
                </div>
              </GlassCard>
            </div>
          ) : (
            <GlassCard isDarkMode={isDarkMode} className="p-8 text-center space-y-3">
              <div className="w-16 h-16 rounded-3xl bg-indigo-500/10 text-indigo-400 mx-auto flex items-center justify-center border border-indigo-500/20">
                <CloudRain className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-white">Select Location & Run Forecast</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                Pick any Indian state and constituency or click a preset card above. The 2-stage ML pipeline will predict temperature and expected rainfall.
              </p>
            </GlassCard>
          )}

          {/* Session History Card with Download CSV */}
          <GlassCard isDarkMode={isDarkMode} className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="font-bold text-sm text-white">Session Prediction History</h4>
                <p className="text-xs text-slate-400">Recent forecasts computed during this session</p>
              </div>

              <a
                href={weatherApi.getExportHistoryUrl()}
                download="weather_prediction_history.csv"
                className="px-3.5 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all bg-white/5 hover:bg-white/10 border-white/10 text-white"
              >
                <Download className="w-3.5 h-3.5 text-blue-400" />
                <span>Download Prediction CSV</span>
              </a>
            </div>

            {predictionHistory.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className={`border-b ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
                    <tr>
                      <th className="py-2 px-3 font-semibold">Location</th>
                      <th className="py-2 px-3 font-semibold">Date & Time</th>
                      <th className="py-2 px-3 font-semibold">Temperature</th>
                      <th className="py-2 px-3 font-semibold text-blue-400">Rainfall</th>
                      <th className="py-2 px-3 font-semibold">Condition</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-mono">
                    {predictionHistory.map((item, idx) => (
                      <tr key={idx} className="hover:bg-white/5 transition-colors">
                        <td className="py-2 px-3 text-white font-sans">{item.location}</td>
                        <td className="py-2 px-3 text-slate-300">{item.date} {item.hour}</td>
                        <td className="py-2 px-3 text-indigo-300 font-bold">{item.temperature}°C</td>
                        <td className="py-2 px-3 text-blue-300 font-bold">{item.rainfall} mm</td>
                        <td className="py-2 px-3 text-slate-400 font-sans">{item.condition}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="py-6 text-center text-xs text-slate-500">
                No session predictions yet. Run your first forecast above!
              </div>
            )}
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
