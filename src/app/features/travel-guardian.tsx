import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { IconChip } from '@/components/icon-chip';
import { ListRow } from '@/components/list-row';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { ACTIVE_TRIP, MODE_ICON, TRIPS } from '@/data/travel';
import { timeLabel } from '@/utils/time';

const activeMode = MODE_ICON[ACTIVE_TRIP.mode];
const upcomingTrips = TRIPS.filter((t) => t.id !== ACTIVE_TRIP.id);

export default function TravelGuardianScreen() {
  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="Travel Guardian" eyebrow="Trips & ETA" />

      <View style={styles.stack}>
        <Card glow="pink" style={styles.hero}>
          <View style={styles.heroTop}>
            <IconChip icon={activeMode.icon} sf={activeMode.sf} gradient="brandSoft" size={48} />
            <View style={styles.heroHeading}>
              <ThemedText type="caption" themeColor="textTertiary">
                Active trip
              </ThemedText>
              <ThemedText type="heading" numberOfLines={2}>
                {`${ACTIVE_TRIP.from}  →  ${ACTIVE_TRIP.to}`}
              </ThemedText>
            </View>
          </View>

          <View style={styles.detailRows}>
            <View style={styles.detailRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Vehicle
              </ThemedText>
              <ThemedText type="code">{ACTIVE_TRIP.vehicleNo ?? '—'}</ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText type="small" themeColor="textSecondary">
                Driver
              </ThemedText>
              <ThemedText type="smallBold">{ACTIVE_TRIP.driver ?? '—'}</ThemedText>
            </View>
            <View style={styles.detailRow}>
              <ThemedText type="small" themeColor="textSecondary">
                ETA
              </ThemedText>
              <ThemedText type="smallBold">{timeLabel(ACTIVE_TRIP.etaIso)}</ThemedText>
            </View>
          </View>

          <Pill
            variant="info"
            icon="time"
            label={`Check-in every ${ACTIVE_TRIP.checkInEveryMin} min`}
          />

          <GradientButton
            title="Share trip with family"
            gradient="brand"
            icon="share-social"
          />
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Upcoming trips" />
          <Card>
            {upcomingTrips.map((t, i) => {
              const mode = MODE_ICON[t.mode];
              return (
                <ListRow
                  key={t.id}
                  leadingIcon={mode.icon}
                  leadingSf={mode.sf}
                  leadingGradient="aiFeature"
                  title={`${t.from}  →  ${t.to}`}
                  subtitle={`Departs ${timeLabel(t.departIso)}`}
                  trailing={
                    t.status === 'done' ? (
                      <Pill variant="success" label="Done" />
                    ) : (
                      <Pill variant="ghost" label="Planned" />
                    )
                  }
                  style={i > 0 ? styles.divider : undefined}
                />
              );
            })}
          </Card>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  hero: { gap: Spacing.three },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  heroHeading: { flex: 1, gap: Spacing.half },
  detailRows: { gap: Spacing.two },
  detailRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  section: { gap: Spacing.three },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
  },
});
