import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import WeatherBackground from './components/WeatherBackground';
import Home from './pages/Home';
import Prediction from './pages/Prediction';
import WeatherAnalysis from './pages/WeatherAnalysis';
import ProjectInfo from './pages/ProjectInfo';
import { weatherApi } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Backend & Data States
  const [backendOnline, setBackendOnline] = useState(false);
  const [backendInfo, setBackendInfo] = useState(null);
  const [isCheckingBackend, setIsCheckingBackend] = useState(false);

  const [datasetSummary, setDatasetSummary] = useState(null);
  const [isRefreshingDataset, setIsRefreshingDataset] = useState(false);

  const [predictionHistory, setPredictionHistory] = useState([]);

  // Apply dark mode class to html document
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Check Backend Connection and Fetch Initial Data
  const checkBackendAndFetch = async () => {
    setIsCheckingBackend(true);
    try {
      const health = await weatherApi.getHealth();
      setBackendOnline(true);
      setBackendInfo(health);

      try {
        const [summary, history] = await Promise.all([
          weatherApi.getDatasetSummary(),
          weatherApi.getPredictionHistory(),
        ]);
        setDatasetSummary(summary);
        if (history && history.length > 0) {
          setPredictionHistory(history);
        }
      } catch (dataErr) {
        console.warn('Backend responded but some data endpoints could not load:', dataErr);
      }
    } catch (err) {
      console.warn('FastAPI backend connection check failed:', err);
      setBackendOnline(false);
      setBackendInfo(null);
    } finally {
      setIsCheckingBackend(false);
    }
  };

  useEffect(() => {
    checkBackendAndFetch();
    const interval = setInterval(checkBackendAndFetch, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleRefreshDataset = async () => {
    setIsRefreshingDataset(true);
    try {
      const summary = await weatherApi.getDatasetSummary();
      setDatasetSummary(summary);
    } catch (err) {
      console.error('Failed to refresh dataset:', err);
    } finally {
      setIsRefreshingDataset(false);
    }
  };

  return (
    <div className={`min-h-screen relative flex flex-col transition-colors duration-300 ${
      isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      {/* Background Weather Atmosphere */}
      <WeatherBackground isDarkMode={isDarkMode} />

      {/* Top Navbar */}
      <Navbar
        backendOnline={backendOnline}
        backendInfo={backendInfo}
        onCheckBackend={checkBackendAndFetch}
        isCheckingBackend={isCheckingBackend}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      {/* Main Layout: Sidebar + Page Content */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          isDarkMode={isDarkMode}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
          datasetStats={datasetSummary}
        />

        <main className="flex-1 min-w-0 py-8 md:pl-8">
          {activeTab === 'home' && (
            <Home
              setActiveTab={setActiveTab}
              isDarkMode={isDarkMode}
              datasetSummary={datasetSummary}
              backendOnline={backendOnline}
            />
          )}

          {activeTab === 'prediction' && (
            <Prediction
              isDarkMode={isDarkMode}
              predictionHistory={predictionHistory}
              setPredictionHistory={setPredictionHistory}
            />
          )}

          {activeTab === 'analysis' && (
            <WeatherAnalysis
              isDarkMode={isDarkMode}
              datasetSummary={datasetSummary}
              onRefreshDataset={handleRefreshDataset}
              isRefreshing={isRefreshingDataset}
            />
          )}

          {activeTab === 'about' && (
            <ProjectInfo isDarkMode={isDarkMode} />
          )}
        </main>
      </div>

      {/* Footer */}
      <footer className={`border-t py-6 text-center text-xs transition-colors ${
        isDarkMode ? 'border-white/10 text-slate-500 bg-slate-950/60' : 'border-slate-200 text-slate-400 bg-white/60'
      }`}>
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>AI-Based Weather & Rainfall Prediction Using Machine Learning • Indian Meteorological Network</span>
          <span>Stage 1 (Random Forest) → Stage 2 (Linear Regression) • FastAPI & Scikit-Learn</span>
        </div>
      </footer>
    </div>
  );
}
