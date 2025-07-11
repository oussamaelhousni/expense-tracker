import { colors } from "@/constants/theme";
import { TypoProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Text, TextStyle } from "react-native";

const Typo = ({
  children,
  size = 18,
  color = colors.text,
  fontWeight = "400",
  style,
  textProps,
}: TypoProps) => {
  const textSyle: TextStyle = {
    fontWeight,
    fontSize: verticalScale(size),
    color: color,
  };
  return (
    <Text style={[textSyle, style]} {...textProps}>
      {children}
    </Text>
  );
};

export default Typo;
