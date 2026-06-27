import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Card } from '@/components/card';
import { Icon, type IoniconName } from '@/components/icon';
import { IconChip } from '@/components/icon-chip';
import { ListRow } from '@/components/list-row';
import { MetricRing } from '@/components/metric-ring';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Glow, Gradients, Layout, Palette, Radius, Spacing, type GradientKey } from '@/constants/theme';
import { TRUSTED_CONTACTS } from '@/data/contacts';
import { TAGLINE, TARGET_USERS, VALUE_PROPS } from '@/data/onboarding';
import { SAFETY_SCORE } from '@/data/safety-score';
import { CURRENT_USER } from '@/data/user';
import { navigate } from '@/utils/nav';

type Setting = {
  key: string;
  title: string;
  subtitle: string;
  icon: IoniconName;
  sf: string;
  gradient: GradientKey;
  route: string;
};

const SETTINGS: Setting[] = [
  { key: 'contacts', title: 'Trusted guardians', subtitle: `${TRUSTED_CONTACTS.length} contacts`, icon: 'people', sf: 'person.2.fill', gradient: 'brand', route: '/features/family-tracking' },
  { key: 'secret', title: 'Secret SOS triggers', subtitle: 'Power, volume & shake', icon: 'flash', sf: 'bolt.fill', gradient: 'brandSoft', route: '/features/secret-sos' },
  { key: 'voice', title: 'Voice password', subtitle: 'Safe & duress phrases', icon: 'mic', sf: 'mic.fill', gradient: 'aiFeature', route: '/voice-password' },
  { key: 'detection', title: 'AI danger detection', subtitle: 'Sensitivity & sounds', icon: 'pulse', sf: 'waveform', gradient: 'aiFeature', route: '/features/danger-detection' },
  { key: 'offline', title: 'Offline SOS', subtitle: 'SMS fallback & mesh relay', icon: 'cloud-offline', sf: 'wifi.slash', gradient: 'brand', route: '/features/offline-sos' },
  { key: 'intro', title: 'How ShieldHer works', subtitle: 'Replay the intro', icon: 'play-circle', sf: 'play.circle.fill', gradient: 'route', route: '/onboarding' },
];

function memberSince() {
  return new Date(CURRENT_USER.memberSinceIso).toLocaleDateString(undefined, { month: 'short', year: 'numeric' });
}

export default function ProfileScreen() {
  return (
    <Screen scroll>
      <View style={styles.stack}>
        <View>
          <ThemedText type="caption">You</ThemedText>
          <ThemedText type="title">Profile</ThemedText>
        </View>

        {/* User card */}
        <Card>
          <View style={styles.userRow}>
            <Avatar uri={CURRENT_USER.avatarUri} name={CURRENT_USER.name} size={64} ring ringGradient="brand" />
            <View style={styles.flex}>
              <ThemedText type="heading">{CURRENT_USER.name}</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {CURRENT_USER.phone}
              </ThemedText>
              <ThemedText type="caption">Member since {memberSince()}</ThemedText>
            </View>
            <Pill variant={CURRENT_USER.isPremium ? 'warning' : 'ghost'} label={CURRENT_USER.isPremium ? 'PRO' : 'Free'} />
          </View>
        </Card>

        {/* Safety score summary */}
        <Card onPress={() => navigate('/features/safety-score')}>
          <View style={styles.scoreRow}>
            <MetricRing value={SAFETY_SCORE.score} max={SAFETY_SCORE.max} size={76} thickness={8} gradient="success" />
            <View style={styles.flex}>
              <ThemedText type="heading">Smart Safety Score</ThemedText>
              <ThemedText type="small" themeColor="textSecondary">
                {SAFETY_SCORE.tierLabel} · {SAFETY_SCORE.areaName}
              </ThemedText>
            </View>
            <Icon name="chevron-forward" size={18} color={Palette.textTertiary} />
          </View>
        </Card>

        {/* Premium CTA */}
        {!CURRENT_USER.isPremium ? (
          <Pressable onPress={() => navigate('/features/premium')}>
            <LinearGradient colors={Gradients.premium} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.premium, Glow.pink]}>
              <Icon name="star" sf="crown.fill" size={28} color={Palette.textOnPrimary} />
              <View style={styles.flex}>
                <ThemedText type="heading" style={styles.onPrimary}>
                  Upgrade to Premium
                </ThemedText>
                <ThemedText type="small" style={styles.onPrimaryDim}>
                  Rs. 99/mo · AI detection, cloud evidence & more
                </ThemedText>
              </View>
              <Icon name="chevron-forward" size={20} color={Palette.textOnPrimary} />
            </LinearGradient>
          </Pressable>
        ) : null}

        {/* Settings */}
        <View style={styles.section}>
          <SectionHeader title="Safety settings" />
          <Card>
            {SETTINGS.map((s, i) => (
              <ListRow
                key={s.key}
                leadingIcon={s.icon}
                leadingSf={s.sf}
                leadingGradient={s.gradient}
                title={s.title}
                subtitle={s.subtitle}
                showChevron
                onPress={() => navigate(s.route)}
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>

        {/* Why ShieldHer */}
        <View style={styles.section}>
          <SectionHeader title="Why ShieldHer" />
          <Card>
            {VALUE_PROPS.map((v, i) => (
              <View key={v.id} style={[styles.valueRow, i > 0 && styles.divider]}>
                <IconChip icon={v.icon} sf={v.sf} gradient="aiFeature" size={32} iconSize={16} />
                <ThemedText type="small" style={styles.flex}>
                  {v.label}
                </ThemedText>
              </View>
            ))}
          </Card>
        </View>

        {/* Made for */}
        <View style={styles.section}>
          <SectionHeader title="Made for" />
          <View style={styles.chips}>
            {TARGET_USERS.map((t) => (
              <Pill key={t.id} variant="ghost" icon={t.icon} sf={t.sf} label={t.label} />
            ))}
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <ThemedText type="caption" style={styles.tagline}>
            {TAGLINE}
          </ThemedText>
          <ThemedText type="caption" themeColor="textTertiary">
            ShieldHer AI · v1.0.0
          </ThemedText>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  flex: { flex: 1 },
  userRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  scoreRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  premium: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.card,
  },
  onPrimary: { color: Palette.textOnPrimary },
  onPrimaryDim: { color: 'rgba(255,255,255,0.85)' },
  section: { gap: Spacing.three },
  divider: { borderTopWidth: 1, borderTopColor: Palette.border, marginTop: Spacing.two, paddingTop: Spacing.two },
  valueRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  footer: { alignItems: 'center', gap: Spacing.one, paddingTop: Spacing.two },
  tagline: { color: Palette.primary, letterSpacing: 1 },
});
