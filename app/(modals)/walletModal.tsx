import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import UploadImage from "@/components/UploadImage";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { createOrUpdateWallet, deleteWallet } from "@/services/walletService";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

const walletModal = () => {
  const { user } = useAuth();
  const router = useRouter();

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
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header
          title={oldWallet?.id ? "Update Wallet" : "New Wallet"}
          leftIcon={<BackButton />}
        />
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Typo size={14} color={colors.neutral300}>
              Wallet Name :
            </Typo>
            <Input
              placeholder="Enter Wallet name"
              value={walletData.name}
              onChangeText={(text) =>
                setWalletData({ ...walletData, name: text })
              }
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
  },
});

export default walletModal;
