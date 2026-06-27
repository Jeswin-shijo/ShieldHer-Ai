import { StyleSheet } from 'react-native';

import { Card } from '@/components/card';
import { Icon, type IoniconName } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Layout, Spacing, type GradientKey } from '@/constants/theme';

type ComingSoonProps = {
  title: string;
  eyebrow?: string;
  note?: string;
  icon?: IoniconName;
  sf?: string;
  gradient?: GradientKey;
  phase?: string;
};

/** Branded placeholder for screens not yet built — replaced as each phase lands. */
export function ComingSoon({
  title,
  eyebrow = 'ShieldHer AI',
  note = 'This screen is part of the build and is coming together.',
  icon = 'construct',
  sf = 'hammer.fill',
  gradient = 'aiFeature',
  phase,
}: ComingSoonProps) {
  return (
    <Screen scroll>
      <SectionHeader title={title} eyebrow={eyebrow} />
      <Card glow="purple" style={styles.card}>
        <IconChip icon={icon} sf={sf} gradient={gradient} size={72} />
        <ThemedText type="heading">Coming together</ThemedText>
        <ThemedText type="small" themeColor="textSecondary" style={styles.note}>
          {note}
        </ThemedText>
        {phase ? (
          <ThemedText type="caption" style={styles.phase}>
            <Icon name="time-outline" size={11} /> {phase}
          </ThemedText>
        ) : null}
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  card: {
    marginTop: Layout.sectionGap,
    alignItems: 'center',
    gap: Spacing.three,
    paddingVertical: Spacing.five,
  },
  note: { textAlign: 'center', maxWidth: 280 },
  phase: { marginTop: Spacing.one },
});
