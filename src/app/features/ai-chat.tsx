import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, View } from 'react-native';

import { IconChip } from '@/components/icon-chip';
import { Pill } from '@/components/pill';
import { Screen } from '@/components/screen';
import { ScreenHeader } from '@/components/screen-header';
import { SectionHeader } from '@/components/section-header';
import { ThemedText } from '@/components/themed-text';
import { Gradients, Layout, Palette, Radius, Spacing } from '@/constants/theme';
import { CHAT_THREAD, SUGGESTED_PROMPTS, type ChatMessage } from '@/data/chat';
import { timeLabel } from '@/utils/time';

function Bubble({ message }: { message: ChatMessage }) {
  const isAi = message.role === 'ai';

  if (isAi) {
    return (
      <View style={styles.aiRow}>
        <IconChip icon="sparkles" sf="sparkles" gradient="aiFeature" size={28} />
        <View style={styles.aiColumn}>
          <View style={styles.aiBubble}>
            <ThemedText type="default">{message.text}</ThemedText>
          </View>
          <ThemedText type="caption" themeColor="textTertiary" style={styles.aiTime}>
            {timeLabel(message.timeIso)}
          </ThemedText>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.userColumn}>
      <LinearGradient
        colors={Gradients.brand}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.userBubble}>
        <ThemedText type="default" style={styles.userText}>
          {message.text}
        </ThemedText>
      </LinearGradient>
      <ThemedText type="caption" themeColor="textTertiary" style={styles.userTime}>
        {timeLabel(message.timeIso)}
      </ThemedText>
    </View>
  );
}

export default function AiChatScreen() {
  return (
    <Screen scroll bottomTabInset={false}>
      <ScreenHeader title="AI Companion" eyebrow="Always with you" />

      <View style={styles.stack}>
        <View style={styles.thread}>
          {CHAT_THREAD.map((message) => (
            <Bubble key={message.id} message={message} />
          ))}
        </View>

        <View style={styles.section}>
          <SectionHeader title="Suggested" />
          <View style={styles.prompts}>
            {SUGGESTED_PROMPTS.map((prompt) => (
              <Pressable key={prompt.id} onPress={() => {}}>
                <Pill variant="ghost" label={prompt.text} />
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.inputBar}>
          <ThemedText type="default" themeColor="textTertiary" style={styles.inputText}>
            Message your companion...
          </ThemedText>
          <IconChip icon="send" sf="paperplane.fill" gradient="brand" size={36} />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  stack: { gap: Layout.sectionGap },
  thread: { gap: Spacing.three },
  aiRow: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    alignItems: 'flex-start',
    maxWidth: '82%',
    gap: Spacing.two,
  },
  aiColumn: { flexShrink: 1 },
  aiBubble: {
    backgroundColor: Palette.backgroundElement,
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderBottomLeftRadius: 4,
  },
  aiTime: { marginTop: Spacing.half, marginLeft: Spacing.one, textAlign: 'left' },
  userColumn: { alignSelf: 'flex-end', maxWidth: '82%' },
  userBubble: {
    padding: Spacing.three,
    borderRadius: Radius.lg,
    borderBottomRightRadius: 4,
  },
  userText: { color: Palette.textOnPrimary },
  userTime: { marginTop: Spacing.half, marginRight: Spacing.one, textAlign: 'right' },
  section: { gap: Spacing.three },
  prompts: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.two },
  inputBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Palette.backgroundElement,
    borderRadius: Radius.pill,
    paddingLeft: Spacing.three,
    padding: Spacing.one,
    gap: Spacing.two,
  },
  inputText: { flex: 1 },
});
