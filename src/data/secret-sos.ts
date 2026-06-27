import { type IoniconName } from '@/components/icon';

export type Trigger = {
  id: 'power' | 'volume' | 'shake' | 'watch';
  label: string;
  detail: string;
  enabled: boolean;
  icon: IoniconName;
  sf: string;
  config: string;
};

export const TRIGGERS: Trigger[] = [
  { id: 'power', label: 'Power button', detail: 'Press 5 times quickly', enabled: true, icon: 'power', sf: 'power', config: '5× press' },
  { id: 'volume', label: 'Volume buttons', detail: 'Hold both for 2 seconds', enabled: true, icon: 'volume-high', sf: 'speaker.wave.2.fill', config: 'Hold 2s' },
  { id: 'shake', label: 'Shake phone', detail: 'Shake vigorously 3 times', enabled: false, icon: 'phone-portrait', sf: 'iphone.gen3', config: 'Shake ×3' },
  { id: 'watch', label: 'Smartwatch', detail: 'Triple-tap the watch face', enabled: false, icon: 'watch', sf: 'applewatch', config: 'Triple-tap' },
];
