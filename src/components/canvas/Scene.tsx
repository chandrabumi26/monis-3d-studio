'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useWorkspaceStore, DESK_SPOTS_MAP } from '@/store/workspaceStore';
import { DeskModel } from './DeskModel';
import { ChairModel } from './ChairModel';
import { DeskSpot } from './DeskSpot';
import { DeskPeripherals } from './DeskPeripherals';
import { ZoneStation } from './ZoneStation';
import { StudioStage } from './StudioStage';
import { CameraController } from './CameraController';

function SceneContent() {
  const {
    desk,
    deskRotation,
    chair,
    chairRotation,
    spots,
    activeSpotId,
    activeZone,
    zoneRotation,
    coffeeMachine,
    miniFridge,
  } = useWorkspaceStore();

  const activeDeskSpots = DESK_SPOTS_MAP[desk] || DESK_SPOTS_MAP.wood;

  const zoneOptions = {
    coffee: { machine: coffeeMachine, fridge: miniFridge },
  };

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.8} />
      <directionalLight
        position={[5, 8, 4]}
        intensity={1.3}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={4}
        shadow-camera-bottom={-4}
        shadow-bias={-0.0001}
      />
      <directionalLight position={[-4, 4, -3]} intensity={0.5} />
      <directionalLight position={[0, 4, 4]} intensity={0.3} />

      {/* Preset Environment for realistic studio reflections */}
      <Environment preset="city" environmentIntensity={0.65} />

      {/* Studio Stage Podium & Contact Shadows */}
      <StudioStage />

      {/* Core Desk Group (Rotates desk + all items + spots together) */}
      <group position={[0, 0, 0.35]} rotation={[0, deskRotation, 0]}>
        <DeskModel deskType={desk} />

        {/* Modular Spots directly on the desk */}
        {activeDeskSpots.map((spotDef) => (
          <DeskSpot
            key={spotDef.id}
            spot={spotDef}
            content={spots[spotDef.id] ?? null}
            isActive={activeSpotId === spotDef.id}
          />
        ))}

        {/* Smart Peripherals (Keyboard/Mouse adhering to laptop rules) */}
        <DeskPeripherals />
      </group>

      {/* Chair (Independent rotation) */}
      <ChairModel chairType={chair} rotation={chairRotation} />

      {/* Side Zone Station (Coffee Bar, Relax, Reading Nook) */}
      <ZoneStation zone={activeZone} rotation={zoneRotation} options={zoneOptions} />

      {/* Camera View Transitions */}
      <CameraController />
    </>
  );
}

export function Scene() {
  const { setActiveSpotId, setActivePickerId, setSelectedObjectId } = useWorkspaceStore();

  return (
    <div
      className="w-full h-full relative cursor-grab active:cursor-grabbing select-none"
      onPointerDown={(e) => {
        // If clicking canvas background, close active popovers and deselect pinned object
        if ((e.target as HTMLElement).tagName === 'CANVAS') {
          setActiveSpotId(null);
          setActivePickerId(null);
          setSelectedObjectId(null);
        }
      }}
    >
      <Canvas
        shadows
        camera={{ position: [2.5, 2.2, 3.2], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
}
