import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { Icon } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { ListRow } from '@/components/list-row';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { POLICE_REPORT } from '@/data/report';
import { relativeTime } from '@/utils/time';

export default function PoliceReportScreen() {
  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="Police Report" eyebrow="Auto-generated" />

      <View style={styles.stack}>
        <Card glow="purple" style={styles.hero}>
          <View style={styles.heroTop}>
            <IconChip icon="document-text" sf="doc.text.fill" gradient="route" size={52} />
            <View style={styles.heroHead}>
              <ThemedText type="caption" themeColor="textTertiary">
                Report
              </ThemedText>
              <ThemedText type="code">{`#${POLICE_REPORT.refNo}`}</ThemedText>
            </View>
            <Pill variant="success" label="Ready" />
          </View>

          <View style={styles.heroMeta}>
            <ThemedText type="small" themeColor="textSecondary">
              {POLICE_REPORT.incidentType}
            </ThemedText>
            <ThemedText type="small" themeColor="textTertiary">
              {POLICE_REPORT.location}
            </ThemedText>
            <ThemedText type="caption" themeColor="textTertiary">
              {`${POLICE_REPORT.pages} pages · generated ${relativeTime(POLICE_REPORT.generatedIso)}`}
            </ThemedText>
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Included sections" />
          <Card>
            {POLICE_REPORT.sections.map((s, i) => (
              <ListRow
                key={s.id}
                leadingIcon={s.icon}
                leadingSf={s.sf}
                leadingGradient="route"
                title={s.title}
                subtitle={s.summary}
                trailing={
                  <Icon
                    name="checkmark-circle"
                    sf="checkmark.circle.fill"
                    size={20}
                    color={Palette.success}
                  />
                }
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>

        <View style={styles.actions}>
          <GradientButton
            title="Export PDF"
            gradient="brand"
            glow="pink"
            icon="download"
          />
          <GradientButton variant="ghost" title="Share with police" icon="share-social" />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  hero: { gap: Spacing.three },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  heroHead: { flex: 1, gap: 2 },
  heroMeta: { gap: Spacing.one },
  section: { gap: Spacing.three },
  actions: { gap: Spacing.two },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
  },
});
