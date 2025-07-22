import { expenseCategories } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { TransactionListType } from "@/types";
import { verticalScale } from "@/utils/styling";
import React from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import Loading from "./Loading";
import Typo from "./Typo";
function getFormattedDate(date: Date) {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", ...
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
      {data.length === 0 && "No transactions added yet"}
      {!loading && (
        <FlatList
          data={data}
          keyExtractor={(item) => item.id as string}
          contentContainerStyle={styles.listContainer}
          renderItem={({ item, index }) => {
            const category = expenseCategories["entertainment"];
            return (
              <TouchableOpacity style={styles.transactionContainer}>
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
                    {category.value}
                  </Typo>
                </View>
                <View style={{ marginLeft: "auto" }}>
                  <Typo
                    size={14}
                    fontWeight={800}
                    color={item.type === "expense" ? "red" : "green"}
                  >
                    {item.type === "expense" ? "+" : "-"} {"$"}
                    {item.amount ?? 0}
                  </Typo>
                  <Typo size={12} color={colors.neutral500}>
                    {getFormattedDate(new Date())}
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
