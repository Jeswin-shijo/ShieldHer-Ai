export type TrustedContact = {
  id: string;
  name: string;
  relation: string;
  phone: string;
  avatarUri?: string;
  isPrimary: boolean;
  isSharingLive: boolean;
  online: boolean;
};

export const TRUSTED_CONTACTS: TrustedContact[] = [
  { id: 'c1', name: 'Mom', relation: 'Mother', phone: '+91 90000 11111', avatarUri: 'https://i.pravatar.cc/200?img=45', isPrimary: true, isSharingLive: true, online: true },
  { id: 'c2', name: 'Priya', relation: 'Best friend', phone: '+91 90000 22222', avatarUri: 'https://i.pravatar.cc/200?img=32', isPrimary: false, isSharingLive: true, online: true },
  { id: 'c3', name: 'Dad', relation: 'Father', phone: '+91 90000 33333', avatarUri: 'https://i.pravatar.cc/200?img=12', isPrimary: false, isSharingLive: false, online: false },
  { id: 'c4', name: 'Rohan', relation: 'Brother', phone: '+91 90000 44444', avatarUri: 'https://i.pravatar.cc/200?img=15', isPrimary: false, isSharingLive: true, online: true },
  { id: 'c5', name: 'Meera', relation: 'Roommate', phone: '+91 90000 55555', avatarUri: 'https://i.pravatar.cc/200?img=49', isPrimary: false, isSharingLive: false, online: true },
];

export const PRIMARY_CONTACT = TRUSTED_CONTACTS.find((c) => c.isPrimary) ?? TRUSTED_CONTACTS[0];
export const SHARING_CONTACTS = TRUSTED_CONTACTS.filter((c) => c.isSharingLive);
