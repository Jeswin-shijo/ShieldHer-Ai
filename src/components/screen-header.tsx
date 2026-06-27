import { type ReactNode } from 'react';
import { Pressable, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon } from '@/components/icon';
import { ThemedText } from '@/components/themed-text';
import { Palette, Radius, Spacing } from '@/constants/theme';
import { goBack } from '@/utils/nav';

type ScreenHeaderProps = {
  title: string;
  eyebrow?: string;
  onBack?: () => void;
  right?: ReactNode;
  style?: StyleProp<ViewStyle>;
};

/** Consistent in-content header (custom, so it looks identical on iOS/Android/web). */
export function ScreenHeader({ title, eyebrow, onBack, right, style }: ScreenHeaderProps) {
  return (
    <View style={[styles.row, style]}>
      <Pressable onPress={onBack ?? goBack} hitSlop={8} style={styles.btn}>
        <Icon name="chevron-back" sf="chevron.backward" size={22} color={Palette.text} />
      </Pressable>
      <View style={styles.titles}>
        {eyebrow ? <ThemedText type="caption">{eyebrow}</ThemedText> : null}
        <ThemedText type="subtitle" numberOfLines={1}>
          {title}
        </ThemedText>
      </View>
      {right ? <View style={styles.right}>{right}</View> : <View style={styles.btn} />}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  btn: {
    width: 40,
    height: 40,
    borderRadius: Radius.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Palette.backgroundElement,
  },
  titles: { flex: 1, gap: 1 },
  right: { minWidth: 40, alignItems: 'flex-end', justifyContent: 'center' },
});
