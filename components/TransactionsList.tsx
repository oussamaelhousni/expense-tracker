import { expenseCategories, incomeCategory } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { TransactionListType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { router } from "expo-router";
import { Timestamp } from "firebase/firestore";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Loading from "./Loading";
import Typo from "./Typo";
function getFormattedDate(date: Date | string) {
  date = new Date(date);
  const day = date.getDate();
  const month = date?.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", ...
  return `${day} ${month}`;
}

export default function TransactionsList({
  loading,
  title,
  data,
}: TransactionListType) {
  return (
    <View style={{ flex: 1 }}>
      {title && <Typo fontWeight={600}>{title}</Typo>}
      {loading && <Loading />}
      {data.length === 0 && (
        <View style={{ marginTop: 12 }}>
          <Typo color={colors.neutral500} size={12}>
            No transaction added yet!
          </Typo>
        </View>
      )}
      {!loading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id as string}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item }) => {
            const date = (item.date as Timestamp)?.toDate();
            const category =
              item.type === "income"
                ? incomeCategory
                : expenseCategories[item.category as string];
            return (
              <TouchableOpacity
                style={styles.transactionContainer}
                onPress={() => {
                  router.push({
                    pathname: "/(modals)/transactionModal",
                    params: {
                      ...item,
                      id: item.id,
                      date: date.toISOString(),
                    },
                  });
                }}
              >
                <View
                  style={[
                    styles.lightIcon,
                    { backgroundColor: category.bgColor },
                  ]}
                >
                  {category.icon()}
                </View>

                <View>
                  <Typo size={14} fontWeight={500}>
                    {category.label}
                  </Typo>
                  <Typo size={12} color={colors.neutral500}>
                    {item.description}
                  </Typo>
                </View>
                <View style={{ marginLeft: "auto" }}>
                  <Typo
                    size={14}
                    fontWeight={800}
                    color={item.type === "income" ? "green" : "red"}
                  >
                    {item.type === "income" ? "+" : "-"} {"$"}
                    {item.amount ?? 0}
                  </Typo>
                  <Typo size={12} color={colors.neutral500}>
                    {getFormattedDate(date)}
                  </Typo>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  lightIcon: {
    width: verticalScale(40),
    height: verticalScale(40),
    backgroundColor: "#f1c40f",
    borderRadius: radius._10,
    justifyContent: "center",
    alignItems: "center",
  },
  listContainer: {
    marginTop: spacingY._10,
    gap: spacingY._10,

    paddingBottom: verticalScale(20),
  },
  transactionContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacingX._10,
  },
});
