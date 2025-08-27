import { images } from "@/constants/images";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const TopBar = ({
  bgColor,
  textColor,
  isSearchPresent,
  enableSearch,
  exit,
  isProfilePresent,
  profile_picture_url,
  username,
}: TopBar) => {
  return (
    <View
      className="flex flex-row items-center justify-between h-28 px-4 pt-[46px]"
      style={{ backgroundColor: bgColor }}
    >
      <View className="flex flex-row items-center">
        {isProfilePresent ? (
          <>
            <Image
              source={
                profile_picture_url
                  ? { uri: profile_picture_url }
                  : images.empty_profile
              }
              className="w-12 h-12 rounded-full"
            />
            <Text
              className="text-2xl font-bold ml-3"
              style={{ color: textColor }}
            >
              {username}
            </Text>
          </>
        ) : (
          <>
            <Image source={images.logo} className="w-14 h-14" />
            <Text
              className="ml-3 text-2xl font-bold"
              style={{ color: textColor }}
            >
              TextMe
            </Text>
          </>
        )}
      </View>
      <View className="flex flex-row items-center">
        {isSearchPresent && (
          <TouchableOpacity onPress={enableSearch} className="mr-12">
            <AntDesign name="search1" size={24} color="white" />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={exit}>
          <Ionicons name="exit-outline" size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TopBar;
