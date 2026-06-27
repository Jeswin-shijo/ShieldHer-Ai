import { Pressable, StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { IconChip } from '@/components/icon-chip';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { type SafetyFeature } from '@/data/features';
import { navigate } from '@/utils/nav';

/** A grid tile linking to one of the 14 safety features. */
export function FeatureTile({ feature }: { feature: SafetyFeature }) {
  return (
    <Pressable style={styles.wrap} onPress={() => navigate(feature.route)}>
      <Card style={styles.card}>
        <View style={styles.top}>
          <IconChip icon={feature.icon} sf={feature.sf} gradient={feature.gradient} size={44} />
          {feature.isNew ? (
            <Pill variant="solid" label="NEW" />
          ) : feature.isPremium ? (
            <Pill variant="warning" label="PRO" />
          ) : null}
        </View>
        <ThemedText type="heading" numberOfLines={1} style={styles.title}>
          {feature.title}
        </ThemedText>
        <ThemedText type="small" themeColor="textSecondary" numberOfLines={2}>
          {feature.subtitle}
        </ThemedText>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  wrap: { width: '48%' },
  card: { gap: Spacing.two, minHeight: 138 },
  top: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  title: { marginTop: Spacing.one },
});
