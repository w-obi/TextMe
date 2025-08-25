import { images } from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRouter } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TopBar = ({
  bgColor,
  textColor,
  isSearchPresent,
  enableSearch,
  exit,
}: TopBar) => {
  const router = useRouter();

  return (
    <View
      className="flex flex-row h-28 pt-[46px]"
      style={{ backgroundColor: bgColor }}
    >
      <Image source={images.logo} className="w-10 h-14 ml-6" />
      <Text
        className="ml-3 text-2xl font-bold mt-[8px]"
        style={{ color: textColor }}
      >
        TextMe
      </Text>

      {isSearchPresent && (
        <TouchableOpacity onPress={enableSearch}>
          <AntDesign
            name="search1"
            size={24}
            color="white"
            className="ml-[140px] mt-[10px]"
          />
        </TouchableOpacity>
      )}

      <TouchableOpacity onPress={exit}>
        <Ionicons
          name="exit-outline"
          size={26}
          color="white"
          className="mt-[8px]"
          style={isSearchPresent ? { marginLeft: 40 } : { marginLeft: 204 }}
        />
      </TouchableOpacity>
    </View>
  );
};

export default TopBar;
