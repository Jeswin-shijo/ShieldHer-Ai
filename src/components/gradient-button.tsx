import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IoniconName } from '@/components/icon';
import { ThemedText, type ThemedTextType } from '@/components/themed-text';
import { Glow, Gradients, Palette, Radius, Spacing, type GlowKey, type GradientKey } from '@/constants/theme';

type Size = 'sm' | 'md' | 'lg';
type Variant = 'solid' | 'outline' | 'ghost';

const SIZES: Record<Size, { padV: number; padH: number; font: ThemedTextType; icon: number; radius: number }> = {
  sm: { padV: Spacing.two - 1, padH: Spacing.three, font: 'smallBold', icon: 16, radius: Radius.sm },
  md: { padV: Spacing.three - 2, padH: Spacing.four, font: 'heading', icon: 18, radius: Radius.md },
  lg: { padV: Spacing.three + 1, padH: Spacing.four, font: 'heading', icon: 20, radius: Radius.lg },
};

export type GradientButtonProps = {
  title: string;
  onPress?: () => void;
  gradient?: GradientKey;
  size?: Size;
  variant?: Variant;
  icon?: IoniconName;
  sf?: string;
  glow?: GlowKey;
  disabled?: boolean;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function GradientButton({
  title,
  onPress,
  gradient = 'brand',
  size = 'md',
  variant = 'solid',
  icon,
  sf,
  glow,
  disabled,
  fullWidth = true,
  style,
}: GradientButtonProps) {
  const s = SIZES[size];
  const fg = variant === 'solid' ? Palette.textOnPrimary : Palette.primary;

  const handlePress = () => {
    if (disabled) return;
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium).catch(() => {});
    onPress?.();
  };

  const inner = (
    <View style={[styles.row, { paddingVertical: s.padV, paddingHorizontal: s.padH }]}>
      {icon ? <Icon name={icon} sf={sf} size={s.icon} color={fg} /> : null}
      <ThemedText type={s.font} style={{ color: fg }}>
        {title}
      </ThemedText>
    </View>
  );

  return (
    <View style={[fullWidth && styles.fullWidth, glow && variant === 'solid' ? Glow[glow] : null, style]}>
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        style={({ pressed }) => [
          { borderRadius: s.radius, overflow: 'hidden' },
          disabled && styles.disabled,
          pressed && styles.pressed,
        ]}>
        {variant === 'solid' ? (
          <LinearGradient
            colors={Gradients[gradient]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{ borderRadius: s.radius }}>
            {inner}
          </LinearGradient>
        ) : (
          <View
            style={[
              { borderRadius: s.radius, backgroundColor: variant === 'ghost' ? Palette.backgroundElement : 'transparent' },
              variant === 'outline' && styles.outline,
            ]}>
            {inner}
          </View>
        )}
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.two,
  },
  fullWidth: { alignSelf: 'stretch' },
  outline: { borderWidth: 1.5, borderColor: Palette.primary },
  pressed: { opacity: 0.85, transform: [{ scale: 0.98 }] },
  disabled: { opacity: 0.4 },
});
