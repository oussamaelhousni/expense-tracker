import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import UploadImage from "@/components/UploadImage";
import { transactionTypes } from "@/constants/data";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import useFetchData from "@/hooks/useFetchData";
import { createOrUpdateWallet, deleteWallet } from "@/services/walletService";
import { TransactionType, WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import { orderBy, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
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
    type: "string",
    amount: 0,
    category: "expense",
    date: new Date(),
    description: "",
    image: null,
    uid: "string",
    walletId: "",
  });

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
    Alert.alert("Confirm", "Are you sure you want to delete this wallet", [
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
    const { name, image } = walletData;
    if (!name.trim() || !image) {
      return Alert.alert("Wallet Error", "Please fill all the fields");
    }
    setIsloading(true);
    const res = await createOrUpdateWallet(walletData);
    setIsloading(false);
    if (!res.success) {
      return Alert.alert("Wallet Error", res.msg);
    }
    router.back();
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
  console.log("oldWallet", oldWallet);
  const [type, setValue] = useState(null);

  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? "Update Transaction" : "New Transaction"}
          leftIcon={<BackButton />}
        />
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
              value={transaction.category}
              itemTextStyle={styles.dropDownItemText}
              onChange={(item) => {
                setTransaction({ ...transaction, category: item });
              }}
            />
          </View>
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
                setTransaction({ ...transaction, walletId: item || "" });
              }}
            />
          </View>
          <View style={styles.inputContainer}>
            <Typo size={14} color={colors.neutral300}>
              Wallet Icon :
            </Typo>
            <UploadImage
              file={walletData.image}
              onSelect={onSelect}
              onClear={onClear}
            />
          </View>
        </View>

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
              {oldWallet?.id ? "Update Wallet" : "Add wallet"}
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
    gap: spacingY._20,
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
});

export default TransactionModal;
