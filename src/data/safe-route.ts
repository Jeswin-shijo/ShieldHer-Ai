import { type MapPinSeed } from '@/data/tracking';

export type SafeRoute = {
  id: string;
  label: string;
  etaMin: number;
  distanceKm: number;
  safetyScore: number;
  lit: boolean;
  crowd: 'high' | 'medium' | 'low';
  recommended: boolean;
};

export const SAFE_ROUTES: SafeRoute[] = [
  { id: 'r1', label: 'Via 100 Ft Road', etaMin: 14, distanceKm: 1.2, safetyScore: 92, lit: true, crowd: 'high', recommended: true },
  { id: 'r2', label: 'Via Market Lane', etaMin: 11, distanceKm: 0.9, safetyScore: 64, lit: true, crowd: 'medium', recommended: false },
  { id: 'r3', label: 'Via Park Shortcut', etaMin: 9, distanceKm: 0.7, safetyScore: 38, lit: false, crowd: 'low', recommended: false },
];

export type RouteLegendItem = { id: string; label: string; color: string };
export const ROUTE_LEGEND: RouteLegendItem[] = [
  { id: 'safe', label: 'Well-lit & busy', color: '#2BE89A' },
  { id: 'caution', label: 'Use caution', color: '#FFB020' },
  { id: 'risk', label: 'Avoid if alone', color: '#FF1F4B' },
];

export const ROUTE_PINS: MapPinSeed[] = [
  { id: 'me', x: 22, y: 74, kind: 'user' },
  { id: 'dest', x: 80, y: 24, kind: 'place' },
];

export const ROUTE_PATH = [
  { x: 22, y: 74 },
  { x: 34, y: 66 },
  { x: 46, y: 56 },
  { x: 58, y: 46 },
  { x: 70, y: 34 },
  { x: 80, y: 24 },
];
