import AntDesign from "@expo/vector-icons/AntDesign";
import Foundation from "@expo/vector-icons/Foundation";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import React, { useEffect, useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const TextUserButton = ({
  placeholder,
  value,
  onChangeText,
  bgColor,
  isTextPresent,
  onPressEnter,
}: TextUserButton) => {
  const [isCamera, setIsCamera] = useState<boolean>(true);

  useEffect(() => {
    if (isTextPresent) setIsCamera(false);
    if (!isTextPresent) setIsCamera(true);
  }, [isTextPresent]);

  return (
    <View className="flex flex-row h-14 mb-16 justify-center items-center">
      <View
        className="flex flex-row px-6 w-[85%] justify-center items-center rounded-full"
        style={{ backgroundColor: bgColor }}
      >
        <TouchableOpacity>
          <MaterialCommunityIcons
            name="sticker-emoji"
            size={24}
            color="white"
          />
        </TouchableOpacity>

        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          placeholderTextColor="#a8b5db"
          className="flex-1 text-white ml-[10px]"
        />

        <TouchableOpacity>
          <Foundation name="paperclip" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View className="bg-blue-900 rounded-full p-3 ml-1">
        {isCamera ? (
          <TouchableOpacity>
            <Ionicons name="camera-sharp" size={26} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onPressEnter}>
            <AntDesign name="arrowright" size={26} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default TextUserButton;
