'use client';

import React from 'react';
import { ModelItem } from './ModelItem';
import { DisplayType } from '@/store/workspaceStore';
import { DESK_HEIGHT } from './DeskModel';

interface MonitorsProps {
  display: DisplayType;
  hasPeripherals?: boolean;
}

export function Monitors({ display, hasPeripherals = true }: MonitorsProps) {
  if (display === 'none') return null;

  const isLaptopMode = display === 'laptop' || display === 'laptop-monitor';

  return (
    <group position={[0, DESK_HEIGHT, 0]}>
      {/* 1. STANDALONE LAPTOP MODE */}
      {display === 'laptop' && (
        <group position={[0, 0, 0]}>
          {/* Laptop centered, no external keyboard */}
          <group position={[0, 0, 0.06]}>
            <ModelItem
              url="/models/kenney/laptop.glb"
              position={[-0.18, 0, 0.164]}
              rotation={[0, 0, 0]}
              scale={0.65}
            />
          </group>
          {/* Wireless Mouse on the side */}
          <group position={[0.26, 0, 0.12]}>
            <ModelItem
              url="/models/kenney/computerMouse.glb"
              position={[0, 0, 0.055]}
              rotation={[0, 0, 0]}
              scale={1.3}
            />
          </group>
        </group>
      )}

      {/* 2. KOMBINASI LAPTOP + 1x MONITOR (DUAL SCREEN SETUP) */}
      {display === 'laptop-monitor' && (
        <group position={[0, 0, 0]}>
          {/* Laptop on the left, angled towards user */}
          <group position={[-0.28, 0, 0.06]} rotation={[0, 0.18, 0]}>
            <ModelItem
              url="/models/kenney/laptop.glb"
              position={[-0.18, 0, 0.164]}
              rotation={[0, 0, 0]}
              scale={0.65}
            />
          </group>

          {/* 1x External Monitor on the right, angled towards user */}
          <group position={[0.26, 0, -0.12]} rotation={[0, -0.18, 0]}>
            <ModelItem
              url="/models/kenney/computerScreen.glb"
              position={[-0.216, 0, 0.057]}
              rotation={[0, 0, 0]}
              scale={1.1}
            />
          </group>

          {/* Mouse on the right, no external keyboard */}
          <group position={[0.48, 0, 0.14]}>
            <ModelItem
              url="/models/kenney/computerMouse.glb"
              position={[0, 0, 0.055]}
              rotation={[0, 0, 0]}
              scale={1.3}
            />
          </group>
        </group>
      )}

      {/* 3. DESKTOP MONITORS SETUP (Single / Dual / Triple) */}
      {!isLaptopMode && (
        <group position={[0, 0, 0]}>
          {/* Keyboard & Mouse (Only for desktop monitors) */}
          {hasPeripherals && (
            <group position={[0, 0, 0]}>
              <ModelItem
                url="/models/kenney/computerKeyboard.glb"
                position={[-0.183, 0, 0.257]}
                rotation={[0, 0, 0]}
                scale={1.3}
              />
              <ModelItem
                url="/models/kenney/computerMouse.glb"
                position={[0.22, 0, 0.235]}
                rotation={[0, 0, 0]}
                scale={1.3}
              />
            </group>
          )}

          {/* Center Monitor (Shown in single, dual, triple) */}
          <group position={[0, 0, -0.15]}>
            <ModelItem
              url="/models/kenney/computerScreen.glb"
              position={[-0.216, 0, 0.057]}
              rotation={[0, 0, 0]}
              scale={1.1}
            />
          </group>

          {/* Left Monitor (Shown in dual, triple) */}
          {(display === 'dual' || display === 'triple') && (
            <group position={[-0.45, 0, -0.12]} rotation={[0, 0.28, 0]}>
              <ModelItem
                url="/models/kenney/computerScreen.glb"
                position={[-0.216, 0, 0.057]}
                rotation={[0, 0, 0]}
                scale={1.1}
              />
            </group>
          )}

          {/* Right Monitor (Shown in triple) */}
          {display === 'triple' && (
            <group position={[0.45, 0, -0.12]} rotation={[0, -0.28, 0]}>
              <ModelItem
                url="/models/kenney/computerScreen.glb"
                position={[-0.216, 0, 0.057]}
                rotation={[0, 0, 0]}
                scale={1.1}
              />
            </group>
          )}
        </group>
      )}
    </group>
  );
}
