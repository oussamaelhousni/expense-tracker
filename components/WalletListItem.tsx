import { colors, radius, spacingX } from "@/constants/theme";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import Typo from "./Typo";
const WalletListItem = ({
  wallet,
  index,
}: {
  wallet: WalletType;
  index: number;
}) => {
  const router = useRouter();
  const openWallet = () => {
    router.push({
      pathname: "/walletModal",
      params: {
        id: wallet.id,
        image: wallet.image,
        name: wallet.name,
      },
    });
  };
  return (
    <Animated.View
      entering={FadeInDown.springify()
        .duration(500)
        .delay(index * 50)
        .damping(10)}
    >
      <TouchableOpacity style={styles.container} onPress={openWallet}>
        <View style={styles.imageContainer}>
          <Image
            source={wallet.image}
            style={{
              flex: 1,
              borderRadius: radius._15,
              overflow: "hidden",
              objectFit: "cover",
            }}
          />
        </View>
        <View>
          <Typo size={16}>{wallet.name}</Typo>
          <Typo size={12} color={colors.neutral500}>
            ${wallet.amount}
          </Typo>
        </View>
        <AntDesign
          name="right"
          size={18}
          color={colors.neutral500}
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", gap: spacingX._10 },
  imageContainer: {
    width: verticalScale(45),
    height: verticalScale(45),
  },
});
export default WalletListItem;
