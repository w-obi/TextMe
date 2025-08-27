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
      <View
        className="rounded-2xl px-4 py-2 max-w-[70%]"
        style={
          CURRENT_USER_ID == sender_id
            ? { backgroundColor: "#1e40af" }
            : { backgroundColor: "#334155" }
        }
      >
        <Text className="text-white text-base flex-wrap">{message}</Text>
        <Text className="text-white mt-1 text-xs self-end">
          {formatChat(created_at) ?? null}
        </Text>
      </View>
    </View>
  );
};

export default MessageComp;
