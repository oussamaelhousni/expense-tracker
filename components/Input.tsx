import { colors, radius, spacingX } from "@/constants/theme";
import { InputProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { StyleSheet, TextInput, View } from "react-native";

const Input = ({ placeholder, icon, inputRef, ...props }: InputProps) => {
  return (
    <View style={[styles.containerStyle]}>
      {icon}
      <TextInput
        ref={inputRef}
        style={[styles.inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={colors.neutral300}
        {...props}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    height: verticalScale(50),
    borderWidth: 1,
    borderColor: colors.neutral600,
    borderRadius: radius._15,
    alignItems: "center",
    paddingHorizontal: spacingX._10,
    flexDirection: "row",
    gap: spacingX._5,
  },
  inputStyle: {
    flex: 1,
    color: colors.white,
    fontSize: verticalScale(14),
  },
});
export default Input;
