import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Header from "@/components/Header";
import Input from "@/components/Input";
import ModalWrapper from "@/components/ModalWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { getProfileImage } from "@/services/profileImageService";
import { verticalScale } from "@/utils/styling";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import React from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
const profileModal = () => {
  const { user } = useAuth();
  return (
    <ModalWrapper style={styles.container}>
      <Header leftIcon={<BackButton />} title="Edit" />
      <ScrollView contentContainerStyle={styles.form}>
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={getProfileImage(user?.image)} />
          <TouchableOpacity style={[styles.uploadImageIcon, styles.shadowBox]}>
            <Feather name="edit-2" size={15} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Typo size={14} color={colors.neutral350}>
            Name :
          </Typo>
          <Input placeholder="Update your  name" value={user?.name ?? ""} />
        </View>

        <View style={styles.footer}>
          <Button>
            <Typo color={colors.neutral900} fontWeight={600}>
              Update
            </Typo>
          </Button>
        </View>
      </ScrollView>
    </ModalWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  form: {
    marginTop: spacingY._15,
    gap: spacingY._30,
    flex: 1,
  },
  avatarContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    alignSelf: "center",
    width: "auto",
  },
  avatar: {
    width: verticalScale(130),
    height: verticalScale(130),
    borderRadius: 1000,
  },
  uploadImageIcon: {
    width: 30,
    height: 30,
    backgroundColor: colors.neutral100,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 1000,
    position: "absolute",
    right: 10,
    bottom: 0,
    shadowColor: "black",
  },
  shadowBox: {
    // iOS Shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    // Android Shadow
    elevation: 8,
  },
  inputContainer: {
    gap: 10,
  },
  footer: {
    marginTop: "auto",
    borderTopWidth: 0.2,
    borderColor: colors.neutral600,
    paddingTop: spacingY._10,
  },
});

export default profileModal;
