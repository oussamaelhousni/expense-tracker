import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import React from "react";
import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
export default function StatsCard() {
  return (
    <ImageBackground
      source={require("@/assets/images/card.png")}
      style={styles.imageCardContainer}
      resizeMode="stretch"
    >
      <View style={styles.infoContainer}>
        <View style={styles.cardHeader}>
          <View>
            <Typo color={colors.neutral500} fontWeight={600}>
              Total Balance
            </Typo>
            <Typo color={colors.neutral900} fontWeight={800} size={30}>
              $2343.23
            </Typo>
          </View>
          <TouchableOpacity>
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.cardFooter}>
          <View
            style={{
              alignItems: "center",
              alignSelf: "flex-start",
            }} /* style={styles.cardHeader} */
          >
            <View style={styles.expenseIncomeContainer}>
              <TouchableOpacity style={styles.icon}>
                <AntDesign name="arrowup" size={18} color={colors.neutral900} />
              </TouchableOpacity>
              <Typo color={colors.neutral900} size={15} fontWeight={500}>
                Income
              </Typo>
            </View>
            <Typo size={16} fontWeight={600} color={"green"}>
              $300
            </Typo>
          </View>
          <View
            style={{
              alignItems: "center",
              alignSelf: "flex-start",
            }} /* style={styles.cardHeader} */
          >
            <View style={styles.expenseIncomeContainer}>
              <TouchableOpacity style={styles.icon}>
                <AntDesign
                  name="arrowdown"
                  size={18}
                  color={colors.neutral900}
                />
              </TouchableOpacity>
              <Typo color={colors.neutral900} size={15} fontWeight={500}>
                Expense
              </Typo>
            </View>
            <Typo size={16} color={"red"} fontWeight={600}>
              $300
            </Typo>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
}
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
