export type EvidenceClip = {
  id: string;
  kind: 'audio' | 'video';
  durationSec: number;
  createdIso: string;
  sizeMb: number;
  uploaded: boolean;
};

export const EVIDENCE_CLIPS: EvidenceClip[] = [
  { id: 'ev1', kind: 'video', durationSec: 94, createdIso: '2026-06-27T09:30:00Z', sizeMb: 42, uploaded: true },
  { id: 'ev2', kind: 'audio', durationSec: 213, createdIso: '2026-06-26T20:11:00Z', sizeMb: 5, uploaded: true },
  { id: 'ev3', kind: 'video', durationSec: 47, createdIso: '2026-06-25T18:02:00Z', sizeMb: 22, uploaded: false },
];
