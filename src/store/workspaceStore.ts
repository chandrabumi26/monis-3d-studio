import { create } from 'zustand';

export type DeskType = 'wood' | 'adjustable' | 'corner' | 'minimal';
export type DisplayType = 'single' | 'dual' | 'triple' | 'laptop' | 'laptop-monitor' | 'none';
export type ChairType = 'office' | 'modern' | 'lounge' | 'none';
export type PlantType = 'succulent' | 'tall' | 'none';
export type ZoneType = 'none' | 'coffee' | 'relax' | 'garage';
export type CameraView = 'iso' | 'front' | 'top';

export interface WorkspaceState {
  // Desk & Slots
  desk: DeskType;
  display: DisplayType;
  chair: ChairType;
  plant: PlantType;
  hasLamp: boolean;
  hasBooks: boolean;
  hasPeripherals: boolean; // only for desktop setups; laptop auto-hides keyboard

  // Additional Room Zone
  activeZone: ZoneType;
  coffeeMachine: boolean;
  miniFridge: boolean;
  loungeChair: boolean;
  roundRug: boolean;
  storageBoxes: boolean;

  // UI state
  activeSlot: 'display' | 'chair' | 'plant' | 'lamp' | 'desk';
  cameraView: CameraView;
  isCatalogOpen: boolean;
  isRentModalOpen: boolean;
  showHotspots: boolean; // Toggle for 3D clickable pin badges

  // Setters
  setDesk: (desk: DeskType) => void;
  setDisplay: (display: DisplayType) => void;
  setChair: (chair: ChairType) => void;
  setPlant: (plant: PlantType) => void;
  setHasLamp: (val: boolean) => void;
  setHasBooks: (val: boolean) => void;
  setHasPeripherals: (val: boolean) => void;
  setActiveSlot: (slot: 'display' | 'chair' | 'plant' | 'lamp' | 'desk') => void;
  setActiveZone: (zone: ZoneType) => void;
  setCameraView: (view: CameraView) => void;
  setIsCatalogOpen: (val: boolean) => void;
  setIsRentModalOpen: (val: boolean) => void;
  setShowHotspots: (val: boolean) => void;
  toggleShowHotspots: () => void;

  toggleLamp: () => void;
  toggleBooks: () => void;
  togglePeripherals: () => void;
  resetSetup: () => void;

  // Total computation
  getTotalMonthlyRent: () => number;
  getSelectedSummary: () => { name: string; price: number; slot: string }[];
}

