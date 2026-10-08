'use client';

import React from 'react';
import { ModelItem } from './ModelItem';
import { ChairType } from '@/store/workspaceStore';

interface ChairModelProps {
  chairType: ChairType;
}

export function ChairModel({ chairType }: ChairModelProps) {
  if (chairType === 'none') return null;

  // The desk front edge is at Z = +0.43m.
  // Placing the chair at Z = +0.86m leaves an ergonomic 0.20m gap without clipping!
  const chairPos: [number, number, number] = [0, 0, 0.86];
  // Slightly angled towards camera for dynamic view as shown in image.png
  const chairRot: [number, number, number] = [0, Math.PI * 0.94, 0];

  if (chairType === 'modern') {
    return (
      <group position={chairPos} rotation={chairRot}>
        <ModelItem
          url="/models/kenney/chairModernCushion.glb"
          position={[-0.18, 0, 0.18]}
          rotation={[0, 0, 0]}
          scale={1.8}
        />
      </group>
    );
  }

  if (chairType === 'lounge') {
    return (
      <group position={[0, 0, 0.92]} rotation={chairRot}>
        <ModelItem
          url="/models/kenney/loungeDesignChair.glb"
          position={[-0.474, 0, 0.266]}
          rotation={[0, 0, 0]}
          scale={1.3}
        />
      </group>
    );
  }

  // default: office ergonomic task chair
  return (
    <group position={chairPos} rotation={chairRot}>
      <ModelItem
        url="/models/kenney/chairDesk.glb"
        position={[-0.129, 0, 0.111]}
        rotation={[0, 0, 0]}
        scale={1.8}
      />
    </group>
  );
}
