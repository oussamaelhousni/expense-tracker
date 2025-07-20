import { colors } from "@/constants/theme";
import { ScreenWrapperProps } from "@/types";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ScreenWrapper = ({ style, children }: ScreenWrapperProps) => {
  const { top: paddingTop } = useSafeAreaInsets();

  return (
    <View
      style={[
        {
          paddingTop: paddingTop + 10,
          backgroundColor: colors.neutral900,
          flex: 1,
        },
        style,
      ]}
    >
      <StatusBar style="light" />
      {children}
    </View>
  );
};

export default ScreenWrapper;
