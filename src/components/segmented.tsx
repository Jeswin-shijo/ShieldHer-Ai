import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { Gradients, Palette, Radius, type GradientKey } from '@/constants/theme';

type Option<T extends string> = { label: string; value: T };

type SegmentedProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  gradient?: GradientKey;
  style?: StyleProp<ViewStyle>;
};

export function Segmented<T extends string>({
  options,
  value,
  onChange,
  gradient = 'brand',
  style,
}: SegmentedProps<T>) {
  return (
    <View style={[styles.wrap, style]}>
      {options.map((o) => {
        const active = o.value === value;
        const label = (
          <ThemedText type="smallBold" style={active ? styles.activeLabel : undefined} themeColor={active ? undefined : 'textSecondary'}>
            {o.label}
          </ThemedText>
        );
        return (
          <Pressable
            key={o.value}
            style={styles.seg}
            onPress={() => {
              Haptics.selectionAsync().catch(() => {});
              onChange(o.value);
            }}>
            {active ? (
              <LinearGradient colors={Gradients[gradient]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.fill}>
                {label}
              </LinearGradient>
            ) : (
              <View style={styles.fill}>{label}</View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: Palette.backgroundElement,
    borderRadius: Radius.pill,
    padding: 4,
    gap: 4,
  },
  seg: { flex: 1 },
  fill: { paddingVertical: 9, borderRadius: Radius.pill, alignItems: 'center', justifyContent: 'center' },
  activeLabel: { color: Palette.textOnPrimary },
});
