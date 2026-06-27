import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar, AvatarStack } from '@/components/avatar';
import { Card } from '@/components/card';
import { IconChip } from '@/components/icon-chip';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { SosButton } from '@/components/sos-button';
import { StatusBadge } from '@/components/status-badge';
import { ThemedText } from '@/components/themed-text';
import { Gradients, Layout, Palette, Radius, Spacing } from '@/constants/theme';
import { SHARING_CONTACTS } from '@/data/contacts';
import { QUICK_ACTIONS } from '@/data/quick-actions';
import { SAFETY_SCORE } from '@/data/safety-score';
import { PROTECTION_STATUS } from '@/data/status';
import { CURRENT_USER } from '@/data/user';
import { navigate } from '@/utils/nav';

function greeting() {
  const h = new Date().getHours();
  if (h < 12) return 'Good morning';
  if (h < 17) return 'Good afternoon';
  return 'Good evening';
}

export default function HomeScreen() {
  const firstName = CURRENT_USER.name.split(' ')[0];

  return (
    <Screen scroll>
      <View style={styles.stack}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.brand}>
            <IconChip icon="shield-checkmark" sf="checkmark.shield.fill" gradient="brand" size={40} radius={Radius.md} />
            <View>
              <ThemedText type="caption">{greeting()}</ThemedText>
              <ThemedText type="heading">{firstName}</ThemedText>
            </View>
          </View>
          <Pressable onPress={() => navigate('/profile')} hitSlop={8}>
            <Avatar uri={CURRENT_USER.avatarUri} name={CURRENT_USER.name} size={44} ring ringGradient="brand" />
          </Pressable>
        </View>

        {/* Protection status */}
        <StatusBadge variant="protected" label={PROTECTION_STATUS.label} detail={PROTECTION_STATUS.detail} />

        {/* SOS hero */}
        <View style={styles.hero}>
          <SosButton onPress={() => navigate('/sos')} />
          <ThemedText type="small" themeColor="textSecondary" style={styles.heroText}>
            Press SOS to instantly alert your guardians and nearby police.
          </ThemedText>
        </View>

        {/* Quick actions */}
        <View style={styles.section}>
          <SectionHeader title="Quick Actions" />
          <View style={styles.actionsRow}>
            {QUICK_ACTIONS.map((a) => (
              <Pressable key={a.key} style={styles.action} onPress={() => navigate(a.route)}>
                <IconChip icon={a.icon} sf={a.sf} gradient={a.gradient} size={56} />
                <ThemedText type="smallBold" style={styles.actionLabel} numberOfLines={1} adjustsFontSizeToFit>
                  {a.label}
                </ThemedText>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Sharing live */}
        <Card>
          <View style={styles.shareTop}>
            <View style={styles.flex}>
              <ThemedText type="heading">Sharing live location</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {SHARING_CONTACTS.length} guardians can see you
              </ThemedText>
            </View>
            <Pill variant="success" label="LIVE" icon="ellipse" />
          </View>
          <View style={styles.shareBottom}>
            <AvatarStack
              people={SHARING_CONTACTS.map((c) => ({ id: c.id, uri: c.avatarUri, name: c.name }))}
              size={40}
              max={4}
            />
            <Pressable onPress={() => navigate('/profile')} hitSlop={8}>
              <ThemedText type="linkPrimary">Manage</ThemedText>
            </Pressable>
          </View>
        </Card>

        {/* Smart safety score */}
        <Card>
          <View style={styles.scoreRow}>
            <LinearGradient colors={Gradients.route} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.scoreBadge}>
              <ThemedText type="subtitle" style={styles.scoreNum}>
                {SAFETY_SCORE.score}
              </ThemedText>
            </LinearGradient>
            <View style={styles.flex}>
              <ThemedText type="heading">Smart Safety Score</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {SAFETY_SCORE.tierLabel} · {SAFETY_SCORE.areaName}
              </ThemedText>
            </View>
            <Pill variant="success" label={`+${SAFETY_SCORE.trend}`} icon="trending-up" />
          </View>
        </Card>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  flex: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  hero: { alignItems: 'center', gap: Spacing.two, paddingVertical: Spacing.two },
  heroText: { textAlign: 'center', maxWidth: 280 },
  section: { gap: Spacing.three },
  actionsRow: { flexDirection: 'row', justifyContent: 'space-between', gap: Spacing.two },
  action: { flex: 1, alignItems: 'center', gap: Spacing.one },
  actionLabel: { fontSize: 12, textAlign: 'center' },
  shareTop: { flexDirection: 'row', alignItems: 'flex-start', gap: Spacing.two },
  shareBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: Spacing.three,
  },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  scoreBadge: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  scoreNum: { color: Palette.textOnPrimary },
});
