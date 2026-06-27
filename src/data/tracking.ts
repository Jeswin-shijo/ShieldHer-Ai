export type LatLng = { lat: number; lng: number };

export type TrackingSession = {
  isLive: boolean;
  address: string;
  area: string;
  accuracyM: number;
  battery: number;
  speedKmh: number;
  updatedIso: string;
  coords: LatLng;
};

export const ACTIVE_SESSION: TrackingSession = {
  isLive: true,
  address: '100 Ft Road, Indiranagar',
  area: 'Bengaluru 560038',
  accuracyM: 8,
  battery: 72,
  speedKmh: 4,
  updatedIso: '2026-06-27T09:39:00Z',
  coords: { lat: 12.9719, lng: 77.6412 },
};

/** Relative (%) pin positions for the styled MapPlaceholder. */
export type MapPinSeed = {
  id: string;
  x: number;
  y: number;
  kind: 'user' | 'contact' | 'place';
  name?: string;
  uri?: string;
};

export const TRACKING_PINS: MapPinSeed[] = [
  { id: 'me', x: 44, y: 52, kind: 'user' },
  { id: 'c1', x: 24, y: 30, kind: 'contact', name: 'Mom', uri: 'https://i.pravatar.cc/100?img=45' },
  { id: 'c2', x: 72, y: 38, kind: 'contact', name: 'Priya', uri: 'https://i.pravatar.cc/100?img=32' },
  { id: 'dest', x: 80, y: 74, kind: 'place' },
];

export const TRACKING_ROUTE = [
  { x: 44, y: 52 },
  { x: 52, y: 58 },
  { x: 60, y: 63 },
  { x: 68, y: 68 },
  { x: 75, y: 71 },
  { x: 80, y: 74 },
];
