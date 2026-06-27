import { useState } from 'react';
import { StyleSheet, Switch, View } from 'react-native';

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
import { TRIGGERS } from '@/data/secret-sos';

export default function SecretSosScreen() {
  const [enabled, setEnabled] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(TRIGGERS.map((t) => [t.id, t.enabled])),
  );

  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="Secret SOS" eyebrow="Stealth triggers" />

      <View style={styles.stack}>
        <Card glow="purple">
          <View style={styles.intro}>
            <IconChip icon="flash" sf="bolt.fill" gradient="brandSoft" />
            <ThemedText type="bodyStrong" style={styles.introText}>
              Trigger an SOS without ever opening the app.
            </ThemedText>
          </View>
        </Card>

        <View style={styles.section}>
          <SectionHeader title="Trigger methods" />
          <Card>
            {TRIGGERS.map((t, i) => (
              <ListRow
                key={t.id}
                leadingIcon={t.icon}
                leadingSf={t.sf}
                leadingGradient="brandSoft"
                title={t.label}
                subtitle={t.detail}
                trailing={
                  <View style={styles.trailing}>
                    <Pill variant="ghost" label={t.config} />
                    <Switch
                      value={enabled[t.id]}
                      onValueChange={(v) =>
                        setEnabled((prev) => ({ ...prev, [t.id]: v }))
                      }
                      trackColor={{ true: Palette.primary, false: Palette.backgroundSelected }}
                      thumbColor="#FFFFFF"
                    />
                  </View>
                }
                style={i > 0 ? styles.divider : undefined}
              />
            ))}
          </Card>
        </View>

        <GradientButton variant="ghost" title="Test a trigger" icon="play" onPress={() => {}} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  intro: { flexDirection: 'row', alignItems: 'center', gap: Spacing.three },
  introText: { flex: 1 },
  section: { gap: Spacing.three },
  trailing: { flexDirection: 'row', alignItems: 'center', gap: Spacing.two },
  divider: { borderTopWidth: 1, borderTopColor: Palette.border, marginTop: Spacing.two, paddingTop: Spacing.two },
});
