import React, { useState } from 'react';
import { Wind, Snowflake, Flame, Award, Sliders, RefreshCw, Sparkles } from 'lucide-react';

export const CraftLab: React.FC = () => {
  const [churnSpeed, setChurnSpeed] = useState<number>(75);
  const [nitrogenFlow, setNitrogenFlow] = useState<number>(85);

  const crystalSizeMicrons = Math.max(12, Math.round(50 - (nitrogenFlow * 0.35 + churnSpeed * 0.1)));
  const creaminessScore = Math.min(100, Math.round(nitrogenFlow * 0.6 + churnSpeed * 0.4));

  return (
    <section className="py-24 px-4 sm:px-8 bg-neutral-900 text-white relative overflow-hidden">
      {/* Decorative background grid and blurs */}
      <div className="absolute inset-0 bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold tracking-widest uppercase mb-4">
            <Snowflake size={14} />
            <span>MOLECULAR CRYO-ATELIER</span>
          </div>

          <h2
            className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white mb-4 leading-none"
            style={{ fontFamily: "'Anton', sans-serif" }}
          >
            SCULPTED IN ZERO AIR. CHURNED AT -196°C.
          </h2>

          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            Conventional ice cream is 50% pumped industrial air. At TOONHUB, we inject liquid nitrogen in a vacuum turbine to flash-freeze micro-droplets in 2.4 seconds, sculpting 3D figurines with zero ice crystals.
          </p>
        </div>

        {/* 3 Process Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-3xl bg-neutral-950/80 border border-white/10 relative overflow-hidden group hover:border-cyan-500/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
              <Snowflake size={28} />
            </div>
            <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase block mb-2">
              Phase 01 // Cryogenics
            </span>
            <h3
              className="text-2xl font-bold uppercase text-white mb-3"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              FLASH-CRYO VITRIFICATION
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Liquid nitrogen at -196°C instantly flash-freezes organic heavy cream before water molecules can cluster into ice. The result is velvet gloss with a microscopic 14-micron crystal density.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-950/80 border border-white/10 relative overflow-hidden group hover:border-amber-500/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
              <Sparkles size={28} />
            </div>
            <span className="text-xs font-mono text-amber-400 tracking-widest uppercase block mb-2">
              Phase 02 // Figurine Sculpting
            </span>
            <h3
              className="text-2xl font-bold uppercase text-white mb-3"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              ARCHITECTURAL SPIRALS
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Precision extrusion nozzles shape the high-viscosity churn into towering spirals that maintain their 3D silhouette and structural integrity, crowned with molten coulis and roast praline.
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-neutral-950/80 border border-white/10 relative overflow-hidden group hover:border-emerald-500/30 transition-all">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
              <Award size={28} />
            </div>
            <span className="text-xs font-mono text-emerald-400 tracking-widest uppercase block mb-2">
              Phase 03 // Single-Estate
            </span>
            <h3
              className="text-2xl font-bold uppercase text-white mb-3"
              style={{ fontFamily: "'Anton', sans-serif" }}
            >
              FARM-DIRECT TERROIR
            </h3>
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Zero artificial flavor compounds. Real Ratnagiri Alphonso mango pulp, Uji ceremonial matcha, Sicilian Bronte green pistachios, and wild Atlantic Maine blueberries.
            </p>
          </div>
        </div>

        {/* Interactive Cryo-Lab Simulator */}
        <div className="p-8 sm:p-12 rounded-3xl bg-neutral-950 border border-cyan-500/30 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
            {/* Left Controls */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-400">
                <Sliders size={16} />
                <span>INTERACTIVE CRYO-CHURN SIMULATOR</span>
              </div>

              <h4
                className="text-3xl font-black uppercase text-white leading-tight"
                style={{ fontFamily: "'Anton', sans-serif" }}
              >
                TEST OUR ULTRA-SMOOTH CRYO PHYSICS
              </h4>

              <p className="text-xs sm:text-sm text-stone-400">
                Adjust the nitrogen flow and vacuum turbine speed to observe how crystal size shrinks and velvet creaminess elevates in real time.
              </p>

              {/* Slider 1: Liquid Nitrogen Injection */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase">
                  <span className="text-stone-300">Liquid Nitrogen Volume</span>
                  <span className="text-cyan-400 font-mono">{nitrogenFlow}% Flow</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={nitrogenFlow}
                  onChange={(e) => setNitrogenFlow(Number(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer"
                />
              </div>

              {/* Slider 2: Turbine RPM */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-semibold uppercase">
                  <span className="text-stone-300">Vacuum Turbine Churn RPM</span>
                  <span className="text-amber-400 font-mono">{churnSpeed * 10} RPM</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={churnSpeed}
                  onChange={(e) => setChurnSpeed(Number(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>
            </div>

            {/* Right Display Gauge */}
            <div className="w-full lg:w-5/12 grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
                  Crystal Size
                </span>
                <span
                  className="text-4xl sm:text-5xl font-black text-cyan-400 font-mono block"
                >
                  {crystalSizeMicrons}µm
                </span>
                <span className="text-[10px] text-stone-400 mt-2 block">
                  (Commercial average: 65µm)
                </span>
              </div>

              <div className="p-6 rounded-2xl bg-neutral-900 border border-white/10 text-center">
                <span className="text-[10px] uppercase font-bold tracking-widest text-stone-400 block mb-1">
                  Silk Creaminess
                </span>
                <span
                  className="text-4xl sm:text-5xl font-black text-amber-400 font-mono block"
                >
                  {creaminessScore}%
                </span>
                <span className="text-[10px] text-stone-400 mt-2 block">
                  Ultra-dense velvet index
                </span>
              </div>

              <div className="col-span-2 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-center">
                <span className="text-xs font-semibold text-cyan-300 flex items-center justify-center gap-2">
                  <Wind size={16} />
                  <span>Sub-Zero Cryo Equilibrium Reached: 100% Microscopic Silk Density</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
