import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Avatar } from '@/components/avatar';
import { Icon } from '@/components/icon';
import { PulseRing } from '@/components/pulse-ring';
import { Palette, Radius } from '@/constants/theme';

export type MapPin = {
  id: string;
  x: number; // 0–100 (% from left)
  y: number; // 0–100 (% from top)
  kind: 'user' | 'contact' | 'place';
  name?: string;
  uri?: string;
  color?: string;
};

type MapPlaceholderProps = {
  height?: number;
  pins?: MapPin[];
  route?: { x: number; y: number }[];
  routeColor?: string;
  style?: StyleProp<ViewStyle>;
};

const V_LINES = [12, 30, 48, 66, 84];
const H_LINES = [20, 42, 64, 84];

/**
 * Static, dependency-free stand-in for a real map (expo-maps is alpha / dev-build
 * only). Draws a stylized dark street grid with a breadcrumb route and pins so the
 * tracking / safe-route screens render everywhere, including Expo Go and web.
 */
export function MapPlaceholder({ height = 240, pins = [], route, routeColor = Palette.accentCyan, style }: MapPlaceholderProps) {
  return (
    <View style={[styles.container, { height }, style]}>
      <LinearGradient colors={['#0E0A1F', '#161038', '#0C0820']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={StyleSheet.absoluteFill} />

      {/* grid streets */}
      {V_LINES.map((l) => (
        <View key={`v${l}`} style={[styles.vline, { left: `${l}%` }]} />
      ))}
      {H_LINES.map((l) => (
        <View key={`h${l}`} style={[styles.hline, { top: `${l}%` }]} />
      ))}
      {/* main roads */}
      <View style={[styles.road, { top: '46%', transform: [{ rotate: '-16deg' }] }]} />
      <View style={[styles.roadV, { left: '56%', transform: [{ rotate: '9deg' }] }]} />

      {/* route breadcrumb */}
      {route?.map((p, i) => (
        <View key={`r${i}`} style={[styles.routeDot, { left: `${p.x}%`, top: `${p.y}%`, backgroundColor: routeColor }]} />
      ))}

      {/* pins (anchored on the point) */}
      {pins.map((pin) => (
        <View key={pin.id} style={[styles.pin, { left: `${pin.x}%`, top: `${pin.y}%` }]}>
          {pin.kind === 'user' ? (
            <>
              <View style={StyleSheet.absoluteFill} pointerEvents="none">
                <View style={styles.center}>
                  <PulseRing size={26} color={pin.color ?? routeColor} count={2} maxScale={2.6} duration={2200} />
                </View>
              </View>
              <View style={[styles.userDot, { backgroundColor: pin.color ?? routeColor }]} />
            </>
          ) : pin.kind === 'contact' ? (
            <Avatar uri={pin.uri} name={pin.name} size={30} ring ringGradient="brand" />
          ) : (
            <View style={styles.placePin}>
              <Icon name="flag" sf="flag.fill" size={14} color={Palette.textOnPrimary} />
            </View>
          )}
        </View>
      ))}

      {/* subtle vignette */}
      <LinearGradient
        colors={['rgba(10,7,18,0.35)', 'transparent', 'rgba(10,7,18,0.45)']}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderRadius: Radius.lg, overflow: 'hidden', borderWidth: 1, borderColor: Palette.border },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  vline: { position: 'absolute', top: 0, bottom: 0, width: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  hline: { position: 'absolute', left: 0, right: 0, height: 1, backgroundColor: 'rgba(255,255,255,0.05)' },
  road: { position: 'absolute', left: '-15%', width: '130%', height: 8, backgroundColor: 'rgba(255,255,255,0.06)' },
  roadV: { position: 'absolute', top: '-15%', height: '130%', width: 8, backgroundColor: 'rgba(255,255,255,0.06)' },
  routeDot: { position: 'absolute', width: 6, height: 6, borderRadius: 3, marginLeft: -3, marginTop: -3 },
  pin: { position: 'absolute', width: 0, height: 0, alignItems: 'center', justifyContent: 'center' },
  userDot: { width: 16, height: 16, borderRadius: 8, borderWidth: 3, borderColor: '#FFFFFF' },
  placePin: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Palette.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
});
