import { formatUserChatTime } from "@/services/handleDate";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PreviewUserChat = ({
  message,
  created_at,
  user_id,
  profile_picture_url,
  username,
}: PreviewUserChat) => {
  return (
    <>
      <Link href={`/messages/${user_id}`} asChild>
        <TouchableOpacity className="flex flex-row p-4 bg-black/80">
          <Image
            className="w-14 h-14 rounded-full"
            source={
              profile_picture_url
                ? { uri: profile_picture_url }
                : require("../assets/images/empty_profile.png")
            }
          />
          <View className="flex flex-col ml-4">
            <View className="flex flex-row justify-between items-center w-[290px]">
              <Text
                className="text-2xl font-bold text-white flex-shrink"
                numberOfLines={1}
              >
                {username}
              </Text>
              <Text className="ml-4 text-white">
                {formatUserChatTime(created_at) ?? null}
              </Text>
            </View>
            <Text numberOfLines={1} className="text-white max-w-[60%]">
              {message ?? "No messages yet"}
            </Text>
          </View>
        </TouchableOpacity>
      </Link>
      <View className="h-0.5 w-[70%] bg-slate-300 self-center mb-1" />
    </>
  );
};

export default PreviewUserChat;
