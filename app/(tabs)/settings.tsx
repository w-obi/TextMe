import TopBar from "@/components/TopBar";
import React from "react";
import { Text, View } from "react-native";

const Settings = () => {
  return (
    <View className="bg-white size-full">
      <TopBar bgColor="#334155" textColor="#ffffff" isSearchPresent={false} />
      <View className="justify-center items-center mt-96">
        <Text>Coming Soon!!!</Text>
      </View>
    </View>
  );
};

export default Settings;
