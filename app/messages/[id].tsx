import Search from "@/components/Search";
import TopBar from "@/components/TopBar";
import React, { useState } from "react";
import { View } from "react-native";

const Messages = () => {
  const [isTopBar, setIsTopBar] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

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
    </View>
  );
};

export default Messages;
