import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Card } from '@/components/card';
import { GradientButton } from '@/components/gradient-button';
import { MapPlaceholder } from '@/components/map-placeholder';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { ROUTE_LEGEND, ROUTE_PATH, ROUTE_PINS, SAFE_ROUTES } from '@/data/safe-route';

const CROWD_LABEL: Record<'high' | 'medium' | 'low', string> = {
  high: 'Busy',
  medium: 'Moderate',
  low: 'Quiet',
};

export default function SafeRouteScreen() {
  const recommendedId = SAFE_ROUTES.find((r) => r.recommended)?.id ?? SAFE_ROUTES[0].id;
  const [selectedId, setSelectedId] = useState(recommendedId);

  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="AI Safe Route" eyebrow="Smart routing" />

      <View style={styles.stack}>
        <View style={styles.mapSection}>
          <MapPlaceholder height={240} pins={ROUTE_PINS} route={ROUTE_PATH} routeColor={Palette.success} />
          <View style={styles.legend}>
            {ROUTE_LEGEND.map((item) => (
              <View key={item.id} style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <ThemedText type="small" themeColor="textSecondary">
                  {item.label}
                </ThemedText>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.routesSection}>
          <SectionHeader title="Routes to Home" eyebrow={`${SAFE_ROUTES.length} options`} />
          {SAFE_ROUTES.map((route) => {
            const selected = route.id === selectedId;
            const scoreVariant =
              route.safetyScore >= 80 ? 'success' : route.safetyScore >= 50 ? 'warning' : 'danger';
            const meta = `${route.etaMin} min · ${route.distanceKm.toFixed(1)} km · ${CROWD_LABEL[route.crowd]}`;

            return (
              <Card
                key={route.id}
                onPress={() => setSelectedId(route.id)}
                glow={selected ? 'success' : undefined}
                style={selected ? styles.selectedCard : undefined}>
                <View style={styles.routeContent}>
                  <View style={styles.routeTop}>
                    <ThemedText type="heading" style={styles.routeLabel} numberOfLines={1}>
                      {route.label}
                    </ThemedText>
                    <Pill variant={scoreVariant} label={String(route.safetyScore)} />
                  </View>

                  <ThemedText type="small" themeColor="textSecondary">
                    {meta}
                  </ThemedText>

                  {(route.recommended || !route.lit) && (
                    <View style={styles.routeTags}>
                      {route.recommended && (
                        <Pill variant="success" label="Recommended" icon="shield-checkmark" />
                      )}
                      {!route.lit && <Pill variant="warning" label="Poorly lit" />}
                    </View>
                  )}
                </View>
              </Card>
            );
          })}
        </View>

        <GradientButton title="Start navigation" gradient="route" glow="cyan" icon="navigate" />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  mapSection: { gap: Spacing.three },
  legend: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.three },
  legendItem: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  legendDot: { width: 8, height: 8, borderRadius: 4 },
  routesSection: { gap: Spacing.three },
  selectedCard: { borderColor: Palette.borderStrong },
  routeContent: { gap: Spacing.two },
  routeTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: Spacing.two },
  routeLabel: { flexShrink: 1 },
  routeTags: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.one, marginTop: Spacing.half },
});
