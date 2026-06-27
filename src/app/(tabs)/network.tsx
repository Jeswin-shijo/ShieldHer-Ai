import { StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { ListRow } from '@/components/list-row';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Pill, type PillVariant } from '@/components/pill';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { FAMILY } from '@/data/family';
import { COMMUNITY_FEED, NEARBY_MEMBERS, NETWORK_PINS } from '@/data/network';
import { navigate } from '@/utils/nav';
import { relativeTime } from '@/utils/time';

const KIND_VARIANT: Record<'alert' | 'tip' | 'walk-with-me', PillVariant> = {
  alert: 'danger',
  tip: 'info',
  'walk-with-me': 'success',
};

export default function NetworkScreen() {
  return (
    <Screen scroll>
      <View style={styles.stack}>
        <View>
          <ThemedText type="caption">Community</ThemedText>
          <ThemedText type="title">Network</ThemedText>
        </View>

        <MapPlaceholder height={220} pins={NETWORK_PINS} />

        <GradientButton
          title="Broadcast: I need help"
          gradient="sosArmed"
          glow="danger"
          icon="megaphone"
          onPress={() => navigate('/features/nearby-network')}
        />

        <View style={styles.section}>
          <SectionHeader
            title="Women nearby"
            eyebrow={`${NEARBY_MEMBERS.length} online`}
            actionLabel="See all"
            onAction={() => navigate('/features/nearby-network')}
          />
          <Card>
            {NEARBY_MEMBERS.slice(0, 3).map((m, i) => (
              <ListRow
                key={m.id}
                leading={<Avatar uri={m.avatarUri} name={m.name} size={40} online={m.status === 'available'} />}
                title={m.name}
                subtitle={`${m.distanceM}m away`}
                trailing={<Pill variant="info" label="Walk" icon="walk" />}
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader
            title="Family"
            eyebrow={`${FAMILY.length} members`}
            actionLabel="See all"
            onAction={() => navigate('/features/family-tracking')}
          />
          <Card>
            {FAMILY.slice(0, 3).map((m, i) => (
              <ListRow
                key={m.id}
                leading={<Avatar uri={m.avatarUri} name={m.name} size={40} online={m.status !== 'alert'} />}
                title={m.name}
                subtitle={m.place}
                value={relativeTime(m.lastSeenIso)}
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Community feed" actionLabel="See all" onAction={() => navigate('/features/nearby-network')} />
          {COMMUNITY_FEED.slice(0, 2).map((p) => (
            <Card key={p.id} style={styles.post}>
              <View style={styles.postTop}>
                <Pill variant={KIND_VARIANT[p.kind]} label={p.kind} />
                <ThemedText type="caption">{relativeTime(p.timeIso)}</ThemedText>
              </View>
              <ThemedText type="small" themeColor="textSecondary">{`${p.author} · ${p.area}`}</ThemedText>
              <ThemedText type="default">{p.body}</ThemedText>
            </Card>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  section: { gap: Spacing.three },
  divider: { borderTopWidth: 1, borderTopColor: Palette.border, marginTop: Spacing.two, paddingTop: Spacing.two },
  post: { gap: Spacing.two },
  postTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
});
