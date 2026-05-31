import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFFFFF', dark: '#0F0F10' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          className="h-[178px] w-[290px] absolute bottom-0 left-0"
        />
      }>
      <ThemedView className="flex-row items-center gap-2 p-6">
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>

      <ThemedView className="p-6 gap-4">
        <ThemedView className="gap-2">
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>

        <ThemedView className="gap-2">
          <Link href="/modal">
            <ThemedText type="subtitle" className="text-indigo-700 dark:text-indigo-300">Step 2: Explore</ThemedText>
          </Link>
          <ThemedText>
            {`Tap the Explore tab to learn more about what's included in this starter app.`}
          </ThemedText>
        </ThemedView>

        <ThemedView className="gap-2">
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            {`When you're ready, run `}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory.
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({});
