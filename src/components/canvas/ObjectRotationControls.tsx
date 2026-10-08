'use client';

import React from 'react';
import { Html } from '@react-three/drei';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { RotateCcw, RotateCw } from 'lucide-react';

export function ObjectRotationControls() {
  const {
    showHotspots,
    activeSpotId,
    rotateDesk,
    rotateChair,
    rotateZone,
    activeZone,
  } = useWorkspaceStore();

  if (!showHotspots || activeSpotId !== null) return null;

  return (
    <>
      {/* 1. Desk Rotation Floating Pill (In front of desk on floor) */}
      <group position={[0, 0.04, 1.35]}>
        <Html center distanceFactor={8}>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/90 text-white backdrop-blur-md rounded-2xl border border-zinc-700/80 shadow-xl text-[11px] font-bold select-none pointer-events-auto">
            <button
              onClick={() => rotateDesk(-Math.PI / 8)}
              className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
              title="Putar Meja ke Kiri (22.5°)"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
            <span className="text-zinc-300 font-semibold px-1 whitespace-nowrap">Meja</span>
            <button
              onClick={() => rotateDesk(Math.PI / 8)}
              className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
              title="Putar Meja ke Kanan (22.5°)"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>
        </Html>
      </group>

      {/* 2. Chair Rotation Floating Pill (Behind chair) */}
      <group position={[0, 0.04, 0.95]}>
        <Html center distanceFactor={8}>
          <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950/85 text-white backdrop-blur-md rounded-2xl border border-zinc-700/80 shadow-lg text-[10px] font-bold select-none pointer-events-auto">
            <button
              onClick={() => rotateChair(-Math.PI / 8)}
              className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
              title="Putar Kursi ke Kiri"
            >
              <RotateCcw className="w-3 h-3" />
            </button>
            <span className="text-zinc-400 font-medium px-0.5 whitespace-nowrap">Kursi</span>
            <button
              onClick={() => rotateChair(Math.PI / 8)}
              className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
              title="Putar Kursi ke Kanan"
            >
              <RotateCw className="w-3 h-3" />
            </button>
          </div>
        </Html>
      </group>

      {/* 3. Coffee / Room Station Rotation (If active) */}
      {activeZone !== 'none' && (
        <group position={[1.65, 0.04, -0.6]}>
          <Html center distanceFactor={8}>
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950/85 text-white backdrop-blur-md rounded-2xl border border-zinc-700/80 shadow-lg text-[10px] font-bold select-none pointer-events-auto">
              <button
                onClick={() => rotateZone(-Math.PI / 8)}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Putar Zona"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
              <span className="text-zinc-300 font-semibold px-0.5 whitespace-nowrap">
                {activeZone === 'coffee' ? 'Coffee Bar' : 'Zona'}
              </span>
              <button
                onClick={() => rotateZone(Math.PI / 8)}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Putar Zona"
              >
                <RotateCw className="w-3 h-3" />
              </button>
            </div>
          </Html>
        </group>
      )}
    </>
  );
}
