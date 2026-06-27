import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { IconChip } from '@/components/icon-chip';
import { ListRow } from '@/components/list-row';
import { Pill } from '@/components/pill';
import { PulseRing } from '@/components/pulse-ring';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { Waveform } from '@/components/waveform';
import { Glow, Layout, Palette, Spacing } from '@/constants/theme';
import {
  DETECTED_EVENTS,
  LISTENING_FOR,
  SENSITIVITY_OPTIONS,
  type Sensitivity,
} from '@/data/danger-detection';
import { relativeTime } from '@/utils/time';

export default function DangerDetectionScreen() {
  const [listening, setListening] = useState(true);
  const [sensitivity, setSensitivity] = useState<Sensitivity>('high');

  return (
    <Screen scroll bottomTabInset={false}>
      <View style={styles.stack}>
        <ScreenHeader title="AI Danger Detection" eyebrow="AI Engine" />

        <Card glow="purple" style={styles.listenCard}>
          {listening ? (
            <View style={styles.micWrap}>
              <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <View style={styles.center}>
                  <PulseRing size={84} color={Palette.accent} count={3} maxScale={1.7} duration={2400} />
                </View>
              </View>
              <View style={[Glow.purple, styles.micGlow]}>
                <IconChip icon="mic" sf="mic.fill" gradient="aiFeature" size={76} iconSize={36} radius={38} />
              </View>
            </View>
          ) : (
            <IconChip icon="mic-off" sf="mic.slash.fill" gradient="cardElevated" size={76} iconSize={36} radius={38} color={Palette.textTertiary} />
          )}

          <ThemedText type="heading" style={styles.listenText}>
            {listening ? 'Listening for danger sounds…' : 'Detection paused'}
          </ThemedText>

          <Waveform active={listening} height={64} bars={34} style={styles.wave} />

          <View style={styles.chips}>
            {LISTENING_FOR.map((label) => (
              <Pill key={label} variant="ghost" label={label} />
            ))}
          </View>
        </Card>

        <GradientButton
          title={listening ? 'Pause listening' : 'Resume listening'}
          gradient="aiFeature"
          variant={listening ? 'ghost' : 'solid'}
          glow={listening ? undefined : 'purple'}
          icon={listening ? 'pause' : 'play'}
          onPress={() => setListening((v) => !v)}
        />

        <View style={styles.section}>
          <SectionHeader title="Sensitivity" eyebrow="Detection" />
          <Segmented options={SENSITIVITY_OPTIONS} value={sensitivity} onChange={setSensitivity} gradient="aiFeature" />
          <ThemedText type="small" themeColor="textSecondary">
            {sensitivity === 'high'
              ? 'Reacts to the faintest distress sounds. Best for night & solo travel.'
              : sensitivity === 'medium'
                ? 'Balanced detection for everyday use.'
                : 'Only strong, clear danger sounds trigger an alert.'}
          </ThemedText>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Recent detections" eyebrow={`${DETECTED_EVENTS.length} events`} />
          <Card>
            {DETECTED_EVENTS.map((e, i) => (
              <ListRow
                key={e.id}
                leadingIcon={e.icon}
                leadingSf={e.sf}
                leadingGradient="sosButton"
                title={e.label}
                subtitle={relativeTime(e.timeIso)}
                trailing={<Pill variant={e.confidence >= 0.85 ? 'danger' : 'warning'} label={`${Math.round(e.confidence * 100)}%`} />}
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  listenCard: { alignItems: 'center', gap: Spacing.three, paddingVertical: Spacing.four },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  micWrap: { width: 84, height: 84, alignItems: 'center', justifyContent: 'center' },
  micGlow: { borderRadius: 38 },
  listenText: { textAlign: 'center' },
  wave: { alignSelf: 'stretch' },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one, justifyContent: 'center' },
  section: { gap: Spacing.three },
  divider: { borderTopWidth: 1, borderTopColor: Palette.border, marginTop: Spacing.two, paddingTop: Spacing.two },
});
