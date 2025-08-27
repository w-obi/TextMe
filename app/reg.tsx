import { createNewUser } from "@/services/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Reg() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!username || !email || !password) {
      Alert.alert(
        "Fields are not complete",
        "Please enter username, email and password."
      );
      return;
    }

    setLoading(true);

    try {
      await createNewUser(email, password, username);
      router.replace("/(tabs)/chats");
    } catch (error) {
      Alert.alert("Registration failed", String(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-white">
      <ImageBackground
        source={require("../assets/images/external.png")}
        className="flex-1"
        resizeMode="cover"
      >
        <Text className="justify-center mt-20 mx-auto text-slate-300 text-5xl font-bold">
          TextMe
        </Text>
        <Text className="justify-center mt-10 mx-auto text-slate-300 text-3xl font-semibold">
          Welcome
        </Text>
        <TextInput
          placeholder="Enter your username"
          placeholderTextColor="#a8b5db"
          value={username}
          onChangeText={(text: string) => setUsername(text)}
          className="justify-center bg-slate-700 mx-5 mt-40 rounded-full pl-4 text-white"
        />
        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#a8b5db"
          value={email}
          onChangeText={(text: string) => setEmail(text)}
          autoCapitalize="none"
          className="justify-center bg-slate-700 mx-5 mt-5 rounded-full pl-4 text-white"
        />
        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#a8b5db"
          secureTextEntry
          value={password}
          onChangeText={(text: string) => setPassword(text)}
          className="justify-center bg-slate-700 mx-5 mt-5 rounded-full pl-4 text-white"
        />
        <TouchableOpacity
          className="bg-slate-700 mx-20 mt-20 rounded-full w-auto h-15 py-2"
          onPress={handleRegister}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Text className="mx-auto text-white text-xl font-semibold">
              Register
            </Text>
          )}
        </TouchableOpacity>
        <Text
          className="self-center mt-40 bg-slate-700 rounded-full text-white font-semibold h-11 px-6 py-3"
          onPress={() => router.push("/auth" as any)}
        >
          Already a member?{"      "}Sign In
        </Text>
      </ImageBackground>
    </View>
  );
}
