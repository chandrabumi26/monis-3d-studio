'use client';

import React from 'react';
import { ModelItem } from './ModelItem';
import { ZoneType } from '@/store/workspaceStore';

interface ZoneStationProps {
  zone: ZoneType;
  options: {
    coffee: { machine: boolean; fridge: boolean };
    outdoor?: { bench: boolean; gear: boolean };
    relax: { lounge: boolean; rug: boolean };
    garage: { shelf: boolean; boxes: boolean };
  };
}

export function ZoneStation({ zone, options }: ZoneStationProps) {
  if (zone === 'none') return null;

  return (
    <group position={[2.1, 0, 0]}>
      {/* 1. COFFEE STATION (Solid table bar + coffee machine sitting flat on top) */}
      {zone === 'coffee' && (
        <group position={[0, 0, 0]}>
          {/* Kitchen Bar Counter (Scale 1.8 -> Counter surface at Y = 0.756m) */}
          <group position={[0, 0, 0]}>
            <ModelItem
              url="/models/kenney/kitchenBar.glb"
              position={[-0.387, 0, 0.189]}
              rotation={[0, 0, 0]}
              scale={1.8}
            />
          </group>

          {/* Espresso Machine (Sits 100% flat on top of the counter surface at Y = 0.756) */}
          {options.coffee.machine && (
            <group position={[0, 0.756, 0]}>
              <ModelItem
                url="/models/kenney/kitchenCoffeeMachine.glb"
                position={[-0.103, 0, 0.139]}
                rotation={[0, 0, 0]}
                scale={1.0}
              />
            </group>
          )}

          {/* Mini Fridge standing on floor beside counter */}
          {options.coffee.fridge && (
            <group position={[0, 0, -0.65]}>
              <ModelItem
                url="/models/kenney/kitchenFridge.glb"
                position={[-0.28, 0, 0.16]}
                rotation={[0, 0, 0]}
                scale={1.3}
              />
            </group>
          )}
        </group>
      )}

      {/* 2. RELAX ZONE */}
      {zone === 'relax' && (
        <group position={[0, 0, 0]}>
          {options.relax.rug && (
            <group position={[0, 0.005, 0]}>
              <ModelItem
                url="/models/kenney/rugRound.glb"
                position={[-0.7, 0, 0.7]}
                scale={2.0}
              />
            </group>
          )}
          {options.relax.lounge && (
            <group position={[0, 0, 0]}>
              <ModelItem
                url="/models/kenney/loungeChairRelax.glb"
                position={[-0.25, 0, 0.1]}
                rotation={[0, -Math.PI * 0.7, 0]}
                scale={1.5}
              />
              <ModelItem
                url="/models/kenney/loungeSofaOttoman.glb"
                position={[-0.2, 0, 0.55]}
                rotation={[0, -Math.PI * 0.7, 0]}
                scale={1.2}
              />
            </group>
          )}
        </group>
      )}

      {/* 3. GARAGE SPACE */}
      {zone === 'garage' && (
        <group position={[0, 0, 0]}>
          {options.garage.shelf && (
            <group position={[0, 0, -0.3]}>
              <ModelItem
                url="/models/kenney/bookcaseOpenLow.glb"
                position={[-0.45, 0, 0.2]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={1.6}
              />
            </group>
          )}
          {options.garage.boxes && (
            <group position={[0, 0, 0.4]}>
              <ModelItem
                url="/models/kenney/cardboardBoxClosed.glb"
                position={[-0.15, 0, 0.15]}
                scale={1.6}
              />
              <ModelItem
                url="/models/kenney/cardboardBoxClosed.glb"
                position={[-0.15, 0.45, 0.15]}
                rotation={[0, 0.25, 0]}
                scale={1.4}
              />
            </group>
          )}
        </group>
      )}
    </group>
  );
}
