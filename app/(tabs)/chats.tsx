import AddButton from "@/components/AddButton";
import AddContactInput from "@/components/AddContactInput";
import PreviewUserChat from "@/components/PreviewUserChat";
import Search from "@/components/Search";
import TopBar from "@/components/TopBar";
import { addContacts, fetchUsersChat } from "@/services/supabase";
import useFetch from "@/services/useFetch";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";

const Chats = () => {
  const [isTopBar, setIsTopBar] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isContactAdded, setIsContactAdded] = useState<boolean>(false);
  const [contactInput, setContactInput] = useState<string>("");
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const {
    data: usersChat,
    loading: usersChatLoading,
    error: usersChatError,
    fetchData: refetch,
  } = useFetch(fetchUsersChat);

  const addNewContact = async (contactInput: string) => {
    try {
      await addContacts(contactInput);
    } catch (err) {
      throw err;
    } finally {
      setIsPressed(false);
      setContactInput("");
      setIsContactAdded(true);
    }
  };

  useEffect(() => {
    if (isContactAdded) {
      refetch();
      setIsContactAdded(false);
    }
  }, [isContactAdded]);

  return (
    <View className="bg-white size-full">
      {isTopBar ? (
        <TopBar
          bgColor="#334155"
          textColor="#ffffff"
          isSearchPresent={true}
          enableSearch={() => setIsTopBar(false)}
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
      {usersChatLoading ? (
        <ActivityIndicator size="large" color="334155" className="my-3" />
      ) : usersChatError ? (
        <View className="justify-center items-center">
          <Text className="text-gray-500">
            Chats.tsx error: {String(usersChatError)}
          </Text>
        </View>
      ) : (
        <FlatList
          data={usersChat}
          renderItem={({ item }) => (
            <PreviewUserChat
              {...item}
              onPress={() => router.push("/messages/[id]")}
            />
          )}
          keyExtractor={(item) => item.user_id ?? Math.random()}
          ListEmptyComponent={
            !usersChatLoading &&
            !usersChatError &&
            (!usersChat || usersChat.length === 0) ? (
              <View className="justify-center items-center mt-60">
                <Text className="text-gray-500">Add contact to see chats</Text>
              </View>
            ) : null
          }
        />
      )}
      {isPressed ? (
        <AddContactInput
          onChangeText={(text) => setContactInput(text)}
          value={contactInput}
          onPress={() => addNewContact(contactInput)}
          onPress2={() => setIsPressed(false)}
        />
      ) : (
        <AddButton onPress={() => setIsPressed(true)} bgColor="#334155" />
      )}
    </View>
  );
};

export default Chats;
