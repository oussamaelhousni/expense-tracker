import CustomTabs from "@/components/CustomTabs";
import { Tabs } from "expo-router";
import React from "react";

const _layout = () => {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={CustomTabs}>
      <Tabs.Screen name="index"></Tabs.Screen>
      <Tabs.Screen name="profile"></Tabs.Screen>
      <Tabs.Screen name="statistics"></Tabs.Screen>
      <Tabs.Screen name="wallets"></Tabs.Screen>
    </Tabs>
  );
};

export default _layout;
