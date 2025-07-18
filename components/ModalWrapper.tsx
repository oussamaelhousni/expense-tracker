import { colors } from "@/constants/theme";
import { ModalWrapperProps } from "@/types";
import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const isIos = Platform.OS === "ios";
const ModalWrapper = ({
  style = {},
  bg = colors.neutral900,
  children,
}: ModalWrapperProps) => {
  const { top: paddingTop, bottom: paddingBottom } = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: bg, paddingTop, paddingBottom },
        style,
      ]}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default ModalWrapper;
