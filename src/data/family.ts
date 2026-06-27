import { type MapPinSeed } from '@/data/tracking';

export type FamilyMember = {
  id: string;
  name: string;
  relation: string;
  place: string;
  lastSeenIso: string;
  battery: number;
  status: 'safe' | 'moving' | 'alert';
  avatarUri?: string;
};

export const FAMILY: FamilyMember[] = [
  { id: 'f1', name: 'Mom', relation: 'Mother', place: 'Home · Indiranagar', lastSeenIso: '2026-06-27T09:35:00Z', battery: 84, status: 'safe', avatarUri: 'https://i.pravatar.cc/160?img=45' },
  { id: 'f2', name: 'Dad', relation: 'Father', place: 'MG Road Metro', lastSeenIso: '2026-06-27T09:20:00Z', battery: 41, status: 'moving', avatarUri: 'https://i.pravatar.cc/160?img=12' },
  { id: 'f3', name: 'Priya', relation: 'Sister', place: 'Christ University', lastSeenIso: '2026-06-27T08:50:00Z', battery: 67, status: 'safe', avatarUri: 'https://i.pravatar.cc/160?img=32' },
  { id: 'f4', name: 'Rohan', relation: 'Brother', place: 'Koramangala', lastSeenIso: '2026-06-26T23:10:00Z', battery: 12, status: 'alert', avatarUri: 'https://i.pravatar.cc/160?img=15' },
];

export const FAMILY_PINS: MapPinSeed[] = [
  { id: 'me', x: 50, y: 54, kind: 'user' },
  { id: 'f1', x: 28, y: 36, kind: 'contact', name: 'Mom', uri: 'https://i.pravatar.cc/100?img=45' },
  { id: 'f2', x: 70, y: 30, kind: 'contact', name: 'Dad', uri: 'https://i.pravatar.cc/100?img=12' },
  { id: 'f3', x: 76, y: 66, kind: 'contact', name: 'Priya', uri: 'https://i.pravatar.cc/100?img=32' },
];
