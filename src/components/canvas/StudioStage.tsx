'use client';

import React from 'react';
import { ContactShadows } from '@react-three/drei';

export function StudioStage() {
  return (
    <group position={[0, -0.01, 0]}>
      {/* Contact Shadow for realistic grounding */}
      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.65}
        scale={10}
        blur={2}
        far={3}
      />

      {/* Modern Oval Studio Platform / Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
        <circleGeometry args={[3.2, 64]} />
        <meshStandardMaterial
          color="#f4f4f5"
          roughness={0.9}
          metalness={0.05}
        />
      </mesh>

      {/* Outer subtle decorative ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.006, 0]}>
        <ringGeometry args={[3.2, 3.24, 64]} />
        <meshBasicMaterial color="#d4d4d8" />
      </mesh>

      {/* Grid line accents */}
      <gridHelper
        args={[10, 20, '#e4e4e7', '#f4f4f5']}
        position={[0, -0.01, 0]}
      />
    </group>
  );
}
