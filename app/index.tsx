import ScreenWrapper from "@/components/ScreenWrapper";
import { colors } from "@/constants/theme";
import { useRouter } from "expo-router";
import React, { useEffect } from "react";
import { Image, StyleSheet } from "react-native";
const index = () => {
  const router = useRouter();

  useEffect(() => {
    const id = setTimeout(() => {
      router.push("/welcome");
    }, 0);

    return () => clearImmediate(id);
  }, [router]);
  return (
    <ScreenWrapper style={style.container}>
      <Image
        source={require("@/assets/images/splashImage.png")}
        style={style.logo}
      />
    </ScreenWrapper>
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
