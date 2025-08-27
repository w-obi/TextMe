import MessageComp from "@/components/MessageComp";
import Search from "@/components/Search";
import TextUserButton from "@/components/TextUserButton";
import TopBar from "@/components/TopBar";
import { groupMessagesByDay } from "@/services/handleDate";
import { fetchChat, fetchUserProfile, sendMessage } from "@/services/supabase";
import useFetch from "@/services/useFetch";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ImageBackground,
  SectionList,
  Text,
  View,
} from "react-native";

const ChatDetails = () => {
  const [isTopBar, setIsTopBar] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [newMessage, setNewMessage] = useState<string>("");

  const { user_id } = useLocalSearchParams();
  const router = useRouter();

  const handleSendMessage = async (
    message: string | null,
    document_title: string | null,
    storage_path: string | null,
    receiver_id: string
  ) => {
    try {
      await sendMessage(message, document_title, storage_path, receiver_id);
      setNewMessage("");
      refetchMessages();
    } catch (err) {
      console.log(err);
    }
  };

  const {
    data: messages,
    loading: messagesLoading,
    error: messagesError,
    fetchData: refetchMessages,
  } = useFetch(() => fetchChat(user_id as string));

  useEffect(() => {
    if (user_id) refetchMessages();
  }, [user_id]);

  const { data: user } = useFetch(() => fetchUserProfile(user_id as string));

  const sections = groupMessagesByDay(messages);
  return (
    <ImageBackground
      source={require("../../assets/images/chats.png")}
      className="flex-1"
      resizeMode="cover"
    >
      {isTopBar ? (
        <TopBar
          bgColor="#334155"
          textColor="#ffffff"
          isSearchPresent={true}
          enableSearch={() => setIsTopBar(false)}
          exit={() => router.push("/(tabs)/chats")}
          isProfilePresent={true}
          profile_picture_url={user?.profile_picture_url}
          username={user?.username}
        ></TopBar>
      ) : (
        <Search
          placeholder="Search"
          value={searchQuery}
          onChangeText={(text: string) => setSearchQuery(text)}
          disableSearch={() => setIsTopBar(true)}
          bgColor="#334155"
        />
      )}
      {messagesLoading ? (
        <ActivityIndicator size="large" color="#334155" className="my-3" />
      ) : messagesError ? (
        <View className="justify-center items-center">
          <Text className="text-white font-bold">
            Chats.tsx error: {String(messagesError)}
          </Text>
        </View>
      ) : (
        <SectionList
          sections={sections}
          renderSectionHeader={({ section }) => (
            <View className="bg-secondary mt-9 w-32 h-14 rounded-2xl justify-center items-center self-center mb-8">
              <Text className="text-white font-bold">{section.title}</Text>
            </View>
          )}
          renderItem={({ item }) => <MessageComp {...item} />}
          keyExtractor={(item) => item.id}
          ListEmptyComponent={
            !messagesLoading &&
            !messagesError &&
            (!messages || messages.length === 0) ? (
              <View className="justify-center items-center mt-60">
                <Text className="text-white font-bold">
                  No messages, send a new one!
                </Text>
              </View>
            ) : null
          }
        />
      )}
      <TextUserButton
        placeholder="Enter message"
        value={newMessage}
        onChangeText={(text) => setNewMessage(text)}
        bgColor="#334155"
        isTextPresent={newMessage.length > 0}
        onPressEnter={() =>
          handleSendMessage(newMessage, null, null, user_id as string)
        }
      />
    </ImageBackground>
  );
};

export default ChatDetails;
