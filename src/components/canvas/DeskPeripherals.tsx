'use client';

import React from 'react';
import { ModelItem } from './ModelItem';
import { useWorkspaceStore } from '@/store/workspaceStore';
import { DESK_HEIGHT } from './DeskModel';

export function DeskPeripherals() {
  const { hasLaptop, spots } = useWorkspaceStore();

  const laptopActive = hasLaptop();

  // Check if center or any spot has monitor
  const hasMonitors = Object.values(spots).some(
    (s) => s?.itemId === 'monitor-single' || s?.itemId === 'monitor-dual'
  );

  return (
    <group position={[0, DESK_HEIGHT, 0]}>
      {/* If laptop is chosen: HIDE external keyboard! Only render wireless mouse on the right */}
      {laptopActive ? (
        <group position={[0.28, 0, 0.12]}>
          <ModelItem
            url="/models/kenney/computerMouse.glb"
            position={[0, 0, 0.055]}
            rotation={[0, 0, 0]}
            scale={1.3}
          />
        </group>
      ) : hasMonitors ? (
        /* Standalone Desktop Mode: Keyboard & Mouse in front of center workstation */
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/computerKeyboard.glb"
            position={[-0.183, 0, 0.23]}
            rotation={[0, 0, 0]}
            scale={1.3}
          />
          <ModelItem
            url="/models/kenney/computerMouse.glb"
            position={[0.22, 0, 0.21]}
            rotation={[0, 0, 0]}
            scale={1.3}
          />
        </group>
      ) : null}
    </group>
  );
}
