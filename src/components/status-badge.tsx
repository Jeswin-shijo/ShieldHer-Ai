import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IoniconName } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { ThemedText } from '@/components/themed-text';
import { Glow, Palette, Radius, Spacing, type GlowKey, type GradientKey } from '@/constants/theme';

export type StatusVariant = 'protected' | 'scanning' | 'alert' | 'offline';

const STATUS: Record<
  StatusVariant,
  { gradient: GradientKey; glow: GlowKey; icon: IoniconName; sf: string; border: string; accent: string }
> = {
  protected: { gradient: 'success', glow: 'success', icon: 'shield-checkmark', sf: 'checkmark.shield.fill', border: 'rgba(43,232,154,0.35)', accent: Palette.success },
  scanning: { gradient: 'aiFeature', glow: 'purple', icon: 'pulse', sf: 'waveform', border: 'rgba(123,47,247,0.35)', accent: Palette.accentCyan },
  alert: { gradient: 'sosArmed', glow: 'danger', icon: 'warning', sf: 'exclamationmark.triangle.fill', border: 'rgba(255,31,75,0.40)', accent: Palette.danger },
  offline: { gradient: 'cardElevated', glow: 'warning', icon: 'cloud-offline', sf: 'wifi.slash', border: 'rgba(255,176,32,0.30)', accent: Palette.warning },
};

type StatusBadgeProps = {
  variant?: StatusVariant;
  label: string;
  detail?: string;
  style?: StyleProp<ViewStyle>;
};

export function StatusBadge({ variant = 'protected', label, detail, style }: StatusBadgeProps) {
  const v = STATUS[variant];
  return (
    <View style={[styles.wrap, { borderColor: v.border }, Glow[v.glow], style]}>
      <IconChip icon={v.icon} sf={v.sf} gradient={v.gradient} size={44} />
      <View style={styles.texts}>
        <ThemedText type="heading">{label}</ThemedText>
        {detail ? (
          <ThemedText type="small" themeColor="textSecondary">
            {detail}
          </ThemedText>
        ) : null}
      </View>
      <Icon name="ellipse" size={10} color={v.accent} style={styles.dot} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.two + 2,
    paddingRight: Spacing.three,
    borderRadius: Radius.lg,
    borderWidth: 1,
    backgroundColor: Palette.backgroundElement,
  },
  texts: { flex: 1, gap: 2 },
  dot: { opacity: 0.9 },
});
