'use client';

import React from 'react';
import { ModelItem } from './ModelItem';
import { DeskItemType } from '@/store/workspaceStore';

interface SpotItemRendererProps {
  itemId: DeskItemType;
  rotation?: number;
}

export function SpotItemRenderer({ itemId, rotation = 0 }: SpotItemRendererProps) {
  if (itemId === 'none') return null;

  return (
    <group rotation={[0, rotation, 0]}>
      {/* 1. Single Monitor */}
      {itemId === 'monitor-single' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/computerScreen.glb"
            position={[-0.216, 0, 0.057]}
            rotation={[0, 0, 0]}
            scale={1.1}
          />
        </group>
      )}

      {/* 2. Dual Monitors */}
      {itemId === 'monitor-dual' && (
        <group position={[0, 0, 0]}>
          <group position={[-0.24, 0, 0]} rotation={[0, 0.22, 0]}>
            <ModelItem
              url="/models/kenney/computerScreen.glb"
              position={[-0.216, 0, 0.057]}
              scale={1.05}
            />
          </group>
          <group position={[0.24, 0, 0]} rotation={[0, -0.22, 0]}>
            <ModelItem
              url="/models/kenney/computerScreen.glb"
              position={[-0.216, 0, 0.057]}
              scale={1.05}
            />
          </group>
        </group>
      )}

      {/* 3. Laptop */}
      {itemId === 'laptop' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/laptop.glb"
            position={[-0.18, 0, 0.164]}
            rotation={[0, 0, 0]}
            scale={0.65}
          />
        </group>
      )}

      {/* 4. Succulent Plant */}
      {itemId === 'plant-succulent' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/pottedPlant.glb"
            position={[-0.046, 0, 0.053]}
            rotation={[0, 0, 0]}
            scale={0.55}
          />
        </group>
      )}

      {/* 5. Tall Plant */}
      {itemId === 'plant-tall' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/plantSmall2.glb"
            position={[-0.05, 0, 0.05]}
            rotation={[0, 0, 0]}
            scale={0.8}
          />
        </group>
      )}

      {/* 6. Desk Lamp */}
      {itemId === 'lamp-table' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/lampRoundTable.glb"
            position={[-0.066, 0, 0.066]}
            rotation={[0, 0, 0]}
            scale={1.1}
          />
          <pointLight position={[0, 0.35, 0]} intensity={1.5} distance={2.0} color="#ffe2a4" />
        </group>
      )}

      {/* 7. Design Books */}
      {itemId === 'books' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/books.glb"
            position={[-0.09, 0, 0.057]}
            rotation={[0, 0, 0]}
            scale={1.2}
          />
        </group>
      )}

      {/* 8. Studio Speaker */}
      {itemId === 'speaker' && (
        <group position={[0, 0, 0]}>
          <ModelItem
            url="/models/kenney/speakerSmall.glb"
            position={[-0.07, 0, 0.063]}
            rotation={[0, 0, 0]}
            scale={0.95}
          />
        </group>
      )}
    </group>
  );
}
