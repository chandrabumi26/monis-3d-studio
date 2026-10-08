'use client';

import React, { useState } from 'react';
import {
  useWorkspaceStore,
  DeskType,
  ChairType,
  ZoneType,
  DeskItemType,
  ITEM_CATALOG,
  DESK_PRICES,
  CHAIR_PRICES,
} from '@/store/workspaceStore';
import {
  Monitor,
  Armchair,
  Leaf,
  Lamp,
  Table,
  Coffee,
  Check,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
  RotateCcw,
  RotateCw,
  Sparkles,
} from 'lucide-react';

type SlotTab = 'center' | 'left' | 'right' | 'chair' | 'desk' | 'zone';

export function CatalogDrawer() {
  const {
    isCatalogOpen,
    setIsCatalogOpen,
    desk,
    setDesk,
    rotateDesk,
    chair,
    setChair,
    rotateChair,
    spots,
    setItemAtSpot,
    rotateItemAtSpot,
    activeZone,
    setActiveZone,
    rotateZone,
    setActiveSpotId,
    hasLaptop,
    getScreenCount,
  } = useWorkspaceStore();

  const [activeTab, setActiveTab] = useState<SlotTab>('center');

  const tabs: { id: SlotTab; label: string; sub: string; icon: any }[] = [
    { id: 'center', label: 'Center', sub: 'Screen / Laptop', icon: Monitor },
    { id: 'left', label: 'Left', sub: 'Left Desk Items', icon: Leaf },
    { id: 'right', label: 'Right', sub: 'Lamp & Books', icon: Lamp },
    { id: 'chair', label: 'Chair', sub: 'Office Chair', icon: Armchair },
    { id: 'desk', label: 'Desk', sub: 'Studio Desk', icon: Table },
    { id: 'zone', label: 'Room', sub: 'Lounge & Zones', icon: Coffee },
  ];

  // Desks list
  const desksList: { id: DeskType; name: string; desc: string; price: string }[] = [
    { id: 'wood', name: 'Solid Oak Desk (Drawers)', desc: 'Sturdy solid timber with dual storage drawers', price: '$25/mo' },
    { id: 'adjustable', name: 'Smart Standing Desk', desc: 'Motorized electric sit-stand ergonomic desk', price: '$38/mo' },
    { id: 'corner', name: 'Executive Corner L-Desk', desc: 'Expansive return wing for multitasking', price: '$32/mo' },
    { id: 'minimal', name: 'Minimalist Studio Desk', desc: 'Clean modern glass aesthetic profile', price: '$20/mo' },
  ];

  // Chairs list
  const chairsList: { id: ChairType; name: string; desc: string; price: string }[] = [
    { id: 'office', name: 'Ergonomic Task Chair', desc: 'Breathable mesh with lumbar support', price: '$25/mo' },
    { id: 'modern', name: 'Modern Fabric Cushion', desc: 'Soft fabric cushion & wooden base', price: '$18/mo' },
    { id: 'lounge', name: 'Executive Lounge Chair', desc: 'Plush executive comfort seating', price: '$32/mo' },
    { id: 'none', name: 'No Chair', desc: 'Desk setup only without chair', price: 'Free' },
  ];

  // Zones list
  const zonesList: { id: ZoneType; name: string; desc: string; price: string; icon: string }[] = [
    { id: 'relax', name: 'Relax Lounge & Rug', desc: 'Cozy sofa, ottoman & round wool rug in the back', price: '$22/mo', icon: '🛋️' },
    { id: 'coffee', name: 'Coffee Station Bar', desc: 'Bar counter, espresso machine & mini fridge', price: '$28/mo', icon: '☕' },
    { id: 'garage', name: 'Garage Storage Space', desc: 'Metal organizer racks, toolboxes & heavy crates', price: '$16/mo', icon: '🔧' },
    { id: 'reading', name: 'Reading Nook Bookshelf', desc: 'Open bookshelf & warm standing floor lamp', price: '$18/mo', icon: '📚' },
    { id: 'none', name: 'No Room Zone', desc: 'Focus strictly on the desk workspace', price: 'Free', icon: '🚫' },
  ];

  // Items for Tengah
  const centerItems: DeskItemType[] = [
    'monitor-single',
    'monitor-dual',
    'laptop',
    'none',
  ];

  // Items for Kiri & Kanan
  const sideItems: DeskItemType[] = [
    'plant-succulent',
    'plant-tall',
    'lamp-table',
    'books',
    'speaker',
    'none',
  ];

  const currentHasLaptop = hasLaptop();
  const currentScreens = getScreenCount();

  const isScreenDisabled = (type: DeskItemType, spotId: string) => {
    const currentSpotItem = spots[spotId]?.itemId;
    if (currentSpotItem === type) return false;

    if (type === 'laptop') {
      if (currentHasLaptop && currentSpotItem !== 'laptop') return true;
      if (currentScreens >= 2 && currentSpotItem !== 'monitor-single') return true;
    }
    if (type === 'monitor-single') {
      const currentContributed =
        currentSpotItem === 'monitor-single' ? 1 : currentSpotItem === 'monitor-dual' ? 2 : 0;
      if (currentScreens - currentContributed + 1 > 2) return true;
    }
    if (type === 'monitor-dual') {
      const currentContributed =
        currentSpotItem === 'monitor-dual' ? 2 : currentSpotItem === 'monitor-single' ? 1 : 0;
      if (currentHasLaptop && currentSpotItem !== 'laptop') return true;
      if (currentScreens - currentContributed + 2 > 2) return true;
    }
    return false;
  };

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
          title={isCatalogOpen ? 'Collapse Panel' : 'Expand Panel'}
        >
          {isCatalogOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
        </button>

        {/* Header Title */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div>
            <h3 className="text-xs font-black uppercase tracking-wider text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
              <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
              Workspace Customizer
            </h3>
            <p className="text-[10px] text-zinc-500 font-medium">
              Select slots or click 3D objects directly
            </p>
          </div>
          <span className="text-[10px] bg-amber-500/10 text-amber-600 dark:text-amber-400 font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
            Top Left
          </span>
        </div>

        {/* Slot Tabs */}
        <div className="grid grid-cols-3 gap-1 p-1 bg-zinc-100 dark:bg-zinc-800/80 rounded-2xl mb-3">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl text-center transition-all cursor-pointer ${
                  isActive
                    ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 shadow-sm font-bold'
                    : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'
                }`}
              >
                <Icon className="w-3.5 h-3.5 mb-0.5" />
                <span className="text-[11px] leading-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content: Center (Display / Laptop) */}
        {activeTab === 'center' && (
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                Center Display & Devices
              </span>
              {spots.center && spots.center.itemId !== 'none' && (
                <button
                  onClick={() => rotateItemAtSpot('center', Math.PI / 4)}
                  className="flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-500 cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  Rotate 45°
                </button>
              )}
            </div>

            {centerItems.map((type) => {
              const item = ITEM_CATALOG[type];
              const isSelected = spots.center?.itemId === type || (!spots.center && type === 'none');
              const disabled = isScreenDisabled(type, 'center');

              return (
                <button
                  key={type}
                  disabled={disabled}
                  onClick={() => setItemAtSpot('center', type)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    disabled
                      ? 'opacity-40 bg-zinc-100 dark:bg-zinc-800/40 border-zinc-200 dark:border-zinc-800 cursor-not-allowed'
                      : isSelected
                      ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20'
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500">{item.description}</p>
                      {disabled && (
                        <span className="text-[9px] text-red-500 font-bold block mt-0.5">
                          Max 2 Screens
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {item.price ? `+$${item.price}` : '$0'}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-500 ml-auto mt-0.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab Content: Left Wing */}
        {activeTab === 'left' && (
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                Left Wing Accessories
              </span>
              {spots.left && spots.left.itemId !== 'none' && (
                <button
                  onClick={() => rotateItemAtSpot('left', Math.PI / 4)}
                  className="flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-500 cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  Rotate 45°
                </button>
              )}
            </div>

            {sideItems.map((type) => {
              const item = ITEM_CATALOG[type];
              const isSelected = spots.left?.itemId === type || (!spots.left && type === 'none');

              return (
                <button
                  key={type}
                  onClick={() => setItemAtSpot('left', type)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20'
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {item.price ? `+$${item.price}` : '$0'}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-500 ml-auto mt-0.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab Content: Right Wing */}
        {activeTab === 'right' && (
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                Right Wing Accessories
              </span>
              {spots.right && spots.right.itemId !== 'none' && (
                <button
                  onClick={() => rotateItemAtSpot('right', Math.PI / 4)}
                  className="flex items-center gap-1 text-[10px] font-bold text-amber-600 hover:text-amber-500 cursor-pointer"
                >
                  <RotateCw className="w-3 h-3" />
                  Rotate 45°
                </button>
              )}
            </div>

            {sideItems.map((type) => {
              const item = ITEM_CATALOG[type];
              const isSelected = spots.right?.itemId === type || (!spots.right && type === 'none');

              return (
                <button
                  key={type}
                  onClick={() => setItemAtSpot('right', type)}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20'
                      : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xl">{item.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-zinc-500">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                      {item.price ? `+$${item.price}` : '$0'}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-amber-500 ml-auto mt-0.5" />}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {/* Tab Content: Chair */}
        {activeTab === 'chair' && (
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                Select Office Chair
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => rotateChair(-Math.PI / 8)}
                  className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                  title="Rotate Left"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => rotateChair(Math.PI / 8)}
                  className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                  title="Rotate Right"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {chairsList.map((c) => (
              <button
                key={c.id}
                onClick={() => setChair(c.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  chair === c.id
                    ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{c.name}</h4>
                  <p className="text-[10px] text-zinc-500">{c.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {c.price}
                  </span>
                  {chair === c.id && <Check className="w-4 h-4 text-amber-500 ml-auto mt-0.5" />}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab Content: Desk */}
        {activeTab === 'desk' && (
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                Select Studio Desk
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => rotateDesk(-Math.PI / 8)}
                  className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                  title="Rotate Left"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
                <button
                  onClick={() => rotateDesk(Math.PI / 8)}
                  className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                  title="Rotate Right"
                >
                  <RotateCw className="w-3 h-3" />
                </button>
              </div>
            </div>

            {desksList.map((d) => (
              <button
                key={d.id}
                onClick={() => setDesk(d.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  desk === d.id
                    ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                }`}
              >
                <div>
                  <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{d.name}</h4>
                  <p className="text-[10px] text-zinc-500">{d.desc}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {d.price}
                  </span>
                  {desk === d.id && <Check className="w-4 h-4 text-amber-500 ml-auto mt-0.5" />}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Tab Content: Room Zone */}
        {activeTab === 'zone' && (
          <div className="space-y-2 max-h-[55vh] overflow-y-auto pr-1">
            <div className="flex items-center justify-between px-1 mb-1">
              <span className="text-[11px] font-bold text-zinc-700 dark:text-zinc-300">
                Select Room Zone
              </span>
              {activeZone !== 'none' && (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => rotateZone(-Math.PI / 8)}
                    className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                    title="Rotate Zone Left"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => rotateZone(Math.PI / 8)}
                    className="p-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-white transition-colors cursor-pointer"
                    title="Rotate Zone Right"
                  >
                    <RotateCw className="w-3 h-3" />
                  </button>
                </div>
              )}
            </div>

            {zonesList.map((z) => (
              <button
                key={z.id}
                onClick={() => setActiveZone(z.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl border text-left transition-all cursor-pointer ${
                  activeZone === z.id
                    ? 'bg-amber-500/10 border-amber-500 dark:border-amber-400 ring-2 ring-amber-500/20'
                    : 'bg-zinc-50 dark:bg-zinc-800/50 border-zinc-200 dark:border-zinc-800 hover:border-zinc-300'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">{z.icon}</span>
                  <div>
                    <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100">{z.name}</h4>
                    <p className="text-[10px] text-zinc-500">{z.desc}</p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-amber-600 dark:text-amber-400">
                    {z.price}
                  </span>
                  {activeZone === z.id && <Check className="w-4 h-4 text-amber-500 ml-auto mt-0.5" />}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
