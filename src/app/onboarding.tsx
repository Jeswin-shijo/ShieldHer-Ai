import { LinearGradient } from 'expo-linear-gradient';
import { router, Stack } from 'expo-router';
import { useRef, useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { GradientButton } from '@/components/gradient-button';
import { IconChip } from '@/components/icon-chip';
import { Pill } from '@/components/pill';
import { ThemedText } from '@/components/themed-text';
import { Layout, Palette, Spacing } from '@/constants/theme';
import { ONBOARD_SLIDES, TAGLINE, TARGET_USERS } from '@/data/onboarding';
import { replaceTo } from '@/utils/nav';

const BG = ['#0A0712', '#160C28', '#0A0712'] as const;

export default function OnboardingScreen() {
  const { width } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);
  const [index, setIndex] = useState(0);
  const slideCount = ONBOARD_SLIDES.length + 1; // + the "made for" slide
  const isLast = index >= slideCount - 1;

  const finish = () => {
    if (router.canGoBack()) router.back();
    else replaceTo('/');
  };

  const onNext = () => {
    if (isLast) finish();
    else scrollRef.current?.scrollTo({ x: (index + 1) * width, animated: true });
  };

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const i = Math.round(e.nativeEvent.contentOffset.x / width);
    if (i !== index) setIndex(i);
  };

  return (
    <View style={styles.root}>
      <Stack.Screen options={{ headerShown: false, animation: 'fade' }} />
      <LinearGradient colors={BG} start={{ x: 0.5, y: 0 }} end={{ x: 0.5, y: 1 }} style={StyleSheet.absoluteFill} />

      <View style={[styles.top, { paddingTop: insets.top + Spacing.three }]}>
        <ThemedText type="caption" style={styles.tagline}>
          {TAGLINE}
        </ThemedText>
        <Pressable onPress={finish} hitSlop={8}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            Skip
          </ThemedText>
        </Pressable>
      </View>

      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={onScroll}
        style={styles.flex}>
        {ONBOARD_SLIDES.map((s) => (
          <View key={s.id} style={[styles.slide, { width }]}>
            <IconChip icon={s.icon} sf={s.sf} gradient={s.gradient} size={120} iconSize={56} radius={40} />
            <ThemedText type="title" style={styles.slideTitle}>
              {s.title}
            </ThemedText>
            <ThemedText type="default" themeColor="textSecondary" style={styles.slideBody}>
              {s.body}
            </ThemedText>
          </View>
        ))}
        <View style={[styles.slide, { width }]}>
          <IconChip icon="heart" sf="heart.fill" gradient="brand" size={120} iconSize={56} radius={40} />
          <ThemedText type="title" style={styles.slideTitle}>
            Made for every woman
          </ThemedText>
          <View style={styles.chips}>
            {TARGET_USERS.map((t) => (
              <Pill key={t.id} variant="ghost" icon={t.icon} sf={t.sf} label={t.label} />
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={[styles.bottom, { paddingBottom: insets.bottom + Spacing.four }]}>
        <View style={styles.dots}>
          {Array.from({ length: slideCount }).map((_, i) => (
            <View key={i} style={[styles.dot, i === index && styles.dotActive]} />
          ))}
        </View>
        <GradientButton
          title={isLast ? 'Get Started' : 'Next'}
          gradient="brand"
          glow="pink"
          size="lg"
          icon={isLast ? 'shield-checkmark' : 'arrow-forward'}
          onPress={onNext}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  flex: { flex: 1 },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Layout.screenPadding,
  },
  tagline: { color: Palette.primary, letterSpacing: 1 },
  slide: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing.five, gap: Spacing.three },
  slideTitle: { textAlign: 'center' },
  slideBody: { textAlign: 'center', maxWidth: 320 },
  chips: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two, justifyContent: 'center' },
  bottom: { paddingHorizontal: Layout.screenPadding, gap: Spacing.three },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6 },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Palette.backgroundSelected },
  dotActive: { width: 20, backgroundColor: Palette.primary },
});
