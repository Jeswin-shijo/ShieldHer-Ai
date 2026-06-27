import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { PulseRing } from '@/components/pulse-ring';
import { ThemedText } from '@/components/themed-text';
import { Glow, Gradients, Palette } from '@/constants/theme';

type SosButtonProps = {
  size?: number;
  onPress?: () => void;
  label?: string;
  sublabel?: string;
  armed?: boolean;
};

/** The hero emergency control — a circular gradient button with expanding alert rings and a strong haptic. */
export function SosButton({
  size = 248,
  onPress,
  label = 'SOS',
  sublabel = 'Tap to send alert',
  armed = false,
}: SosButtonProps) {
  const buttonSize = Math.round(size * 0.62);
  const ringSize = buttonSize + 16;

  const handlePress = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error).catch(() => {});
    onPress?.();
  };

  return (
    <View style={[styles.wrap, { width: size, height: size }]}>
      {!armed ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <View style={styles.fill}>
            <PulseRing size={ringSize} color={Palette.danger} count={3} maxScale={size / ringSize} duration={2600} />
          </View>
        </View>
      ) : null}

      <Pressable onPress={handlePress} style={({ pressed }) => (pressed ? styles.pressed : null)}>
        <LinearGradient
          colors={armed ? Gradients.sosArmed : Gradients.sosButton}
          start={{ x: 0.3, y: 0.15 }}
          end={{ x: 0.85, y: 1 }}
          style={[styles.button, Glow.danger, { width: buttonSize, height: buttonSize, borderRadius: buttonSize / 2 }]}>
          <ThemedText type="display" style={styles.label}>
            {label}
          </ThemedText>
          <ThemedText type="caption" style={styles.sublabel}>
            {sublabel}
          </ThemedText>
        </LinearGradient>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  fill: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  button: { alignItems: 'center', justifyContent: 'center' },
  pressed: { transform: [{ scale: 0.96 }] },
  label: {
    fontSize: 48,
    lineHeight: 54,
    letterSpacing: 3,
    color: Palette.textOnPrimary,
  },
  sublabel: {
    color: Palette.textOnPrimary,
    opacity: 0.9,
    marginTop: 2,
    letterSpacing: 0.5,
  },
});
