export type OfflineStatus = {
  online: boolean;
  lastSyncIso: string;
  queuedAlerts: number;
  cachedContacts: number;
  meshPeers: number;
  smsFallbackOn: boolean;
};

export const OFFLINE_STATUS: OfflineStatus = {
  online: false,
  lastSyncIso: '2026-06-27T09:15:00Z',
  queuedAlerts: 1,
  cachedContacts: 5,
  meshPeers: 2,
  smsFallbackOn: true,
};

export type OfflineCapability = { id: string; label: string; detail: string; ready: boolean };
export const OFFLINE_CAPABILITIES: OfflineCapability[] = [
  { id: 'sms', label: 'SMS SOS fallback', detail: 'Sends last GPS to guardians via text', ready: true },
  { id: 'cache', label: 'Cached emergency contacts', detail: '5 guardians stored on-device', ready: true },
  { id: 'mesh', label: 'Bluetooth mesh relay', detail: 'Relay alert through nearby ShieldHer users', ready: true },
  { id: 'siren', label: 'Loud siren & strobe', detail: 'Works fully offline to draw attention', ready: true },
];
