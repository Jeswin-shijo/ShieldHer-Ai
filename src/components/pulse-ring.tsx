import { useEffect } from 'react';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import Animated, {
  Easing,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { Palette } from '@/constants/theme';

function Ring({
  size,
  color,
  delay,
  duration,
  maxScale,
}: {
  size: number;
  color: string;
  delay: number;
  duration: number;
  maxScale: number;
}) {
  const p = useSharedValue(0);
  useEffect(() => {
    p.value = withDelay(
      delay,
      withRepeat(
        withTiming(1, { duration, easing: Easing.out(Easing.ease), reduceMotion: ReduceMotion.System }),
        -1,
        false,
      ),
    );
  }, [p, delay, duration]);

  const style = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + p.value * (maxScale - 1) }],
    opacity: 0.45 * (1 - p.value),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.ring, { width: size, height: size, borderRadius: size / 2, borderColor: color }, style]}
    />
  );
}

type PulseRingProps = {
  size?: number;
  color?: string;
  count?: number;
  duration?: number;
  maxScale?: number;
  style?: StyleProp<ViewStyle>;
};

/** Concentric rings that expand and fade outward forever — for SOS, "live" dots, listening states. */
export function PulseRing({
  size = 120,
  color = Palette.primary,
  count = 3,
  duration = 2400,
  maxScale = 2,
  style,
}: PulseRingProps) {
  return (
    <View pointerEvents="none" style={[styles.center, { width: size, height: size }, style]}>
      {Array.from({ length: count }).map((_, i) => (
        <Ring key={i} size={size} color={color} delay={(duration / count) * i} duration={duration} maxScale={maxScale} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', borderWidth: 2 },
});
