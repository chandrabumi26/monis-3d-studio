'use client';

import React from 'react';
import { useWorkspaceStore, DisplayType, ChairType, PlantType, DeskType } from '@/store/workspaceStore';
import {
  Monitor,
  Armchair,
  Leaf,
  Lamp,
  Table,
  Check,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  Laptop,
} from 'lucide-react';

export function CatalogDrawer() {
  const {
    activeSlot,
    setActiveSlot,
    isCatalogOpen,
    setIsCatalogOpen,
    desk,
    setDesk,
    display,
    setDisplay,
    chair,
    setChair,
    plant,
    setPlant,
    hasLamp,
    toggleLamp,
    hasBooks,
    toggleBooks,
    hasPeripherals,
    togglePeripherals,
  } = useWorkspaceStore();

  const slotTabs = [
    { id: 'display' as const, label: 'Tengah', sub: 'Layar & PC', icon: Monitor },
    { id: 'chair' as const, label: 'Depan', sub: 'Kursi', icon: Armchair },
    { id: 'plant' as const, label: 'Kiri', sub: 'Tumbuhan', icon: Leaf },
    { id: 'lamp' as const, label: 'Kanan', sub: 'Lampu & Buku', icon: Lamp },
    { id: 'desk' as const, label: 'Meja', sub: 'Model', icon: Table },
  ];

  const displaysList: { id: DisplayType; name: string; desc: string; price: string }[] = [
    { id: 'single', name: '1x Layar Monitor 27"', desc: '4K Ultra-Sharp Display', price: 'Rp 150k' },
    { id: 'dual', name: '2x Dual Monitor', desc: 'Produktivitas Coding / Desain', price: 'Rp 290k' },
    { id: 'triple', name: '3x Panoramic Monitor', desc: 'Setup Multitasking Penuh', price: 'Rp 420k' },
    { id: 'laptop', name: 'Laptop Standalone', desc: 'Laptop saja (tanpa keyboard)', price: 'Rp 160k' },
    { id: 'laptop-monitor', name: 'Laptop + 1x Monitor', desc: 'Kombinasi 2 Layar (Laptop + 27")', price: 'Rp 300k' },
    { id: 'none', name: 'Tanpa Layar', desc: 'Meja Bersih Tanpa Layar', price: 'Rp 0' },
  ];

  const chairsList: { id: ChairType; name: string; desc: string; price: string }[] = [
    { id: 'office', name: 'Kursi Ergonomis', desc: 'Mesh breathable dengan lumbar support', price: 'Rp 250k' },
    { id: 'modern', name: 'Kursi Modern Fabric', desc: 'Bantalan kain & kaki kayu minimalis', price: 'Rp 180k' },
    { id: 'lounge', name: 'Kursi Executive Soft', desc: 'Sofa empuk santai premium', price: 'Rp 320k' },
    { id: 'none', name: 'Tanpa Kursi', desc: 'Hanya meja & aksesoris', price: 'Rp 0' },
  ];

  const plantsList: { id: PlantType; name: string; desc: string; price: string }[] = [
    { id: 'succulent', name: 'Tanaman Sukulen Meja', desc: 'Pot mini estetik & segar', price: 'Rp 35k' },
    { id: 'tall', name: 'Tanaman Daun Hias', desc: 'Sentuhan asri hijau natural', price: 'Rp 45k' },
    { id: 'none', name: 'Tanpa Tumbuhan', desc: 'Area kiri meja bersih', price: 'Rp 0' },
  ];

  const desksList: { id: DeskType; name: string; desc: string; price: string }[] = [
    { id: 'wood', name: 'Meja Kayu Oak Studio', desc: 'Meja solid lengkap dengan 2 laci', price: 'Rp 250k' },
    { id: 'adjustable', name: 'Meja Adjustable Elektrik', desc: 'Sit-Stand Desk motorik modern', price: 'Rp 380k' },
    { id: 'corner', name: 'Meja Sudut L-Desk', desc: 'Meja sudut lega area produktif', price: 'Rp 320k' },
    { id: 'minimal', name: 'Meja Studio Minimalis', desc: 'Ramping modern tanpa laci', price: 'Rp 200k' },
  ];

  const isLaptop = display === 'laptop' || display === 'laptop-monitor';

  return (
    <div
      className={`absolute top-20 sm:top-24 left-4 z-20 transition-all duration-300 ${
        isCatalogOpen ? 'translate-x-0' : '-translate-x-[calc(100%+2rem)]'
      }`}
    >
      <div className="relative w-84 sm:w-92 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl rounded-3xl border border-zinc-200/90 dark:border-zinc-800 shadow-2xl overflow-hidden p-4">
        {/* Toggle Collapse Button */}
        <button
          onClick={() => setIsCatalogOpen(!isCatalogOpen)}
          className="absolute -right-10 top-6 w-9 h-12 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-md rounded-r-2xl border-y border-r border-zinc-200/90 dark:border-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 shadow-md cursor-pointer transition-colors"
          title={isCatalogOpen ? 'Sembunyikan Panel' : 'Buka Panel'}
        >
          {isCatalogOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Header Title */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5" />
              Kustomisasi Slot Meja
            </h3>
            <p className="text-[10px] text-zinc-500">Pilih furnitur & perangkat di tiap posisi meja</p>
          </div>
        </div>

        {/* 5 Slot Tabs (Tengah | Depan | Kiri | Kanan | Meja) */}
        <div className="grid grid-cols-5 gap-1 bg-zinc-100 dark:bg-zinc-800/80 p-1 rounded-2xl mb-4 text-[11px] font-bold">
          {slotTabs.map((t) => {
            const Icon = t.icon;
            const isSelected = activeSlot === t.id;
            return (
              <button
                key={t.id}
                onClick={() => setActiveSlot(t.id)}
                className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition-all ${
                  isSelected
                    ? 'bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
                title={t.sub}
              >
                <Icon className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[10px] leading-tight">{t.label}</span>
              </button>
            );
          })}
        </div>

        {/* === TAB 1: TENGAH (LAYAR & PC) === */}
        {activeSlot === 'display' && (
          <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
            <div className="text-[10px] font-semibold text-zinc-500 mb-1 flex justify-between items-center px-1">
              <span>PILIH SETUP LAYAR TENGAH</span>
            </div>
            {displaysList.map((d) => {
              const isSelected = display === d.id;
              const isLap = d.id === 'laptop' || d.id === 'laptop-monitor';
              const Icon = isLap ? Laptop : Monitor;

              return (
                <div
                  key={d.id}
                  onClick={() => setDisplay(d.id)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/60 shadow-sm'
                      : 'border-dashed border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 bg-white dark:bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{d.name}</h4>
                      <p className="text-[10px] text-zinc-500">{d.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">{d.price}</span>
                    <p className="text-[9px] text-zinc-400">/bln</p>
                  </div>
                </div>
              );
            })}

            {/* Peripherals notice or toggle */}
            {!isLaptop ? (
              <div
                onClick={togglePeripherals}
                className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer mt-3 ${
                  hasPeripherals
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/20'
                    : 'border-dashed border-zinc-200 dark:border-zinc-700'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Keyboard & Mouse Mekanikal
                  </h4>
                  <p className="text-[10px] text-zinc-500">+Rp 60k/bulan</p>
                </div>
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                    hasPeripherals ? 'bg-indigo-600 text-white' : 'border border-zinc-400 text-transparent'
                  }`}
                >
                  ✓
                </div>
              </div>
            ) : (
              <div className="p-2.5 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 text-[10px] text-zinc-500 flex items-center gap-2 mt-2">
                <span>💡</span>
                <span>Keyboard eksternal otomatis disembunyikan untuk setup laptop (keyboard bawaan laptop aktif).</span>
              </div>
            )}
          </div>
        )}

        {/* === TAB 2: DEPAN (KURSI) === */}
        {activeSlot === 'chair' && (
          <div className="space-y-2">
            <div className="text-[10px] font-semibold text-zinc-500 mb-1 px-1">
              PILIH KURSI KERJA DI DEPAN MEJA
            </div>
            {chairsList.map((c) => {
              const isSelected = chair === c.id;
              return (
                <div
                  key={c.id}
                  onClick={() => setChair(c.id)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/60 shadow-sm'
                      : 'border-dashed border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 bg-white dark:bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <Armchair className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{c.name}</h4>
                      <p className="text-[10px] text-zinc-500">{c.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">{c.price}</span>
                    <p className="text-[9px] text-zinc-400">/bln</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* === TAB 3: KIRI (TUMBUHAN) === */}
        {activeSlot === 'plant' && (
          <div className="space-y-2">
            <div className="text-[10px] font-semibold text-zinc-500 mb-1 px-1">
              PILIH TUMBUHAN DI SISI KIRI MEJA
            </div>
            {plantsList.map((p) => {
              const isSelected = plant === p.id;
              return (
                <div
                  key={p.id}
                  onClick={() => setPlant(p.id)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm'
                      : 'border-dashed border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 bg-white dark:bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-emerald-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <Leaf className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{p.name}</h4>
                      <p className="text-[10px] text-zinc-500">{p.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">{p.price}</span>
                    <p className="text-[9px] text-zinc-400">/bln</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* === TAB 4: KANAN (LAMPU & BUKU) === */}
        {activeSlot === 'lamp' && (
          <div className="space-y-2.5">
            <div className="text-[10px] font-semibold text-zinc-500 mb-1 px-1">
              AKSESORIS DI SISI KANAN MEJA
            </div>

            {/* Lampu Meja */}
            <div
              onClick={toggleLamp}
              className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                hasLamp
                  ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm'
                  : 'border-dashed border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    hasLamp ? 'bg-amber-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                  }`}
                >
                  <Lamp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Lampu Meja Hangat
                  </h4>
                  <p className="text-[10px] text-zinc-500">Pencahayaan fokus +Rp 45k/bln</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                  hasLamp ? 'bg-amber-500 text-white' : 'border border-zinc-400 text-transparent'
                }`}
              >
                ✓
              </div>
            </div>

            {/* Buku Desain */}
            <div
              onClick={toggleBooks}
              className={`flex items-center justify-between p-3 rounded-2xl border-2 transition-all cursor-pointer ${
                hasBooks
                  ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20 shadow-sm'
                  : 'border-dashed border-zinc-200 dark:border-zinc-700'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                    hasBooks ? 'bg-rose-500 text-white' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600'
                  }`}
                >
                  <Check className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                    Tumpukan Buku Desain
                  </h4>
                  <p className="text-[10px] text-zinc-500">Buku referensi arsitektur +Rp 25k/bln</p>
                </div>
              </div>
              <div
                className={`w-5 h-5 rounded-md flex items-center justify-center text-xs font-bold ${
                  hasBooks ? 'bg-rose-500 text-white' : 'border border-zinc-400 text-transparent'
                }`}
              >
                ✓
              </div>
            </div>
          </div>
        )}

        {/* === TAB 5: MEJA === */}
        {activeSlot === 'desk' && (
          <div className="space-y-2">
            <div className="text-[10px] font-semibold text-zinc-500 mb-1 px-1">
              PILIH MODEL MEJA KERJA UTAMA
            </div>
            {desksList.map((d) => {
              const isSelected = desk === d.id;
              return (
                <div
                  key={d.id}
                  onClick={() => setDesk(d.id)}
                  className={`flex items-center justify-between p-2.5 rounded-2xl border-2 transition-all cursor-pointer ${
                    isSelected
                      ? 'border-zinc-900 dark:border-zinc-100 bg-zinc-50 dark:bg-zinc-800/60 shadow-sm'
                      : 'border-dashed border-zinc-200 dark:border-zinc-700 hover:border-zinc-400 bg-white dark:bg-transparent'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                        isSelected
                          ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      <Table className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{d.name}</h4>
                      <p className="text-[10px] text-zinc-500">{d.desc}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-extrabold text-zinc-900 dark:text-zinc-100">{d.price}</span>
                    <p className="text-[9px] text-zinc-400">/bln</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
