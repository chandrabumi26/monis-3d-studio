'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { RotateCcw, Eye, Compass, Sparkles, Pin, PinOff } from 'lucide-react';

export function Header() {
  const {
    cameraView,
    setCameraView,
    resetSetup,
    getTotalMonthlyRent,
    setIsRentModalOpen,
    showHotspots,
    toggleShowHotspots,
  } = useWorkspaceStore();

  const totalRent = getTotalMonthlyRent();

  return (
    <header className="absolute top-0 left-0 right-0 z-20 pointer-events-none flex flex-col items-center pt-4 px-4 sm:px-6">
      <div className="w-full flex items-center justify-between max-w-7xl">
        {/* Brand / Logo */}
        <div className="pointer-events-auto flex items-center gap-2.5 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-4 py-2 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center font-black text-sm tracking-tighter">
            M3D
          </div>
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-100">
              Workspace Studio
            </h2>
            <p className="text-[10px] text-zinc-500 font-medium">3D Virtual Configurator</p>
          </div>
        </div>

        {/* Center Title */}
        <div className="pointer-events-auto text-center hidden md:block">
          <h1 className="text-2xl lg:text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100 font-sans">
            Design Your Workspace!
          </h1>
          <p className="text-xs text-zinc-500 tracking-wide font-medium mt-0.5">
            — Create Your Perfect Setup! —
          </p>
        </div>

        {/* Right Controls: Hotspot Toggle, Views, Price */}
        <div className="pointer-events-auto flex items-center gap-2">
          {/* Toggle Hotspot Labels (ON / OFF) */}
          <button
            onClick={toggleShowHotspots}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
              showHotspots
                ? 'bg-amber-500 text-white border-amber-600 shadow-md ring-2 ring-amber-400/40'
                : 'bg-white/90 dark:bg-zinc-900/90 text-zinc-600 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-zinc-100'
            }`}
            title={showHotspots ? 'Sembunyikan Pin Petunjuk 3D' : 'Tampilkan Pin Petunjuk 3D'}
          >
            {showHotspots ? <Pin className="w-3.5 h-3.5 fill-current" /> : <PinOff className="w-3.5 h-3.5" />}
            <span>Pin {showHotspots ? 'ON' : 'OFF'}</span>
          </button>

          {/* Camera View Switcher */}
          <div className="flex items-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md p-1 rounded-2xl border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-xs font-semibold">
            <button
              onClick={() => setCameraView('iso')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                cameraView === 'iso'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
              title="Isometric 3D View"
            >
              <Compass className="w-3.5 h-3.5 inline mr-1" />
              3D
            </button>
            <button
              onClick={() => setCameraView('front')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                cameraView === 'front'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
              title="Front View"
            >
              <Eye className="w-3.5 h-3.5 inline mr-1" />
              Front
            </button>
            <button
              onClick={() => setCameraView('top')}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                cameraView === 'top'
                  ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-sm'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900'
              }`}
              title="Top Down View"
            >
              Top
            </button>
          </div>

          {/* Reset Setup */}
          <button
            onClick={resetSetup}
            className="p-2.5 rounded-2xl bg-white/90 dark:bg-zinc-900/90 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-zinc-200/80 dark:border-zinc-800 shadow-sm text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 transition-all cursor-pointer"
            title="Reset ke setup awal"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Total Price pill button */}
          <button
            onClick={() => setIsRentModalOpen(true)}
            className="flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer font-bold text-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span>Rp {totalRent.toLocaleString('id-ID')}</span>
            <span className="text-[10px] opacity-75 font-normal">/bln</span>
          </button>
        </div>
      </div>
    </header>
  );
}
