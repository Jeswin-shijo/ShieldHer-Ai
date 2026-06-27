export type VoiceWord = {
  id: string;
  kind: 'safe' | 'duress';
  phrase: string;
  recordedIso: string;
  durationSec: number;
};

export const VOICE_WORDS: VoiceWord[] = [
  { id: 'v1', kind: 'safe', phrase: 'Red Rose', recordedIso: '2026-06-20T11:00:00Z', durationSec: 2 },
  { id: 'v2', kind: 'duress', phrase: 'Jesus Save Me', recordedIso: '2026-06-20T11:01:00Z', durationSec: 2 },
];

export const SAFE_WORD = VOICE_WORDS.find((w) => w.kind === 'safe');
export const DURESS_WORD = VOICE_WORDS.find((w) => w.kind === 'duress');
