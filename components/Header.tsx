import { spacingX, spacingY } from "@/constants/theme";
import { HeaderProps } from "@/types";
import React from "react";
import { StyleSheet, View } from "react-native";
import Typo from "./Typo";

const Header = ({ title, style, leftIcon, rightIcon }: HeaderProps) => {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && <View>{leftIcon}</View>}
      <Typo
        size={20}
        color="white"
        fontWeight={800}
        style={{
          width: leftIcon ? "80%" : "100%",
          textAlign: "center",
        }}
      >
        {title}
      </Typo>

      {rightIcon && <View>{rightIcon}</View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",

    alignItems: "center",
    gap: spacingX._10,
    paddingVertical: spacingY._10,
  },

  leftIcon: { alignSelf: "flex-start" },
});
export default Header;
