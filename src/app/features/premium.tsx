import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { Icon } from '@/components/icon';
import { ListRow } from '@/components/list-row';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Gradients, Glow, Layout, Palette, Radius, Spacing } from '@/constants/theme';
import { PREMIUM_PERKS, PREMIUM_PLANS } from '@/data/premium';

export default function PremiumScreen() {
  const defaultPlanId = PREMIUM_PLANS.find((p) => p.highlighted)?.id ?? PREMIUM_PLANS[0].id;
  const [selectedPlanId, setSelectedPlanId] = useState(defaultPlanId);

  const selectedPrice = PREMIUM_PLANS.find((p) => p.id === selectedPlanId)?.price ?? '';

  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="ShieldHer Premium" eyebrow="Upgrade" />

      <View style={{ gap: Layout.sectionGap }}>
        <LinearGradient
          colors={Gradients.premium}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.hero}>
          <Icon name="star" sf="crown.fill" size={32} color={Palette.textOnPrimary} />
          <ThemedText type="title" style={styles.heroTitle}>
            Unlock full protection
          </ThemedText>
          <ThemedText type="small" style={styles.heroSubtitle}>
            AI detection, cloud evidence, unlimited guardians &amp; more.
          </ThemedText>
        </LinearGradient>

        <View style={styles.plans}>
          {PREMIUM_PLANS.map((plan) => {
            const selected = plan.id === selectedPlanId;
            return (
              <Card
                key={plan.id}
                onPress={() => setSelectedPlanId(plan.id)}
                glow={selected ? 'pink' : 'none'}
                style={[styles.planCard, selected && styles.planCardSelected]}>
                <View style={styles.planContent}>
                  {plan.highlighted ? <Pill variant="solid" label="BEST VALUE" /> : null}
                  <ThemedText type="heading">{plan.label}</ThemedText>
                  <View style={styles.priceRow}>
                    <ThemedText type="display" style={styles.price}>
                      {plan.price}
                    </ThemedText>
                    <ThemedText type="caption" themeColor="textSecondary">
                      {plan.period}
                    </ThemedText>
                  </View>
                  <ThemedText type="small" themeColor="textSecondary">
                    {plan.note}
                  </ThemedText>
                </View>
              </Card>
            );
          })}
        </View>

        <View style={styles.includedSection}>
          <SectionHeader title="Everything included" />
          <Card padding={Spacing.two}>
            {PREMIUM_PERKS.map((perk, index) => (
              <View key={perk.id}>
                {index > 0 ? <View style={styles.divider} /> : null}
                <ListRow
                  leadingIcon={perk.icon}
                  leadingSf={perk.sf}
                  leadingGradient="premium"
                  title={perk.label}
                  trailing={
                    <Icon
                      name="checkmark-circle"
                      sf="checkmark.circle.fill"
                      size={20}
                      color={Palette.success}
                    />
                  }
                />
              </View>
            ))}
          </Card>
        </View>

        <GradientButton
          size="lg"
          gradient="premium"
          glow="pink"
          icon="sparkles"
          title={`Start free trial · ${selectedPrice}`}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: Radius.card,
    padding: Spacing.four,
    gap: Spacing.two,
    ...Glow.pink,
  },
  heroTitle: {
    color: Palette.textOnPrimary,
  },
  heroSubtitle: {
    color: 'rgba(255,255,255,0.85)',
  },
  plans: {
    flexDirection: 'row',
    gap: Spacing.three,
  },
  planCard: {
    flex: 1,
  },
  planCardSelected: {
    borderColor: Palette.borderStrong,
  },
  planContent: {
    gap: Spacing.one,
    alignItems: 'flex-start',
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: Spacing.half,
  },
  price: {
    fontSize: 28,
    lineHeight: 34,
  },
  includedSection: {
    gap: Spacing.three,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: Palette.border,
    marginVertical: Spacing.one,
  },
});
