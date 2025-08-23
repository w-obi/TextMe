import { signInWithEmail } from "@/services/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const Auth = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    if (!email || !password) {
      Alert.alert("Authentication failed", "Please enter email and password.");
      return;
    }

    setLoading(true);

    try {
      await signInWithEmail(email, password);
      router.replace("/(tabs)/chats");
    } catch (error) {
      Alert.alert("Authentication failed", String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <Text className="justify-center mt-20 mx-auto text-black text-5xl font-bold">
        TextMe
      </Text>
      <Text className="justify-center mt-10 mx-auto text-black text-3xl font-semibold">
        Welcome
      </Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        autoCapitalize="none"
        className="justify-center bg-slate-700 mx-5 mt-52 rounded-full pl-4 text-white"
      />
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={(text: string) => setPassword(text)}
        className="justify-center bg-slate-700 mx-5 mt-5 rounded-full pl-4 text-white"
      />
      <TouchableOpacity
        className="bg-slate-700 mx-20 mt-20 rounded-full w-auto h-15 py-2"
        onPress={handleAuth}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text className="mx-auto text-white text-xl font-semibold">
            Sign In
          </Text>
        )}
      </TouchableOpacity>
      <View className="flex flex-row mt-40 ml-20">
        <Text className="mt-2">"Are you new?"</Text>
        <Text
          className="mx-20 bg-slate-700 rounded-full text-white font-semibold h-9 px-6 py-2"
          onPress={() => router.push("/reg")}
        >
          Sign Up
        </Text>
      </View>
    </View>
  );
};

export default Auth;
