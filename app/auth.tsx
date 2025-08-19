import { images } from "@/constants/images";
import { signInWithEmail } from "@/services/supabase";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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
    <View className="flex-1 bg-black">
      <Image source={images.logo} className="" />
      <Text>Welcome</Text>
      <TextInput
        placeholder="Enter your email"
        placeholderTextColor="#999"
        value={email}
        onChangeText={(text: string) => setEmail(text)}
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Enter your password"
        placeholderTextColor="#999"
        secureTextEntry
        value={password}
        onChangeText={(text: string) => setPassword(text)}
      />
      <TouchableOpacity
        className="bg-gray"
        onPress={handleAuth}
        disabled={loading}
      >
        {loading ? <ActivityIndicator /> : <Text className="">Sign In</Text>}
      </TouchableOpacity>
      <View>
        <Text>"Are you new?"</Text>
        <Text onPress={() => router.push("/index" as any)}>Sign Up</Text>
      </View>
    </View>
  );
};

export default Auth;
