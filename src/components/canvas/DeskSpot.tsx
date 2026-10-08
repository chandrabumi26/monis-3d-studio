'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import {
  useWorkspaceStore,
  SpotDefinition,
  SpotContent,
  ITEM_CATALOG,
  DeskItemType,
} from '@/store/workspaceStore';
import { SpotItemRenderer } from './SpotItemRenderer';
import { Plus, RotateCw, Trash2, X, Check, GripHorizontal } from 'lucide-react';

interface DeskSpotProps {
  spot: SpotDefinition;
  content: SpotContent | null;
  isActive: boolean;
}

// Glowing & Pulsing Effect when user hovers an object/spot
function HoverPulseBeacon({ isHovered, isOccupied }: { isHovered: boolean; isOccupied: boolean }) {
  const lightRef = useRef<THREE.PointLight>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!isHovered) return;
    const t = clock.getElapsedTime();
    // Kedip-kedip cepat & responsif (pulsing glow)
    const pulse = (Math.sin(t * 9) + 1) * 0.5; // 0 to 1
    if (lightRef.current) {
      lightRef.current.intensity = 1.2 + pulse * 2.8;
    }
    if (ringRef.current) {
      const scale = 1.0 + pulse * 0.18;
      ringRef.current.scale.set(scale, scale, 1);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      if (mat) {
        mat.opacity = 0.5 + pulse * 0.5;
      }
    }
  });

  if (!isHovered) return null;

  return (
    <>
      {/* Light illuminating the object to make it blink/glow */}
      <pointLight
        ref={lightRef}
        position={[0, isOccupied ? 0.35 : 0.06, 0]}
        color="#fbbf24"
        distance={1.6}
        decay={2}
      />

      {/* Pulsing ring beacon on desk surface */}
      <mesh
        ref={ringRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.003, 0]}
      >
        <ringGeometry args={[isOccupied ? 0.22 : 0.12, isOccupied ? 0.28 : 0.18, 32]} />
        <meshBasicMaterial
          color="#f59e0b"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
        />
      </mesh>
    </>
  );
}

