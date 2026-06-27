import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Avatar } from '@/components/avatar';
import { Icon, type IoniconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Palette, Spacing } from '@/constants/theme';
import { DEFAULT_CALLER } from '@/data/fake-call';
import { formatClock } from '@/utils/time';

const BG = ['#0A0712', '#1A1030', '#0A0712'] as const;

type CallControl = { key: string; icon: IoniconName; sf: string; label: string; toggle?: boolean };
const CONTROLS: CallControl[] = [
  { key: 'mute', icon: 'mic-off', sf: 'mic.slash.fill', label: 'mute', toggle: true },
  { key: 'keypad', icon: 'keypad', sf: 'circle.grid.3x3.fill', label: 'keypad' },
  { key: 'speaker', icon: 'volume-high', sf: 'speaker.wave.2.fill', label: 'speaker', toggle: true },
  { key: 'add', icon: 'person-add', sf: 'person.badge.plus', label: 'add call' },
  { key: 'video', icon: 'videocam', sf: 'video.fill', label: 'video' },
  { key: 'contacts', icon: 'people', sf: 'person.2.fill', label: 'contacts' },
];

export default function FakeCallScreen() {
  const insets = useSafeAreaInsets();
  const caller = DEFAULT_CALLER;
  const [phase, setPhase] = useState<'incoming' | 'in-call'>('incoming');
  const [elapsed, setElapsed] = useState(0);
  const [active, setActive] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (phase !== 'in-call') return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const accept = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setPhase('in-call');
  };
  const end = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
    router.back();
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ presentation: 'fullScreenModal', animation: 'fade', gestureEnabled: false }} />
      <LinearGradient colors={BG} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={StyleSheet.absoluteFill} />

      <View style={[styles.content, { paddingTop: insets.top + Spacing.five, paddingBottom: insets.bottom + Spacing.five }]}>
        <View style={styles.caller}>
          <ThemedText type="caption" style={styles.brandTag}>
            ShieldHer · Fake Call
          </ThemedText>
          <Avatar uri={caller.avatarUri} name={caller.name} size={132} ring ringGradient="brand" style={styles.avatar} />
          <ThemedText type="title" style={styles.name}>
            {caller.name}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {phase === 'incoming' ? `${caller.subtitle} · incoming call…` : formatClock(elapsed)}
          </ThemedText>
        </View>

        {phase === 'in-call' ? (
          <View style={styles.grid}>
            {CONTROLS.map((c) => {
              const on = c.toggle && active[c.key];
              return (
                <Pressable
                  key={c.key}
                  style={styles.cell}
                  onPress={() => {
                    Haptics.selectionAsync().catch(() => {});
                    if (c.toggle) setActive((a) => ({ ...a, [c.key]: !a[c.key] }));
                  }}>
                  <View style={[styles.ctrlBtn, on && styles.ctrlOn]}>
                    <Icon name={c.icon} sf={c.sf} size={24} color={on ? Palette.background : '#FFFFFF'} />
                  </View>
                  <ThemedText type="caption" style={styles.ctrlLabel}>
                    {c.label}
                  </ThemedText>
                </Pressable>
              );
            })}
          </View>
        ) : null}

        {phase === 'incoming' ? (
          <View style={styles.answerRow}>
            <View style={styles.answerCol}>
              <Pressable onPress={end} style={[styles.bigRound, { backgroundColor: Palette.danger }]}>
                <Icon name="close" sf="xmark" size={32} color="#FFFFFF" />
              </Pressable>
              <ThemedText type="small" themeColor="textSecondary">
                Decline
              </ThemedText>
            </View>
            <View style={styles.answerCol}>
              <Pressable onPress={accept} style={[styles.bigRound, { backgroundColor: Palette.success }]}>
                <Icon name="call" sf="phone.fill" size={32} color="#FFFFFF" />
              </Pressable>
              <ThemedText type="small" themeColor="textSecondary">
                Accept
              </ThemedText>
            </View>
          </View>
        ) : (
          <View style={styles.endRow}>
            <Pressable onPress={end} style={[styles.bigRound, styles.endBtn]}>
              <Icon name="call" size={30} color="#FFFFFF" style={styles.endIcon} />
            </Pressable>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Spacing.four, justifyContent: 'space-between', alignItems: 'center' },
  caller: { alignItems: 'center', marginTop: Spacing.six },
  brandTag: { letterSpacing: 1 },
  avatar: { marginTop: Spacing.four },
  name: { marginTop: Spacing.three },

  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', rowGap: Spacing.four, width: '100%', maxWidth: 320 },
  cell: { width: '33.33%', alignItems: 'center', gap: Spacing.one },
  ctrlBtn: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  ctrlOn: { backgroundColor: '#FFFFFF' },
  ctrlLabel: { letterSpacing: 0.3 },

  answerRow: { flexDirection: 'row', justifyContent: 'space-between', width: '100%', maxWidth: 320 },
  answerCol: { alignItems: 'center', gap: Spacing.two },
  endRow: { alignItems: 'center' },
  bigRound: { width: 72, height: 72, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  endBtn: { backgroundColor: Palette.danger },
  endIcon: { transform: [{ rotate: '135deg' }] },
});
