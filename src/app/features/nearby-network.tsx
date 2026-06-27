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
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Radius, Spacing } from '@/constants/theme';
import { COMMUNITY_FEED, NEARBY_MEMBERS, NETWORK_PINS, type CommunityPost } from '@/data/network';
import { relativeTime } from '@/utils/time';

const KIND_VARIANT: Record<CommunityPost['kind'], PillVariant> = {
  alert: 'danger',
  tip: 'info',
  'walk-with-me': 'success',
};

const KIND_LABEL: Record<CommunityPost['kind'], string> = {
  alert: 'Alert',
  tip: 'Tip',
  'walk-with-me': 'Walk with me',
};

export default function NearbyNetworkScreen() {
  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="Nearby Women" eyebrow="Community · 500m" />

      <View style={styles.stack}>
        <View style={styles.mapWrap}>
          <MapPlaceholder height={220} pins={NETWORK_PINS} />
        </View>

        <GradientButton
          title="Broadcast: I need help"
          gradient="sosArmed"
          glow="danger"
          icon="megaphone"
        />

        <View style={styles.section}>
          <SectionHeader title="Verified women nearby" eyebrow={`${NEARBY_MEMBERS.length} online`} />
          <Card>
            {NEARBY_MEMBERS.map((m, i) => (
              <ListRow
                key={m.id}
                leading={
                  <View style={styles.leadCol}>
                    <Avatar uri={m.avatarUri} name={m.name} size={40} online={m.status === 'available'} />
                    {m.verified ? <Pill variant="info" label="Verified" icon="checkmark-circle" /> : null}
                  </View>
                }
                title={m.name}
                subtitle={`${m.distanceM}m away · ${m.status}`}
                trailing={
                  <GradientButton
                    title="Walk"
                    icon="walk"
                    size="sm"
                    fullWidth={false}
                    onPress={() => {}}
                  />
                }
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Community feed" />
          {COMMUNITY_FEED.map((post) => (
            <Card key={post.id} style={styles.post}>
              <View style={styles.postTop}>
                <Pill variant={KIND_VARIANT[post.kind]} label={KIND_LABEL[post.kind]} />
                <ThemedText type="caption" themeColor="textTertiary">
                  {relativeTime(post.timeIso)}
                </ThemedText>
              </View>
              <ThemedText type="small" themeColor="textSecondary">
                {`${post.author} · ${post.area}`}
              </ThemedText>
              <ThemedText>{post.body}</ThemedText>
            </Card>
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  mapWrap: { borderRadius: Radius.card, overflow: 'hidden' },
  section: { gap: Spacing.three },
  leadCol: { alignItems: 'center', gap: Spacing.one },
  divider: { borderTopWidth: 1, borderTopColor: Palette.border, marginTop: Spacing.two, paddingTop: Spacing.two },
  post: { gap: Spacing.two },
  postTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.two },
});