export function DeskSpot({ spot, content, isActive }: DeskSpotProps) {
  const {
    showHotspots,
    activeSpotId,
    setActiveSpotId,
    selectedObjectId,
    setSelectedObjectId,
    setItemAtSpot,
    rotateItemAtSpot,
    removeItemAtSpot,
    hasLaptop,
    getScreenCount,
  } = useWorkspaceStore();

  const [isHovered, setIsHovered] = useState(false);
  const spotTag = `spot:${spot.id}`;
  const isSelected = selectedObjectId === spotTag;
  const isTargeted = isHovered || isSelected;

  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const dragStartRef = useRef<{ startX: number; startY: number; initialOffset: { x: number; y: number } } | null>(null);

  useEffect(() => {
    if (!isActive) {
      setDragOffset({ x: 0, y: 0 });
    }
  }, [isActive]);

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

  const isOccupied = content && content.itemId !== 'none';
  const itemInfo = isOccupied ? ITEM_CATALOG[content.itemId] : null;

  const currentHasLaptop = hasLaptop();
  const currentScreens = getScreenCount();

  // Screen limitation rule check
  const isScreenOptionDisabled = (type: DeskItemType) => {
    const isCurrentThisType = content?.itemId === type;
    if (isCurrentThisType) return false;

    if (type === 'laptop') {
      // Only 1 laptop allowed on desk
      if (currentHasLaptop && content?.itemId !== 'laptop') return true;
      // Max 2 screens total
      if (currentScreens >= 2 && content?.itemId !== 'monitor-single') return true;
    }

    if (type === 'monitor-single') {
      const currentContributed =
        content?.itemId === 'monitor-single' ? 1 : content?.itemId === 'monitor-dual' ? 2 : 0;
      if (currentScreens - currentContributed + 1 > 2) return true;
    }

    if (type === 'monitor-dual') {
      // Dual monitor (2 screens) not allowed if laptop is on desk or other monitors exist
      const currentContributed =
        content?.itemId === 'monitor-dual' ? 2 : content?.itemId === 'monitor-single' ? 1 : 0;
      if (currentHasLaptop && content?.itemId !== 'laptop') return true;
      if (currentScreens - currentContributed + 2 > 2) return true;
    }

    return false;
  };

  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 180);
  };

  const handlePointerOut = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
      hoverTimerRef.current = null;
    }
    setIsHovered(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    // Clicking selects the spot so pin stays firmly visible!
    // If it's already selected, clicking it again opens the 3D customization menu!
    if (selectedObjectId === spotTag) {
      setActiveSpotId(spot.id);
    } else {
      setSelectedObjectId(spotTag);
    }
  };

  return (
    <group
      position={spot.position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Invisible hit volume with visible=true and opacity=0 so raycaster intercepts it effortlessly */}
      <mesh position={[0, isOccupied ? 0.22 : 0.04, 0]}>
        <cylinderGeometry
          args={[isOccupied ? 0.42 : 0.24, isOccupied ? 0.42 : 0.24, 0.6, 16]}
        />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Subtle guide ring for empty spots so user can locate them */}
      {!isOccupied && !isActive && (
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.002, 0]}>
          <ringGeometry args={[0.08, 0.11, 24]} />
          <meshBasicMaterial
            color={isTargeted ? '#f59e0b' : '#94a3b8'}
            transparent
            opacity={isTargeted ? 0.9 : 0.25}
            side={THREE.DoubleSide}
          />
        </mesh>
      )}

      {/* Animated pulsing glow effect when hovered or selected */}
      <HoverPulseBeacon isHovered={isTargeted && !isActive} isOccupied={Boolean(isOccupied)} />

      {/* 3D Item Model */}
      {isOccupied && (
        <group position={[0, isTargeted && !isActive ? 0.012 : 0, 0]}>
          <SpotItemRenderer itemId={content.itemId} rotation={content.rotation} />
        </group>
      )}

      {/* Spot Pin: SMOOTH ANIMATION ON HOVER WITH DELAY, OR STAYS ON CLICK */}
      {isTargeted && !isActive && showHotspots && activeSpotId === null && (
        <Html
          center
          distanceFactor={7}
          position={[0, isOccupied ? 0.35 : 0.06, 0]}
          zIndexRange={[50, 0]}
        >
          <div
            onClick={(e) => {
              e.stopPropagation();
              setActiveSpotId(spot.id);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-xl border backdrop-blur-md cursor-pointer transition-all duration-300 ease-out transform scale-100 hover:scale-105 active:scale-95 animate-in fade-in zoom-in-90 slide-in-from-bottom-1 ${
              isOccupied
                ? 'bg-zinc-950/95 text-white border-amber-400/80 shadow-amber-500/25 ring-2 ring-amber-400/30'
                : 'bg-amber-500 text-zinc-950 border-amber-300 font-black shadow-amber-500/40'
            }`}
          >
            {isOccupied ? (
              <>
                <span className="text-sm">{itemInfo?.icon}</span>
                <span className="text-[11px] font-bold text-amber-300 whitespace-nowrap">
                  {itemInfo?.name.split(' ')[0]} {itemInfo?.name.split(' ')[1] || ''}
                </span>
                <span className="text-[10px] bg-zinc-800 text-zinc-200 px-1.5 py-0.5 rounded-md">
                  Configure ⚙️
                </span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5 stroke-[3]" />
                <span className="text-[11px] font-black whitespace-nowrap">
                  + {spot.name}
                </span>
              </>
            )}
          </div>
        </Html>
      )}

      {/* Interactive 3D Popover Menu (Draggable by user) */}
      {isActive && (
        <Html center distanceFactor={5.5} position={[0, 0.44, 0]} zIndexRange={[500, 0]}>
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
                      {spot.name}
                    </h3>
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-0.5">
                    {isOccupied ? itemInfo?.name : 'Choose an item for this slot'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setActiveSpotId(null)}
                className="p-1 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Drag hint badge */}
            <div className="text-[9px] text-zinc-500 -mt-1.5 text-center font-medium">
              ⠿ Drag header to reposition
            </div>

            {/* Item Selection Options Grid */}
            <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
              {(
                [
                  'monitor-single',
                  'monitor-dual',
                  'laptop',
                  'plant-succulent',
                  'plant-tall',
                  'lamp-table',
                  'books',
                  'speaker',
                ] as DeskItemType[]
              ).map((type) => {
                const item = ITEM_CATALOG[type];
                const isSelected = content?.itemId === type;
                const disabled = isScreenOptionDisabled(type);

                return (
                  <button
                    key={type}
                    disabled={disabled}
                    onClick={() => setItemAtSpot(spot.id, type)}
                    className={`flex flex-col items-start p-2 rounded-xl border text-left transition-all cursor-pointer ${
                      disabled
                        ? 'opacity-35 bg-zinc-900/40 border-zinc-800 cursor-not-allowed'
                        : isSelected
                        ? 'bg-amber-500/20 border-amber-500 text-white shadow-md shadow-amber-500/10'
                        : 'bg-zinc-900/80 hover:bg-zinc-800 border-zinc-800 text-zinc-300 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between w-full">
                      <span className="text-base">{item.icon}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-amber-400" />}
                    </div>
                    <span className="text-[11px] font-bold mt-1 line-clamp-1">{item.name}</span>
                    <span className="text-[10px] text-amber-400/90 font-semibold">
                      +{item.price ? `$${item.price}/mo` : 'Free'}
                    </span>
                    {disabled && (
                      <span className="text-[9px] text-red-400 mt-0.5 leading-tight">
                        Max 2 Screens
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Quick Actions (Rotate & Delete & Done) */}
            <div className="flex items-center gap-2 pt-2 border-t border-zinc-800">
              {isOccupied && (
                <>
                  <button
                    onClick={() => rotateItemAtSpot(spot.id, Math.PI / 4)}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 px-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    title="Rotate item by 45°"
                  >
                    <RotateCw className="w-3.5 h-3.5 text-amber-400" />
                    <span>Rotate 45°</span>
                  </button>
                  <button
                    onClick={() => removeItemAtSpot(spot.id)}
                    className="p-1.5 bg-red-950/40 hover:bg-red-900/80 text-red-400 hover:text-white border border-red-800/40 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                    title="Clear this slot"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
              <button
                onClick={() => setActiveSpotId(null)}
                className="flex-1 py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-black rounded-xl text-xs transition-colors text-center cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
}
