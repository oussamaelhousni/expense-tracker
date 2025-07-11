import { colors } from "@/constants/theme";
import React from "react";
import {
  ActivityIndicator,
  ActivityIndicatorProps,
  StyleSheet,
  View,
} from "react-native";

const Loading = ({
  color = colors.primary,
  size = "large",
}: ActivityIndicatorProps) => {
  return (
    <View style={[styles.container]}>
      <ActivityIndicator color={color} size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Loading;
