import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Glow, Gradients, Palette, Radius, Spacing, type GlowKey } from '@/constants/theme';

type CardProps = {
  children: ReactNode;
  onPress?: () => void;
  padding?: number;
  radius?: number;
  glow?: GlowKey;
  bordered?: boolean;
  style?: StyleProp<ViewStyle>;
};

/** Opaque raised card (gradient fill, no blur) — the default container for dense content. */
export function Card({
  children,
  onPress,
  padding = Spacing.three,
  radius = Radius.card,
  glow,
  bordered = true,
  style,
}: CardProps) {
  const card = (
    <LinearGradient
      colors={Gradients.cardElevated}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={[{ borderRadius: radius, padding }, bordered && styles.bordered, glow ? Glow[glow] : null, style]}>
      {children}
    </LinearGradient>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : null)}>
        {card}
      </Pressable>
    );
  }
  return <View>{card}</View>;
}

const styles = StyleSheet.create({
  bordered: { borderWidth: 1, borderColor: Palette.border },
  pressed: { opacity: 0.9, transform: [{ scale: 0.99 }] },
});
