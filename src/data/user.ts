export type AppUser = {
  id: string;
  name: string;
  phone: string;
  email: string;
  avatarUri?: string;
  isPremium: boolean;
  memberSinceIso: string;
};

export const CURRENT_USER: AppUser = {
  id: 'u1',
  name: 'Ananya Sharma',
  phone: '+91 98765 43210',
  email: 'ananya.sharma@email.com',
  avatarUri: 'https://i.pravatar.cc/240?img=47',
  isPremium: false,
  memberSinceIso: '2025-11-02T09:00:00Z',
};
