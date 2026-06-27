import { router, Stack } from 'expo-router';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { Icon } from '@/components/icon';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Palette, Radius, Spacing } from '@/constants/theme';
import { VOICE_WORDS } from '@/data/voice-password';
import { relativeTime } from '@/utils/time';

export default function VoicePasswordScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, { paddingBottom: insets.bottom + Spacing.four }]}>
      <Stack.Screen options={{ presentation: 'formSheet', sheetAllowedDetents: [0.7, 1], sheetCornerRadius: 28 }} />

      <View style={styles.header}>
        <View style={styles.flex}>
          <ThemedText type="caption">Stealth</ThemedText>
          <ThemedText type="subtitle">Voice Password</ThemedText>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.closeBtn}>
          <Icon name="close" sf="xmark" size={20} color={Palette.text} />
        </Pressable>
      </View>

      <ThemedText type="small" themeColor="textSecondary">
        Say your secret phrase and ShieldHer triggers an SOS silently — no screen, no sound.
      </ThemedText>

      <View style={styles.body}>
        {VOICE_WORDS.map((word) => (
          <Card key={word.id} style={styles.card}>
            {word.kind === 'safe' ? (
              <Pill variant="success" label="SAFE WORD" />
            ) : (
              <Pill variant="danger" label="DURESS WORD" />
            )}
            <ThemedText type="subtitle">{word.phrase}</ThemedText>
            <View style={styles.metaRow}>
              <Icon name="mic" sf="mic.fill" size={16} color={Palette.textTertiary} />
              <ThemedText type="caption">
                {`${word.durationSec}s · recorded ${relativeTime(word.recordedIso)}`}
              </ThemedText>
            </View>
            <GradientButton variant="ghost" size="sm" title="Re-record" icon="refresh" fullWidth={false} />
          </Card>
        ))}

        <GradientButton title="Record a new phrase" gradient="aiFeature" glow="purple" icon="mic" size="lg" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Palette.background,
    paddingHorizontal: Spacing.four,
    paddingTop: Spacing.three,
  },
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
  body: { gap: Spacing.four, marginTop: Spacing.four },
  card: { gap: Spacing.two },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
});
