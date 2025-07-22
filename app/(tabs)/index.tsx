import ScreenWrapper from "@/components/ScreenWrapper";
import StatsCard from "@/components/StatsCard";
import TransactionsList from "@/components/TransactionsList";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Home = () => {
  const router = useRouter();
  const { user } = useAuth();

  const [isLoading, setIsloading] = useState(false);

  const openTransactionModel = () => router.push("/(modals)/transactionModal");
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Typo size={14} color={colors.neutral400}>
              Hello,
            </Typo>
            <Typo fontWeight={500}>{user?.name}</Typo>
          </View>
          <TouchableOpacity style={styles.searchBtn}>
            <AntDesign name="search1" size={25} color="white" />
          </TouchableOpacity>
        </View>
        <StatsCard />

        <TransactionsList
          loading={isLoading}
          title="Recent transactions"
          data={[]}
        />
        <TouchableOpacity
          style={styles.floatingButton}
          onPress={openTransactionModel}
        >
          <Entypo name="plus" size={30} color={colors.neutral900} />
        </TouchableOpacity>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
    gap: spacingY._20,
    position: "relative",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  searchBtn: {
    backgroundColor: colors.neutral600,
    height: verticalScale(40),

    borderRadius: 1000,
    width: verticalScale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  imageCardContainer: {
    width: "100%",
    aspectRatio: "16/10",
    position: "relative",
  },

  infoContainer: {
    position: "absolute",
    top: 0,
    width: "100%",
    left: 0,
    paddingHorizontal: spacingX._15,
    paddingVertical: spacingX._15,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  icon: {
    backgroundColor: colors.neutral300,
    width: 25,
    height: 25,
    borderRadius: 1000,
    justifyContent: "center",
    alignItems: "center",
  },
  expenseIncomeContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._5,
    marginTop: verticalScale(15),
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: verticalScale(20),
  },
  floatingButton: {
    position: "absolute",
    backgroundColor: colors.primary,
    width: verticalScale(45),
    height: verticalScale(45),
    bottom: verticalScale(20),
    right: verticalScale(20),
    zIndex: 100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
  },
});
export default Home;
