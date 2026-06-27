export type FakeCaller = {
  id: string;
  name: string;
  subtitle: string;
  avatarUri?: string;
};

export const FAKE_CALLERS: FakeCaller[] = [
  { id: 'fc1', name: 'Rohan', subtitle: 'mobile', avatarUri: 'https://i.pravatar.cc/240?img=15' },
  { id: 'fc2', name: 'Mom', subtitle: 'mobile', avatarUri: 'https://i.pravatar.cc/240?img=45' },
  { id: 'fc3', name: 'Dad', subtitle: 'mobile', avatarUri: 'https://i.pravatar.cc/240?img=12' },
  { id: 'fc4', name: 'Office HR', subtitle: 'work', avatarUri: 'https://i.pravatar.cc/240?img=5' },
];

export const DEFAULT_CALLER = FAKE_CALLERS[0];

export type CallPreset = { id: string; label: string; delaySec: number };
export const CALL_PRESETS: CallPreset[] = [
  { id: 'now', label: 'Now', delaySec: 0 },
  { id: '15s', label: 'In 15s', delaySec: 15 },
  { id: '1m', label: 'In 1 min', delaySec: 60 },
  { id: '5m', label: 'In 5 min', delaySec: 300 },
];
