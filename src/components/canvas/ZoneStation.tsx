'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ModelItem } from './ModelItem';
import { ZoneType, useWorkspaceStore } from '@/store/workspaceStore';
import { RotateCcw, RotateCw, Check, X, GripHorizontal } from 'lucide-react';

interface ZoneStationProps {
  zone: ZoneType;
  rotation?: number;
  options: {
    coffee: { machine: boolean; fridge: boolean };
  };
}

export function ZoneStation({ zone, rotation = 0, options }: ZoneStationProps) {
  const {
    activeZone,
    setActiveZone,
    rotateZone,
    activePickerId,
    setActivePickerId,
    showHotspots,
    selectedObjectId,
    setSelectedObjectId,
  } = useWorkspaceStore();

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedObjectId === 'zone';
  const isTargeted = isHovered || isSelected;
  const isPickerOpen = activePickerId === 'zone';

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef<{ startX: number; startY: number; initialOffset: { x: number; y: number } } | null>(null);

  useEffect(() => {
    if (!isPickerOpen) {
      setDragOffset({ x: 0, y: 0 });
    }
  }, [isPickerOpen]);

  const handleDragStart = (e: React.PointerEvent) => {
    e.stopPropagation();
    dragStartRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialOffset: { ...dragOffset },
    };

    const handlePointerMove = (ev: PointerEvent) => {
      if (!dragStartRef.current) return;
      const deltaX = ev.clientX - dragStartRef.current.startX;
      const deltaY = ev.clientY - dragStartRef.current.startY;
      setDragOffset({
        x: dragStartRef.current.initialOffset.x + deltaX,
        y: dragStartRef.current.initialOffset.y + deltaY,
      });
    };

    const handlePointerUp = () => {
      dragStartRef.current = null;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
  };

  const lightRef = useRef<THREE.PointLight>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useFrame(({ clock }) => {
    if (!isTargeted || !lightRef.current) return;
    const t = clock.getElapsedTime();
    const pulse = (Math.sin(t * 8) + 1) * 0.5;
    lightRef.current.intensity = 1.0 + pulse * 2.0;
  });

  const zonesList: { id: ZoneType; name: string; desc: string; price: string; icon: string }[] = [
    { id: 'relax', name: 'Relax Lounge & Rug', desc: 'Cozy sofa, ottoman & round wool rug in the back', price: '$22/mo', icon: '🛋️' },
    { id: 'coffee', name: 'Coffee Station Bar', desc: 'Bar counter, espresso machine & mini fridge', price: '$28/mo', icon: '☕' },
    { id: 'garage', name: 'Garage Storage Space', desc: 'Metal organizer racks, toolboxes & heavy crates', price: '$16/mo', icon: '🔧' },
    { id: 'reading', name: 'Reading Nook Bookshelf', desc: 'Open bookshelf & warm standing floor lamp', price: '$18/mo', icon: '📚' },
    { id: 'none', name: 'No Room Zone', desc: 'Focus strictly on the desk workspace', price: 'Free', icon: '🚫' },
  ];

  if (zone === 'none') return null;

  // Dynamic root position placed on the rear half of the circular carpet (away from front desk)
  const zoneRootPos: [number, number, number] =
    zone === 'relax'
      ? [0, 0, -1.25]
      : zone === 'coffee'
      ? [1.5, 0, -0.4]
      : zone === 'garage'
      ? [-1.3, 0, -0.6]
      : [-1.3, 0, -0.6];

  return (
    <group
      position={zoneRootPos}
      rotation={[0, rotation, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
        if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
        hoverTimerRef.current = setTimeout(() => {
          setIsHovered(true);
        }, 180);
      }}
      onPointerOut={() => {
        if (hoverTimerRef.current) {
          clearTimeout(hoverTimerRef.current);
          hoverTimerRef.current = null;
        }
        setIsHovered(false);
        document.body.style.cursor = 'default';
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (selectedObjectId === 'zone') {
          setActivePickerId('zone');
        } else {
          setSelectedObjectId('zone');
        }
      }}
    >
      {/* Generous invisible hit box for effortless zone hover and click detection */}
      <mesh position={[0, 0.45, 0]}>
        <boxGeometry args={[2.4, 1.1, 2.4]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Hover/Selection illumination beacon */}
      {isTargeted && activePickerId === null && (
        <pointLight
          ref={lightRef}
          position={[0, 0.8, 0]}
          color="#f59e0b"
          distance={2.5}
          decay={2}
        />
      )}

      {/* Action Pill (Hover with Delay or Click to Stay!) */}
      {isTargeted && showHotspots && activePickerId === null && (
        <group position={[0, 1.15, 0]}>
          <Html center distanceFactor={7} zIndexRange={[50, 0]}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActivePickerId('zone');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/95 text-white backdrop-blur-md rounded-2xl border border-amber-400/80 shadow-2xl text-[11px] font-bold select-none pointer-events-auto ring-2 ring-amber-400/25 transition-all duration-300 ease-out transform scale-100 hover:scale-105 active:scale-95 animate-in fade-in zoom-in-90 slide-in-from-bottom-1 cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  rotateZone(-Math.PI / 8);
                }}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Rotate Zone Left"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePickerId('zone');
                }}
                className="text-amber-300 hover:text-amber-200 font-bold px-1 whitespace-nowrap cursor-pointer"
                title="Click to change room zone"
              >
                {zone === 'coffee'
                  ? '☕ Coffee Bar'
                  : zone === 'relax'
                  ? '🛋️ Relax Area'
                  : zone === 'garage'
                  ? '🔧 Garage Space'
                  : '📚 Reading Nook'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  rotateZone(Math.PI / 8);
                }}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Rotate Zone Right"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePickerId('zone');
                }}
                className="ml-1 px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-[10px] transition-colors cursor-pointer"
                title="Change Room Zone"
              >
                Change ⚙️
              </button>
            </div>
          </Html>
        </group>
      )}

      {/* Draggable 3D Zone Picker Popover */}
      {isPickerOpen && (
        <Html center distanceFactor={5.5} position={[0, 1.35, 0]} zIndexRange={[500, 0]}>
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              transform: `translate(${dragOffset.x}px, ${dragOffset.y}px)`,
              transition: dragStartRef.current ? 'none' : 'transform 0.15s ease-out',
            }}
            className="w-76 max-w-xs bg-zinc-950 text-white backdrop-blur-2xl p-4 rounded-3xl border border-zinc-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] flex flex-col gap-3 animate-in fade-in zoom-in-95 pointer-events-auto select-none ring-1 ring-white/10"
          >
            {/* Draggable Header */}
            <div
              onPointerDown={handleDragStart}
              className="flex items-center justify-between border-b border-zinc-800 pb-2.5 cursor-grab active:cursor-grabbing select-none"
              title="Click and drag to move this popover"
            >
              <div className="flex items-center gap-2">
                <GripHorizontal className="w-4 h-4 text-zinc-500 hover:text-amber-400 transition-colors" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
                    <h3 className="text-xs font-black uppercase tracking-wider text-amber-400">
                      Room Zone Station
                    </h3>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Choose lifestyle & comfort add-on zone
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActivePickerId(null)}
                className="p-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drag hint */}
            <div className="text-[9px] text-zinc-500 -mt-1.5 text-center font-medium">
              ⠿ Drag header to reposition
            </div>

            {/* Zones Options List */}
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {zonesList.map((z) => {
                const isSelectedZone = activeZone === z.id;
                return (
                  <button
                    key={z.id}
                    onClick={() => setActiveZone(z.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelectedZone
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{z.icon}</span>
                      <div>
                        <h4 className="text-xs font-bold">{z.name}</h4>
                        <p className="text-[10px] text-zinc-500">{z.desc}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold text-amber-400 block">{z.price}</span>
                      {isSelectedZone && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto mt-0.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Rotate & Done) */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => rotateZone(-Math.PI / 8)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Rotate Zone Left"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Rotate Left</span>
              </button>
              <button
                onClick={() => rotateZone(Math.PI / 8)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Rotate Zone Right"
              >
                <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                <span>Rotate Right</span>
              </button>
              <button
                onClick={() => setActivePickerId(null)}
                className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl text-xs transition-colors cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </Html>
      )}

      {/* 1. COFFEE STATION (Solid table bar + coffee machine sitting flat on top) */}
      {zone === 'coffee' && (
        <group position={[0, 0, 0]}>
          {/* Kitchen Bar Counter (Scale 1.8 -> Counter surface at Y = 0.756m) */}
          <group position={[0, 0, 0]}>
            <ModelItem
              url="/models/kenney/kitchenBar.glb"
              position={[-0.387, 0, 0.189]}
              rotation={[0, 0, 0]}
              scale={1.8}
            />
          </group>

          {/* Espresso Machine (Sits flat on counter surface at Y = 0.756) */}
          {options.coffee.machine && (
            <group position={[0, 0.756, 0]}>
              <ModelItem
                url="/models/kenney/kitchenCoffeeMachine.glb"
                position={[-0.103, 0, 0.139]}
                rotation={[0, 0, 0]}
                scale={1.0}
              />
            </group>
          )}

          {/* Mini Fridge beside counter */}
          {options.coffee.fridge && (
            <group position={[0, 0, -0.65]}>
              <ModelItem
                url="/models/kenney/kitchenFridge.glb"
                position={[-0.28, 0, 0.16]}
                rotation={[0, 0, 0]}
                scale={1.3}
              />
            </group>
          )}
        </group>
      )}

      {/* 2. RELAX ZONE (Sofa, Ottoman & Coffee table fully centered ON TOP of the rug!) */}
      {zone === 'relax' && (
        <group position={[0, 0, 0]}>
          {/* Centered Round Rug (Scale 2.4 -> Radius ~1.1m, centered at [0, 0, 0]) */}
          <group position={[-1.104, 0.005, 1.104]}>
            <ModelItem
              url="/models/kenney/rugRound.glb"
              position={[0, 0, 0]}
              scale={2.4}
            />
          </group>

          {/* Comfortable Long Lounge Sofa facing the room */}
          <group position={[0, 0.01, -0.38]} rotation={[0, 0, 0]}>
            <ModelItem
              url="/models/kenney/loungeSofa.glb"
              position={[-0.45, 0, 0.2]}
              rotation={[0, 0, 0]}
              scale={1.4}
            />
          </group>

          {/* Lounge Chair Relax on the left side of the rug */}
          <group position={[-0.65, 0.01, 0.1]} rotation={[0, Math.PI * 0.25, 0]}>
            <ModelItem
              url="/models/kenney/loungeChairRelax.glb"
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1.3}
            />
          </group>

          {/* Beanbag / Ottoman Footrest on the right side of the rug */}
          <group position={[0.55, 0.01, 0.15]} rotation={[0, -Math.PI * 0.25, 0]}>
            <ModelItem
              url="/models/kenney/loungeSofaOttoman.glb"
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1.2}
            />
          </group>

          {/* Coffee Table centered between sofa and ottoman */}
          <group position={[0, 0.01, 0.15]}>
            <ModelItem
              url="/models/kenney/tableCoffeeGlass.glb"
              position={[0, 0, 0]}
              rotation={[0, 0, 0]}
              scale={1.1}
            />
          </group>
        </group>
      )}

      {/* 3. GARAGE SPACE (Tool storage, metal organizer shelf, heavy crates & workshop gear) */}
      {zone === 'garage' && (
        <group position={[0, 0, 0]}>
          {/* Low Metal Storage Shelves */}
          <group position={[-0.1, 0, -0.2]} rotation={[0, -Math.PI / 2, 0]}>
            <ModelItem
              url="/models/kenney/bookcaseOpenLow.glb"
              position={[-0.45, 0, 0.2]}
              rotation={[0, 0, 0]}
              scale={1.8}
            />
          </group>

          {/* Heavy Storage Crates / Boxes Stacked */}
          <group position={[0.45, 0, 0.1]}>
            <ModelItem
              url="/models/kenney/cardboardBoxClosed.glb"
              position={[0, 0, 0]}
              scale={1.5}
            />
            <ModelItem
              url="/models/kenney/cardboardBoxClosed.glb"
              position={[0, 0.45, 0]}
              rotation={[0, 0.35, 0]}
              scale={1.3}
            />
            <ModelItem
              url="/models/kenney/cardboardBoxOpen.glb"
              position={[-0.55, 0, 0.1]}
              rotation={[0, -0.2, 0]}
              scale={1.2}
            />
          </group>

          {/* Workshop Radio & Gear on the shelf */}
          <group position={[-0.2, 0.72, -0.15]}>
            <ModelItem
              url="/models/kenney/radio.glb"
              position={[0, 0, 0]}
              rotation={[0, 0.2, 0]}
              scale={1.1}
            />
          </group>

          {/* Workshop Trash Can */}
          <group position={[-0.75, 0, 0.3]}>
            <ModelItem
              url="/models/kenney/trashcan.glb"
              position={[0, 0, 0]}
              scale={1.3}
            />
          </group>
        </group>
      )}

      {/* 4. READING NOOK & CREATIVE BOOKSHELF */}
      {zone === 'reading' && (
        <group position={[0, 0, 0]}>
          {/* Open Bookcase */}
          <group position={[-0.2, 0, -0.25]} rotation={[0, -Math.PI / 2, 0]}>
            <ModelItem
              url="/models/kenney/bookcaseOpen.glb"
              position={[-0.2 * 1.8, 0, 0.125 * 1.8]}
              rotation={[0, 0, 0]}
              scale={1.8}
            />
          </group>

          {/* Floor Lamp with warm glow */}
          <group position={[-0.35, 0, 0.45]}>
            <ModelItem
              url="/models/kenney/lampRoundFloor.glb"
              position={[-0.06 * 1.5, 0, 0.06 * 1.5]}
              rotation={[0, 0, 0]}
              scale={1.5}
            />
            <pointLight position={[0, 1.2, 0]} intensity={1.8} distance={2.5} color="#ffe2a4" />
          </group>

          {/* Small Side Table with Succulent Plant */}
          <group position={[0.25, 0.35, 0.3]}>
            <ModelItem
              url="/models/kenney/sideTable.glb"
              position={[-0.18, -0.35, 0.18]}
              rotation={[0, 0, 0]}
              scale={1.4}
            />
            <ModelItem
              url="/models/kenney/pottedPlant.glb"
              position={[-0.046, 0.11, 0.053]}
              rotation={[0, 0, 0]}
              scale={0.5}
            />
          </group>
        </group>
      )}
    </group>
  );
}
