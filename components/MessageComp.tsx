import { formatChat } from "@/services/handleDate";
import { CURRENT_USER_ID } from "@/services/supabase";
import React from "react";
import { Text, View } from "react-native";

const MessageComp = ({ created_at, message, sender_id }: MessageComp) => {
  return (
    <View
      className="flex flex-row p-4 mt-1"
      style={
        CURRENT_USER_ID == sender_id
          ? { justifyContent: "flex-end" }
          : { justifyContent: "flex-start" }
      }
    >
      <View className="bg-slate-700 rounded-full flex flex-row px-6 py-2 justify-center items-center">
        <Text className="text-white text-lg">{message}</Text>
        <Text className="text-white ml-3">
          {formatChat(created_at) ?? null}
        </Text>
      </View>
    </View>
  );
};

export default MessageComp;
