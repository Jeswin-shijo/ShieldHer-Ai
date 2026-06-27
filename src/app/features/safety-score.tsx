import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { ListRow } from '@/components/list-row';
import { MetricRing } from '@/components/metric-ring';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { SAFETY_SCORE } from '@/data/safety-score';

const ringGradient =
  SAFETY_SCORE.score >= 80 ? 'success' : SAFETY_SCORE.score >= 50 ? 'route' : 'sosArmed';

export default function SafetyScoreScreen() {
  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="Safety Score" eyebrow="Area insight" />

      <View style={styles.stack}>
        <View style={styles.hero}>
          <MetricRing value={SAFETY_SCORE.score} max={SAFETY_SCORE.max} size={180} gradient={ringGradient} />
          <ThemedText type="title" style={styles.tierLabel}>
            {SAFETY_SCORE.tierLabel}
          </ThemedText>
          <ThemedText type="small" themeColor="textSecondary">
            {SAFETY_SCORE.areaName}
          </ThemedText>
          <Pill
            variant="success"
            icon="trending-up"
            sf="chart.line.uptrend.xyaxis"
            label={`+${SAFETY_SCORE.trend} this week`}
          />
        </View>

        <View style={styles.section}>
          <SectionHeader title="What affects your score" />
          <Card>
            {SAFETY_SCORE.factors.map((f, i) => (
              <ListRow
                key={f.id}
                leadingIcon={f.icon}
                leadingSf={f.sf}
                leadingGradient="route"
                title={f.label}
                subtitle={f.tip}
                value={`${f.points}/${f.max}`}
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  hero: { alignItems: 'center', gap: Spacing.two },
  tierLabel: { textAlign: 'center' },
  section: { gap: Spacing.three },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
  },
});
