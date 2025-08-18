import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

const TabIcon = ({ focused, iconFocus, iconNotFocus, title }: any) => {
  const IconComponent = focused ? iconFocus : iconNotFocus;

  return (
    <View
      className={
        focused
          ? "flex flex-row flex-1 min-w-[112px] min-h-48 mt-4 justify-center items-center overflow-hidden"
          : "size-full justify-center items-center mt-4"
      }
    >
      {IconComponent}
      {focused && (
        <Text className="text-secondary text-base font-semibold ml-2">
          {title}
        </Text>
      )}
    </View>
  );
};

const _layout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: 52,
          backgroundColor: "#2f0000",
          marginHorizontal: 20,
          marginBottom: 36,
          borderColor: "#0f0d23",
        },
      }}
    >
      <Tabs.Screen
        name="chats"
        options={{
          title: "Chats",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                iconFocus={
                  <MaterialIcons name="message" size={24} color="black" />
                }
                iconNotFocus={
                  <Feather name="message-square" size={24} color="black" />
                }
                title="Chats"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="posts"
        options={{
          title: "Posts",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                iconFocus={
                  <Entypo
                    name="text-document-inverted"
                    size={24}
                    color="black"
                  />
                }
                iconNotFocus={
                  <Entypo name="text-document" size={24} color="black" />
                }
                title="Posts"
              />
            );
          },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Settings",
          headerShown: false,
          tabBarIcon: ({ focused }) => {
            return (
              <TabIcon
                focused={focused}
                iconFocus={
                  <Ionicons name="settings-sharp" size={24} color="black" />
                }
                iconNotFocus={
                  <Ionicons name="settings-outline" size={24} color="black" />
                }
                title="Settings"
              />
            );
          },
        }}
      />
    </Tabs>
  );
};

export default _layout;
