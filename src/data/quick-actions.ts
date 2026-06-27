import { type IoniconName } from '@/components/icon';
import { type GradientKey } from '@/constants/theme';

export type QuickAction = {
  key: string;
  label: string;
  icon: IoniconName;
  sf: string;
  gradient: GradientKey;
  route: string;
};

export const QUICK_ACTIONS: QuickAction[] = [
  { key: 'fake-call', label: 'Fake Call', icon: 'call', sf: 'phone.fill', gradient: 'aiFeature', route: '/fake-call' },
  { key: 'timer', label: 'Safety Timer', icon: 'timer', sf: 'timer', gradient: 'brandSoft', route: '/safety-timer' },
  { key: 'tracking', label: 'Live Tracking', icon: 'location', sf: 'location.fill', gradient: 'route', route: '/tracking' },
  { key: 'evidence', label: 'Record', icon: 'videocam', sf: 'video.fill', gradient: 'sosButton', route: '/evidence' },
];
