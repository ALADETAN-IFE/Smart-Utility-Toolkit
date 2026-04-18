import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Dimensions } from "react-native";

const screenWidth = Dimensions.get("window").width;
const tabBarWidth = screenWidth * 0.9;

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#fff7ed",
        tabBarInactiveTintColor: "#e4e4e7",
        tabBarShowLabel: true,
        tabBarStyle: {
          bottom: 18,
          width: tabBarWidth,
          height: 80,
          justifyContent: "center",
          alignItems: "center",
          alignSelf: "center",
          borderTopWidth: 1,
          borderRadius: 25,
          backgroundColor: "rgba(28, 25, 23, 0.58)",
          borderWidth: 1,
          borderColor: "rgba(255, 255, 255, 0.18)",
          paddingHorizontal: 8,
          paddingTop: 10,
          paddingBottom: 10,
          shadowColor: "#000",
          shadowOpacity: 0.25,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 12,
        },
        tabBarItemStyle: {
          borderRadius: 999,
          marginHorizontal: 3,
          overflow: "hidden",
        },
        tabBarActiveBackgroundColor: "#f97316",
        tabBarIconStyle: {
          marginBottom: 1,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          letterSpacing: 0.3,
        },
      }}
    >
      <Tabs.Screen
        name="length"
        options={{
          title: "Length",
          tabBarIcon: ({ color }) => (
            <Ionicons size={18} name="resize-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="temperature"
        options={{
          title: "Temp",
          tabBarIcon: ({ color }) => (
            <Ionicons size={18} name="thermometer-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="weight"
        options={{
          title: "Weight",
          tabBarIcon: ({ color }) => (
            <Ionicons size={18} name="barbell-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color }) => (
            <Ionicons size={18} name="checkbox-outline" color={color} />
          ),
        }}
      />
      <Tabs.Screen name="index" options={{ href: null }} />
    </Tabs>
  );
}
