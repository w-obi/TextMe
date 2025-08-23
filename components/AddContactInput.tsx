import AntDesign from "@expo/vector-icons/AntDesign";
import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const AddContactInput = ({
  onChangeText,
  value,
  onPress,
  onPress2,
}: AddContactInput) => {
  return (
    <View className="flex flex-row items-center bg-slate-700 absolute bottom-96 right-8 p-4 z-10 shadow-lg">
      <TouchableOpacity onPress={onPress2} className="mr-3">
        <AntDesign name="arrowleft" size={24} color="white" />
        <Text className="text-sm text-white">back</Text>
      </TouchableOpacity>
      <View className="bg-white rounded-full">
        <TextInput
          placeholder="Enter new contact email"
          placeholderTextColor="#a8b5db"
          onChangeText={onChangeText}
          value={value}
        />
      </View>
      <TouchableOpacity onPress={onPress} className="ml-3">
        <AntDesign name="arrowright" size={24} color="white" />
        <Text className="text-sm text-white">save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddContactInput;
