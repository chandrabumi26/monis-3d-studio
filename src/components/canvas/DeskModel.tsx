'use client';

import React from 'react';
import { ModelItem } from './ModelItem';
import { DeskType } from '@/store/workspaceStore';

interface DeskModelProps {
  deskType: DeskType;
}

export const DESK_HEIGHT = 0.846;

export function DeskModel({ deskType }: DeskModelProps) {
  if (deskType === 'adjustable') {
    // Smart Electric Adjustable Standing Desk (public/models/others/AdjustableDesk.glb)
    // Rotated -90 deg (-Math.PI/2) so the 1.8m width is horizontal, front edge faces chair at +Z
    return (
      <group position={[0, 0, 0.017]} rotation={[0, -Math.PI / 2, 0]}>
        <ModelItem
          url="/models/others/AdjustableDesk.glb"
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          scale={0.898}
        />
      </group>
    );
  }

  if (deskType === 'corner') {
    // Executive Corner L-Desk (public/models/kenney/deskCorner.glb)
    // Calibrated so main workstation desk is perfectly centered at (0, 0) facing the chair,
    // with return wing extending seamlessly to the right
    return (
      <group position={[0, 0, 0]}>
        <ModelItem
          url="/models/kenney/deskCorner.glb"
          position={[-0.642, 0, 1.715]}
          rotation={[0, 0, 0]}
          scale={2.2}
        />
      </group>
    );
  }

  if (deskType === 'minimal') {
    // Minimalist Studio Desk
    return (
      <group position={[0, 0, 0]}>
        <ModelItem
          url="/models/kenney/tableGlass.glb"
          position={[-0.925, 0, 0.492]}
          rotation={[0, 0, 0]}
          scale={[1.9, 2.59, 1.9]}
        />
      </group>
    );
  }

  // Default: Solid Oak Workstation Desk with Drawers (public/models/kenney/desk.glb)
  return (
    <group position={[0, 0, 0]}>
      <ModelItem
        url="/models/kenney/desk.glb"
        position={[-0.785, 0, 0.407]}
        rotation={[0, 0, 0]}
        scale={2.2}
      />
    </group>
  );
}
