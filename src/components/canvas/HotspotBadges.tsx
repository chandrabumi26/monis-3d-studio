'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { Monitor, Leaf, Lamp, Armchair, Plus } from 'lucide-react';

export function HotspotBadges() {
  const {
    showHotspots,
    display,
    setDisplay,
    plant,
    setPlant,
    hasLamp,
    toggleLamp,
    chair,
    setChair,
    setActiveSlot,
  } = useWorkspaceStore();

  // If user has toggled hotspots OFF, render absolutely nothing!
  if (!showHotspots) return null;

  return (
    <>
      {/* 1. Hotspot Tengah: Layar & Komputer */}
      <group position={[0, 1.35, -0.15]}>
        <Html center distanceFactor={10}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveSlot('display');
              if (display === 'single') setDisplay('dual');
              else if (display === 'dual') setDisplay('triple');
              else if (display === 'triple') setDisplay('laptop');
              else if (display === 'laptop') setDisplay('laptop-monitor');
              else if (display === 'laptop-monitor') setDisplay('single');
              else setDisplay('single');
            }}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 border-2 border-zinc-700 dark:border-zinc-300 shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap cursor-pointer backdrop-blur-md"
            title="Klik untuk ganti setup display"
          >
            <div className="w-4 h-4 rounded-full bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 flex items-center justify-center">
              <Monitor className="w-2.5 h-2.5" />
            </div>
            <span>
              {display === 'none'
                ? '+ Layar'
                : display === 'single'
                ? '1x Layar'
                : display === 'dual'
                ? '2x Layar'
                : display === 'triple'
                ? '3x Layar'
                : display === 'laptop'
                ? 'Laptop'
                : 'Laptop + Monitor'}
            </span>
          </button>
        </Html>
      </group>

      {/* 2. Hotspot Kiri: Tumbuhan */}
      <group position={[-0.58, 1.15, 0.12]}>
        <Html center distanceFactor={10}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveSlot('plant');
              setPlant(plant === 'none' ? 'succulent' : plant === 'succulent' ? 'tall' : 'none');
            }}
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-bold whitespace-nowrap cursor-pointer backdrop-blur-md ${
              plant !== 'none'
                ? 'bg-emerald-50/95 dark:bg-emerald-950/90 border-emerald-600 text-emerald-800 dark:text-emerald-200'
                : 'bg-white/95 dark:bg-zinc-900/95 border-dashed border-zinc-400 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center">
              {plant === 'none' ? <Plus className="w-2.5 h-2.5 stroke-[3]" /> : <Leaf className="w-2.5 h-2.5" />}
            </div>
            <span>{plant === 'none' ? '+ Tumbuhan' : plant === 'succulent' ? 'Sukulen' : 'Tanaman Daun'}</span>
          </button>
        </Html>
      </group>

      {/* 3. Hotspot Kanan: Lampu Meja */}
      <group position={[0.60, 1.15, -0.18]}>
        <Html center distanceFactor={10}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveSlot('lamp');
              toggleLamp();
            }}
            className={`group flex items-center gap-1.5 px-3 py-1.5 rounded-full border-2 shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-bold whitespace-nowrap cursor-pointer backdrop-blur-md ${
              hasLamp
                ? 'bg-amber-50/95 dark:bg-amber-950/90 border-amber-500 text-amber-900 dark:text-amber-200'
                : 'bg-white/95 dark:bg-zinc-900/95 border-dashed border-zinc-400 text-zinc-600 dark:text-zinc-400'
            }`}
          >
            <div className="w-4 h-4 rounded-full bg-amber-500 text-white flex items-center justify-center">
              {hasLamp ? <Lamp className="w-2.5 h-2.5" /> : <Plus className="w-2.5 h-2.5 stroke-[3]" />}
            </div>
            <span>{hasLamp ? 'Lampu Meja' : '+ Lampu'}</span>
          </button>
        </Html>
      </group>

      {/* 4. Hotspot Depan: Kursi Kerja */}
      <group position={[0, 1.05, 0.86]}>
        <Html center distanceFactor={10}>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setActiveSlot('chair');
              if (chair === 'office') setChair('modern');
              else if (chair === 'modern') setChair('lounge');
              else if (chair === 'lounge') setChair('none');
              else setChair('office');
            }}
            className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 dark:bg-zinc-900/95 border-2 border-indigo-600 dark:border-indigo-400 shadow-xl hover:scale-105 active:scale-95 transition-all text-xs font-bold text-zinc-900 dark:text-zinc-100 whitespace-nowrap cursor-pointer backdrop-blur-md"
          >
            <div className="w-4 h-4 rounded-full bg-indigo-600 text-white flex items-center justify-center">
              <Armchair className="w-2.5 h-2.5" />
            </div>
            <span>
              {chair === 'none' ? '+ Kursi' : chair === 'office' ? 'Ergonomis' : chair === 'modern' ? 'Modern' : 'Lounge'}
            </span>
          </button>
        </Html>
      </group>
    </>
  );
}
