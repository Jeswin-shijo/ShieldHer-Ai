import { useEffect } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

// Waveform spectrum stops: pink → violet → cyan (matches Gradients.waveform).
const STOPS = [
  [255, 45, 120],
  [161, 43, 255],
  [34, 211, 238],
];

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}
function hex2(n: number) {
  return n.toString(16).padStart(2, '0');
}
/** Interpolate a single bar color across the spectrum (t: 0 → 1, left → right). */
function barColor(t: number) {
  const seg = t * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(seg));
  const f = seg - i;
  const a = STOPS[i];
  const b = STOPS[i + 1];
  return `#${hex2(lerp(a[0], b[0], f))}${hex2(lerp(a[1], b[1], f))}${hex2(lerp(a[2], b[2], f))}`;
}

function Bar({ index, bars, height, active }: { index: number; bars: number; height: number; active: boolean }) {
  // Hump shape across the row so the middle bars are tallest.
  const peak = 0.3 + 0.7 * Math.sin((index / Math.max(1, bars - 1)) * Math.PI);
  const minH = 0.16;
  const v = useSharedValue(minH);

  useEffect(() => {
    if (active) {
      v.value = withRepeat(
        withTiming(peak, { duration: 420 + (index % 6) * 110, reduceMotion: ReduceMotion.System }),
        -1,
        true,
      );
    } else {
      v.value = withTiming(peak * 0.45, { duration: 300 });
    }
  }, [active, v, peak, index]);

  const style = useAnimatedStyle(() => ({ height: Math.max(minH, v.value) * height }));

  return (
    <Animated.View
      style={[styles.bar, { backgroundColor: barColor(index / Math.max(1, bars - 1)) }, style]}
    />
  );
}

type WaveformProps = {
  bars?: number;
  height?: number;
  active?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Animated audio bars for the "Listening for danger sounds" state. */
export function Waveform({ bars = 32, height = 72, active = true, style }: WaveformProps) {
  return (
    <View style={[styles.row, { height }, style]}>
      {Array.from({ length: bars }).map((_, i) => (
        <Bar key={i} index={i} bars={bars} height={height} active={active} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 3 },
  bar: { width: 4, borderRadius: 2 },
});
