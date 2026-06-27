import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { Icon, type IoniconName } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { ListRow } from '@/components/list-row';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { SHARING_CONTACTS } from '@/data/contacts';
import { ACTIVE_SESSION, TRACKING_PINS, TRACKING_ROUTE } from '@/data/tracking';
import { relativeTime } from '@/utils/time';

function Meta({ icon, label }: { icon: IoniconName; label: string }) {
  return (
    <View style={styles.meta}>
      <Icon name={icon} size={15} color={Palette.textTertiary} />
      <ThemedText type="small" themeColor="textSecondary">
        {label}
      </ThemedText>
    </View>
  );
}

export default function TrackingScreen() {
  const [sharing, setSharing] = useState(ACTIVE_SESSION.isLive);

  return (
    <Screen scroll>
      <View style={styles.stack}>
        <View style={styles.headerRow}>
          <View style={styles.flex}>
            <ThemedText type="caption">Location</ThemedText>
            <ThemedText type="title">Live Tracking</ThemedText>
          </View>
          {sharing ? <Pill variant="success" label="LIVE" icon="ellipse" /> : <Pill variant="ghost" label="PAUSED" />}
        </View>

        <MapPlaceholder height={300} pins={TRACKING_PINS} route={TRACKING_ROUTE} />

        <Card>
          <View style={styles.row}>
            <IconChip icon="location" sf="location.fill" gradient="route" size={44} />
            <View style={styles.flex}>
              <ThemedText type="heading">{ACTIVE_SESSION.address}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {ACTIVE_SESSION.area} · ±{ACTIVE_SESSION.accuracyM}m accuracy
              </ThemedText>
            </View>
          </View>
          <View style={styles.metaRow}>
            <Meta icon="battery-half" label={`${ACTIVE_SESSION.battery}%`} />
            <Meta icon="walk" label={`${ACTIVE_SESSION.speedKmh} km/h`} />
            <Meta icon="time" label={relativeTime(ACTIVE_SESSION.updatedIso)} />
          </View>
        </Card>

        <Card>
          <View style={styles.shareRow}>
            <View style={styles.flex}>
              <ThemedText type="heading">Share live location</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                Guardians can follow you in real time
              </ThemedText>
            </View>
            <Switch
              value={sharing}
              onValueChange={setSharing}
              trackColor={{ true: Palette.primary, false: Palette.backgroundSelected }}
              thumbColor="#FFFFFF"
            />
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Who can see you" eyebrow={`${SHARING_CONTACTS.length} watching`} />
          <Card>
            {SHARING_CONTACTS.map((c, i) => (
              <ListRow
                key={c.id}
                leading={<Avatar uri={c.avatarUri} name={c.name} size={40} online={c.online} />}
                title={c.name}
                subtitle={c.relation}
                trailing={<Pill variant="success" label="Viewing" />}
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
  flex: { flex: 1 },
  headerRow: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between' },
  row: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  metaRow: { flexDirection: 'row', gap: Spacing.four, marginTop: Spacing.three },
  meta: { flexDirection: 'row', alignItems: 'center', gap: Spacing.one },
  shareRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  section: { gap: Spacing.three },
  divider: { borderTopWidth: 1, borderTopColor: Palette.border, marginTop: Spacing.two, paddingTop: Spacing.two },
});
