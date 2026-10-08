'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { ModelItem } from './ModelItem';
import { DeskType, useWorkspaceStore } from '@/store/workspaceStore';
import { RotateCcw, RotateCw, Check, X, GripHorizontal } from 'lucide-react';

interface DeskModelProps {
  deskType: DeskType;
}

export const DESK_HEIGHT = 0.846;

export function DeskModel({ deskType }: DeskModelProps) {
  const {
    desk,
    setDesk,
    rotateDesk,
    activePickerId,
    setActivePickerId,
    showHotspots,
    selectedObjectId,
    setSelectedObjectId,
  } = useWorkspaceStore();

  const [isHovered, setIsHovered] = useState(false);
  const isSelected = selectedObjectId === 'desk';
  const isTargeted = isHovered || isSelected;
  const isPickerOpen = activePickerId === 'desk';

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
    lightRef.current.intensity = 0.8 + pulse * 1.6;
  });

  const desksList: { id: DeskType; name: string; desc: string; price: string }[] = [
    { id: 'wood', name: 'Solid Oak Desk (Drawers)', desc: 'Sturdy solid timber with dual storage drawers', price: '$25/mo' },
    { id: 'adjustable', name: 'Smart Standing Desk', desc: 'Motorized electric sit-stand ergonomic desk', price: '$38/mo' },
    { id: 'corner', name: 'Executive Corner L-Desk', desc: 'Expansive return wing for multitasking', price: '$32/mo' },
    { id: 'minimal', name: 'Minimalist Frame Desk', desc: 'Clean modern glass aesthetic profile', price: '$20/mo' },
  ];

  return (
    <group
      position={[0, 0, 0]}
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
        if (selectedObjectId === 'desk') {
          setActivePickerId('desk');
        } else {
          setSelectedObjectId('desk');
        }
      }}
    >
      {/* Generous invisible hit volume for effortless desk hover & click */}
      <mesh position={[0, 0.42, 0.0]}>
        <boxGeometry args={[1.85, 0.88, 0.95]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Hover/Selection illumination */}
      {isTargeted && activePickerId === null && (
        <pointLight
          ref={lightRef}
          position={[0, 1.0, 0.3]}
          color="#fbbf24"
          distance={2.2}
          decay={2}
        />
      )}

      {/* Floating Action Pill (Hover with Delay or Click to Stay!) */}
      {isTargeted && showHotspots && activePickerId === null && (
        <group position={[0, 0.98, 0.48]}>
          <Html center distanceFactor={7} zIndexRange={[50, 0]}>
            <div
              onClick={(e) => {
                e.stopPropagation();
                setActivePickerId('desk');
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-950/95 text-white backdrop-blur-md rounded-2xl border border-amber-400/80 shadow-2xl text-[11px] font-bold select-none pointer-events-auto ring-2 ring-amber-400/25 transition-all duration-300 ease-out transform scale-100 hover:scale-105 active:scale-95 animate-in fade-in zoom-in-90 slide-in-from-bottom-1 cursor-pointer"
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  rotateDesk(-Math.PI / 8);
                }}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Rotate Desk Left"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <span
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePickerId('desk');
                }}
                className="text-amber-300 hover:text-amber-200 font-bold px-1 whitespace-nowrap cursor-pointer"
                title="Click to change desk model"
              >
                🪵 Desk
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  rotateDesk(Math.PI / 8);
                }}
                className="p-1 rounded-lg bg-zinc-800 hover:bg-amber-500 hover:text-zinc-950 transition-colors cursor-pointer"
                title="Rotate Desk Right"
              >
                <RotateCw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setActivePickerId('desk');
                }}
                className="ml-1 px-2 py-0.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black text-[10px] transition-colors cursor-pointer"
                title="Change Desk Model"
              >
                Change ⚙️
              </button>
            </div>
          </Html>
        </group>
      )}

      {/* Draggable 3D Desk Picker Popover */}
      {isPickerOpen && (
        <Html center distanceFactor={5.5} position={[0, 1.25, 0.4]} zIndexRange={[500, 0]}>
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
                      Studio Desk Model
                    </h3>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    Select your primary workspace foundation
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

            {/* Desks Options List */}
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {desksList.map((d) => {
                const isSelectedDesk = desk === d.id;
                return (
                  <button
                    key={d.id}
                    onClick={() => setDesk(d.id)}
                    className={`w-full flex items-center justify-between p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelectedDesk
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <div>
                      <h4 className="text-xs font-bold">{d.name}</h4>
                      <p className="text-[10px] text-zinc-500">{d.desc}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-bold text-amber-400 block">{d.price}</span>
                      {isSelectedDesk && <Check className="w-3.5 h-3.5 text-amber-400 ml-auto mt-0.5" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Rotate & Done) */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              <button
                onClick={() => rotateDesk(-Math.PI / 8)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Rotate Desk Left"
              >
                <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
                <span>Rotate Left</span>
              </button>
              <button
                onClick={() => rotateDesk(Math.PI / 8)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                title="Rotate Desk Right"
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

      {/* Desk Models */}
      {deskType === 'adjustable' && (
        <group position={[0, 0, 0.017]} rotation={[0, -Math.PI / 2, 0]}>
          <ModelItem
            url="/models/others/AdjustableDesk.glb"
            position={[0, 0, 0]}
            rotation={[0, 0, 0]}
            scale={0.898}
          />
        </group>
      )}

      {deskType === 'corner' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/deskCorner.glb"
            position={[-0.642, 0, 1.715]}
            rotation={[0, 0, 0]}
            scale={2.2}
          />
        </group>
      )}

      {deskType === 'minimal' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/tableGlass.glb"
            position={[-0.925, 0, 0.492]}
            rotation={[0, 0, 0]}
            scale={[1.9, 2.59, 1.9]}
          />
        </group>
      )}

      {deskType === 'wood' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/desk.glb"
            position={[-0.785, 0, 0.407]}
            rotation={[0, 0, 0]}
            scale={2.2}
          />
        </group>
      )}
    </group>
  );
}
