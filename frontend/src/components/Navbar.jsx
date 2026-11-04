import React from 'react';
import {
  CloudSun,
  Activity,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sun,
  Moon,
  Cpu,
  Layers,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({
  backendOnline,
  backendInfo,
  onCheckBackend,
  isCheckingBackend,
  isDarkMode,
  setIsDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
}) {
  return (
    <header className={`sticky top-0 z-40 backdrop-blur-xl border-b transition-colors duration-300 ${
      isDarkMode
        ? 'bg-slate-950/75 border-white/10 text-slate-100'
        : 'bg-white/80 border-slate-200/80 text-slate-800'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Left: Brand Identity */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/5"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <div className="flex items-center gap-3">
            <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30 text-white">
              <CloudSun className="w-6 h-6 animate-pulse-slow" />
              <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-slate-950" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  AeroCast AI
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isDarkMode ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-indigo-100 text-indigo-700'
                }`}>
                  ML v1.0
                </span>
              </div>
              <p className={`text-xs font-medium truncate max-w-[200px] sm:max-w-none ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                AI-Based Weather Prediction Using Machine Learning
              </p>
            </div>
          </div>
        </div>

        {/* Center: Active Model & Accuracy Pill (Desktop) */}
        <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 rounded-xl border text-xs font-medium backdrop-blur-md ${
          isDarkMode ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
        }">
          <Cpu className="w-4 h-4 text-purple-400" />
          <span>Active Architecture:</span>
          <span className="font-bold text-indigo-400">
            {backendInfo?.active_best_model || 'Random Forest Regressor'}
          </span>
          <span className="text-slate-500">•</span>
          <span className="font-semibold text-emerald-400">R² ~ 93.4%</span>
        </div>

        {/* Right: Backend Connection Status + Theme Toggle */}
        <div className="flex items-center gap-3">
          {/* Connection Status Pill */}
          <div className="flex items-center">
            {backendOnline ? (
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border ${
                isDarkMode
                  ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                  : 'bg-emerald-50 text-emerald-700 border-emerald-200'
              }`}>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="hidden sm:inline">FastAPI Engine Online</span>
                <span className="sm:hidden">Online</span>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium border ${
                  isDarkMode
                    ? 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                    : 'bg-rose-50 text-rose-700 border-rose-200'
                }`}>
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span className="hidden sm:inline">Backend Offline — Start FastAPI Server</span>
                  <span className="sm:hidden">Offline</span>
                </div>
                <button
                  onClick={onCheckBackend}
                  disabled={isCheckingBackend}
                  className="px-2.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow-md shadow-blue-600/30 active:scale-95"
                  title="Retry connection"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isCheckingBackend ? 'animate-spin' : ''}`} />
                  <span>Retry</span>
                </button>
              </div>
            )}
          </div>

          {/* Dark / Light Mode Toggle */}
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className={`p-2.5 rounded-xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-slate-900 border-white/10 text-amber-400 hover:bg-slate-800'
                : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm'
            }`}
            aria-label="Toggle Theme"
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </header>
  );
}

