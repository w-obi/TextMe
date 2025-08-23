import TopBar from "@/components/TopBar";
import React from "react";
import { Text, View } from "react-native";

const Posts = () => {
  return (
    <View className="bg-white size-full">
      <TopBar bgColor="#334155" textColor="#ffffff" isSearchPresent={true} />
      <View className="justify-center items-center mt-96">
        <Text>Coming Soon!!!</Text>
      </View>
    </View>
  );
};

export default Posts;
