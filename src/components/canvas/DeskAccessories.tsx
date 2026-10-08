'use client';

import React from 'react';
import { ModelItem } from './ModelItem';
import { PlantType } from '@/store/workspaceStore';
import { DESK_HEIGHT } from './DeskModel';

interface DeskAccessoriesProps {
  plant: PlantType;
  hasLamp: boolean;
  hasBooks: boolean;
}

export function DeskAccessories({
  plant,
  hasLamp,
  hasBooks,
}: DeskAccessoriesProps) {
  return (
    <>
      {/* On Tabletop Surface (Y = DESK_HEIGHT) */}
      <group position={[0, DESK_HEIGHT, 0]}>
        {/* === SLOT KIRI: Tumbuhan / Tanaman === */}
        {plant === 'succulent' && (
          <group position={[-0.58, 0, 0.12]}>
            <ModelItem
              url="/models/kenney/pottedPlant.glb"
              position={[-0.046, 0, 0.053]}
              rotation={[0, 0.4, 0]}
              scale={0.55}
            />
          </group>
        )}

        {plant === 'tall' && (
          <group position={[-0.58, 0, 0.12]}>
            <ModelItem
              url="/models/kenney/plantSmall2.glb"
              position={[-0.05, 0, 0.05]}
              rotation={[0, 0.2, 0]}
              scale={0.8}
            />
          </group>
        )}

        {/* === SLOT KANAN: Lampu Meja & Buku === */}
        {/* Lampu Meja (Pojok Kanan Belakang) */}
        {hasLamp && (
          <group position={[0.60, 0, -0.18]}>
            <ModelItem
              url="/models/kenney/lampRoundTable.glb"
              position={[-0.066, 0, 0.066]}
              rotation={[0, -0.5, 0]}
              scale={1.1}
            />
            {/* Lamp Warm Glow Light */}
            <pointLight position={[0, 0.35, 0]} intensity={1.5} distance={2.0} color="#ffe2a4" />
          </group>
        )}

        {/* Buku Desain (Pojok Kanan Depan) */}
        {hasBooks && (
          <group position={[0.58, 0, 0.14]}>
            <ModelItem
              url="/models/kenney/books.glb"
              position={[-0.09, 0, 0.057]}
              rotation={[0, -0.3, 0]}
              scale={1.2}
            />
          </group>
        )}
      </group>

      {/* Tempat Sampah (Di lantai sebelah kanan meja) */}
      <group position={[1.15, 0, 0.2]}>
        <ModelItem
          url="/models/kenney/trashcan.glb"
          position={[0.005, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.45}
        />
      </group>
    </>
  );
}
