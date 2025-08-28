import TopBar from "@/components/TopBar";
import { useRouter } from "expo-router";
import React from "react";
import { ImageBackground, Text, View } from "react-native";

const Settings = () => {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/external.png")}
      className="flex-1"
      resizeMode="cover"
    >
      <TopBar
        bgColor="#334155"
        textColor="#ffffff"
        isSearchPresent={false}
        exit={() => router.push("/")}
      />
      <View className="self-center mt-96 max-w-[70%] bg-slate-700 rounded-2xl p-4">
        <Text className="font-bold text-white flex-wrap">
          Coming Soon! Will start implementing this one in a month
        </Text>
      </View>
    </ImageBackground>
  );
};

export default Settings;
