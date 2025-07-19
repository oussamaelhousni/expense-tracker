import { colors, radius } from "@/constants/theme";
import { CustomButtonProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Loading from "./Loading";

const Button = ({ children, onPress, style, loading }: CustomButtonProps) => {
  if (loading) {
    return (
      <View style={[styles.button, style, { backgroundColor: "transparent" }]}>
        {/*Loading*/}
        <Loading />
      </View>
    );
  }
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={onPress}
      disabled={loading}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.primary,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius._17,
    height: verticalScale(52),
  },
});
export default Button;
