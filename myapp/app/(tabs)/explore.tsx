import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';
import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#0F0F10' }}
      headerImage={
        <IconSymbol
          size={310}
          color={Colors[colorScheme ?? 'light'].tabIconDefault}
          name="chevron.left.forwardslash.chevron.right"
          className="absolute -bottom-[90px] -left-[35px] opacity-20"
        />
      }>
      <ThemedView className="p-6 gap-6">
        <ThemedText type="title">Explore</ThemedText>

        <ThemedView className="gap-2">
          <ThemedText type="subtitle">Layouts</ThemedText>
          <ThemedText>
            This app has multiple tabs and a modal.
          </ThemedText>
        </ThemedView>

        <ThemedView className="bg-indigo-500 p-8 rounded-3xl shadow-2xl items-center justify-center">
          <ThemedText className="text-white font-extrabold text-2xl text-center">
            Indigo Theme Active! 🎨
          </ThemedText>
          <ThemedText className="text-white/70 mt-2">
            Using Indigo #3E338C and Onyx #0F0F10
          </ThemedText>
        </ThemedView>

        <Collapsible title="Animations">
          <ThemedText>
            This template includes examples of animations using{' '}
            <ThemedText type="defaultSemiBold">react-native-reanimated</ThemedText>.
          </ThemedText>
        </Collapsible>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
