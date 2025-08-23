import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="reg" options={{ headerShown: false }} />
        <Stack.Screen name="auth" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="messages/[id]" options={{ headerShown: false }} />
      </Stack>
    </>
  );
}
