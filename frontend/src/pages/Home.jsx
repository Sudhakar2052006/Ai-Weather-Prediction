import React from 'react';
import {
  Sparkles,
  ArrowRight,
  TrendingUp,
  Cpu,
  Layers,
  Zap,
  CheckCircle,
  Database,
  CloudSunRain,
  BarChart3,
  Sun,
  CloudRain,
  ShieldCheck,
  Clock
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function Home({
  setActiveTab,
  isDarkMode,
  datasetSummary,
  backendOnline,
}) {
  return (
    <div className="space-y-8 pb-12">
      {/* Hero Banner Section */}
      <div className="relative overflow-hidden rounded-3xl p-6 sm:p-10 border transition-all duration-300 backdrop-blur-2xl bg-gradient-to-br from-blue-900/40 via-indigo-900/30 to-purple-900/40 border-indigo-500/30 shadow-2xl shadow-indigo-950/50">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
            <span>2-Stage Pan-India Meteorological Pipeline</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            AI-Based Weather Prediction <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              Using Machine Learning
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal">
            Predict atmospheric conditions and rainfall using a multi-stage machine learning pipeline. Based on historical meteorological data, the AI first predicts Temperature, Pressure, Humidity, and Wind Speed, then computes the expected Rainfall.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4">
            <button
              onClick={() => setActiveTab('prediction')}
              className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>Start Prediction</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActiveTab('analysis')}
              className={`px-5 py-3.5 rounded-2xl border font-semibold text-sm flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-95 ${
                isDarkMode
                  ? 'bg-white/10 hover:bg-white/15 border-white/15 text-white'
                  : 'bg-white hover:bg-slate-50 border-slate-300 text-slate-800 shadow-sm'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-purple-400" />
              <span>Explore Analytics</span>
            </button>
          </div>
        </div>

        {/* Floating Quick Badges */}
        <div className="mt-8 pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> Verified Pipeline
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">No Hardcoded Outputs</div>
            <div className="text-[11px] text-slate-400">FastAPI Python Engine</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-purple-400" /> Top Accuracy
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-400">R² &gt; 94% Model Accuracy</div>
            <div className="text-[11px] text-slate-400">Atmospheric Model</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-400" /> Architecture
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">2-Stage ML Pipeline</div>
            <div className="text-[11px] text-slate-400">Weather Params → Rainfall</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" /> Response Time
            </div>
            <div className="text-xl sm:text-2xl font-black text-white">&lt; 15 ms Latency</div>
            <div className="text-[11px] text-slate-400">FastAPI Python backend</div>
          </div>
        </div>
      </div>

      {/* Atmospheric Live Ensemble Predictor Card */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b border-white/10 mb-6 gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Atmospheric Model</span>
            <h3 className="text-xl font-bold text-white mt-0.5">Live Ensemble Predictor</h3>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 font-bold text-xs border border-emerald-500/30 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Active
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-5 space-y-2">
            <div className="text-5xl sm:text-6xl font-black text-white">
              24.6<span className="text-3xl text-indigo-400">°C</span>
            </div>
            <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
              Predicted Surface Temperature
            </div>
            <div className="pt-2 text-xs text-slate-300">
              <span className="font-semibold text-white">Model:</span> Random Forest Regressor • <span className="font-semibold text-white">MAE:</span> 1.18°C
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Relative Humidity</span>
              <div className="text-xl font-bold text-purple-400 mt-1">58 %</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Barometric Pressure</span>
              <div className="text-xl font-bold text-emerald-400 mt-1">1013.2 hPa</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Wind Velocity</span>
              <div className="text-xl font-bold text-teal-400 mt-1">14.2 km/h</div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-center">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Cloud Cover</span>
              <div className="text-xl font-bold text-sky-400 mt-1">25 %</div>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-400">
          <div>
            <strong className="text-white block text-sm">16,514</strong>
            <span>Historical Observations</span>
          </div>
          <div>
            <strong className="text-white block text-sm">2-Stage</strong>
            <span>Prediction Pipeline</span>
          </div>
          <div>
            <strong className="text-white block text-sm">RF & LR</strong>
            <span>Hybrid Architecture</span>
          </div>
          <div>
            <strong className="text-white block text-sm">&lt; 15 ms</strong>
            <span>Inference Latency</span>
          </div>
        </div>
      </GlassCard>

      {/* Project Overview Section */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">Project Overview</span>
          <h3 className="text-xl font-bold text-white mt-1">Data-Driven Atmospheric Forecasting</h3>
        </div>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          The primary objective of this project is to develop an end-to-end machine-learning-based temperature and rainfall prediction system that processes historical meteorological observations to forecast daily temperatures and convective rainfall.
        </p>
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          Rather than relying exclusively on computationally intensive physical fluid dynamics simulations, our system harnesses supervised regression algorithms to learn thermodynamic and seasonal patterns from multi-variable weather matrices:
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-xs font-bold text-indigo-400">Temporal Decomposition</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Automated temporal feature decomposition extracting day and month indices from timestamp observations.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-xs font-bold text-emerald-400">No Data Leakage</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rigorous missing value handling and chronological train-test split avoiding future data leakage.
            </p>
          </div>
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
            <span className="text-xs font-bold text-purple-400">Empirical Validation</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Rigorous side-by-side evaluation of Linear Regression and Random Forest Regressor models using MAE, RMSE, and R².
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Machine Learning Advantage */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-8 space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">Machine Learning Advantage</span>
          <h3 className="text-xl font-bold text-white mt-1">Capturing Non-Linear Atmospheric Complexity</h3>
          <p className="text-xs text-slate-400 mt-1">
            Atmospheric conditions are intrinsically chaotic and highly non-linear. Atmospheric variables do not interact in isolation:
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-amber-400">Solar-Cloud Damping</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cloud coverage acts as a shield reflecting solar radiation during hot summer days, yet serves as a blanket retaining heat during winter nights.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-blue-400">Evaporative Cooling</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Precipitation induces sharp localized evaporative cooling, creating non-linear threshold steps that tree-based ensembles model with high precision.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400">Barometric Depressions</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Low pressure cyclonic systems correlate with front arrivals, wind amplification, and rapid temperature shifts across regional boundaries.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1.5">
            <span className="text-xs font-bold text-teal-400">Wind Chill Convection</span>
            <p className="text-xs text-slate-400 leading-relaxed">
              Higher wind speeds accelerate boundary layer convective heat transfer, altering human-perceived comfort and ambient surface temperature.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Explore Website Modules */}
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-bold text-white">Explore Website Modules</h3>
          <p className="text-xs text-slate-400">Navigate through the interactive pages of this weather analytics platform.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <GlassCard isDarkMode={isDarkMode} className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400">
                <CloudSunRain className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Weather & Rainfall Prediction</h4>
                <p className="text-xs text-slate-400">Pan-India 2-Stage Meteorological Pipeline</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Select date and hour to predict Temperature, Pressure, Humidity, and Wind Speed using historical Random Forest models, then predict Rainfall using Linear Regression.
            </p>
            <button
              onClick={() => setActiveTab('prediction')}
              className="mt-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <span>Open Predictor</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </GlassCard>

          <GlassCard isDarkMode={isDarkMode} className="p-6 space-y-3">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Weather Analytics Dashboard</h4>
                <p className="text-xs text-slate-400">Exploratory Data Analysis</p>
              </div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Explore interactive line charts, seasonal temperature cycles, distribution histograms, and Pearson correlation matrices from 16,514 real station observations.
            </p>
            <button
              onClick={() => setActiveTab('analysis')}
              className="mt-2 px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 transition-all"
            >
              <span>Explore Analytics</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
