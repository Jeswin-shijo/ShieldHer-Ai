import { type IoniconName } from '@/components/icon';

export type ReportSection = {
  id: string;
  title: string;
  summary: string;
  icon: IoniconName;
  sf: string;
};

export type PoliceReport = {
  refNo: string;
  generatedIso: string;
  incidentType: string;
  location: string;
  pages: number;
  sections: ReportSection[];
};

export const POLICE_REPORT: PoliceReport = {
  refNo: 'SH-4821',
  generatedIso: '2026-06-27T09:42:00Z',
  incidentType: 'SOS triggered — AI danger detection',
  location: '100 Ft Road, Indiranagar, Bengaluru',
  pages: 6,
  sections: [
    { id: 's1', title: 'Incident summary', summary: 'SOS auto-triggered at 09:31, glass-break detected (92%)', icon: 'document-text', sf: 'doc.text.fill' },
    { id: 's2', title: 'Location & route', summary: 'GPS track + map snapshot of last 30 minutes', icon: 'map', sf: 'map.fill' },
    { id: 's3', title: 'Audio & video evidence', summary: '2 clips · 2m 21s · SHA-256 verified', icon: 'videocam', sf: 'video.fill' },
    { id: 's4', title: 'Timeline of events', summary: 'Timestamped log of detections & alerts', icon: 'time', sf: 'clock.fill' },
    { id: 's5', title: 'Contacts notified', summary: '5 guardians + nearest police station', icon: 'people', sf: 'person.2.fill' },
  ],
};
