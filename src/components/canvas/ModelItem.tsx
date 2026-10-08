'use client';

import React, { useMemo } from 'react';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

interface ModelItemProps {
  url: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  scale?: number | [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
  onClick?: () => void;
}

export function ModelItem({
  url,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
  castShadow = true,
  receiveShadow = true,
  onClick,
}: ModelItemProps) {
  const { scene } = useGLTF(url);

  // Clone scene so multiple instances have independent transforms
  const cloned = useMemo(() => {
    const c = scene.clone(true);
    c.traverse((node) => {
      if ((node as THREE.Mesh).isMesh) {
        node.castShadow = castShadow;
        node.receiveShadow = receiveShadow;
      }
    });
    return c;
  }, [scene, castShadow, receiveShadow]);

  const scaleArr: [number, number, number] = Array.isArray(scale) ? scale : [scale, scale, scale];

  return (
    <primitive
      object={cloned}
      position={position}
      rotation={rotation}
      scale={scaleArr}
      onClick={onClick}
    />
  );
}
