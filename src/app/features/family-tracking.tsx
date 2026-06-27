import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { ListRow } from '@/components/list-row';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Pill, type PillVariant } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { FAMILY, FAMILY_PINS, type FamilyMember } from '@/data/family';
import { relativeTime } from '@/utils/time';

function statusPill(m: FamilyMember): { variant: PillVariant; label: string } {
  switch (m.status) {
    case 'safe':
      return { variant: 'success', label: 'Safe' };
    case 'moving':
      return { variant: 'info', label: 'Moving' };
    case 'alert':
      return { variant: 'danger', label: `${m.battery}% battery` };
  }
}

export default function FamilyTrackingScreen() {
  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="Family Tracking" eyebrow="Loved ones" />

      <View style={styles.stack}>
        <MapPlaceholder height={240} pins={FAMILY_PINS} />

        <View style={styles.section}>
          <SectionHeader title="Family" eyebrow={`${FAMILY.length} members`} />
          <Card>
            {FAMILY.map((m, i) => {
              const status = statusPill(m);
              return (
                <ListRow
                  key={m.id}
                  leading={<Avatar uri={m.avatarUri} name={m.name} size={44} online={m.status !== 'alert'} />}
                  title={m.name}
                  subtitle={`${m.relation} · ${m.place}`}
                  value={relativeTime(m.lastSeenIso)}
                  trailing={<Pill variant={status.variant} label={status.label} />}
                  style={i > 0 ? styles.divider : undefined}
                />
              );
            })}
          </Card>
        </View>

        <GradientButton variant="ghost" title="Add a family member" icon="person-add" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  section: { gap: Spacing.three },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
  },
});
