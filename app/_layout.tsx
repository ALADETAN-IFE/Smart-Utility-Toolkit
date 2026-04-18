import { useEffect, useRef, useState } from "react";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Animated, Text, View } from "react-native";
import "./global.css";

export default function RootLayout() {
  const [showSplashOverlay, setShowSplashOverlay] = useState(true);
  const dotOnePulse = useRef(new Animated.Value(0.55)).current;
  const dotTwoPulse = useRef(new Animated.Value(0.55)).current;
  const dotThreePulse = useRef(new Animated.Value(0.55)).current;

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplashOverlay(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const animateDot = (dot: Animated.Value) =>
      Animated.sequence([
        Animated.timing(dot, {
          toValue: 1,
          duration: 450,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0.55,
          duration: 450,
          useNativeDriver: true,
        }),
      ]);

    const loop = Animated.loop(
      Animated.sequence([
        animateDot(dotOnePulse),
        animateDot(dotTwoPulse),
        animateDot(dotThreePulse),
      ]),
    );

    loop.start();

    return () => {
      loop.stop();
      dotOnePulse.stopAnimation();
      dotTwoPulse.stopAnimation();
      dotThreePulse.stopAnimation();
    };
  }, [dotOnePulse, dotTwoPulse, dotThreePulse]);

  if (showSplashOverlay) {
    return (
      <View className="flex-1 items-center justify-center bg-[#090a0d] px-8">
        <StatusBar style="light" />
        <View className="absolute -left-12 top-28 h-48 w-48 rounded-full bg-orange-500/25" />
        <View className="absolute -right-12 bottom-40 h-56 w-56 rounded-full bg-red-500/20" />
        <View className="mb-4 rounded-2xl border border-zinc-700/40 bg-zinc-900/70 px-4 py-2">
          <Text className="text-xs font-bold uppercase tracking-[1.4px] text-zinc-300">
            Welcome to
          </Text>
        </View>
        <Text className="text-xs font-extrabold uppercase tracking-[2px] text-orange-300">
          Smart Utility Toolkit
        </Text>
        <Text className="mt-3 text-center text-[38px] font-extrabold leading-11 text-zinc-50">
          Convert and Organize.
        </Text>
        <Text className="mt-4 text-center text-base leading-6 text-zinc-300">
          Length, temperature, and weight converters plus your offline task
          manager in one app.
        </Text>

        <View className="mt-7 flex-row items-center gap-2">
          <Animated.View
            className="h-2 w-2 rounded-full bg-orange-300"
            style={{
              opacity: dotOnePulse,
              transform: [
                {
                  scale: dotOnePulse.interpolate({
                    inputRange: [0.55, 1],
                    outputRange: [1, 1.35],
                  }),
                },
              ],
            }}
          />
          <Animated.View
            className="h-2 w-2 rounded-full bg-orange-400/70"
            style={{
              opacity: dotTwoPulse,
              transform: [
                {
                  scale: dotTwoPulse.interpolate({
                    inputRange: [0.55, 1],
                    outputRange: [1, 1.35],
                  }),
                },
              ],
            }}
          />
          <Animated.View
            className="h-2 w-2 rounded-full bg-red-400/55"
            style={{
              opacity: dotThreePulse,
              transform: [
                {
                  scale: dotThreePulse.interpolate({
                    inputRange: [0.55, 1],
                    outputRange: [1, 1.35],
                  }),
                },
              ],
            }}
          />
        </View>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: "#0a0a0c" },
        }}
      >
        <Stack.Screen name="(tabs)" />
      </Stack>
    </>
  );
}
