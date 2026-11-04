import React from 'react';

export default function GlassCard({
  children,
  className = '',
  isDarkMode = true,
  glow = false,
  glowColor = 'blue',
  onClick,
}) {
  const glowStyles = {
    blue: 'border-blue-500/30 shadow-[0_0_24px_rgba(59,130,246,0.12)]',
    purple: 'border-purple-500/30 shadow-[0_0_24px_rgba(168,85,247,0.12)]',
    emerald: 'border-emerald-500/30 shadow-[0_0_24px_rgba(16,185,129,0.12)]',
    amber: 'border-amber-500/30 shadow-[0_0_24px_rgba(245,158,11,0.12)]',
  };

  const selectedGlow = glow ? glowStyles[glowColor] || glowStyles.blue : '';

  if (isDarkMode) {
    return (
      <div
        onClick={onClick}
        className={`rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-white/10 shadow-xl transition-all duration-300 ${selectedGlow} ${className}`}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl bg-white/80 backdrop-blur-xl border border-slate-200/80 shadow-lg shadow-slate-200/40 transition-all duration-300 ${selectedGlow} ${className}`}
    >
      {children}
    </div>
  );
}

