import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IoniconName } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { ThemedText } from '@/components/themed-text';
import { Palette, Spacing, type GradientKey } from '@/constants/theme';

type ListRowProps = {
  title: string;
  subtitle?: string;
  /** Custom leading node (e.g. an Avatar). Takes precedence over leadingIcon. */
  leading?: ReactNode;
  leadingIcon?: IoniconName;
  leadingSf?: string;
  leadingGradient?: GradientKey;
  /** Custom trailing node (e.g. a Switch). Rendered before the chevron. */
  trailing?: ReactNode;
  value?: string;
  showChevron?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export function ListRow({
  title,
  subtitle,
  leading,
  leadingIcon,
  leadingSf,
  leadingGradient = 'brand',
  trailing,
  value,
  showChevron,
  onPress,
  style,
}: ListRowProps) {
  const lead =
    leading ??
    (leadingIcon ? (
      <IconChip icon={leadingIcon} sf={leadingSf} gradient={leadingGradient} size={40} />
    ) : null);

  const body = (
    <View style={[styles.row, style]}>
      {lead}
      <View style={styles.texts}>
        <ThemedText type="heading" numberOfLines={1}>
          {title}
        </ThemedText>
        {subtitle ? (
          <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
            {subtitle}
          </ThemedText>
        ) : null}
      </View>
      {value ? (
        <ThemedText type="smallBold" themeColor="textSecondary">
          {value}
        </ThemedText>
      ) : null}
      {trailing}
      {showChevron ? <Icon name="chevron-forward" size={18} color={Palette.textTertiary} /> : null}
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
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.two,
  },
  texts: { flex: 1, gap: 2 },
  pressed: { opacity: 0.6 },
});
