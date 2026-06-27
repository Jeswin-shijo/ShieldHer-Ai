import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { Icon } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { PulseRing } from '@/components/pulse-ring';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { Glow, Gradients, Palette, Radius, Spacing } from '@/constants/theme';
import { ACTIVE_SESSION } from '@/data/tracking';
import { navigate } from '@/utils/nav';
import { formatClock } from '@/utils/time';

type Phase = 'setup' | 'running' | 'expired';
const DURATIONS = [
  { label: '15m', value: '15' },
  { label: '30m', value: '30' },
  { label: '45m', value: '45' },
  { label: '60m', value: '60' },
];

export default function SafetyTimerScreen() {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<Phase>('setup');
  const [durationMin, setDurationMin] = useState('30');
  const [remaining, setRemaining] = useState(0);

  useEffect(() => {
    if (phase !== 'running' || remaining <= 0) return;
    const t = setTimeout(() => {
      if (remaining <= 1) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        setPhase('expired');
      } else {
        setRemaining((r) => r - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [phase, remaining]);

  const start = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    setRemaining(Number(durationMin) * 60);
    setPhase('running');
  };

  return (
    <View style={[styles.root, { paddingTop: Spacing.three, paddingBottom: insets.bottom + Spacing.four }]}>
      <Stack.Screen options={{ presentation: 'formSheet', sheetAllowedDetents: [0.7, 1], sheetCornerRadius: 28 }} />

      <View style={styles.header}>
        <View style={styles.flex}>
          <ThemedText type="caption">Check-in</ThemedText>
          <ThemedText type="subtitle">Safety Timer</ThemedText>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.closeBtn}>
          <Icon name="close" sf="xmark" size={20} color={Palette.text} />
        </Pressable>
      </View>

      {phase === 'setup' ? (
        <View style={styles.body}>
          <ThemedText type="small" themeColor="textSecondary">
            We&apos;ll alert your guardians and trigger SOS if you don&apos;t check in before the timer ends.
          </ThemedText>

          <Card>
            <View style={styles.row}>
              <IconChip icon="home" sf="house.fill" gradient="brandSoft" size={40} />
              <View style={styles.flex}>
                <ThemedText type="heading">Reaching Home</ThemedText>
                <ThemedText type="small" themeColor="textSecondary">
                  {ACTIVE_SESSION.address}
                </ThemedText>
              </View>
            </View>
          </Card>

          <View style={styles.gap}>
            <ThemedText type="caption">Timer duration</ThemedText>
            <Segmented options={DURATIONS} value={durationMin} onChange={setDurationMin} gradient="brandSoft" />
          </View>

          <GradientButton title={`Start ${durationMin}-minute timer`} gradient="brand" glow="pink" size="lg" icon="play" onPress={start} />
        </View>
      ) : phase === 'running' ? (
        <View style={styles.centerBody}>
          <View style={styles.ringWrap}>
            <View style={StyleSheet.absoluteFill} pointerEvents="none">
              <View style={styles.center}>
                <PulseRing size={180} color={Palette.primary} count={3} maxScale={1.3} duration={2600} />
              </View>
            </View>
            <LinearGradient colors={Gradients.brandSoft} start={{ x: 0.2, y: 0.1 }} end={{ x: 0.9, y: 1 }} style={[styles.ring, Glow.pink]}>
              <ThemedText type="display" style={styles.countNum}>
                {formatClock(remaining)}
              </ThemedText>
            </LinearGradient>
          </View>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
            Checking in when you reach Home. Tap below the moment you&apos;re safe.
          </ThemedText>
          <View style={styles.buttons}>
            <GradientButton title="I've arrived safely" gradient="success" glow="success" size="lg" icon="checkmark-circle" onPress={() => router.back()} />
            <GradientButton title="Extend +15 min" variant="ghost" size="lg" icon="add" onPress={() => setRemaining((r) => r + 15 * 60)} />
          </View>
        </View>
      ) : (
        <View style={styles.centerBody}>
          <View style={[Glow.danger, styles.expiredIcon]}>
            <IconChip icon="alert" sf="exclamationmark.triangle.fill" gradient="sosArmed" size={88} iconSize={44} radius={44} />
          </View>
          <ThemedText type="title" style={styles.centerText}>
            Check-in missed
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary" style={styles.centerText}>
            Your timer ended. Alerting your guardians now.
          </ThemedText>
          <View style={styles.buttons}>
            <GradientButton title="Send SOS now" gradient="sosArmed" glow="danger" size="lg" icon="warning" onPress={() => navigate('/sos')} />
            <GradientButton title="I'm safe" variant="ghost" size="lg" icon="checkmark" onPress={() => router.back()} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: Palette.background, paddingHorizontal: Spacing.four },
  flex: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three, marginBottom: Spacing.four },
  closeBtn: {
    width: 36,
    height: 36,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.backgroundElement,
  },
  body: { gap: Spacing.four },
  centerBody: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  gap: { gap: Spacing.two },
  ringWrap: { width: 220, height: 220, alignItems: 'center', justifyContent: 'center' },
  ring: { width: 180, height: 180, borderRadius: 90, alignItems: 'center', justifyContent: 'center' },
  countNum: { fontSize: 48, lineHeight: 56, color: Palette.textOnPrimary },
  centerText: { textAlign: 'center', maxWidth: 300 },
  expiredIcon: { borderRadius: 44 },
  buttons: { alignSelf: 'stretch', gap: Spacing.two, marginTop: Spacing.three },
});
