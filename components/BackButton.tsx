import { colors, radius } from "@/constants/theme";
/* import { CaretLeftIcon } from "phosphor-react-native"; */

import { BackButtonProps } from "@/types";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
const BackButton = ({ style = {}, iconSize = 22 }: BackButtonProps) => {
  const router = useRouter();
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => {
        router.back();
      }}
    >
      <AntDesign name="left" size={iconSize} color="white" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.neutral600,
    borderRadius: radius._10,
    alignSelf: "flex-start",
    padding: 8,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default BackButton;
