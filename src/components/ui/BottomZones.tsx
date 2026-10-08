'use client';

import React from 'react';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { Coffee, Sofa, BookOpen, Wrench, Sparkles } from 'lucide-react';

export function BottomZones() {
  const {
    activeZone,
    setActiveZone,
    setIsRentModalOpen,
    getTotalMonthlyRent,
  } = useWorkspaceStore();

  const totalRent = getTotalMonthlyRent();

  return (
    <div className="absolute bottom-3 left-0 right-0 z-20 pointer-events-none flex flex-col items-center px-3 sm:px-6">
      {/* Center Action Button: Ready to Rent? / Rent Your Setup! */}
      <div className="pointer-events-auto flex flex-col items-center mb-3">
        <span className="text-[11px] font-bold tracking-wide text-zinc-700 dark:text-zinc-300 bg-white/90 dark:bg-zinc-900/90 px-3 py-1 rounded-full border border-zinc-200 dark:border-zinc-800 shadow-sm backdrop-blur-md mb-1.5">
          Ready to Rent?
        </span>
        <button
          onClick={() => setIsRentModalOpen(true)}
          className="group relative flex items-center gap-2.5 px-7 py-3 rounded-2xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 shadow-2xl hover:scale-105 active:scale-95 transition-all font-extrabold text-sm tracking-tight cursor-pointer overflow-hidden"
        >
          <Sparkles className="w-4 h-4 text-amber-400 fill-amber-400 group-hover:rotate-12 transition-transform" />
          <span>Rent Your Setup!</span>
          <span className="text-xs opacity-75 font-semibold bg-white/20 dark:bg-black/10 px-2 py-0.5 rounded-lg">
            ${totalRent}/mo
          </span>
        </button>
      </div>

      {/* Side Zones Selector (Relax Zone | Coffee Station | Garage Space | Reading Nook) */}
      <div className="pointer-events-auto w-full max-w-4xl overflow-x-auto pb-1 scrollbar-none">
        <div className="grid grid-cols-4 gap-2 min-w-[620px]">
          {/* Relax Zone */}
          <div
            onClick={() => setActiveZone(activeZone === 'relax' ? 'none' : 'relax')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer backdrop-blur-md ${
              activeZone === 'relax'
                ? 'bg-indigo-50/90 dark:bg-indigo-950/40 border-indigo-500 shadow-md'
                : 'bg-white/85 dark:bg-zinc-900/85 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-indigo-100 dark:bg-indigo-900/50 text-indigo-800 dark:text-indigo-200 flex items-center justify-center">
                  <Sofa className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Relax Zone</h4>
                  <p className="text-[10px] text-zinc-500">Cozy sofa & wool rug</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeZone === 'relax' ? 'bg-indigo-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                }`}
              >
                {activeZone === 'relax' ? 'Active' : 'Off'}
              </span>
            </div>
          </div>

          {/* Coffee Station */}
          <div
            onClick={() => setActiveZone(activeZone === 'coffee' ? 'none' : 'coffee')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer backdrop-blur-md ${
              activeZone === 'coffee'
                ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500 shadow-md'
                : 'bg-white/85 dark:bg-zinc-900/85 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 flex items-center justify-center">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Coffee Bar</h4>
                  <p className="text-[10px] text-zinc-500">Espresso bar & fridge</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeZone === 'coffee' ? 'bg-amber-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                }`}
              >
                {activeZone === 'coffee' ? 'Active' : 'Off'}
              </span>
            </div>
          </div>

          {/* Garage Space */}
          <div
            onClick={() => setActiveZone(activeZone === 'garage' ? 'none' : 'garage')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer backdrop-blur-md ${
              activeZone === 'garage'
                ? 'bg-orange-50/90 dark:bg-orange-950/40 border-orange-500 shadow-md'
                : 'bg-white/85 dark:bg-zinc-900/85 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-orange-100 dark:bg-orange-900/50 text-orange-800 dark:text-orange-200 flex items-center justify-center">
                  <Wrench className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Garage Space</h4>
                  <p className="text-[10px] text-zinc-500">Tool racks & heavy crates</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeZone === 'garage' ? 'bg-orange-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                }`}
              >
                {activeZone === 'garage' ? 'Active' : 'Off'}
              </span>
            </div>
          </div>

          {/* Reading Nook & Bookshelf */}
          <div
            onClick={() => setActiveZone(activeZone === 'reading' ? 'none' : 'reading')}
            className={`p-2.5 rounded-2xl border-2 transition-all cursor-pointer backdrop-blur-md ${
              activeZone === 'reading'
                ? 'bg-amber-50/90 dark:bg-amber-950/40 border-amber-500 shadow-md'
                : 'bg-white/85 dark:bg-zinc-900/85 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">Reading Nook</h4>
                  <p className="text-[10px] text-zinc-500">Bookshelf & floor lamp</p>
                </div>
              </div>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  activeZone === 'reading' ? 'bg-amber-600 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500'
                }`}
              >
                {activeZone === 'reading' ? 'Active' : 'Off'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
