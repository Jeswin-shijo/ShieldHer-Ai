import { type IoniconName } from '@/components/icon';
import { type GradientKey } from '@/constants/theme';

export const TAGLINE = 'Detect · Protect · Respond.';

export type OnboardSlide = {
  id: string;
  title: string;
  body: string;
  icon: IoniconName;
  sf: string;
  gradient: GradientKey;
};

export const ONBOARD_SLIDES: OnboardSlide[] = [
  { id: 'detect', title: 'AI that detects danger', body: 'ShieldHer listens for screams, glass breaks and calls for help — and triggers an SOS automatically.', icon: 'pulse', sf: 'waveform', gradient: 'aiFeature' },
  { id: 'protect', title: 'Help is one tap away', body: 'One tap alerts your guardians and the police with your live location and recorded evidence.', icon: 'shield-checkmark', sf: 'checkmark.shield.fill', gradient: 'sosButton' },
  { id: 'respond', title: 'Never walk alone', body: 'Live tracking, AI safe routes, fake calls and a nearby women network stay with you every step.', icon: 'people', sf: 'person.2.fill', gradient: 'brand' },
];

export type TargetUser = { id: string; label: string; icon: IoniconName; sf: string };

export const TARGET_USERS: TargetUser[] = [
  { id: 'students', label: 'Students', icon: 'school', sf: 'graduationcap.fill' },
  { id: 'working', label: 'Working professionals', icon: 'briefcase', sf: 'briefcase.fill' },
  { id: 'night', label: 'Night-shift workers', icon: 'moon', sf: 'moon.fill' },
  { id: 'travelers', label: 'Solo travelers', icon: 'airplane', sf: 'airplane' },
  { id: 'seniors', label: 'Senior women', icon: 'woman', sf: 'figure.dress' },
  { id: 'families', label: 'Families & guardians', icon: 'home', sf: 'house.fill' },
];

export type ValueProp = { id: string; label: string; icon: IoniconName; sf: string };

export const VALUE_PROPS: ValueProp[] = [
  { id: 'ai', label: 'AI-powered automatic danger detection', icon: 'sparkles', sf: 'sparkles' },
  { id: 'realtime', label: 'Real-time protection & instant response', icon: 'flash', sf: 'bolt.fill' },
  { id: 'evidence', label: 'Secure evidence for legal support', icon: 'shield-checkmark', sf: 'checkmark.shield.fill' },
  { id: 'community', label: 'Community support & smart safety insights', icon: 'people', sf: 'person.2.fill' },
];
