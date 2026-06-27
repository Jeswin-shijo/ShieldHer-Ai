import { Ionicons } from '@expo/vector-icons';
import { SymbolView, type SymbolWeight } from 'expo-symbols';
import { type ComponentProps } from 'react';
import { Platform, type ColorValue, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { Palette } from '@/constants/theme';

export type IoniconName = ComponentProps<typeof Ionicons>['name'];

export type IconProps = {
  /** Universal Ionicons name — renders on every platform. */
  name: IoniconName;
  /** Optional SF Symbol name; upgrades rendering on iOS only, falls back to `name` elsewhere. */
  sf?: string;
  size?: number;
  color?: ColorValue;
  weight?: SymbolWeight;
  style?: StyleProp<ViewStyle>;
};

/**
 * Cross-platform icon. We standardize on Ionicons for identical iconography on
 * Android + iOS + web, and optionally upgrade to crisp SF Symbols on iOS when an
 * `sf` name is supplied (with the Ionicon as the automatic fallback).
 */
export function Icon({ name, sf, size = 24, color = Palette.text, weight = 'regular', style }: IconProps) {
  if (Platform.OS === 'ios' && sf) {
    return (
      <SymbolView
        name={sf as never}
        size={size}
        tintColor={color}
        weight={weight}
        resizeMode="scaleAspectFit"
        fallback={<Ionicons name={name} size={size} color={color} />}
        style={style}
      />
    );
  }
  return <Ionicons name={name} size={size} color={color} style={style as StyleProp<TextStyle>} />;
}
