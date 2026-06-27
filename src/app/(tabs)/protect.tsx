import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { FeatureTile } from '@/components/feature-tile';
import { Icon } from '@/components/icon';
import { Screen } from '@/components/screen';
import { ThemedText } from '@/components/themed-text';
import { Glow, Gradients, Layout, Palette, Radius, Spacing } from '@/constants/theme';
import { FEATURES } from '@/data/features';
import { navigate } from '@/utils/nav';

export default function ProtectScreen() {
  return (
    <Screen scroll>
      <View style={styles.stack}>
        <View>
          <ThemedText type="caption">14 safety tools</ThemedText>
          <ThemedText type="title">Protect</ThemedText>
        </View>

        <Pressable onPress={() => navigate('/features/premium')}>
          <LinearGradient
            colors={Gradients.premium}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={[styles.premium, Glow.pink]}>
            <Icon name="star" sf="crown.fill" size={28} color={Palette.textOnPrimary} />
            <View style={styles.flex}>
              <ThemedText type="heading" style={styles.onPrimary}>
                Go Premium · Rs. 99/mo
              </ThemedText>
              <ThemedText type="small" style={styles.onPrimaryDim}>
                AI detection, cloud evidence & unlimited guardians
              </ThemedText>
            </View>
            <Icon name="chevron-forward" size={20} color={Palette.textOnPrimary} />
          </LinearGradient>
        </Pressable>

        <View style={styles.grid}>
          {FEATURES.map((f) => (
            <FeatureTile key={f.id} feature={f} />
          ))}
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  flex: { flex: 1 },
  premium: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.three,
    padding: Spacing.three,
    borderRadius: Radius.card,
  },
  onPrimary: { color: Palette.textOnPrimary },
  onPrimaryDim: { color: 'rgba(255,255,255,0.85)' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: Spacing.three },
});
