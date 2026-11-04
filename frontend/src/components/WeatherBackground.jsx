import React from 'react';

export default function WeatherBackground({ isDarkMode = true }) {
  return (
    <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      {isDarkMode ? (
        <>
          {/* Deep atmospheric gradient base: Blue, violet, and deep indigo */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-[#0a0f29] to-[#120b29]" />
          
          {/* Glowing orbital aurora lights */}
          <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[140px] animate-pulse-slow" />
          <div className="absolute top-1/4 -right-40 w-[650px] h-[650px] bg-purple-600/15 rounded-full blur-[160px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
          <div className="absolute -bottom-40 left-1/3 w-[700px] h-[700px] bg-indigo-600/12 rounded-full blur-[150px] animate-pulse-slow" style={{ animationDelay: '4s' }} />
          
          {/* Subtle meteorological grid pattern */}
          <div 
            className="absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.6) 1px, transparent 0)`,
              backgroundSize: '40px 40px'
            }}
          />
        </>
      ) : (
        <>
          {/* Light Mode: Fresh sky, clean whites, soft periwinkle & purple */}
          <div className="absolute inset-0 bg-gradient-to-br from-sky-50 via-indigo-50/50 to-purple-50/40" />
          
          <div className="absolute -top-40 -left-40 w-[550px] h-[550px] bg-sky-200/40 rounded-full blur-[120px]" />
          <div className="absolute top-1/3 -right-40 w-[600px] h-[600px] bg-purple-200/35 rounded-full blur-[140px]" />
          <div className="absolute -bottom-40 left-1/3 w-[650px] h-[650px] bg-blue-100/50 rounded-full blur-[130px]" />
          
          <div 
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(30,58,138,0.7) 1px, transparent 0)`,
              backgroundSize: '36px 36px'
            }}
          />
        </>
      )}
    </div>
  );
}

