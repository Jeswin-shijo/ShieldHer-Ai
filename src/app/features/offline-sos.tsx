import { StyleSheet, View } from 'react-native';

import { AvatarStack } from '@/components/avatar';
import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { Icon, type IoniconName } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { StatusBadge } from '@/components/status-badge';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { TRUSTED_CONTACTS } from '@/data/contacts';
import { OFFLINE_CAPABILITIES, OFFLINE_STATUS } from '@/data/offline';
import { relativeTime } from '@/utils/time';

const CAPABILITY_ICONS: Record<string, IoniconName> = {
  sms: 'chatbox',
  cache: 'people',
  mesh: 'bluetooth',
  siren: 'megaphone',
};

export default function OfflineSosScreen() {
  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="Offline SOS" eyebrow="No internet needed" />

      <View style={styles.sections}>
        <StatusBadge
          variant="offline"
          label="Offline Mode"
          detail={`Last synced ${relativeTime(OFFLINE_STATUS.lastSyncIso)}`}
        />

        <Card glow="warning" style={styles.explainCard}>
          <ThemedText type="small" themeColor="textSecondary">
            Even with no internet, ShieldHer sends an SMS with your last known location to your
            guardians.
          </ThemedText>
          <View style={styles.pillRow}>
            <Pill
              variant="warning"
              icon="cloud-upload"
              label={`${OFFLINE_STATUS.queuedAlerts} alert queued`}
            />
            <Pill
              variant="info"
              icon="bluetooth"
              label={`${OFFLINE_STATUS.meshPeers} mesh peers`}
            />
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Works offline" />
          <Card>
            {OFFLINE_CAPABILITIES.map((c, i) => (
              <ListRow
                key={c.id}
                leadingIcon={CAPABILITY_ICONS[c.id]}
                leadingGradient="brand"
                title={c.label}
                subtitle={c.detail}
                trailing={
                  c.ready ? (
                    <Icon
                      name="checkmark-circle"
                      sf="checkmark.circle.fill"
                      size={20}
                      color={Palette.success}
                    />
                  ) : null
                }
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>

        <View style={styles.section}>
          <SectionHeader title="Cached guardians" eyebrow={`${OFFLINE_STATUS.cachedContacts} stored`} />
          <Card>
            <AvatarStack
              people={TRUSTED_CONTACTS.map((c) => ({ id: c.id, uri: c.avatarUri, name: c.name }))}
              size={40}
              max={5}
            />
          </Card>
        </View>

        <GradientButton
          title="Send offline SOS via SMS"
          gradient="sosArmed"
          glow="danger"
          icon="chatbox-ellipses"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  sections: { gap: Layout.sectionGap },
  section: { gap: Spacing.three },
  explainCard: { gap: Spacing.three },
  pillRow: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one },
  divider: {
    borderTopWidth: 1,
    borderTopColor: Palette.border,
    marginTop: Spacing.two,
    paddingTop: Spacing.two,
  },
});
