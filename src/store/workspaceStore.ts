import { create } from 'zustand';

export type DeskType = 'wood' | 'adjustable' | 'corner' | 'minimal';
export type ChairType = 'office' | 'modern' | 'lounge' | 'none';
export type ZoneType = 'none' | 'coffee' | 'relax' | 'garage' | 'reading';
export type CameraView = 'iso' | 'front' | 'top';

export type DeskItemType =
  | 'monitor-single'
  | 'monitor-dual'
  | 'laptop'
  | 'plant-succulent'
  | 'plant-tall'
  | 'lamp-table'
  | 'books'
  | 'speaker'
  | 'none';

export interface SpotDefinition {
  id: string;
  name: string;
  position: [number, number, number]; // [x, y, z] relative to desk
}

export interface SpotContent {
  itemId: DeskItemType;
  rotation: number; // in radians
}

export interface WorkspaceState {
  // Desk Configuration
  desk: DeskType;
  deskRotation: number; // in radians

  // Chair Configuration
  chair: ChairType;
  chairRotation: number;

  // Additional Zones Configuration
  activeZone: ZoneType;
  zoneRotation: number;
  coffeeMachine: boolean;
  miniFridge: boolean;

  // Modular Desk Spots & 3D Pickers
  spots: Record<string, SpotContent | null>;
  activeSpotId: string | null; // Currently clicked spot for interactive 3D menu
  activePickerId: string | null; // Unified picker ('chair' | 'desk' | 'zone' | spotId)
  selectedObjectId: string | null; // Object whose pin stays active ('chair', 'desk', 'zone', or 'spot:<id>')

  // UI state
  showHotspots: boolean;
  cameraView: CameraView;
  isRentModalOpen: boolean;
  isCatalogOpen: boolean;

  // Actions
  setSelectedObjectId: (id: string | null) => void;
  setActivePickerId: (id: string | null) => void;
  setDesk: (desk: DeskType) => void;
  rotateDesk: (deltaRadians: number) => void;
  setDeskRotation: (rot: number) => void;

  setChair: (chair: ChairType) => void;
  rotateChair: (deltaRadians: number) => void;

  rotateZone: (deltaRadians: number) => void;

  setShowHotspots: (show: boolean) => void;
  toggleShowHotspots: () => void;

  setActiveSpotId: (spotId: string | null) => void;
  setItemAtSpot: (spotId: string, itemId: DeskItemType) => void;
  rotateItemAtSpot: (spotId: string, deltaRadians?: number) => void;
  removeItemAtSpot: (spotId: string) => void;

  setActiveZone: (zone: ZoneType) => void;
  setCameraView: (view: CameraView) => void;
  setIsRentModalOpen: (val: boolean) => void;
  setIsCatalogOpen: (val: boolean) => void;

  resetSetup: () => void;
  getTotalMonthlyRent: () => number;
  getSelectedSummary: () => { name: string; price: number; slot: string }[];
  
  // Helpers
  hasLaptop: () => boolean;
  getScreenCount: () => number;
}

export const ITEM_CATALOG: Record<
  DeskItemType,
  { name: string; price: number; icon: string; category: string; description: string }
> = {
  'monitor-single': {
    name: '27" 4K Pro Display',
    price: 15,
    icon: '🖥️',
    category: 'Display',
    description: 'Professional 4K 144Hz IPS display with ergonomic stand',
  },
  'monitor-dual': {
    name: 'Dual 27" 4K Displays',
    price: 29,
    icon: '🖥️🖥️',
    category: 'Display',
    description: 'Curved dual screen setup for high productivity',
  },
  laptop: {
    name: 'MacBook Pro Stand',
    price: 16,
    icon: '💻',
    category: 'Display',
    description: 'Anodized aluminum stand with built-in laptop workstation',
  },
  'plant-succulent': {
    name: 'Mini Succulent Pot',
    price: 4,
    icon: '🪴',
    category: 'Decor',
    description: 'Minimalist ceramic potted succulent for natural desk vibes',
  },
  'plant-tall': {
    name: 'Indoor Foliage Plant',
    price: 5,
    icon: '🌿',
    category: 'Decor',
    description: 'Vibrant indoor tropical plant in designer planter',
  },
  'lamp-table': {
    name: 'Warm Studio Table Lamp',
    price: 5,
    icon: '💡',
    category: 'Lighting',
    description: 'Ambient warm white LED desk lamp reducing eye strain',
  },
  books: {
    name: 'Hardcover Design Books',
    price: 3,
    icon: '📚',
    category: 'Decor',
    description: 'Curated architectural inspiration & typography book stack',
  },
  speaker: {
    name: 'Hi-Fi Studio Monitor',
    price: 6,
    icon: '🔊',
    category: 'Audio',
    description: 'Studio reference monitor speaker with crystal acoustic clarity',
  },
  none: {
    name: 'Empty Slot',
    price: 0,
    icon: '🗑️',
    category: 'None',
    description: 'Leave this desk area clean and unoccupied',
  },
};

