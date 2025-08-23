import { formatUserChatTime } from "@/services/handleDate";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PreviewUserChat = ({
  username,
  last_message,
  last_message_time,
  profile_picture_url,
  onPress,
}: PreviewUserChat) => {
  return (
    <TouchableOpacity
      className="flex flex-row border-b-4 border-slate-700 p-4"
      onPress={onPress}
    >
      <Image
        className="w-14 h-14"
        source={
          profile_picture_url
            ? { uri: profile_picture_url }
            : require("../assets/images/empty_profile.png")
        }
      />
      <View className="flex flex-col ml-4">
        <Text className="text-2xl font-bold">{username}</Text>
        <View className="flex flex-row">
          <Text numberOfLines={1}>{last_message ?? "No messages yet"}</Text>
          <Text>{formatUserChatTime(last_message_time) ?? null}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PreviewUserChat;
