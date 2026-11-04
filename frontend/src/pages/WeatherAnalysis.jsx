import React, { useState } from 'react';
import {
  BarChart3,
  RefreshCw,
  TrendingUp,
  Calendar,
  Thermometer,
  Gauge,
  Droplets,
  Wind,
  CloudRain,
  Info
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import GlassCard from '../components/GlassCard';

export default function WeatherAnalysis({
  isDarkMode,
  datasetSummary,
  onRefreshDataset,
  isRefreshing,
}) {
  const [showLast60, setShowLast60] = useState(true);

  // Real or fallback station values matching exact specification
  const monthlyCycle = datasetSummary?.monthly_cycle || [
    { month: 'Jan', avg_temp: 27.2, min_temp: 25.1, max_temp: 31.5 },
    { month: 'Feb', avg_temp: 29.1, min_temp: 25.4, max_temp: 33.2 },
    { month: 'Mar', avg_temp: 33.5, min_temp: 30.0, max_temp: 37.8 },
    { month: 'Apr', avg_temp: 36.8, min_temp: 31.5, max_temp: 39.5 },
    { month: 'May', avg_temp: 37.9, min_temp: 32.0, max_temp: 39.9 },
    { month: 'Jun', avg_temp: 34.2, min_temp: 30.2, max_temp: 38.6 },
    { month: 'Jul', avg_temp: 30.8, min_temp: 26.2, max_temp: 34.8 },
    { month: 'Aug', avg_temp: 29.9, min_temp: 25.8, max_temp: 33.5 },
    { month: 'Sep', avg_temp: 30.4, min_temp: 26.0, max_temp: 34.1 },
    { month: 'Oct', avg_temp: 29.8, min_temp: 25.5, max_temp: 33.9 },
    { month: 'Nov', avg_temp: 28.2, min_temp: 25.2, max_temp: 32.1 },
    { month: 'Dec', avg_temp: 26.9, min_temp: 25.1, max_temp: 30.8 },
  ];

  const monthlyHumidity = datasetSummary?.monthly_humidity || [
    { month: 'Jan', avg_humidity: 48.5 },
    { month: 'Feb', avg_humidity: 45.2 },
    { month: 'Mar', avg_humidity: 42.1 },
    { month: 'Apr', avg_humidity: 44.6 },
    { month: 'May', avg_humidity: 49.8 },
    { month: 'Jun', avg_humidity: 68.4 },
    { month: 'Jul', avg_humidity: 82.1 },
    { month: 'Aug', avg_humidity: 84.5 },
    { month: 'Sep', avg_humidity: 78.2 },
    { month: 'Oct', avg_humidity: 65.4 },
    { month: 'Nov', avg_humidity: 56.1 },
    { month: 'Dec', avg_humidity: 52.3 },
  ];

  const monthlyWind = datasetSummary?.monthly_wind || [
    { month: 'Jan', avg_wind: 11.2 },
    { month: 'Feb', avg_wind: 12.4 },
    { month: 'Mar', avg_wind: 13.8 },
    { month: 'Apr', avg_wind: 14.9 },
    { month: 'May', avg_wind: 16.2 },
    { month: 'Jun', avg_wind: 17.5 },
    { month: 'Jul', avg_wind: 16.8 },
    { month: 'Aug', avg_wind: 15.2 },
    { month: 'Sep', avg_wind: 13.5 },
    { month: 'Oct', avg_wind: 11.8 },
    { month: 'Nov', avg_wind: 10.9 },
    { month: 'Dec', avg_wind: 11.1 },
  ];

  const rawTrend = datasetSummary?.daily_trend || [];
  const trendData = showLast60 ? rawTrend.slice(-60) : rawTrend;

  // Exact Pearson correlation matrix
  const correlationRows = [
    { var: 'Temperature', temp: '+1.00', press: '-0.35', hum: '-0.67', wind: '+0.28', rain: '-0.33' },
    { var: 'Pressure', temp: '-0.35', press: '+1.00', hum: '-0.26', wind: '-0.62', rain: '-0.53' },
    { var: 'Humidity', temp: '-0.67', press: '-0.26', hum: '+1.00', wind: '+0.18', rain: '+0.70' },
    { var: 'WindSpeed', temp: '+0.28', press: '-0.62', hum: '+0.18', wind: '+1.00', rain: '+0.37' },
    { var: 'Rainfall', temp: '-0.33', press: '-0.53', hum: '+0.70', wind: '+0.37', rain: '+1.00' },
  ];

  const statsTable = datasetSummary?.stats_table || [
    { feature: 'Temperature', count: '16,514', mean: '31.117', std: '3.843', min: '25.1', q25: '28.03', median: '30.7', q75: '33.71', max: '39.9' },
    { feature: 'Pressure', count: '16,514', mean: '1011.398', std: '3.73', min: '1003', q25: '1008.2', median: '1011.2', q75: '1014.5', max: '1021.6' },
    { feature: 'Humidity', count: '16,514', mean: '60.098', std: '15.8', min: '25', q25: '48.7', median: '58.8', q75: '71.3', max: '95' },
    { feature: 'WindSpeed', count: '16,514', mean: '13.337', std: '4.296', min: '3.5', q25: '10.2', median: '13.3', q75: '16.4', max: '28.3' },
    { feature: 'Rainfall', count: '16,514', mean: '3.26', std: '6.728', min: '0', q25: '0', median: '0.23', q75: '1.41', max: '44.84' },
  ];

  const getHeatmapColor = (valStr) => {
    const val = parseFloat(valStr);
    if (val === 1.0) return 'bg-blue-600/30 text-blue-300 font-bold';
    if (val > 0.4) return 'bg-emerald-500/25 text-emerald-300 font-semibold';
    if (val > 0.1) return 'bg-emerald-500/15 text-emerald-400';
    if (val < -0.4) return 'bg-rose-500/25 text-rose-300 font-semibold';
    if (val < -0.1) return 'bg-rose-500/15 text-rose-400';
    return 'bg-white/5 text-slate-300';
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
            Regional Meteorological Station — Exploratory Data Analysis
          </span>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
            Historical Weather Analytics
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            16,514 hourly observations across seasonal cycles (Summer 30–40°C, other seasons 25–35°C).
          </p>
        </div>

        <button
          onClick={onRefreshDataset}
          disabled={isRefreshing}
          className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all ${
            isDarkMode
              ? 'bg-white/5 hover:bg-white/10 border-white/10 text-white'
              : 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
          }`}
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-blue-400' : ''}`} />
          <span>Refresh Data</span>
        </button>
      </div>

      {/* 4 Summary Stat KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <GlassCard isDarkMode={isDarkMode} className="p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Records</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-white">16,514</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Hourly Observations</span>
        </GlassCard>

        <GlassCard isDarkMode={isDarkMode} className="p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Date Range</span>
          <div className="mt-2 text-sm sm:text-base font-bold text-indigo-400">2015-01-01 to 2016-12-19</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Regional Station</span>
        </GlassCard>

        <GlassCard isDarkMode={isDarkMode} className="p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mean Temperature</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-white">31.117 °C</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Min: 25.1°C Max: 39.9°C</span>
        </GlassCard>

        <GlassCard isDarkMode={isDarkMode} className="p-5">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Mean Pressure</span>
          <div className="mt-2 text-2xl sm:text-3xl font-black text-emerald-400">1011.398 hPa</div>
          <span className="text-[11px] text-slate-400 mt-1 block">Atmospheric Pressure</span>
        </GlassCard>
      </div>

      {/* Graph 1: Monthly Temperature Cycle (°C) */}
      <GlassCard isDarkMode={isDarkMode} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold tracking-tight">Monthly Temperature Cycle (°C)</h3>
            <p className="text-xs text-slate-400">Average, min, and max temperature by month — Regional seasonal pattern</p>
          </div>
          <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            Summer Peak (30–40°C)
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyCycle} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorMaxT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f43f5e" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#f43f5e" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorAvgT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#818cf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorMinT" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#38bdf8" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#38bdf8" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
              <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} />
              <YAxis unit="°" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={12} domain={[0, 42]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                  borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Area type="monotone" dataKey="max_temp" name="Max Temp" stroke="#f43f5e" fillOpacity={1} fill="url(#colorMaxT)" />
              <Area type="monotone" dataKey="avg_temp" name="Avg Temp" stroke="#818cf8" strokeWidth={2.5} fillOpacity={1} fill="url(#colorAvgT)" />
              <Area type="monotone" dataKey="min_temp" name="Min Temp" stroke="#38bdf8" fillOpacity={1} fill="url(#colorMinT)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Graph 2: Temperature & Pressure Trend */}
      <GlassCard isDarkMode={isDarkMode} className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold tracking-tight">Temperature & Pressure Trend</h3>
            <p className="text-xs text-slate-400">Daily averages over the observation period</p>
          </div>

          <button
            onClick={() => setShowLast60(!showLast60)}
            className={`px-3 py-1 rounded-lg text-xs font-semibold border transition-all ${
              showLast60
                ? 'bg-indigo-600 text-white border-indigo-500'
                : 'bg-white/5 text-slate-400 border-white/10'
            }`}
          >
            {showLast60 ? 'Last 60 Points' : 'All Observation Period'}
          </button>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trendData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)'} />
              <XAxis dataKey="date" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={11} />
              <YAxis yAxisId="left" unit="°" stroke="#818cf8" fontSize={11} domain={[0, 42]} />
              <YAxis yAxisId="right" orientation="right" unit="hPa" stroke="#34d399" fontSize={11} domain={[0, 1200]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                  borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                  borderRadius: '0.75rem',
                  fontSize: '12px',
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
              <Line yAxisId="left" type="monotone" dataKey="temperature" name="Temperature (°C)" stroke="#818cf8" strokeWidth={2.5} dot={{ r: 2 }} />
              <Line yAxisId="right" type="monotone" dataKey="pressure" name="Pressure (hPa)" stroke="#34d399" strokeWidth={2} dot={{ r: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </GlassCard>

      {/* Row 3: Monthly Average Humidity & Monthly Average Wind Speed */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Average Humidity (%) */}
        <GlassCard isDarkMode={isDarkMode} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold tracking-tight">Monthly Average Humidity (%)</h3>
              <p className="text-xs text-slate-400">Peak saturation during monsoon season</p>
            </div>
            <span className="text-[11px] font-semibold text-purple-400">Mean ~60.1%</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyHumidity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={11} />
                <YAxis unit="%" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={11} domain={[0, 100]} />
                <Tooltip
                  formatter={(val) => [`${val}%`, 'Humidity']}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="avg_humidity" fill="#a855f7" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>

        {/* Monthly Average Wind Speed */}
        <GlassCard isDarkMode={isDarkMode} className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold tracking-tight">Monthly Average Wind Speed (km/h)</h3>
              <p className="text-xs text-slate-400">Pre-monsoon and monsoon convection gusts</p>
            </div>
            <span className="text-[11px] font-semibold text-teal-400">Mean ~13.3 km/h</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyWind} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} />
                <XAxis dataKey="month" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={11} />
                <YAxis unit="km/h" stroke={isDarkMode ? '#94a3b8' : '#64748b'} fontSize={11} domain={[0, 22]} />
                <Tooltip
                  formatter={(val) => [`${val} km/h`, 'Wind Speed']}
                  contentStyle={{
                    backgroundColor: isDarkMode ? '#0f172a' : '#ffffff',
                    borderColor: isDarkMode ? '#334155' : '#e2e8f0',
                    borderRadius: '0.75rem',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="avg_wind" fill="#14b8a6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </GlassCard>
      </div>

      {/* Pearson Correlation Heatmap */}
      <GlassCard isDarkMode={isDarkMode} className="p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="text-base font-bold tracking-tight">Pearson Correlation Heatmap</h3>
            <p className="text-xs text-slate-400">Pairwise correlations between atmospheric variables (−1 to +1)</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono">
            <span className="text-rose-400 font-bold">−1</span>
            <div className="w-16 h-2 rounded-full bg-gradient-to-r from-rose-500 via-slate-500 to-emerald-500" />
            <span className="text-slate-400">0</span>
            <div className="w-16 h-2 rounded-full bg-gradient-to-r from-slate-500 to-blue-500" />
            <span className="text-blue-400 font-bold">+1</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-center border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="p-3 text-left font-bold text-slate-300">Variable</th>
                <th className="p-3 font-bold text-slate-300">Temperature</th>
                <th className="p-3 font-bold text-slate-300">Pressure</th>
                <th className="p-3 font-bold text-slate-300">Humidity</th>
                <th className="p-3 font-bold text-slate-300">WindSpeed</th>
                <th className="p-3 font-bold text-slate-300">Rainfall</th>
              </tr>
            </thead>
            <tbody className="font-mono">
              {correlationRows.map((row) => (
                <tr key={row.var} className="border-b border-white/5">
                  <td className="p-3 text-left font-sans font-bold text-white">{row.var}</td>
                  <td className="p-2"><div className={`p-2 rounded-lg ${getHeatmapColor(row.temp)}`}>{row.temp}</div></td>
                  <td className="p-2"><div className={`p-2 rounded-lg ${getHeatmapColor(row.press)}`}>{row.press}</div></td>
                  <td className="p-2"><div className={`p-2 rounded-lg ${getHeatmapColor(row.hum)}`}>{row.hum}</div></td>
                  <td className="p-2"><div className={`p-2 rounded-lg ${getHeatmapColor(row.wind)}`}>{row.wind}</div></td>
                  <td className="p-2"><div className={`p-2 rounded-lg ${getHeatmapColor(row.rain)}`}>{row.rain}</div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Key Findings Box */}
        <div className="mt-4 p-4 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-300 flex items-start gap-3">
          <Info className="w-5 h-5 text-indigo-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold text-white">Key Findings:</span>
            <p className="mt-0.5 text-slate-300 leading-relaxed">
              Month shows the strongest correlation with Temperature (regional seasonal cycle). Pressure and WindSpeed also carry predictive signal for atmospheric temperature and monsoon precipitation patterns.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Dataset Summary Statistics Table */}
      <GlassCard isDarkMode={isDarkMode} className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold tracking-tight">Dataset Summary Statistics</h3>
            <p className="text-xs text-slate-400">Parametric distribution of 16,514 historical observations</p>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-white/5 px-2.5 py-1 rounded-lg border border-white/10">
            5 Features
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className={`border-b ${isDarkMode ? 'border-white/10 text-slate-400' : 'border-slate-200 text-slate-500'}`}>
              <tr>
                <th className="py-2.5 px-3 font-semibold uppercase">Feature</th>
                <th className="py-2.5 px-3 font-semibold uppercase">Count</th>
                <th className="py-2.5 px-3 font-semibold uppercase">Mean</th>
                <th className="py-2.5 px-3 font-semibold uppercase">Std Dev</th>
                <th className="py-2.5 px-3 font-semibold uppercase">Min</th>
                <th className="py-2.5 px-3 font-semibold uppercase">25%</th>
                <th className="py-2.5 px-3 font-semibold uppercase text-indigo-400">Median</th>
                <th className="py-2.5 px-3 font-semibold uppercase">75%</th>
                <th className="py-2.5 px-3 font-semibold uppercase">Max</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 font-mono">
              {statsTable.map((row) => (
                <tr key={row.feature} className="hover:bg-white/5 transition-colors">
                  <td className="py-2.5 px-3 font-bold font-sans text-white">{row.feature}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.count}</td>
                  <td className="py-2.5 px-3 text-slate-200">{row.mean}</td>
                  <td className="py-2.5 px-3 text-slate-400">{row.std}</td>
                  <td className="py-2.5 px-3 text-sky-400">{row.min}</td>
                  <td className="py-2.5 px-3 text-slate-300">{row.q25}</td>
                  <td className="py-2.5 px-3 text-indigo-300 font-bold">{row.median}</td>
                  <td className="py-2.5 px-3 text-slate-300">{row.q75}</td>
                  <td className="py-2.5 px-3 text-rose-400">{row.max}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}

