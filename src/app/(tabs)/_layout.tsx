import { Tabs } from 'expo-router';

import { Icon, type IoniconName } from '@/components/icon';
import { Palette } from '@/constants/theme';

type TabDef = { name: string; title: string; on: IoniconName; off: IoniconName; sf: string };

const TABS: TabDef[] = [
  { name: 'index', title: 'Home', on: 'home', off: 'home-outline', sf: 'house.fill' },
  { name: 'protect', title: 'Protect', on: 'shield-half', off: 'shield-half-outline', sf: 'shield.lefthalf.filled' },
  { name: 'tracking', title: 'Tracking', on: 'location', off: 'location-outline', sf: 'location.fill' },
  { name: 'network', title: 'Network', on: 'people', off: 'people-outline', sf: 'person.2.fill' },
  { name: 'profile', title: 'Profile', on: 'person-circle', off: 'person-circle-outline', sf: 'person.crop.circle' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Palette.primary,
        tabBarInactiveTintColor: Palette.textTertiary,
        tabBarStyle: {
          backgroundColor: Palette.surface,
          borderTopColor: Palette.border,
          borderTopWidth: 1,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}>
      {TABS.map((t) => (
        <Tabs.Screen
          key={t.name}
          name={t.name}
          options={{
            title: t.title,
            tabBarIcon: ({ color, size, focused }) => (
              <Icon name={focused ? t.on : t.off} sf={t.sf} size={size} color={color} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
