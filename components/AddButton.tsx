import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { TouchableOpacity } from "react-native";

const AddButton = ({ onPress, bgColor }: AddButton) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="absolute bottom-32 right-8 p-4 z-10 shadow-lg rounded-full justify-center items-center"
      style={{ backgroundColor: bgColor }}
    >
      <AntDesign name="pluscircleo" size={32} color="white" />
    </TouchableOpacity>
  );
};

export default AddButton;
