import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Target,
  Workflow,
  Code2,
  Users,
  CheckCircle2,
  ShieldAlert,
  Sparkles
} from 'lucide-react';
import GlassCard from '../components/GlassCard';

export default function ProjectInfo({ isDarkMode }) {
  const objectives = [
    {
      num: '01',
      title: 'Historical Data Collection',
      desc: 'Acquire multi-year climate observations with consistent atmospheric features (16,514 hourly observations).',
    },
    {
      num: '02',
      title: 'Data Preprocessing',
      desc: 'Clean missing records, impute medians, and bound physically impossible sensor noise without data leakage.',
    },
    {
      num: '03',
      title: 'Feature Engineering',
      desc: 'Decompose timestamp dates into calendar day and month features to anchor seasonality (Summer 30–40°C, Other seasons 25–35°C).',
    },
    {
      num: '04',
      title: 'Exploratory Data Analysis',
      desc: 'Inspect feature distributions, seasonal curves, and Pearson correlation matrices across meteorological variables.',
    },
    {
      num: '05',
      title: 'Algorithm Training',
      desc: 'Train both Linear Regression and Random Forest Regressor models on chronological splits with standardized feature scaling.',
    },
    {
      num: '06',
      title: 'Model Evaluation & Selection',
      desc: 'Compute MAE, RMSE, and R² scores on unseen test data to select the best model for real-time predictions.',
    },
    {
      num: '07',
      title: 'Model Serialization',
      desc: 'Export the fitted preprocessing pipeline and best model weights using high-efficiency Joblib artifacts (.joblib).',
    },
    {
      num: '08',
      title: 'Full-Stack Deployment',
      desc: 'Develop a FastAPI REST API connected to a responsive React Vite web interface with Pan-India state & constituency selector.',
    },
    {
      num: '09',
      title: 'Session Analytics & Export',
      desc: 'Allow users to input custom weather parameters and export predictions to CSV format.',
    },
  ];

  const methodologySteps = [
    {
      step: '01',
      title: 'Data Collection',
      desc: 'Gathering multi-year historical meteorological observation records encompassing ambient temperature, humidity, pressure, wind velocity, cloud coverage, and rainfall.',
    },
    {
      step: '02',
      title: 'Data Preprocessing',
      desc: 'Cleaning inconsistent values, filtering non-physical outliers, and applying median imputation to ensure numerical integrity without data leakage.',
    },
    {
      step: '03',
      title: 'Feature Engineering',
      desc: 'Extracting day and month temporal components from observation dates, encoding cyclical seasonal baseline trends and temperature swings.',
    },
    {
      step: '04',
      title: 'Exploratory Data Analysis',
      desc: 'Analyzing inter-variable Pearson correlations, verifying distributions, seasonal minimums/maximums, and atmospheric dependencies.',
    },
    {
      step: '05',
      title: 'Model Training',
      desc: 'Training Linear Regression and Random Forest Regressor models on an 80% chronological training split with standardized feature scaling.',
    },
    {
      step: '06',
      title: 'Model Evaluation',
      desc: 'Computing empirical Mean Absolute Error (MAE), Root Mean Squared Error (RMSE), and R² variance scores on an unseen 20% test dataset.',
    },
    {
      step: '07',
      title: 'Model Serialization',
      desc: 'Serializing the best-performing trained model and fitted preprocessing transformers into high-efficiency Joblib artifacts (.joblib).',
    },
    {
      step: '08',
      title: 'Web Deployment',
      desc: 'Deploying a production-grade FastAPI REST microservice paired with an interactive React Vite web dashboard for real-time predictions.',
    },
  ];

  const techStack = [
    {
      category: 'Frontend Client',
      items: [
        { name: 'React.js 18', role: 'Component-based user interface' },
        { name: 'Vite', role: 'Next-generation high-speed build tool' },
        { name: 'Tailwind CSS', role: 'Modern utility-first styling' },
        { name: 'Recharts', role: 'Interactive SVG charting library' },
        { name: 'Lucide React', role: 'Crisp modern icon suite' },
      ],
    },
    {
      category: 'Backend Microservice',
      items: [
        { name: 'Python 3.11', role: 'High-performance core runtime' },
        { name: 'FastAPI', role: 'Modern asynchronous REST framework' },
        { name: 'Uvicorn', role: 'Lightning-fast ASGI web server' },
        { name: 'Pydantic v2', role: 'Strict type validation & schemas' },
        { name: 'CORS Middleware', role: 'Secure cross-origin communication' },
      ],
    },
    {
      category: 'Machine Learning Engine',
      items: [
        { name: 'Scikit-Learn', role: 'Linear & Random Forest regression' },
        { name: 'Pandas', role: 'Dataframe manipulation & temporal indexing' },
        { name: 'NumPy', role: 'Vectorized matrix mathematics' },
        { name: 'Joblib', role: 'Pipeline serialization & caching' },
        { name: 'StandardScaler', role: 'Zero-mean unit-variance transformation' },
      ],
    },
  ];

  const contributors = [
    {
      role: 'Project Lead',
      name: 'Machine Learning & Pipeline Development',
      dept: 'Department of Computer Science & Engineering',
      id: 'Roll No: 2026-CS-042',
      initials: 'PL',
    },
    {
      role: 'Frontend Developer',
      name: 'UI/UX Design & Dashboard Implementation',
      dept: 'Department of Computer Science & Engineering',
      id: 'Roll No: 2026-CS-058',
      initials: 'FD',
    },
    {
      role: 'Data Analyst',
      name: 'Data Preprocessing & Meteorological EDA',
      dept: 'Department of Computer Science & Engineering',
      id: 'Roll No: 2026-CS-081',
      initials: 'DA',
    },
    {
      role: 'Project Mentor / Guide',
      name: 'Professor & Research Supervisor',
      dept: 'Department of Computer Science & Engineering',
      id: 'Faculty Advisor',
      initials: 'MG',
    },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="p-8 sm:p-10 rounded-3xl border relative overflow-hidden backdrop-blur-2xl bg-gradient-to-br from-indigo-950/60 via-purple-950/40 to-slate-950/70 border-indigo-500/30 shadow-xl">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            <GraduationCap className="w-4 h-4 text-indigo-400" />
            <span>Academic Project Documentation</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            About the Weather Prediction Project
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Detailed technical background, academic problem statement, research objectives, eight-step engineering methodology, and project contributors.
          </p>
        </div>
      </div>

      {/* Introduction & Problem Statement */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
              <BookOpen className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Meteorological Science & Artificial Intelligence</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Weather prediction involves analyzing atmospheric variables such as temperature, relative humidity, barometric pressure, wind velocity, cloud coverage, and rainfall. Modern meteorology relies heavily on mathematical models that simulate thermodynamic heat exchanges in the Earth's troposphere.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Machine learning enables data-driven estimation by identifying historical statistical correlations directly from observations, establishing a fast and accurate predictive pipeline that complements traditional numerical weather prediction methods.
          </p>
        </GlassCard>

        <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-7 space-y-3">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white">Challenges in Dynamic Temperature & Rainfall Estimation</h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Weather conditions change continuously and depend on several complex interacting atmospheric variables. Traditional manual analysis of voluminous historical meteorological records is time-consuming, computationally expensive, and prone to human cognitive limitations.
          </p>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            A supervised machine-learning system can discover hidden patterns and non-linear interactions across atmospheric variables, delivering instantaneous and dependable daily surface temperature predictions via modern web microservices.
          </p>
        </GlassCard>
      </div>

      {/* Scope of Work / Project Objectives */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Project Objectives</h3>
            <p className="text-xs text-slate-400">Formal scope of work roadmap</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {objectives.map((obj) => (
            <div
              key={obj.num}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-all space-y-2"
            >
              <span className="text-xs font-mono font-black text-indigo-400 px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/20">
                {obj.num}
              </span>
              <h4 className="text-sm font-bold text-white">{obj.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{obj.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Architecture & Workflow / 8-Step ML Pipeline */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
            <Workflow className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Eight-Step Machine Learning Pipeline</h3>
            <p className="text-xs text-slate-400">End-to-end systematic methodology executed from raw weather records to real-time browser prediction</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {methodologySteps.map((m) => (
            <div
              key={m.step}
              className="p-4 rounded-2xl bg-white/5 border border-white/5 relative overflow-hidden"
            >
              <div className="text-2xl font-black text-white/10 absolute top-2 right-3 font-mono">
                {m.step}
              </div>
              <span className="text-xs font-bold text-blue-400">Step {m.step}</span>
              <h4 className="text-sm font-bold text-white mt-1">{m.title}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{m.desc}</p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Complete Technology Stack Matrix */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-purple-500/20 text-purple-400 border border-purple-500/30">
            <Code2 className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Complete Technology Stack Matrix</h3>
            <p className="text-xs text-slate-400">Engineered with modern industry-standard libraries and frameworks</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {techStack.map((group) => (
            <div key={group.category} className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-400 pb-2 border-b border-white/10">
                {group.category}
              </h4>
              <div className="space-y-2">
                {group.items.map((item) => (
                  <div key={item.name} className="p-3 rounded-xl bg-white/5 border border-white/5 text-xs">
                    <span className="font-bold text-white block">{item.name}</span>
                    <span className="text-[11px] text-slate-400">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Academic Credits */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-8">
        <div className="flex items-center gap-2.5 mb-6">
          <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Project Contributors & Mentorship</h3>
            <p className="text-xs text-slate-400">Department of Computer Science & Engineering • Machine Learning Engineering Lab</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {contributors.map((c, i) => (
            <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-sm shadow-md">
                {c.initials}
              </div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                {c.role}
              </div>
              <h4 className="text-sm font-bold text-white">{c.name}</h4>
              <div className="text-[11px] text-slate-400">{c.dept}</div>
              <div className="text-[10px] font-mono text-slate-500 pt-1 border-t border-white/5">
                {c.id}
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Academic Demonstration & Model Limitations Notice */}
      <GlassCard isDarkMode={isDarkMode} className="p-6 sm:p-7 border-amber-500/30 bg-amber-500/5">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-base text-amber-300">Academic Demonstration & Model Limitations Notice</h4>
            <div className="text-xs text-slate-300 leading-relaxed space-y-1.5">
              <p>
                • <strong>Educational Intent:</strong> This machine learning temperature prediction website is developed as an educational demonstration. While model accuracy reflects genuine statistical performance on held-out test records (R² &gt; 94%), it does not account for chaotic synoptic-scale cyclone trajectory shifts, volcanic aerosols, or extreme unobserved atmospheric anomalies.
              </p>
              <p>
                • <strong>Not an Official Weather Warning Service:</strong> This system is not designed to supersede official government meteorology agencies, civil aviation advisories, or disaster management bureaus.
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
