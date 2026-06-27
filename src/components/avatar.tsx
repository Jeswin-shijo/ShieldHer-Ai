import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { BLURHASH, Gradients, Palette, type GradientKey } from '@/constants/theme';

function initialsOf(name?: string) {
  if (!name) return '?';
  return name
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();
}

type AvatarProps = {
  uri?: string;
  name?: string;
  size?: number;
  ring?: boolean;
  ringGradient?: GradientKey;
  online?: boolean;
  blurhash?: string;
  style?: StyleProp<ViewStyle>;
};

export function Avatar({
  uri,
  name,
  size = 48,
  ring = false,
  ringGradient = 'brand',
  online = false,
  blurhash = BLURHASH,
  style,
}: AvatarProps) {
  const radius = size / 2;

  const inner = uri ? (
    <Image
      source={{ uri }}
      placeholder={{ blurhash }}
      contentFit="cover"
      transition={250}
      style={{ width: size, height: size, borderRadius: radius }}
    />
  ) : (
    <LinearGradient
      colors={Gradients.brandSoft}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.center, { width: size, height: size, borderRadius: radius }]}>
      <ThemedText type="smallBold" style={{ fontSize: size * 0.36, color: Palette.textOnPrimary }}>
        {initialsOf(name)}
      </ThemedText>
    </LinearGradient>
  );

  const avatar = ring ? (
    <LinearGradient
      colors={Gradients[ringGradient]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.center, { width: size + 6, height: size + 6, borderRadius: (size + 6) / 2 }]}>
      <View style={{ borderRadius: radius, backgroundColor: Palette.background, padding: 2 }}>{inner}</View>
    </LinearGradient>
  ) : (
    inner
  );

  return (
    <View style={style}>
      {avatar}
      {online ? <View style={[styles.dot, { borderColor: Palette.background }]} /> : null}
    </View>
  );
}

type AvatarStackPerson = { id?: string; uri?: string; name?: string };

type AvatarStackProps = {
  people: AvatarStackPerson[];
  size?: number;
  max?: number;
  style?: StyleProp<ViewStyle>;
};

/** Overlapping row of avatars with a "+N" overflow chip — used for "Share with". */
export function AvatarStack({ people, size = 40, max = 4, style }: AvatarStackProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  const overlap = Math.round(size * 0.32);

  return (
    <View style={[styles.stack, style]}>
      {shown.map((p, i) => (
        <View
          key={p.id ?? i}
          style={[styles.ringBorder, { marginLeft: i === 0 ? 0 : -overlap, borderRadius: (size + 4) / 2 }]}>
          <Avatar uri={p.uri} name={p.name} size={size} />
        </View>
      ))}
      {extra > 0 ? (
        <View
          style={[
            styles.ringBorder,
            styles.center,
            { marginLeft: -overlap, width: size, height: size, borderRadius: size / 2, backgroundColor: Palette.backgroundSelected },
          ]}>
          <ThemedText type="smallBold" style={{ fontSize: size * 0.3 }}>{`+${extra}`}</ThemedText>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  stack: { flexDirection: 'row', alignItems: 'center' },
  ringBorder: { borderWidth: 2, borderColor: Palette.background, borderRadius: 999 },
  center: { alignItems: 'center', justifyContent: 'center' },
  dot: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 2,
    backgroundColor: Palette.success,
  },
});
