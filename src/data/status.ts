export type ProtectionState = 'protected' | 'scanning' | 'alert' | 'offline';

export type ProtectionStatus = {
  state: ProtectionState;
  label: string;
  detail: string;
  aiActive: boolean;
  lastCheckIso: string;
};

export const PROTECTION_STATUS: ProtectionStatus = {
  state: 'protected',
  label: 'You are Protected',
  detail: 'AI is actively listening for danger sounds',
  aiActive: true,
  lastCheckIso: '2026-06-27T09:38:00Z',
};
