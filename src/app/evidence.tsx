import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Icon, type IoniconName } from '@/components/icon';
import { RecordingDot } from '@/components/recording-dot';
import { Segmented } from '@/components/segmented';
import { ThemedText } from '@/components/themed-text';
import { Waveform } from '@/components/waveform';
import { Palette, Radius, Spacing } from '@/constants/theme';
import { ACTIVE_SESSION } from '@/data/tracking';
import { formatClock, timeLabel } from '@/utils/time';

const VIEWFINDER = ['#0A0712', '#150C28', '#0A0712'] as const;

type Mode = 'video' | 'audio';
const MODE_OPTIONS: { label: string; value: Mode }[] = [
  { label: 'Video', value: 'video' },
  { label: 'Audio', value: 'audio' },
];

function ControlIcon({ icon, sf }: { icon: IoniconName; sf?: string }) {
  return (
    <View style={styles.controlBtn}>
      <Icon name={icon} sf={sf} size={22} color="#FFFFFF" />
    </View>
  );
}

export default function EvidenceScreen() {
  const insets = useSafeAreaInsets();
  const [recording, setRecording] = useState(true);
  const [mode, setMode] = useState<Mode>('video');
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!recording) return;
    const id = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(id);
  }, [recording]);

  const stop = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
    router.back();
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ presentation: 'fullScreenModal', animation: 'fade' }} />
      <LinearGradient colors={VIEWFINDER} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={StyleSheet.absoluteFill} />

      {/* Viewfinder */}
      <View style={styles.viewfinder}>
        {mode === 'video' ? (
          <>
            <Icon name="person" sf="person.fill" size={120} color="rgba(255,255,255,0.08)" />
            <ThemedText type="caption" style={styles.vfHint}>
              Recording front camera
            </ThemedText>
          </>
        ) : (
          <>
            <Icon name="mic" sf="mic.fill" size={64} color="rgba(255,255,255,0.18)" />
            <Waveform active={recording} height={96} bars={26} style={styles.audioWave} />
          </>
        )}
      </View>

      {/* Top bar */}
      <View style={[styles.topBar, { top: insets.top + Spacing.two }]}>
        <View style={styles.recPill}>
          <RecordingDot />
          <ThemedText type="smallBold" style={styles.recText}>
            {recording ? 'REC' : 'PAUSED'}
          </ThemedText>
          <ThemedText type="code" style={styles.timer}>
            {formatClock(elapsed)}
          </ThemedText>
        </View>
        <Pressable onPress={() => router.back()} hitSlop={8} style={styles.closeBtn}>
          <Icon name="close" sf="xmark" size={22} color="#FFFFFF" />
        </Pressable>
      </View>

      {/* Bottom controls */}
      <View style={[styles.bottom, { paddingBottom: insets.bottom + Spacing.three }]}>
        <View style={styles.lockRow}>
          <Icon name="location" size={13} color={Palette.textSecondary} />
          <ThemedText type="caption" style={styles.lockText}>
            {ACTIVE_SESSION.address} · {timeLabel(ACTIVE_SESSION.updatedIso)} · GPS + time locked
          </ThemedText>
          <Icon name="lock-closed" size={12} color={Palette.success} />
        </View>

        <View style={styles.uploadChip}>
          <Icon name="cloud-upload" sf="icloud.and.arrow.up.fill" size={16} color={Palette.success} />
          <ThemedText type="small" themeColor="textSecondary">
            Auto-uploading to secure cloud
          </ThemedText>
        </View>

        <Segmented options={MODE_OPTIONS} value={mode} onChange={setMode} gradient="sosButton" style={styles.modeToggle} />

        <View style={styles.controls}>
          <ControlIcon icon="camera-reverse" sf="arrow.triangle.2.circlepath.camera.fill" />
          <Pressable onPress={stop} style={styles.stopOuter}>
            <View style={styles.stopInner} />
          </Pressable>
          <Pressable
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              setRecording((v) => !v);
            }}
            style={[styles.controlBtn, !recording && styles.controlOn]}>
            <Icon name={recording ? 'pause' : 'play'} size={22} color={recording ? '#FFFFFF' : Palette.background} />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  viewfinder: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: Spacing.three },
  vfHint: { letterSpacing: 1 },
  audioWave: { alignSelf: 'stretch', marginHorizontal: Spacing.four },

  topBar: {
    position: 'absolute',
    left: Spacing.three,
    right: Spacing.three,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  recPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    backgroundColor: 'rgba(0,0,0,0.45)',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: Radius.pill,
  },
  recText: { color: '#FFFFFF', letterSpacing: 1 },
  timer: { color: '#FFFFFF', fontSize: 14 },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },

  bottom: { paddingHorizontal: Spacing.four, gap: Spacing.three },
  lockRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: Spacing.one },
  lockText: { letterSpacing: 0.3 },
  uploadChip: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    gap: Spacing.two,
    backgroundColor: Palette.backgroundElement,
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.one + 2,
    borderRadius: Radius.pill,
  },
  modeToggle: { alignSelf: 'center', minWidth: 200 },
  controls: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginTop: Spacing.one },
  controlBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  controlOn: { backgroundColor: '#FFFFFF' },
  stopOuter: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 4,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopInner: { width: 30, height: 30, borderRadius: 6, backgroundColor: Palette.danger },
});
