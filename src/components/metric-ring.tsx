import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Gradients, Palette, type GradientKey } from '@/constants/theme';

type MetricRingProps = {
  value: number;
  max?: number;
  size?: number;
  thickness?: number;
  gradient?: GradientKey;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

/** Gradient "donut" ring with a centered value — used for the Smart Safety Score. */
export function MetricRing({
  value,
  max = 100,
  size = 168,
  thickness = 14,
  gradient = 'route',
  label,
  style,
}: MetricRingProps) {
  const inner = size - thickness * 2;
  return (
    <View style={[styles.center, { width: size, height: size }, style]}>
      <LinearGradient
        colors={Gradients[gradient]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={[styles.center, { width: size, height: size, borderRadius: size / 2 }]}>
        <View style={[styles.center, { width: inner, height: inner, borderRadius: inner / 2, backgroundColor: Palette.surface }]}>
          <ThemedText type="display" style={{ fontSize: size * 0.3, lineHeight: size * 0.34, color: Palette.text }}>
            {value}
          </ThemedText>
          <ThemedText type="caption">{label ?? `/ ${max}`}</ThemedText>
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
