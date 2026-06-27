import { type IoniconName } from '@/components/icon';

export type TripMode = 'cab' | 'bus' | 'train' | 'walk' | 'flight';

export type Trip = {
  id: string;
  from: string;
  to: string;
  mode: TripMode;
  departIso: string;
  etaIso: string;
  status: 'planned' | 'active' | 'done';
  vehicleNo?: string;
  driver?: string;
  checkInEveryMin: number;
};

export const MODE_ICON: Record<TripMode, { icon: IoniconName; sf: string }> = {
  cab: { icon: 'car-sport', sf: 'car.fill' },
  bus: { icon: 'bus', sf: 'bus.fill' },
  train: { icon: 'train', sf: 'tram.fill' },
  walk: { icon: 'walk', sf: 'figure.walk' },
  flight: { icon: 'airplane', sf: 'airplane' },
};

export const TRIPS: Trip[] = [
  { id: 't1', from: 'Office, Whitefield', to: 'Home, Indiranagar', mode: 'cab', departIso: '2026-06-27T09:20:00Z', etaIso: '2026-06-27T10:05:00Z', status: 'active', vehicleNo: 'KA 05 M8821', driver: 'Suresh K.', checkInEveryMin: 10 },
  { id: 't2', from: 'Home', to: 'Airport T2', mode: 'cab', departIso: '2026-06-28T04:30:00Z', etaIso: '2026-06-28T05:25:00Z', status: 'planned', vehicleNo: 'KA 01 AB1234', driver: 'Pending', checkInEveryMin: 15 },
];

export const ACTIVE_TRIP = TRIPS.find((t) => t.status === 'active') ?? TRIPS[0];
