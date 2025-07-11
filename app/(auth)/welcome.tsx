import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const welcome = () => {
  return (
    <ScreenWrapper style={{ backgroundColor: colors.neutral800 }}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.signInButton}>
            <Typo>Sign in</Typo>
          </TouchableOpacity>
          <Image
            source={require("@/assets/images/welcome.png")}
            style={styles.wecoleImage}
          />
        </View>
        {/*Footer*/}
        <View style={styles.footer}>
          <View>
            <Typo
              fontWeight={800}
              style={{
                textAlign: "center",
              }}
              size={30}
            >
              Always Take Control
            </Typo>
            <Typo
              fontWeight={800}
              style={{
                textAlign: "center",
              }}
              size={30}
            >
              of your finances
            </Typo>
          </View>
          <View>
            <Typo size={15} style={{ textAlign: "center" }}>
              Finances must be arranged to set a better
            </Typo>
            <Typo size={15} style={{ textAlign: "center" }}>
              lifestyle on future
            </Typo>
          </View>
          <Button onPress={() => console.log("Hello A sat")} loading={false}>
            <Typo color={colors.neutral900} size={18} fontWeight={700}>
              Get Started
            </Typo>
          </Button>
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    paddingTop: spacingY._10,
    alignItems: "center",
    flex: 1,
    paddingHorizontal: spacingX._15,
  },
  signInButton: {
    alignSelf: "flex-end",
    backgroundColor: colors.neutral700,
    paddingHorizontal: spacingX._12,
    paddingVertical: spacingY._5,
    borderRadius: radius._6,
  },
  wecoleImage: {
    width: "100%",
    height: verticalScale(300),
    alignSelf: "center",
    objectFit: "contain",
    marginTop: spacingY._50,
  },
  footer: {
    backgroundColor: colors.neutral900,
    padding: spacingX._30,
    alignItems: "center",
    gap: spacingY._30,
  },
});
export default welcome;
