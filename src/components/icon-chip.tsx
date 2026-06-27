import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, type IoniconName } from '@/components/icon';
import { Gradients, Palette, Radius, type GradientKey } from '@/constants/theme';

type IconChipProps = {
  icon: IoniconName;
  sf?: string;
  gradient?: GradientKey;
  size?: number;
  iconSize?: number;
  color?: string;
  radius?: number;
  style?: StyleProp<ViewStyle>;
};

/** A rounded-square gradient backdrop holding an icon — used in feature tiles, list rows, badges. */
export function IconChip({
  icon,
  sf,
  gradient = 'brand',
  size = 44,
  iconSize,
  color = Palette.textOnPrimary,
  radius = Radius.tile,
  style,
}: IconChipProps) {
  return (
    <LinearGradient
      colors={Gradients[gradient]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[{ width: size, height: size, borderRadius: radius }, styles.center, style]}>
      <Icon name={icon} sf={sf} size={iconSize ?? Math.round(size * 0.5)} color={color} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
});
