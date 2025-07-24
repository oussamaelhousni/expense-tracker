import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import UploadImage from "@/components/UploadImage";
import { expenseCategories, transactionTypes } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { deleteWallet } from "@/services/walletService";
import { TransactionType, WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
const data = [
  { label: "Item 1", value: "1" },
  { label: "Item 2", value: "2" },
  { label: "Item 3", value: "3" },
  { label: "Item 4", value: "4" },
  { label: "Item 5", value: "5" },
  { label: "Item 6", value: "6" },
  { label: "Item 7", value: "7" },
  { label: "Item 8", value: "8" },
];
const TransactionModal = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [transaction, setTransaction] = useState<TransactionType>({
    id: "",
    type: "income",
    amount: 0,
    category: "",
    date: new Date(),
    description: "",
    image: null,
    uid: "string",
    walletId: "",
  });

  const [showDatePicker, setShowDatePicker] = useState(false);

  const { data: wallets } = useFetchData<WalletType>("wallets", [
    where("uid", "==", user?.uid),
    orderBy("created", "desc"),
  ]);

  const oldWallet = useLocalSearchParams();
  const [walletData, setWalletData] = useState<WalletType>({
    name: "",
    image: "",
    uid: user?.uid,
  });

  const [isLoading, setIsloading] = useState(false);

  const onSelect = (file: any) => setWalletData({ ...walletData, image: file });
  const onClear = () => setWalletData({ ...walletData, image: null });
  const showDeleteAlert = () => {
    Alert.alert("Confirm", "Are you sure you want to delete this transaction", [
      {
        text: "Cancel",
        style: "cancel",
        onPress: () => {
          console.log("canceled");
        },
      },
      {
        text: "Delete",
        style: "destructive",
        onPress: async () => {
          setIsloading(true);
          deleteWallet(oldWallet?.id as string);
          setIsloading(false);
          router.back();
        },
      },
    ]);
  };
  const onSubmit = async () => {
    const { type, category, walletId, date, description, amount, image } =
      transaction;

    if (!walletId || !amount || !type || (type === "expense" && !category)) {
      console.log(transaction);
      Alert.alert("Transaction error", "Please fill all fields");
      return;
    }

    const transactionData: TransactionType = {
      uid: user?.uid,
      type,
      category,
      walletId,
      date,
      description,
      amount,
      image,
    };
  };

  useEffect(() => {
    if (oldWallet?.id) {
      setWalletData({
        id: oldWallet.id as string,
        name: oldWallet.name as string,
        image: oldWallet.image as string,
      });
    }
  }, []);

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? "Update Transaction" : "New Transaction"}
          leftIcon={<BackButton />}
        />
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Typo size={14} color={colors.neutral300}>
                Type :
              </Typo>
              <Dropdown
                style={[styles.dropdown]}
                activeColor={colors.neutral600}
                selectedTextStyle={styles.dropDownSelectedText}
                iconStyle={styles.dropDownIcon}
                data={transactionTypes}
                maxHeight={300}
                placeholderStyle={{ color: colors.neutral350 }}
                labelField="label"
                valueField="value"
                placeholder="Select a type"
                containerStyle={styles.dropDownContainerStyle}
                itemContainerStyle={styles.dropDownItemContainer}
                value={transaction.type}
                itemTextStyle={styles.dropDownItemText}
                onChange={(item) => {
                  console.log("item", item);
                  setTransaction({ ...transaction, type: item.value });
                }}
              />
            </View>
            {transaction.type === "expense" && (
              <View style={styles.inputContainer}>
                <Typo size={14} color={colors.neutral300}>
                  Expense Category :
                </Typo>
                <Dropdown
                  style={[styles.dropdown]}
                  activeColor={colors.neutral600}
                  selectedTextStyle={styles.dropDownSelectedText}
                  iconStyle={styles.dropDownIcon}
                  data={Object.values(expenseCategories)}
                  maxHeight={300}
                  placeholderStyle={{ color: colors.neutral350 }}
                  labelField="label"
                  valueField="value"
                  placeholder="Select an expense categoty"
                  containerStyle={styles.dropDownContainerStyle}
                  itemContainerStyle={styles.dropDownItemContainer}
                  value={transaction.category}
                  itemTextStyle={styles.dropDownItemText}
                  onChange={(item) => {
                    setTransaction({
                      ...transaction,
                      category: item.value || "",
                    });
                  }}
                />
              </View>
            )}
            <View style={styles.inputContainer}>
              <Typo size={14} color={colors.neutral300}>
                Wallet Id :
              </Typo>
              <Dropdown
                style={[styles.dropdown]}
                activeColor={colors.neutral600}
                selectedTextStyle={styles.dropDownSelectedText}
                iconStyle={styles.dropDownIcon}
                data={wallets.map((wallet) => ({
                  label: `${wallet.name}($${wallet.amount})`,
                  value: wallet.id,
                }))}
                maxHeight={300}
                placeholderStyle={{ color: colors.neutral350 }}
                labelField="label"
                valueField="value"
                placeholder="Select a type"
                containerStyle={styles.dropDownContainerStyle}
                itemContainerStyle={styles.dropDownItemContainer}
                value={transaction.walletId}
                itemTextStyle={styles.dropDownItemText}
                onChange={(item) => {
                  setTransaction({
                    ...transaction,
                    walletId: item.value || "",
                  });
                }}
              />
            </View>
            <View style={styles.inputContainer}>
              <Typo size={14} color={colors.neutral300}>
                Date :
              </Typo>

              {!showDatePicker && (
                <TouchableOpacity
                  style={styles.inputDate}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Typo size={12}>
                    {(transaction.date as Date).toLocaleDateString()}
                  </Typo>
                </TouchableOpacity>
              )}
              {showDatePicker && (
                <DateTimePicker
                  testID="dateTimePicker"
                  value={transaction.date as Date}
                  mode="date"
                  display="calendar"
                  onChange={(_, date) => {
                    setTransaction({
                      ...transaction,
                      date: (transaction.date || date) as Date,
                    });
                    setShowDatePicker(false);
                  }}
                />
              )}
            </View>
            <View style={styles.inputContainer}>
              <Typo size={14} color={colors.neutral300}>
                Amount :
              </Typo>
              <Input
                placeholder="Amount"
                value={transaction.amount?.toString()}
                keyboardType="numeric"
                onChangeText={(text) =>
                  setTransaction({
                    ...transaction,
                    amount: Number(text.replace(/[^0-9]/g, "")) || 0,
                  })
                }
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Typo size={14} color={colors.neutral300}>
                  Description{" "}
                </Typo>
                <Typo size={14} color={colors.neutral500}>
                  (optional):
                </Typo>
              </View>
              <Input
                multiline={true}
                onChangeText={(text) =>
                  setTransaction({ ...transaction, description: text })
                }
                textAlignVertical="top"
                placeholder="Description"
                containerStyle={{ height: verticalScale(100) }}
              />
            </View>
            <View style={styles.inputContainer}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Typo size={14} color={colors.neutral300}>
                  Receipt{" "}
                </Typo>
                <Typo size={14} color={colors.neutral500}>
                  (optional):
                </Typo>
              </View>
              <UploadImage
                file={walletData.image}
                onSelect={onSelect}
                onClear={onClear}
              />
            </View>
          </View>
        </ScrollView>

        <View style={styles.footer}>
          {oldWallet?.id && !isLoading && (
            <Button
              onPress={showDeleteAlert}
              loading={isLoading}
              style={styles.deleteBtn}
            >
              <Typo color={colors.neutral900} fontWeight={600}>
                <AntDesign name="delete" size={24} color="white" />
              </Typo>
            </Button>
          )}
          <Button
            onPress={onSubmit}
            loading={isLoading}
            style={{ flex: 1, width: "auto" }}
          >
            <Typo color={colors.neutral900} fontWeight={600}>
              {oldWallet?.id ? "Update Trasaction" : "Add Transaction"}
            </Typo>
          </Button>
        </View>
      </View>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  form: {
    flex: 1,
    marginTop: verticalScale(30),
    paddingBottom: 30,
    gap: 30,
  },
  inputContainer: { gap: spacingY._7 },
  footer: {
    paddingVertical: spacingY._15,
    flexDirection: "row",
    gap: spacingX._10,
  },
  deleteBtn: {
    backgroundColor: "red",

    width: "15%",
  }, //dropDown
  dropdown: {
    height: verticalScale(50),
    borderColor: colors.neutral500,
    borderWidth: 1,
    borderRadius: radius._10,
    paddingHorizontal: spacingX._15,
  },
  dropDownSelectedText: {
    fontSize: verticalScale(14),
    color: "white",
    borderRadius: radius._10,
  },
  dropDownItemText: {
    fontSize: verticalScale(14),
    color: "white",
    borderRadius: radius._10,
  },
  dropDownIcon: {
    height: 22,
    tintColor: "white",
  },
  dropDownContainerStyle: {
    backgroundColor: colors.neutral900,
    borderRadius: radius._10,
    padding: 5,
  },
  dropDownItemContainer: {
    borderRadius: radius._10,
  },
  activeItem: {},
  inputDate: {
    height: verticalScale(50),
    borderColor: colors.neutral500,
    borderWidth: 1,
    borderRadius: radius._10,
    paddingHorizontal: spacingX._15,

    justifyContent: "center",
  },
});

export default TransactionModal;
