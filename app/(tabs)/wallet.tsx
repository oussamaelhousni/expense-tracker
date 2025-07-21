import Loading from "@/components/Loading";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import WalletListItem from "@/components/WalletListItem";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import React, { useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";

const wallet = () => {
  const router = useRouter();
  const { user } = useAuth();
  const {
    data: wallets,
    isLoading,
    error,
  } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const totalBalance = useMemo(
    () => wallets.reduce((acc, item) => item?.amount ?? 0 + acc, 0),
    [wallets]
  );

  return (
    <ScreenWrapper style={{ backgroundColor: "black" }}>
      <View style={styles.container}>
        <View style={styles.balanceView}>
          <Typo fontWeight={600} size={45}>
            ${totalBalance.toFixed(2)}
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
          {isLoading && <Loading />}
          <FlatList
            data={wallets}
            keyExtractor={(item) => item.id!}
            contentContainerStyle={styles.listStyle}
            renderItem={({ item, index }) => {
              return <WalletListItem wallet={item} index={index} />;
            }}
          />
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
  listStyle: {
    paddingVertical: spacingY._25,

    gap: 10,
  },
});

export default wallet;
