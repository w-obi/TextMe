import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";

const Search = ({
  placeholder,
  onPress,
  value,
  onChangeText,
  disableSearch,
  bgColor,
}: Search) => {
  return (
    <View
      className="flex flex-row h-28 bg-slate-700 pt-[40px]"
      style={{ backgroundColor: bgColor }}
    >
      <TouchableOpacity onPress={disableSearch}>
        <AntDesign
          name="arrowleft"
          size={24}
          color="white"
          className="ml-[10px] mt-[16px]"
        />
      </TouchableOpacity>
      <AntDesign
        name="search1"
        size={24}
        color="white"
        className="ml-[40px] mt-[16px]"
      />
      <TextInput
        onPress={onPress}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#a8b5db"
        className="flex-1 text-white ml-[10px]"
      />
    </View>
  );
};

export default Search;
