'use client';

import React, { useRef, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import { useWorkspaceStore } from '@/store/workspaceStore';

export function CameraController() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const cameraView = useWorkspaceStore((state) => state.cameraView);
  const { camera } = useThree();

  useEffect(() => {
    if (!controlsRef.current) return;

    if (cameraView === 'front') {
      camera.position.set(0, 1.3, 3.2);
      controlsRef.current.target.set(0, 0.75, 0);
    } else if (cameraView === 'top') {
      camera.position.set(0, 4.5, 0.8);
      controlsRef.current.target.set(0, 0.6, 0);
    } else {
      // Isometric / 3/4 view
      camera.position.set(2.4, 2.2, 3.0);
      controlsRef.current.target.set(0, 0.7, 0);
    }
    controlsRef.current.update();
  }, [cameraView, camera]);

  return (
    <OrbitControls
      ref={controlsRef}
      makeDefault
      enableDamping
      dampingFactor={0.06}
      minDistance={1.5}
      maxDistance={7}
      maxPolarAngle={Math.PI / 2 - 0.05} // don't go below floor
      target={new THREE.Vector3(0, 0.7, 0)}
    />
  );
}
