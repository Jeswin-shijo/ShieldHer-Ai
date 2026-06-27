/**
 * ShieldHer AI — design tokens.
 *
 * Dark-FIRST neon theme (magenta + violet + cyan over a near-black violet canvas).
 * The original scaffold key names (text, background, backgroundElement,
 * backgroundSelected, textSecondary) are preserved so ThemedText / ThemedView /
 * NativeTabs keep working; the rest are additive.
 */

import '@/global.css';

import { Platform } from 'react-native';

/** Flat palette — import this for raw hex values (LinearGradient colors, shadowColor, etc.). */
export const Palette = {
  // Core surfaces (near-black with a faint violet bias, never pure #000).
  background: '#0A0712',
  backgroundDeep: '#070510',
  surface: '#140C24',
  backgroundElement: '#1A1030',
  backgroundSelected: '#241640',
  elevated: '#2A1A47',

  // Brand / primary.
  primary: '#FF2D78',
  primaryBright: '#FF4D90',
  primaryDeep: '#C81E5B',
  secondary: '#A12BFF',
  secondaryDeep: '#6A1FB0',
  accent: '#7B2FF7',
  accentCyan: '#22D3EE',

  // Status.
  danger: '#FF1F4B',
  dangerDeep: '#B00027',
  success: '#2BE89A',
  successDeep: '#12B374',
  warning: '#FFB020',
  info: '#5B8DEF',

  // Text.
  text: '#FFFFFF',
  textSecondary: '#B8AED0',
  textTertiary: '#7A7095',
  textOnPrimary: '#FFFFFF',

  // Lines / glow / overlay.
  border: '#2E2348',
  borderStrong: '#46356B',
  glowPink: 'rgba(255,45,120,0.45)',
  glowPurple: 'rgba(123,47,247,0.40)',
  glowSuccess: 'rgba(43,232,154,0.40)',
  scrim: 'rgba(7,5,16,0.72)',
  glassStroke: 'rgba(255,255,255,0.08)',
} as const;

/**
 * Light + dark both point at the same dark palette for now (app is dark-first),
 * so an accidental light-mode render still looks on-brand.
 */
export const Colors = {
  light: { ...Palette },
  dark: { ...Palette },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

/**
 * Gradient presets — each is a tuple ready to pass to `<LinearGradient colors={...} />`.
 * `as const` keeps them as readonly string tuples so they satisfy the (>=2 colors) type.
 */
export const Gradients = {
  screenBackground: ['#0A0712', '#140C24', '#1A0E2E'],
  screenBackgroundAlert: ['#1A0410', '#3D0A1F', '#0A0712'],
  brand: ['#FF2D78', '#A12BFF'],
  brandSoft: ['#FF4D90', '#7B2FF7'],
  sosButton: ['#FF2D78', '#C81E5B', '#7A0F3A'],
  sosArmed: ['#FF1F4B', '#B00027'],
  card: ['rgba(255,45,120,0.10)', 'rgba(123,47,247,0.06)'],
  cardElevated: ['#241640', '#1A1030'],
  success: ['#2BE89A', '#12B374'],
  aiFeature: ['#7B2FF7', '#22D3EE'],
  route: ['#22D3EE', '#A12BFF'],
  premium: ['#FFB020', '#FF2D78', '#A12BFF'],
  waveform: ['#FF2D78', '#A12BFF', '#22D3EE'],
} as const;

export type GradientKey = keyof typeof Gradients;

/**
 * Glow shadow presets — spread into a style. iOS honors shadow*, Android honors
 * elevation; pair with a translucent ring/border for cross-platform glow.
 */
export const Glow = {
  pink: { shadowColor: '#FF2D78', shadowOpacity: 0.55, shadowRadius: 24, shadowOffset: { width: 0, height: 0 }, elevation: 12 },
  purple: { shadowColor: '#7B2FF7', shadowOpacity: 0.5, shadowRadius: 24, shadowOffset: { width: 0, height: 0 }, elevation: 12 },
  cyan: { shadowColor: '#22D3EE', shadowOpacity: 0.5, shadowRadius: 22, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
  success: { shadowColor: '#2BE89A', shadowOpacity: 0.5, shadowRadius: 20, shadowOffset: { width: 0, height: 0 }, elevation: 10 },
  danger: { shadowColor: '#FF1F4B', shadowOpacity: 0.6, shadowRadius: 28, shadowOffset: { width: 0, height: 0 }, elevation: 14 },
  warning: { shadowColor: '#FFB020', shadowOpacity: 0.45, shadowRadius: 18, shadowOffset: { width: 0, height: 0 }, elevation: 8 },
  none: {},
} as const;

export type GlowKey = keyof typeof Glow;

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-display)',
    serif: 'var(--font-serif)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
});

/** 4pt-based spacing scale (unchanged — existing components import these). */
export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

/** Border-radius scale. */
export const Radius = {
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 28,
  pill: 999,
  card: 20,
  sheet: 28,
  tile: 18,
} as const;

/** Layout conveniences derived from Spacing. */
export const Layout = {
  screenPadding: Spacing.three,
  sectionGap: Spacing.four,
  cardPadding: Spacing.three,
  rowGap: Spacing.two,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;

/** Shared blurhash placeholder for avatar / image fallbacks. */
export const BLURHASH = 'L6Pj0^jE.AyE_3t7t7R**0o#DgR4';
