'use client';

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { DeskModel } from './DeskModel';
import { ChairModel } from './ChairModel';
import { Monitors } from './Monitors';
import { DeskAccessories } from './DeskAccessories';
import { ZoneStation } from './ZoneStation';
import { HotspotBadges } from './HotspotBadges';
import { StudioStage } from './StudioStage';
import { CameraController } from './CameraController';

function SceneContent() {
  const {
    desk,
    display,
    chair,
    plant,
    hasLamp,
    hasBooks,
    hasPeripherals,
    activeZone,
    coffeeMachine,
    miniFridge,
    loungeChair,
    roundRug,
    storageBoxes,
  } = useWorkspaceStore();

  const zoneOptions = {
    coffee: { machine: coffeeMachine, fridge: miniFridge },
    outdoor: { bench: true, gear: false },
    relax: { lounge: loungeChair, rug: roundRug },
    garage: { shelf: true, boxes: storageBoxes },
  };

  return (
    <>
      {/* Lighting Setup */}
      <ambientLight intensity={0.75} />
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

      {/* Core Workspace Objects (Rock-solid positioned) */}
      <group position={[0, 0, 0]}>
        <DeskModel deskType={desk} />
        <ChairModel chairType={chair} />
        <Monitors display={display} hasPeripherals={hasPeripherals} />
        <DeskAccessories
          plant={plant}
          hasLamp={hasLamp}
          hasBooks={hasBooks}
        />
        <ZoneStation zone={activeZone} options={zoneOptions} />
        <HotspotBadges />
      </group>

      <CameraController />
    </>
  );
}

export function Scene() {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
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
