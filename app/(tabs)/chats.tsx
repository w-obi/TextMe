import AddButton from "@/components/AddButton";
import AddContactInput from "@/components/AddContactInput";
import PreviewUserChat from "@/components/PreviewUserChat";
import Search from "@/components/Search";
import TopBar from "@/components/TopBar";
import { addContacts, fetchUsersChat } from "@/services/supabase";
import useFetch from "@/services/useFetch";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  ImageBackground,
  Text,
  View,
} from "react-native";

const Chats = () => {
  const [isTopBar, setIsTopBar] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [isContactAdded, setIsContactAdded] = useState<boolean>(false);
  const [contactInput, setContactInput] = useState<string>("");
  const [isPressed, setIsPressed] = useState<boolean>(false);

  const router = useRouter();

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
      console.log(err);
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
    <ImageBackground
      source={require("../../assets/images/external.png")}
      className="flex-1"
      resizeMode="cover"
    >
      {isTopBar ? (
        <TopBar
          bgColor="#334155"
          textColor="#ffffff"
          isSearchPresent={true}
          enableSearch={() => setIsTopBar(false)}
          exit={() => router.push("/reg")}
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
        <ActivityIndicator size="large" color="#334155" className="my-3" />
      ) : usersChatError ? (
        <View className="justify-center items-center">
          <Text className="text-white font-bold">
            Chats.tsx error: {String(usersChatError)}
          </Text>
        </View>
      ) : (
        <FlatList
          data={usersChat}
          renderItem={({ item }) => <PreviewUserChat {...item} />}
          keyExtractor={(item) => item.id ?? item.chat_id}
          ListEmptyComponent={
            !usersChatLoading &&
            !usersChatError &&
            (!usersChat || usersChat.length === 0) ? (
              <View className="justify-center items-center mt-60">
                <Text className="text-white font-bold">
                  Add contact to see chats
                </Text>
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
        <AddButton onPress={() => setIsPressed(true)} bgColor="#581c87" />
      )}
    </ImageBackground>
  );
};

export default Chats;
