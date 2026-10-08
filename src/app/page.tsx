'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/ui/Header';
import { CatalogDrawer } from '@/components/ui/CatalogDrawer';
import { BottomZones } from '@/components/ui/BottomZones';
import { RentModal } from '@/components/ui/RentModal';
import { Move } from 'lucide-react';

// Dynamic import for 3D Canvas to avoid any SSR WebGL issues
const Scene = dynamic(
  () => import('@/components/canvas/Scene').then((mod) => mod.Scene),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full flex flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-500">
        <div className="w-10 h-10 border-4 border-zinc-300 dark:border-zinc-700 border-t-zinc-900 dark:border-t-zinc-100 rounded-full animate-spin mb-4" />
        <p className="text-sm font-semibold tracking-wide">Loading 3D Workspace Studio...</p>
      </div>
    ),
  }
);

export default function WorkspaceStudioPage() {
  return (
    <main className="relative w-screen h-screen overflow-hidden bg-[#f7f7f8] dark:bg-[#0c0c0e] font-sans select-none">
      {/* 3D Canvas Scene */}
      <Scene />

      {/* Floating UI Overlays */}
      <Header />
      <CatalogDrawer />
      <BottomZones />
      <RentModal />

      {/* Floating 3D Navigation Hint */}
      <div className="hidden sm:flex absolute top-20 right-6 z-10 pointer-events-none items-center gap-2 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-800/60 text-[11px] font-medium text-zinc-500 dark:text-zinc-400">
        <Move className="w-3.5 h-3.5" />
        <span>Drag to rotate • Scroll to zoom</span>
      </div>
    </main>
  );
}
