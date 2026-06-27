import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientButton } from '@/components/gradient-button';
import { Icon } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { PulseRing } from '@/components/pulse-ring';
import { ThemedText } from '@/components/themed-text';
import { Glow, Layout, Palette, Spacing } from '@/constants/theme';
import { EMERGENCY_NUMBER, SOS_CHECKLIST, SOS_COUNTDOWN_SECONDS } from '@/data/sos';

const ARMING_BG = ['#2A0512', '#5A0A22', '#1A0410'] as const;
const SENT_BG = ['#06140F', '#0A2A1E', '#070510'] as const;

type Phase = 'arming' | 'sent';

export default function SosScreen() {
  const insets = useSafeAreaInsets();
  const [phase, setPhase] = useState<Phase>('arming');
  const [count, setCount] = useState(SOS_COUNTDOWN_SECONDS);

  // Initial warning buzz when the modal opens.
  useEffect(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning).catch(() => {});
  }, []);

  // Countdown tick — the state change happens inside the timer callback (not
  // synchronously in the effect body), so it never triggers cascading renders.
  useEffect(() => {
    if (phase !== 'arming') return;
    const t = setTimeout(() => {
      if (count <= 1) {
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
        setPhase('sent');
      } else {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy).catch(() => {});
        setCount((c) => c - 1);
      }
    }, 1000);
    return () => clearTimeout(t);
  }, [count, phase]);

  const cancel = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    router.back();
  };
  const callPolice = () => {
    Linking.openURL(`tel:${EMERGENCY_NUMBER}`).catch(() => {});
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ presentation: 'fullScreenModal', animation: 'fade', gestureEnabled: false }} />
      <LinearGradient
        colors={phase === 'arming' ? ARMING_BG : SENT_BG}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={[styles.content, { paddingTop: insets.top + Spacing.four, paddingBottom: insets.bottom + Spacing.four }]}>
        {phase === 'arming' ? (
          <View style={styles.fill}>
            <View style={styles.centerFlex}>
              <ThemedText type="caption" style={styles.armingEyebrow}>
                Emergency SOS
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.armingSub}>
                Alerting your guardians & police in
              </ThemedText>

              <View style={styles.countWrap}>
                <View style={StyleSheet.absoluteFill} pointerEvents="none">
                  <View style={styles.center}>
                    <PulseRing size={210} color={Palette.danger} count={3} maxScale={1.25} duration={1000} />
                  </View>
                </View>
                <LinearGradient
                  colors={['#FF1F4B', '#B00027']}
                  start={{ x: 0.3, y: 0.1 }}
                  end={{ x: 0.85, y: 1 }}
                  style={[styles.countCircle, Glow.danger]}>
                  <ThemedText type="display" style={styles.countNum}>
                    {count}
                  </ThemedText>
                </LinearGradient>
              </View>

              <ThemedText type="small" themeColor="textSecondary" style={styles.armingHint}>
                Stay calm. Cancel below if you are safe.
              </ThemedText>
            </View>

            <GradientButton
              gradient="success"
              glow="success"
              size="lg"
              icon="shield-checkmark"
              sf="checkmark.shield.fill"
              title="I'm safe — Cancel"
              onPress={cancel}
            />
          </View>
        ) : (
          <View style={styles.fill}>
            <View style={styles.centerFlex}>
              <View style={styles.checkWrap}>
                <View style={StyleSheet.absoluteFill} pointerEvents="none">
                  <View style={styles.center}>
                    <PulseRing size={150} color={Palette.success} count={3} maxScale={1.4} duration={2600} />
                  </View>
                </View>
                <View style={[Glow.success, styles.checkGlow]}>
                  <IconChip icon="checkmark" sf="checkmark" gradient="success" size={104} iconSize={56} radius={52} />
                </View>
              </View>
              <ThemedText type="title" style={styles.sentTitle}>
                SOS Alert Sent
              </ThemedText>
              <ThemedText type="small" themeColor="textSecondary" style={styles.sentSub}>
                Help is on the way. Stay where you are if it&apos;s safe to do so.
              </ThemedText>
            </View>

            <View style={styles.checklist}>
              {SOS_CHECKLIST.map((s, i) => (
                <Animated.View key={s.id} entering={FadeInDown.delay(i * 120).springify()} style={styles.checkRow}>
                  <IconChip icon={s.icon} sf={s.sf} gradient="success" size={40} />
                  <View style={styles.fill}>
                    <ThemedText type="bodyStrong">{s.label}</ThemedText>
                    <ThemedText type="small" themeColor="textSecondary">
                      {s.detail}
                    </ThemedText>
                  </View>
                  <Icon name="checkmark-circle" sf="checkmark.circle.fill" size={22} color={Palette.success} />
                </Animated.View>
              ))}
            </View>

            <View style={styles.buttons}>
              <GradientButton
                gradient="sosArmed"
                glow="danger"
                size="lg"
                icon="call"
                sf="phone.fill"
                title={`Call Police · ${EMERGENCY_NUMBER}`}
                onPress={callPolice}
              />
              <GradientButton variant="ghost" size="lg" icon="checkmark" title="I am safe" onPress={() => router.back()} />
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { flex: 1, paddingHorizontal: Layout.screenPadding },
  fill: { flex: 1 },
  centerFlex: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },

  armingEyebrow: { color: Palette.danger, letterSpacing: 1.6, fontSize: 13 },
  armingSub: { marginTop: Spacing.two, textAlign: 'center' },
  armingHint: { marginTop: Spacing.three, textAlign: 'center', maxWidth: 280 },
  countWrap: { width: 240, height: 240, alignItems: 'center', justifyContent: 'center', marginVertical: Spacing.three },
  countCircle: { width: 190, height: 190, borderRadius: 95, alignItems: 'center', justifyContent: 'center' },
  countNum: { fontSize: 104, lineHeight: 116, color: Palette.textOnPrimary },

  checkWrap: { width: 150, height: 150, alignItems: 'center', justifyContent: 'center' },
  checkGlow: { borderRadius: 52 },
  sentTitle: { marginTop: Spacing.three },
  sentSub: { marginTop: Spacing.one, textAlign: 'center', maxWidth: 300 },

  checklist: { gap: Spacing.two, marginVertical: Spacing.four },
  checkRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  buttons: { gap: Spacing.two },
});
