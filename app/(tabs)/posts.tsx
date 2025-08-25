import TopBar from "@/components/TopBar";
import { useRouter } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const Posts = () => {
  const router = useRouter();

  return (
    <View className="bg-white size-full">
      <TopBar
        bgColor="#334155"
        textColor="#ffffff"
        isSearchPresent={true}
        exit={() => router.push("/reg")}
      />
      <View className="justify-center items-center mt-96">
        <Text>Coming Soon!!!</Text>
      </View>
    </View>
  );
};

export default Posts;
