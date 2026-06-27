import { type IoniconName } from '@/components/icon';

export type ScoreTier = 'low' | 'fair' | 'good' | 'excellent';

export type ScoreFactor = {
  id: string;
  label: string;
  points: number;
  max: number;
  icon: IoniconName;
  sf: string;
  tip: string;
};

export type SafetyScore = {
  score: number;
  max: number;
  tier: ScoreTier;
  tierLabel: string;
  trend: number;
  areaName: string;
  factors: ScoreFactor[];
};

export const SAFETY_SCORE: SafetyScore = {
  score: 82,
  max: 100,
  tier: 'good',
  tierLabel: 'Your area feels Safe',
  trend: 4,
  areaName: 'Indiranagar, Bengaluru',
  factors: [
    { id: 'lighting', label: 'Street lighting', points: 18, max: 20, icon: 'bulb', sf: 'lightbulb.fill', tip: 'Well-lit main roads nearby' },
    { id: 'crowd', label: 'Crowd density', points: 16, max: 20, icon: 'people', sf: 'person.3.fill', tip: 'Busy until late evening' },
    { id: 'police', label: 'Police proximity', points: 15, max: 20, icon: 'shield', sf: 'shield.fill', tip: 'Station ~600m away' },
    { id: 'reports', label: 'Recent reports', points: 14, max: 20, icon: 'flag', sf: 'flag.fill', tip: '2 incidents reported this month' },
    { id: 'transit', label: 'Safe transit', points: 19, max: 20, icon: 'bus', sf: 'bus.fill', tip: 'Metro & cabs available nearby' },
  ],
};
