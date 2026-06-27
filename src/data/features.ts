import { type IoniconName } from '@/components/icon';
import { type GradientKey } from '@/constants/theme';

export type SafetyFeature = {
  id: number;
  key: string;
  title: string;
  subtitle: string;
  icon: IoniconName;
  sf: string;
  gradient: GradientKey;
  route: string;
  isPremium: boolean;
  isNew?: boolean;
};

/** All 14 features in spec order. Routes prefixed `/features/...` are pushed over the tabs. */
export const FEATURES: SafetyFeature[] = [
  { id: 1, key: 'danger-detection', title: 'AI Danger Detection', subtitle: 'Detects screams, glass break & violence sounds', icon: 'pulse', sf: 'waveform', gradient: 'aiFeature', route: '/features/danger-detection', isPremium: true },
  { id: 2, key: 'fake-call', title: 'Fake Call', subtitle: 'Escape uncomfortable situations instantly', icon: 'call', sf: 'phone.fill', gradient: 'brand', route: '/fake-call', isPremium: false },
  { id: 3, key: 'secret-sos', title: 'Secret SOS', subtitle: 'Power, volume or shake triggers', icon: 'flash', sf: 'bolt.fill', gradient: 'brandSoft', route: '/features/secret-sos', isPremium: false },
  { id: 4, key: 'evidence', title: 'Live Evidence', subtitle: 'Auto-record audio & video to the cloud', icon: 'videocam', sf: 'video.fill', gradient: 'sosButton', route: '/evidence', isPremium: true },
  { id: 5, key: 'safe-route', title: 'AI Safe Route', subtitle: 'Avoid dark & high-risk streets', icon: 'map', sf: 'map.fill', gradient: 'route', route: '/features/safe-route', isPremium: true },
  { id: 6, key: 'family-tracking', title: 'Family Live Tracking', subtitle: 'See loved ones in real time', icon: 'people', sf: 'person.2.fill', gradient: 'aiFeature', route: '/features/family-tracking', isPremium: false },
  { id: 7, key: 'safety-timer', title: 'Safety Timer', subtitle: "Auto-alert if you don't check in", icon: 'timer', sf: 'timer', gradient: 'brandSoft', route: '/safety-timer', isPremium: false },
  { id: 8, key: 'nearby-network', title: 'Nearby Women Network', subtitle: 'Broadcast help to verified women within 500m', icon: 'megaphone', sf: 'megaphone.fill', gradient: 'brand', route: '/features/nearby-network', isPremium: false, isNew: true },
  { id: 9, key: 'police-report', title: 'Auto Police Report', subtitle: 'Court-ready PDF after an SOS', icon: 'document-text', sf: 'doc.text.fill', gradient: 'route', route: '/features/police-report', isPremium: true },
  { id: 10, key: 'voice-password', title: 'Voice Password', subtitle: 'Trigger SOS with a secret phrase', icon: 'mic', sf: 'mic.fill', gradient: 'aiFeature', route: '/voice-password', isPremium: false },
  { id: 11, key: 'travel-guardian', title: 'Travel Guardian', subtitle: 'Share trip, vehicle & ETA with family', icon: 'car-sport', sf: 'car.fill', gradient: 'brandSoft', route: '/features/travel-guardian', isPremium: false },
  { id: 12, key: 'ai-chat', title: 'AI Chat Companion', subtitle: 'A voice with you while walking alone', icon: 'chatbubbles', sf: 'bubble.left.and.bubble.right.fill', gradient: 'aiFeature', route: '/features/ai-chat', isPremium: true, isNew: true },
  { id: 13, key: 'offline-sos', title: 'Offline SOS', subtitle: 'SMS alerts with last location, no internet', icon: 'cloud-offline', sf: 'wifi.slash', gradient: 'brand', route: '/features/offline-sos', isPremium: false },
  { id: 14, key: 'safety-score', title: 'Smart Safety Score', subtitle: "Know any area's risk from 0–100", icon: 'speedometer', sf: 'gauge.medium', gradient: 'route', route: '/features/safety-score', isPremium: true },
];

export const FEATURE_BY_KEY: Record<string, SafetyFeature> = Object.fromEntries(
  FEATURES.map((f) => [f.key, f]),
);
