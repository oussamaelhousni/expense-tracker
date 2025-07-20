import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, radius, spacingX } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
const wallet = () => {
  const router = useRouter();
  return (
    <ScreenWrapper style={{ backgroundColor: "black" }}>
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <Typo fontWeight={600} size={45}>
            $14450.20
          </Typo>
          <Typo size={14} color={colors.neutral500}>
            Total Balance
          </Typo>
        </View>
        <View style={styles.wallets}>
          {/*Header*/}
          <View style={styles.walletsHeader}>
            <Typo fontWeight={500}>My Wallets</Typo>
            <TouchableOpacity onPress={() => router.push("/walletModal")}>
              <AntDesign name="pluscircle" size={30} color={colors.primary} />
            </TouchableOpacity>
          </View>
          {/*TODO: Wallet list*/}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  balanceView: {
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(160),
  },
  wallets: {
    flex: 1,
    backgroundColor: colors.neutral800,
    borderTopEndRadius: radius._15,
    borderTopStartRadius: radius._15,
    paddingHorizontal: spacingX._20,
    paddingTop: spacingX._20,
  },
  walletsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default wallet;
