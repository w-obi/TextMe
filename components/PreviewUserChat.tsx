import { formatUserChatTime } from "@/services/handleDate";
import { CURRENT_USER_ID } from "@/services/supabase";
import { Link } from "expo-router";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

const PreviewUserChat = ({
  id,
  message,
  created_at,
  sender_id,
  sender_profile_picture_url,
  sender_username,
  receiver_id,
  receiver_profile_picture_url,
  receiver_username,
}: PreviewUserChat) => {
  const isReceiver = CURRENT_USER_ID === sender_id ? true : false;
  const user_id: string =
    CURRENT_USER_ID === sender_id ? receiver_id : sender_id;

  return (
    <Link href={`/messages/${user_id}`} asChild>
      <TouchableOpacity className="flex flex-row border-b-4 border-slate-700 p-4">
        <Image
          className="w-14 h-14 rounded-full"
          source={
            isReceiver
              ? receiver_profile_picture_url
                ? { uri: receiver_profile_picture_url }
                : require("../assets/images/empty_profile.png")
              : sender_profile_picture_url
                ? { uri: sender_profile_picture_url }
                : require("../assets/images/empty_profile.png")
          }
        />
        <View className="flex flex-col ml-4">
          <View className="flex flex-row">
            <Text className="text-2xl font-bold">
              {isReceiver ? receiver_username : sender_username}
            </Text>
            <Text className="ml-10 mt-2">
              {formatUserChatTime(created_at) ?? null}
            </Text>
          </View>
          <Text numberOfLines={1}>{message ?? "No messages yet"}</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );
};

export default PreviewUserChat;
