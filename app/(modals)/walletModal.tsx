import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import UploadImage from "@/components/UploadImage";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { createOrUpdateWallet } from "@/services/walletService";
import { WalletType } from "@/types";
import { verticalScale } from "@/utils/styling";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";

const walletModal = () => {
  const router = useRouter();
  const [walletData, setWalletData] = useState<WalletType>({
    name: "",
    image: "",
  });

  const [isLoading, setIsloading] = useState(false);

  const onSelect = (file: any) => setWalletData({ ...walletData, image: file });
  const onClear = () => setWalletData({ ...walletData, image: null });

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
  return (
    <ModalWrapper>
      <View style={styles.container}>
        <Header title="New Wallet" leftIcon={<BackButton />} />
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
          <Button onPress={onSubmit} loading={isLoading}>
            <Typo color={colors.neutral900} fontWeight={600}>
              Add wallet
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
  },
});

export default walletModal;
