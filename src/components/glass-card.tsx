import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode } from 'react';
import { Platform, Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Gradients, Palette, Radius, Spacing } from '@/constants/theme';

type GlassCardProps = {
  children: ReactNode;
  onPress?: () => void;
  padding?: number;
  radius?: number;
  intensity?: number;
  style?: StyleProp<ViewStyle>;
};

const useBlur = Platform.OS === 'ios' || Platform.OS === 'web';

/**
 * Frosted glass card. Uses BlurView on iOS/web (true backdrop blur) and degrades
 * to a translucent surface on Android (real Android blur needs the BlurTargetView
 * pattern — overkill for this static UI). A faint brand gradient + hairline stroke
 * give the glassy look on every platform.
 */
export function GlassCard({
  children,
  onPress,
  padding = Spacing.three,
  radius = Radius.card,
  intensity = 40,
  style,
}: GlassCardProps) {
  const body = (
    <View style={[styles.container, { borderRadius: radius }, style]}>
      {useBlur ? (
        <BlurView intensity={intensity} tint="dark" style={StyleSheet.absoluteFill} />
      ) : (
        <View style={[StyleSheet.absoluteFill, styles.androidFill]} />
      )}
      <LinearGradient
        colors={Gradients.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={StyleSheet.absoluteFill}
      />
      <View style={{ padding }}>{children}</View>
    </View>
  );

  if (onPress) {
    return (
      <Pressable onPress={onPress} style={({ pressed }) => (pressed ? styles.pressed : null)}>
        {body}
      </Pressable>
    );
  }
  return body;
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Palette.glassStroke,
  },
  androidFill: { backgroundColor: Palette.backgroundElement },
  pressed: { opacity: 0.92 },
});