export const ITEM_PRICES = {
  // Desks
  deskWood: { name: 'Solid Oak Studio Desk (With Drawers)', price: 250000 },
  deskAdjustable: { name: 'Smart Electric Adjustable Standing Desk', price: 380000 },
  deskCorner: { name: 'Executive Corner L-Desk', price: 320000 },
  deskMinimal: { name: 'Minimalist Studio Desk', price: 200000 },

  // Displays (Tengah)
  single: { name: '1x 27" 4K Monitor', price: 150000 },
  dual: { name: '2x 27" Dual Monitor Setup', price: 290000 },
  triple: { name: '3x 27" Panoramic Triple Monitor', price: 420000 },
  laptop: { name: 'MacBook Pro Stand Setup (Tanpa Keyboard)', price: 160000 },
  laptopMonitor: { name: 'Kombinasi Laptop + 1x Monitor (Dual Screen)', price: 300000 },
  noneDisplay: { name: 'Tanpa Monitor', price: 0 },

  // Chairs (Depan)
  office: { name: 'Ergonomic Task Chair (Adjustable)', price: 250000 },
  modern: { name: 'Modern Fabric Cushion Chair', price: 180000 },
  lounge: { name: 'Executive Soft Lounge Chair', price: 320000 },
  noneChair: { name: 'Tanpa Kursi', price: 0 },

  // Plants (Kiri)
  succulent: { name: 'Succulent Potted Plant', price: 35000 },
  tall: { name: 'Indoor Leaf Plant', price: 45000 },
  nonePlant: { name: 'Tanpa Tumbuhan', price: 0 },

  // Lamp & Accessories (Kanan)
  lamp: { name: 'Warm Minimalist Desk Lamp', price: 45000 },
  books: { name: 'Design Architecture Books', price: 25000 },
  peripherals: { name: 'Mechanical Keyboard & Mouse', price: 60000 },

  // Zones
  coffeeStation: { name: 'Espresso Bar & Coffee Machine', price: 280000 },
  relaxZone: { name: 'Relax Lounge & Wool Rug', price: 220000 },
  garageSpace: { name: 'Tool Storage & Heavy Crates', price: 140000 },
};

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  desk: 'wood',
  display: 'single',
  chair: 'office',
  plant: 'succulent',
  hasLamp: true,
  hasBooks: false,
  hasPeripherals: true,

  activeZone: 'coffee',
  coffeeMachine: true,
  miniFridge: true,
  loungeChair: true,
  roundRug: true,
  storageBoxes: true,

  activeSlot: 'display',
  cameraView: 'iso',
  isCatalogOpen: true,
  isRentModalOpen: false,
  showHotspots: false, // Default FALSE agar scene tidak berantakan tertutup label!

  setDesk: (desk) => set({ desk }),
  setDisplay: (display) => set({ display }),
  setChair: (chair) => set({ chair }),
  setPlant: (plant) => set({ plant }),
  setHasLamp: (hasLamp) => set({ hasLamp }),
  setHasBooks: (hasBooks) => set({ hasBooks }),
  setHasPeripherals: (hasPeripherals) => set({ hasPeripherals }),
  setActiveSlot: (activeSlot) => set({ activeSlot, isCatalogOpen: true }),
  setActiveZone: (activeZone) => set({ activeZone }),
  setCameraView: (cameraView) => set({ cameraView }),
  setIsCatalogOpen: (isCatalogOpen) => set({ isCatalogOpen }),
  setIsRentModalOpen: (isRentModalOpen) => set({ isRentModalOpen }),
  setShowHotspots: (showHotspots) => set({ showHotspots }),
  toggleShowHotspots: () => set((s) => ({ showHotspots: !s.showHotspots })),

  toggleLamp: () => set((s) => ({ hasLamp: !s.hasLamp })),
  toggleBooks: () => set((s) => ({ hasBooks: !s.hasBooks })),
  togglePeripherals: () => set((s) => ({ hasPeripherals: !s.hasPeripherals })),

  resetSetup: () =>
    set({
      desk: 'wood',
      display: 'single',
      chair: 'office',
      plant: 'none',
      hasLamp: false,
      hasBooks: false,
      hasPeripherals: true,
      activeZone: 'none',
    }),

  getTotalMonthlyRent: () => {
    const s = get();
    let total = 0;

    // Desk
    if (s.desk === 'wood') total += ITEM_PRICES.deskWood.price;
    if (s.desk === 'adjustable') total += ITEM_PRICES.deskAdjustable.price;
    if (s.desk === 'corner') total += ITEM_PRICES.deskCorner.price;
    if (s.desk === 'minimal') total += ITEM_PRICES.deskMinimal.price;

    // Display
    if (s.display === 'single') total += ITEM_PRICES.single.price;
    if (s.display === 'dual') total += ITEM_PRICES.dual.price;
    if (s.display === 'triple') total += ITEM_PRICES.triple.price;
    if (s.display === 'laptop') total += ITEM_PRICES.laptop.price;
    if (s.display === 'laptop-monitor') total += ITEM_PRICES.laptopMonitor.price;

    // Chair
    if (s.chair === 'office') total += ITEM_PRICES.office.price;
    if (s.chair === 'modern') total += ITEM_PRICES.modern.price;
    if (s.chair === 'lounge') total += ITEM_PRICES.lounge.price;

    // Plant
    if (s.plant === 'succulent') total += ITEM_PRICES.succulent.price;
    if (s.plant === 'tall') total += ITEM_PRICES.tall.price;

    // Right slot
    if (s.hasLamp) total += ITEM_PRICES.lamp.price;
    if (s.hasBooks) total += ITEM_PRICES.books.price;
    // Peripherals only apply if desktop monitor setup and user toggles it
    if (s.hasPeripherals && s.display !== 'laptop' && s.display !== 'laptop-monitor' && s.display !== 'none') {
      total += ITEM_PRICES.peripherals.price;
    }

    // Zones
    if (s.activeZone === 'coffee') total += ITEM_PRICES.coffeeStation.price;
    if (s.activeZone === 'relax') total += ITEM_PRICES.relaxZone.price;
    if (s.activeZone === 'garage') total += ITEM_PRICES.garageSpace.price;

    return total;
  },

  getSelectedSummary: () => {
    const s = get();
    const list: { name: string; price: number; slot: string }[] = [];

    // Desk
    const deskObj =
      s.desk === 'wood'
        ? ITEM_PRICES.deskWood
        : s.desk === 'adjustable'
        ? ITEM_PRICES.deskAdjustable
        : s.desk === 'corner'
        ? ITEM_PRICES.deskCorner
        : ITEM_PRICES.deskMinimal;
    list.push({ name: deskObj.name, price: deskObj.price, slot: 'Meja Kerja' });

    // Display
    if (s.display !== 'none') {
      const dispObj =
        s.display === 'single'
          ? ITEM_PRICES.single
          : s.display === 'dual'
          ? ITEM_PRICES.dual
          : s.display === 'triple'
          ? ITEM_PRICES.triple
          : s.display === 'laptop'
          ? ITEM_PRICES.laptop
          : ITEM_PRICES.laptopMonitor;
      list.push({ name: dispObj.name, price: dispObj.price, slot: 'Slot Tengah (Layar)' });
    }

    // Chair
    if (s.chair !== 'none') {
      const chairObj =
        s.chair === 'office'
          ? ITEM_PRICES.office
          : s.chair === 'modern'
          ? ITEM_PRICES.modern
          : ITEM_PRICES.lounge;
      list.push({ name: chairObj.name, price: chairObj.price, slot: 'Slot Depan (Kursi)' });
    }

    // Plant
    if (s.plant !== 'none') {
      const plantObj = s.plant === 'succulent' ? ITEM_PRICES.succulent : ITEM_PRICES.tall;
      list.push({ name: plantObj.name, price: plantObj.price, slot: 'Slot Kiri (Tumbuhan)' });
    }

    // Right Slot
    if (s.hasLamp) list.push({ name: ITEM_PRICES.lamp.name, price: ITEM_PRICES.lamp.price, slot: 'Slot Kanan (Lampu)' });
    if (s.hasBooks) list.push({ name: ITEM_PRICES.books.name, price: ITEM_PRICES.books.price, slot: 'Slot Kanan (Buku)' });

    if (s.hasPeripherals && s.display !== 'laptop' && s.display !== 'laptop-monitor' && s.display !== 'none') {
      list.push({ name: ITEM_PRICES.peripherals.name, price: ITEM_PRICES.peripherals.price, slot: 'Peripherals' });
    }

    // Zone
    if (s.activeZone === 'coffee') list.push({ name: ITEM_PRICES.coffeeStation.name, price: ITEM_PRICES.coffeeStation.price, slot: 'Zona Ruangan' });
    if (s.activeZone === 'relax') list.push({ name: ITEM_PRICES.relaxZone.name, price: ITEM_PRICES.relaxZone.price, slot: 'Zona Ruangan' });
    if (s.activeZone === 'garage') list.push({ name: ITEM_PRICES.garageSpace.name, price: ITEM_PRICES.garageSpace.price, slot: 'Zona Ruangan' });

    return list;
  },
}));