export const DESK_PRICES: Record<DeskType, { name: string; price: number }> = {
  wood: { name: 'Solid Oak Studio Desk (With Drawers)', price: 25 },
  adjustable: { name: 'Smart Electric Standing Desk (Sit-Stand)', price: 38 },
  corner: { name: 'Executive Corner L-Desk Workstation', price: 32 },
  minimal: { name: 'Minimalist Studio Desk Frame', price: 20 },
};

export const CHAIR_PRICES: Record<ChairType, { name: string; price: number }> = {
  office: { name: 'Ergonomic Task Chair (Adjustable Mesh)', price: 25 },
  modern: { name: 'Modern Fabric Cushion Chair', price: 18 },
  lounge: { name: 'Executive Soft Lounge Chair', price: 32 },
  none: { name: 'No Chair', price: 0 },
};

// Spots coordinates relative to desk origin [x, y, z] - Generously spaced
export const DESK_SPOTS_MAP: Record<DeskType, SpotDefinition[]> = {
  wood: [
    { id: 'center', name: 'Main Workstation', position: [0, 0.846, -0.09] },
    { id: 'left', name: 'Left Wing', position: [-0.64, 0.846, 0.04] },
    { id: 'right', name: 'Right Wing', position: [0.64, 0.846, 0.04] },
  ],
  adjustable: [
    { id: 'center', name: 'Main Workstation', position: [0, 0.846, -0.09] },
    { id: 'left', name: 'Left Wing', position: [-0.72, 0.846, 0.04] },
    { id: 'right', name: 'Right Wing', position: [0.72, 0.846, 0.04] },
  ],
  minimal: [
    { id: 'center', name: 'Main Workstation', position: [0, 0.846, -0.09] },
    { id: 'left', name: 'Left Wing', position: [-0.58, 0.846, 0.04] },
    { id: 'right', name: 'Right Wing', position: [0.58, 0.846, 0.04] },
  ],
  corner: [
    { id: 'center', name: 'Main Workstation', position: [0, 0.846, -0.09] },
    { id: 'left', name: 'Left Wing', position: [-0.52, 0.846, 0.04] },
    { id: 'corner_inner', name: 'Corner Angle', position: [0.64, 0.846, 0.16] },
    { id: 'wing_mid', name: 'Return Desk Wing', position: [1.02, 0.846, 0.88] },
  ],
};

