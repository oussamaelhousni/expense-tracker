import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
const index = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/welcome");
    }, 3000);
  }, []);
  return (
    <View style={style.container}>
      <Image
        source={require("@/assets/images/splashImage.png")}
        style={style.logo}
      />
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.neutral900,
  },
  logo: {
    height: "20%",
    objectFit: "contain",
  },
});

export default index;
