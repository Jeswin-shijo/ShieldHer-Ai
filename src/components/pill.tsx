import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IoniconName } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Palette, Radius, Spacing } from '@/constants/theme';

export type PillVariant = 'solid' | 'outline' | 'success' | 'danger' | 'warning' | 'info' | 'ghost';

const MAP: Record<PillVariant, { bg: string; fg: string; border?: string }> = {
  solid: { bg: Palette.primary, fg: Palette.textOnPrimary },
  success: { bg: 'rgba(43,232,154,0.16)', fg: Palette.success },
  danger: { bg: 'rgba(255,31,75,0.16)', fg: Palette.danger },
  warning: { bg: 'rgba(255,176,32,0.16)', fg: Palette.warning },
  info: { bg: 'rgba(91,141,239,0.16)', fg: Palette.info },
  outline: { bg: 'transparent', fg: Palette.textSecondary, border: Palette.border },
  ghost: { bg: Palette.backgroundSelected, fg: Palette.textSecondary },
};

type PillProps = {
  label: string;
  variant?: PillVariant;
  icon?: IoniconName;
  sf?: string;
  style?: StyleProp<ViewStyle>;
};

export function Pill({ label, variant = 'solid', icon, sf, style }: PillProps) {
  const c = MAP[variant];
  return (
    <View
      style={[
        styles.pill,
        { backgroundColor: c.bg, borderColor: c.border ?? 'transparent', borderWidth: c.border ? 1 : 0 },
        style,
      ]}>
      {icon ? <Icon name={icon} sf={sf} size={12} color={c.fg} /> : null}
      <ThemedText type="caption" style={{ color: c.fg, letterSpacing: 0.4 }}>
        {label}
      </ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: Spacing.two,
    paddingVertical: 3,
    borderRadius: Radius.pill,
    alignSelf: 'flex-start',
  },
});
