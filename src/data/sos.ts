import { type IoniconName } from '@/components/icon';

export type SosStep = {
  id: string;
  label: string;
  detail: string;
  icon: IoniconName;
  sf: string;
};

export const SOS_CHECKLIST: SosStep[] = [
  { id: 'loc', label: 'Location shared', detail: 'Live GPS sent to your guardians', icon: 'location', sf: 'location.fill' },
  { id: 'contacts', label: 'Contacts notified', detail: '5 trusted contacts alerted', icon: 'people', sf: 'person.2.fill' },
  { id: 'recording', label: 'Recording started', detail: 'Audio & video saving to secure cloud', icon: 'videocam', sf: 'video.fill' },
  { id: 'police', label: 'Police report ready', detail: 'Auto report #SH-4821 generated', icon: 'document-text', sf: 'doc.text.fill' },
];

export const SOS_COUNTDOWN_SECONDS = 5;

/** Emergency number prefilled on the "Call Police" action (112 = India unified). */
export const EMERGENCY_NUMBER = '112';
