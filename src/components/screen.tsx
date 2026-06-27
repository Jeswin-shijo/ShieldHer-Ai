import { LinearGradient } from 'expo-linear-gradient';
import { type ReactNode } from 'react';
import { ScrollView, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { BottomTabInset, Gradients, Layout, MaxContentWidth, Spacing } from '@/constants/theme';

type ScreenProps = {
  children: ReactNode;
  /** Wrap content in a vertical ScrollView. */
  scroll?: boolean;
  /** `default` neon canvas, `alert` red-pink bloom, `plain` no gradient (screen paints its own bg). */
  variant?: 'default' | 'alert' | 'plain';
  /** Apply default horizontal screen padding. */
  padded?: boolean;
  /** Pad for the top safe-area inset. */
  topInset?: boolean;
  /** Reserve space at the bottom for the tab bar (set false on modal/fullscreen screens). */
  bottomTabInset?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  scroll = false,
  variant = 'default',
  padded = true,
  topInset = true,
  bottomTabInset = true,
  contentStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const padding: ViewStyle = {
    paddingTop: (topInset ? insets.top : 0) + Spacing.two,
    paddingHorizontal: padded ? Layout.screenPadding : 0,
    paddingBottom: (bottomTabInset ? BottomTabInset : insets.bottom) + Spacing.four,
  };

  const gradient = variant === 'alert' ? Gradients.screenBackgroundAlert : Gradients.screenBackground;

  return (
    <View style={styles.root}>
      {variant !== 'plain' && (
        <LinearGradient
          colors={gradient}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      )}
      {scroll ? (
        <ScrollView
          style={styles.flex}
          contentContainerStyle={styles.center}
          showsVerticalScrollIndicator={false}>
          <View style={[styles.content, padding, contentStyle]}>{children}</View>
        </ScrollView>
      ) : (
        <View style={[styles.flex, styles.center]}>
          <View style={[styles.flex, styles.content, padding, contentStyle]}>{children}</View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  center: { alignItems: 'center' },
  content: { width: '100%', maxWidth: MaxContentWidth },
});
