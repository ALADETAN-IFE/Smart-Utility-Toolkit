import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import './global.css';

export default function RootLayout() {
  const [showSplashOverlay, setShowSplashOverlay] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashOverlay(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (showSplashOverlay) {
    return (
      <View className="flex-1 items-center justify-center bg-[#090a0d] px-8">
        <StatusBar style="light" />
        <View className="absolute -left-12 top-28 h-48 w-48 rounded-full bg-orange-500/25" />
        <View className="absolute -right-12 bottom-40 h-56 w-56 rounded-full bg-red-500/20" />

        <Text className="text-xs font-extrabold uppercase tracking-[2px] text-orange-300">
          Smart Utility Toolkit
        </Text>
        <Text className="mt-3 text-center text-[38px] font-extrabold leading-10 text-zinc-50">
          Convert anything fast.
        </Text>
        <Text className="mt-4 text-center text-base leading-6 text-zinc-300">
          Length, temperature, and weight converters in one smooth mobile toolkit.
        </Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0a0a0c' } }}>
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}


