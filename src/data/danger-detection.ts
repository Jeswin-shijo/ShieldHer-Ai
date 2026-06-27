import { type IoniconName } from '@/components/icon';

export type DetectedType = 'scream' | 'glass' | 'shout' | 'siren' | 'help';
export type Sensitivity = 'low' | 'medium' | 'high';

export type DetectedEvent = {
  id: string;
  type: DetectedType;
  label: string;
  confidence: number;
  timeIso: string;
  icon: IoniconName;
  sf: string;
};

export const SENSITIVITY_OPTIONS: { label: string; value: Sensitivity }[] = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

export const DETECTED_EVENTS: DetectedEvent[] = [
  { id: 'e1', type: 'glass', label: 'Glass breaking', confidence: 0.92, timeIso: '2026-06-27T09:31:00Z', icon: 'warning', sf: 'exclamationmark.triangle.fill' },
  { id: 'e2', type: 'scream', label: 'Scream detected', confidence: 0.87, timeIso: '2026-06-27T08:54:00Z', icon: 'megaphone', sf: 'megaphone.fill' },
  { id: 'e3', type: 'siren', label: 'Siren nearby', confidence: 0.74, timeIso: '2026-06-26T22:12:00Z', icon: 'car-sport', sf: 'car.fill' },
  { id: 'e4', type: 'shout', label: 'Raised voices', confidence: 0.68, timeIso: '2026-06-26T21:40:00Z', icon: 'chatbubble-ellipses', sf: 'bubble.left.fill' },
];

/** What the AI is currently listening for (chips on the detection screen). */
export const LISTENING_FOR = ['Screams', 'Help calls', 'Glass break', 'Violence', 'Gunshot'];
