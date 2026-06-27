export type ChatMessage = {
  id: string;
  role: 'user' | 'ai';
  text: string;
  timeIso: string;
};

export const CHAT_THREAD: ChatMessage[] = [
  { id: 'm1', role: 'ai', text: "Hi Ananya 👋 I'm right here with you. Walking home alone tonight?", timeIso: '2026-06-27T21:02:00Z' },
  { id: 'm2', role: 'user', text: 'Yeah, from the metro. It feels a bit empty.', timeIso: '2026-06-27T21:02:30Z' },
  { id: 'm3', role: 'ai', text: "I'll stay on the line and keep checking in. Your live location is shared with Mom and Priya. Want me to call you so it looks like you're talking to someone?", timeIso: '2026-06-27T21:03:00Z' },
  { id: 'm4', role: 'user', text: 'Yes please, that would help.', timeIso: '2026-06-27T21:03:20Z' },
  { id: 'm5', role: 'ai', text: "Done — starting a call now. If you go quiet for 2 minutes I'll check you're okay, and you can say your safe word any time.", timeIso: '2026-06-27T21:03:40Z' },
];

export type SuggestedPrompt = { id: string; text: string };
export const SUGGESTED_PROMPTS: SuggestedPrompt[] = [
  { id: 'sp1', text: 'Call me so I look busy' },
  { id: 'sp2', text: 'I feel like someone is following me' },
  { id: 'sp3', text: 'Stay with me until I reach home' },
  { id: 'sp4', text: 'Find the nearest safe place' },
];
