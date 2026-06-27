import { type IoniconName } from '@/components/icon';

export type PremiumPerk = {
  id: string;
  label: string;
  free: boolean;
  pro: boolean;
  icon: IoniconName;
  sf: string;
};

export const PREMIUM_PERKS: PremiumPerk[] = [
  { id: 'sos', label: 'One-tap SOS & live tracking', free: true, pro: true, icon: 'alert-circle', sf: 'sos' },
  { id: 'detect', label: 'AI danger detection', free: false, pro: true, icon: 'pulse', sf: 'waveform' },
  { id: 'cloud', label: 'Cloud evidence recording', free: false, pro: true, icon: 'cloud-upload', sf: 'icloud.fill' },
  { id: 'guardians', label: 'Unlimited guardians', free: false, pro: true, icon: 'people', sf: 'person.2.fill' },
  { id: 'route', label: 'AI safe routes', free: false, pro: true, icon: 'map', sf: 'map.fill' },
  { id: 'watch', label: 'Smartwatch support', free: false, pro: true, icon: 'watch', sf: 'applewatch' },
];

export type PremiumPlan = {
  id: string;
  label: string;
  price: string;
  period: string;
  note: string;
  highlighted: boolean;
};

export const PREMIUM_PLANS: PremiumPlan[] = [
  { id: 'monthly', label: 'Monthly', price: 'Rs. 99', period: '/mo', note: 'Billed monthly', highlighted: false },
  { id: 'yearly', label: 'Yearly', price: 'Rs. 799', period: '/yr', note: 'Save 33% · Rs. 67/mo', highlighted: true },
];