const defaultSpots: Record<string, SpotContent | null> = {
  center: { itemId: 'monitor-single', rotation: 0 },
  left: { itemId: 'plant-succulent', rotation: 0 },
  right: { itemId: 'lamp-table', rotation: 0 },
  corner_inner: { itemId: 'lamp-table', rotation: 0 },
  wing_mid: { itemId: 'books', rotation: 0 },
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  desk: 'wood',
  deskRotation: 0,

  chair: 'office',
  chairRotation: Math.PI * 0.94,

  activeZone: 'coffee',
  zoneRotation: 0,
  coffeeMachine: true,
  miniFridge: true,

  spots: defaultSpots,
  activeSpotId: null,
  activePickerId: null,
  selectedObjectId: null,

  showHotspots: true,
  cameraView: 'iso',
  isRentModalOpen: false,
  isCatalogOpen: true,

  setSelectedObjectId: (selectedObjectId) => set({ selectedObjectId }),
  setActivePickerId: (activePickerId) => set({ activePickerId, activeSpotId: activePickerId }),
  setActiveSpotId: (activeSpotId) => set({ activeSpotId, activePickerId: activeSpotId }),

  setDesk: (desk) => set({ desk }),
  rotateDesk: (delta) =>
    set((s) => ({ deskRotation: (s.deskRotation + delta) % (Math.PI * 2) })),
  setDeskRotation: (rot) => set({ deskRotation: rot }),

  setChair: (chair) => set({ chair }),
  rotateChair: (delta) =>
    set((s) => ({ chairRotation: (s.chairRotation + delta) % (Math.PI * 2) })),

  rotateZone: (delta) =>
    set((s) => ({ zoneRotation: (s.zoneRotation + delta) % (Math.PI * 2) })),

  setShowHotspots: (showHotspots) => set({ showHotspots }),
  toggleShowHotspots: () => set((s) => ({ showHotspots: !s.showHotspots })),

  setItemAtSpot: (spotId, itemId) =>
    set((s) => {
      const newSpots = { ...s.spots };
      if (itemId === 'none') {
        newSpots[spotId] = null;
      } else {
        newSpots[spotId] = {
          itemId,
          rotation: newSpots[spotId]?.rotation || 0,
        };
      }
      return { spots: newSpots, activeSpotId: null };
    }),

  rotateItemAtSpot: (spotId, delta = Math.PI / 4) =>
    set((s) => {
      const current = s.spots[spotId];
      if (!current) return s;
      return {
        spots: {
          ...s.spots,
          [spotId]: {
            ...current,
            rotation: (current.rotation + delta) % (Math.PI * 2),
          },
        },
      };
    }),

  removeItemAtSpot: (spotId) =>
    set((s) => ({
      spots: { ...s.spots, [spotId]: null },
      activeSpotId: null,
    })),

  setActiveZone: (activeZone) => set({ activeZone }),
  setCameraView: (cameraView) => set({ cameraView }),
  setIsRentModalOpen: (isRentModalOpen) => set({ isRentModalOpen }),
  setIsCatalogOpen: (isCatalogOpen) => set({ isCatalogOpen }),

  hasLaptop: () => {
    const s = get();
    return Object.values(s.spots).some((spot) => spot?.itemId === 'laptop');
  },

  getScreenCount: () => {
    const s = get();
    let count = 0;
    Object.values(s.spots).forEach((spot) => {
      if (spot?.itemId === 'laptop') count += 1;
      if (spot?.itemId === 'monitor-single') count += 1;
      if (spot?.itemId === 'monitor-dual') count += 2;
    });
    return count;
  },

  resetSetup: () =>
    set({
      desk: 'wood',
      deskRotation: 0,
      chair: 'office',
      chairRotation: Math.PI * 0.94,
      spots: defaultSpots,
      activeSpotId: null,
      activeZone: 'coffee',
      zoneRotation: 0,
    }),

  getTotalMonthlyRent: () => {
    const s = get();
    let total = 0;

    // Desk
    total += DESK_PRICES[s.desk]?.price || 0;

    // Chair
    total += CHAIR_PRICES[s.chair]?.price || 0;

    // Spots items
    Object.values(s.spots).forEach((spot) => {
      if (spot && ITEM_CATALOG[spot.itemId]) {
        total += ITEM_CATALOG[spot.itemId].price;
      }
    });

    // Zone
    if (s.activeZone === 'coffee') total += 28;
    if (s.activeZone === 'relax') total += 22;
    if (s.activeZone === 'garage') total += 16;
    if (s.activeZone === 'reading') total += 18;

    return total;
  },

  getSelectedSummary: () => {
    const s = get();
    const list: { name: string; price: number; slot: string }[] = [];

    // Desk
    list.push({
      name: DESK_PRICES[s.desk].name,
      price: DESK_PRICES[s.desk].price,
      slot: 'Studio Desk',
    });

    // Chair
    if (s.chair !== 'none') {
      list.push({
        name: CHAIR_PRICES[s.chair].name,
        price: CHAIR_PRICES[s.chair].price,
        slot: 'Office Chair',
      });
    }

    // Spot Items
    Object.entries(s.spots).forEach(([spotId, spot]) => {
      if (spot && ITEM_CATALOG[spot.itemId] && spot.itemId !== 'none') {
        const itemInfo = ITEM_CATALOG[spot.itemId];
        const spotName =
          spotId === 'center'
            ? 'Main Workstation'
            : spotId === 'left'
            ? 'Left Wing'
            : spotId === 'right'
            ? 'Right Wing'
            : spotId === 'corner_inner'
            ? 'Corner Angle'
            : spotId === 'wing_mid'
            ? 'Return Desk Wing'
            : 'Desk Accessory';
        list.push({
          name: itemInfo.name,
          price: itemInfo.price,
          slot: spotName,
        });
      }
    });

    // Zone
    if (s.activeZone === 'coffee')
      list.push({ name: 'Coffee Station Bar & Espresso', price: 28, slot: 'Room Zone' });
    if (s.activeZone === 'relax')
      list.push({ name: 'Relax Lounge & Round Wool Rug', price: 22, slot: 'Room Zone' });
    if (s.activeZone === 'garage')
      list.push({ name: 'Garage Tool Rack & Heavy Crates', price: 16, slot: 'Room Zone' });
    if (s.activeZone === 'reading')
      list.push({ name: 'Reading Nook Bookshelf & Studio Lamp', price: 18, slot: 'Room Zone' });

    return list;
  },
}));
