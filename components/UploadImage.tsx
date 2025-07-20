import { colors, radius, spacingX } from "@/constants/theme";
import { getProfileImage } from "@/services/imageService";
import { ImageUploadProps } from "@/types";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Typo from "./Typo";
const UploadImage = ({
  file,
  onSelect,
  onClear,
  placeholder,
}: ImageUploadProps) => {
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      onSelect(result.assets[0].uri);
    }
  };
  if (!file) {
    return (
      <TouchableOpacity style={styles.uploadButton} onPress={pickImage}>
        <Feather name="upload" size={20} color={colors.neutral500} />
        <Typo size={13} color={colors.neutral500}>
          {placeholder}
        </Typo>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity
        style={[styles.shadowBox, styles.closeBtn]}
        onPress={onClear}
      >
        <AntDesign name="closecircleo" size={24} color="white" />
      </TouchableOpacity>
      <Image source={getProfileImage(file)} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    height: verticalScale(60),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: spacingX._7,
    borderWidth: 1,
    paddingHorizontal: spacingX._20,
    borderStyle: "dashed",
    borderRadius: radius._15,
    borderColor: colors.neutral600,
    backgroundColor: colors.neutral800,
  },
  imageContainer: {
    position: "relative",

    alignSelf: "flex-start",
  },
  image: {
    width: Dimensions.get("screen").width / 3,
    height: Dimensions.get("screen").width / 3,
    borderRadius: radius._10,
  },
  closeBtn: {
    position: "absolute",
    top: 3,
    right: 3,
    width: 30,
    height: 30,
    zIndex: 100,
  },
  shadowBox: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,

    // iOS shadow
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 10,

    // Android shadow (only supports elevation)
    elevation: 10,
  },
});

export default UploadImage;
