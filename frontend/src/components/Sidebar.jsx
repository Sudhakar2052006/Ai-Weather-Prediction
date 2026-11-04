import React from 'react';
import {
  LayoutDashboard,
  CloudSunRain,
  BarChart3,
  GraduationCap,
  ChevronRight,
  Sparkles,
  MapPin,
  Layers
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isDarkMode,
  mobileMenuOpen,
  setMobileMenuOpen,
  datasetStats,
}) {
  const navItems = [
    {
      id: 'home',
      label: 'Home',
      subtitle: 'Overview & Key Metrics',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'prediction',
      label: 'Weather Prediction',
      subtitle: 'Pan-India 2-Stage Pipeline',
      icon: CloudSunRain,
      badge: '2-Stage AI',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    },
    {
      id: 'analysis',
      label: 'Weather Analytics',
      subtitle: '16,514 Observations & EDA',
      icon: BarChart3,
      badge: 'Station Data',
      badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    },
    {
      id: 'about',
      label: 'About',
      subtitle: 'Academic Project Documentation',
      icon: GraduationCap,
      badge: null,
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-18 left-0 z-30 h-[calc(100vh-4.5rem)] w-72 shrink-0 p-4 flex flex-col justify-between transition-all duration-300 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        } ${
          isDarkMode
            ? 'bg-slate-950/80 md:bg-transparent border-r border-white/10 text-slate-200'
            : 'bg-white/90 md:bg-transparent border-r border-slate-200 text-slate-800'
        }`}
      >
        <div className="space-y-6">
          <div className="space-y-1.5">
            <div className="px-3 pb-2 text-[11px] font-bold tracking-wider uppercase text-slate-500">
              Platform Navigation
            </div>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full group flex items-center justify-between p-3.5 rounded-2xl text-left transition-all duration-200 ${
                    isActive
                      ? isDarkMode
                        ? 'bg-gradient-to-r from-blue-600/25 via-indigo-600/20 to-purple-600/15 border border-indigo-500/40 text-white shadow-lg shadow-indigo-600/15'
                        : 'bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-indigo-200 text-indigo-900 shadow-md shadow-indigo-100'
                      : isDarkMode
                      ? 'hover:bg-white/5 text-slate-400 hover:text-slate-200 border border-transparent'
                      : 'hover:bg-slate-100 text-slate-600 hover:text-slate-900 border border-transparent'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2.5 rounded-xl transition-colors ${
                        isActive
                          ? 'bg-gradient-to-tr from-blue-500 to-indigo-600 text-white shadow-md shadow-indigo-500/30'
                          : isDarkMode
                          ? 'bg-white/5 text-slate-400 group-hover:text-white group-hover:bg-white/10'
                          : 'bg-slate-200/70 text-slate-600 group-hover:text-slate-900 group-hover:bg-slate-200'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-sm tracking-tight flex items-center gap-1.5">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-slate-500 group-hover:text-slate-400">
                        {item.subtitle}
                      </div>
                    </div>
                  </div>

                  {item.badge ? (
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.badgeColor}`}
                    >
                      {item.badge}
                    </span>
                  ) : (
                    <ChevronRight
                      className={`w-4 h-4 text-slate-500 transition-transform ${
                        isActive ? 'translate-x-0.5 text-indigo-400' : 'opacity-0 group-hover:opacity-100'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Station Status Card */}
        <div
          className={`p-4 rounded-2xl border backdrop-blur-md ${
            isDarkMode
              ? 'bg-gradient-to-br from-slate-900/80 to-indigo-950/40 border-white/10'
              : 'bg-gradient-to-br from-slate-50 to-indigo-50/60 border-slate-200'
          }`}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Indian Meteorological Network
            </span>
          </div>
          <div className="font-bold text-sm tracking-tight flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Pan-India Coverage</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            28 States & 8 UTs • 16,514 Historical Observations
          </p>

          <div className="mt-3 pt-3 border-t border-white/5 flex items-center justify-between text-[11px]">
            <span className="text-slate-500">ML Pipeline:</span>
            <span className="text-indigo-400 font-semibold">RF & LR Hybrid</span>
          </div>
        </div>
      </aside>
    </>
  );
}
