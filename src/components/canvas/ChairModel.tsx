'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ModelItem } from './ModelItem';
import { ChairType, useWorkspaceStore, CHAIR_PRICES } from '@/store/workspaceStore';
import { RotateCcw, RotateCw, Check, X, GripHorizontal } from 'lucide-react';

interface ChairModelProps {
  chairType: ChairType;
  rotation?: number;
}

export function ChairModel({ chairType, rotation = Math.PI * 0.94 }: ChairModelProps) {
  const {
    chair,
    setChair,
    rotateChair,
    activePickerId,
    setActivePickerId,
    showHotspots,
    selectedObjectId,
    setSelectedObjectId,
  } = useWorkspaceStore();

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedObjectId === 'chair';
  const isTargeted = isHovered || isSelected;
  const isPickerOpen = activePickerId === 'chair';

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

  const chairPos: [number, number, number] = [0, 0, 1.18];
  const chairRot: [number, number, number] = [0, rotation, 0];

  const chairsList: { id: ChairType; name: string; desc: string; price: string }[] = [
    { id: 'office', name: 'Ergonomic Task Chair', desc: 'Breathable mesh with lumbar support', price: '$25/mo' },
    { id: 'modern', name: 'Modern Fabric Cushion', desc: 'Soft fabric cushion & wooden base', price: '$18/mo' },
    { id: 'lounge', name: 'Executive Lounge Chair', desc: 'Plush executive comfort seating', price: '$32/mo' },
    { id: 'none', name: 'No Chair', desc: 'Desk setup only without chair', price: 'Free' },
  ];

  return (
    <group
      position={chairPos}
      rotation={chairRot}
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
        if (selectedObjectId === 'chair') {
          setActivePickerId('chair');
        } else {
          setSelectedObjectId('chair');
        }
      }}
    >
      {/* Generous invisible hit volume for effortless hover and click detection */}
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.55, 0.55, 1.05, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Hover/Selection illumination */}
      {isTargeted && activePickerId === null && (
        <pointLight
          ref={lightRef}
          position={[0, 0.6, 0]}
          color="#fbbf24"
          distance={1.8}
          decay={2}
        />
      )}

      {/* Action Pill (Hover with Delay or Click to Stay!) */}
      {isTargeted && showHotspots && activePickerId === null && (
        <group position={[0, 1.05, 0]}>
          <Html center distanceFactor={7} zIndexRange={[50, 0]}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActivePickerId('chair');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/95 text-white backdrop-blur-md rounded-2xl border border-amber-400/80 shadow-2xl text-[11px] font-bold select-none pointer-events-auto ring-2 ring-amber-400/25 transition-all duration-300 ease-out transform scale-100 hover:scale-105 active:scale-95 animate-in fade-in zoom-in-90 slide-in-from-bottom-1 cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  rotateChair(-Math.PI / 8);
                }}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Rotate Chair Left"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePickerId('chair');
                }}
                className="text-amber-300 hover:text-amber-200 font-bold px-1 whitespace-nowrap cursor-pointer"
                title="Click to change chair model"
              >
                🪑 Chair
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  rotateChair(Math.PI / 8);
                }}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Rotate Chair Right"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePickerId('chair');
                }}
                className="ml-1 px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-[10px] transition-colors cursor-pointer"
                title="Change Chair Model"
              >
                Change ⚙️
              </button>
            </div>
          </Html>
        </group>
      )}

      {/* Draggable 3D Chair Picker Popover */}
      {isPickerOpen && (
        <Html center distanceFactor={5.5} position={[0, 1.15, 0]} zIndexRange={[500, 0]}>
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
                      Office Chair Model
                    </h3>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Select your preferred ergonomic seating
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

            {/* Chairs Options List */}
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {chairsList.map((c) => {
                const isSelectedChair = chair === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setChair(c.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelectedChair
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold">{c.name}</h4>
                      <p className="text-[10px] text-zinc-500">{c.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold text-amber-400 block">{c.price}</span>
                      {isSelectedChair && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto mt-0.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Rotate & Done) */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => rotateChair(-Math.PI / 8)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Rotate Chair Left"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Rotate Left</span>
              </button>
              <button
                onClick={() => rotateChair(Math.PI / 8)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Rotate Chair Right"
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

      {/* Model Rendering */}
      {chairType === 'modern' ? (
        <ModelItem
          url="/models/kenney/chairModernCushion.glb"
          position={[-0.18, 0, 0.18]}
          rotation={[0, 0, 0]}
          scale={1.8}
        />
      ) : chairType === 'lounge' ? (
        <group position={[0, 0, 0.06]}>
          <ModelItem
            url="/models/kenney/loungeDesignChair.glb"
            position={[-0.474, 0, 0.266]}
            rotation={[0, 0, 0]}
            scale={1.3}
          />
        </group>
      ) : (
        <ModelItem
          url="/models/kenney/chairDesk.glb"
          position={[-0.129, 0, 0.111]}
          rotation={[0, 0, 0]}
          scale={1.8}
        />
      )}
    </group>
  );
}
