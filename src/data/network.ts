import { type MapPinSeed } from '@/data/tracking';

export type NetworkMember = {
  id: string;
  name: string;
  distanceM: number;
  verified: boolean;
  status: 'available' | 'walking' | 'idle';
  avatarUri?: string;
};

export const NEARBY_MEMBERS: NetworkMember[] = [
  { id: 'n1', name: 'Sneha R.', distanceM: 120, verified: true, status: 'available', avatarUri: 'https://i.pravatar.cc/120?img=20' },
  { id: 'n2', name: 'Kavya M.', distanceM: 240, verified: true, status: 'walking', avatarUri: 'https://i.pravatar.cc/120?img=49' },
  { id: 'n3', name: 'Divya S.', distanceM: 310, verified: false, status: 'available', avatarUri: 'https://i.pravatar.cc/120?img=44' },
  { id: 'n4', name: 'Aisha K.', distanceM: 460, verified: true, status: 'idle', avatarUri: 'https://i.pravatar.cc/120?img=16' },
];

export type CommunityPost = {
  id: string;
  author: string;
  area: string;
  body: string;
  timeIso: string;
  kind: 'tip' | 'alert' | 'walk-with-me';
};

export const COMMUNITY_FEED: CommunityPost[] = [
  { id: 'p1', author: 'Kavya M.', area: '80 Ft Road', body: 'Heading to the metro at 9:45 — anyone want to walk together?', timeIso: '2026-06-27T09:28:00Z', kind: 'walk-with-me' },
  { id: 'p2', author: 'Sneha R.', area: 'CMH Road', body: 'Streetlight out near the bakery corner. Take the main road tonight.', timeIso: '2026-06-27T08:10:00Z', kind: 'alert' },
  { id: 'p3', author: 'Divya S.', area: 'Indiranagar', body: 'New 24/7 pharmacy with security has opened — safe waiting spot.', timeIso: '2026-06-26T21:05:00Z', kind: 'tip' },
];

export const NEARBY_RADIUS_M = 500;

export const NETWORK_PINS: MapPinSeed[] = [
  { id: 'me', x: 50, y: 52, kind: 'user' },
  { id: 'n1', x: 38, y: 40, kind: 'contact', name: 'Sneha', uri: 'https://i.pravatar.cc/100?img=20' },
  { id: 'n2', x: 64, y: 38, kind: 'contact', name: 'Kavya', uri: 'https://i.pravatar.cc/100?img=49' },
  { id: 'n3', x: 68, y: 64, kind: 'contact', name: 'Divya', uri: 'https://i.pravatar.cc/100?img=44' },
];
