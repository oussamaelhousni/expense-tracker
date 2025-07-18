import Header from "@/components/Header";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { colors, radius, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import { getProfileImage } from "@/services/profileImageService";
import { accountOptionType } from "@/types";
import { verticalScale } from "@/utils/styling";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { signOut } from "@firebase/auth";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";
const profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const acountOptions: accountOptionType[] = [
    {
      title: "Edit profile",
      bgColor: "#6366f1",
      routeName: "/(modals)/profileModal",
      icon: (
        <MaterialCommunityIcons name="account-edit" size={25} color="white" />
      ),
    },
    {
      title: "Settings",
      bgColor: "#059669",
      routeName: "/edit",
      icon: <Ionicons name="settings" size={25} color="white" />,
    },
    {
      title: "Privary Policy",
      bgColor: colors.neutral600,
      routeName: "/edit",
      icon: <MaterialIcons name="privacy-tip" size={25} color="white" />,
    },

    {
      title: "Logout",
      bgColor: "#e11d48",
      routeName: "/edit",
      icon: <MaterialCommunityIcons name="logout" size={25} color="white" />,
    },
  ];

  const handleLogout = async () => {
    await signOut(auth);
  };
  const showLogoutAlert = () => {
    Alert.alert("Logout", "Are you sure?", [
      {
        text: "Cancel",
        onPress: () => {
          console.log("Cancel clicked");
        },
        style: "default",
      },
      {
        text: "Ok",
        onPress: () => {
          handleLogout();
        },
        style: "destructive",
      },
    ]);
  };
  const handlePress = (item: accountOptionType) => {
    if (item.title === "Logout") {
      showLogoutAlert();
      return;
    }
    router.push(item.routeName);
  };
  return (
    <ScreenWrapper>
      <View style={styles.container}>
        <Header title="Profile" />
        {/* User information*/}
        {/*Avatar*/}

        {/*Name and email*/}
        <View style={styles.userInfo}>
          <Image
            style={styles.avatar}
            source={getProfileImage(user?.image)}
            transition={100}
            contentFit="cover"
          />
          <Typo size={24} color={colors.neutral100} fontWeight={700}>
            {user?.name}
          </Typo>
          <Typo size={14} color={colors.neutral500}>
            {user?.email}
          </Typo>
        </View>
        {/* End of user information section*/}
        <View style={styles.accountOptions}>
          {acountOptions.map((option) => {
            return (
              <TouchableOpacity
                key={option.title}
                style={styles.listItem}
                onPress={() => handlePress(option)}
              >
                <View
                  style={[styles.listIcon, { backgroundColor: option.bgColor }]}
                >
                  {option.icon}
                </View>
                <Typo color={colors.neutral100} size={14} fontWeight={500}>
                  {option.title}
                </Typo>
                <AntDesign
                  name="right"
                  size={18}
                  color={colors.neutral600}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacingX._20,
  },
  userInfo: {
    alignItems: "center",
    marginTop: spacingY._20,
  },
  avatar: {
    width: verticalScale(110),
    height: verticalScale(110),
    borderRadius: verticalScale(100),
    marginBottom: spacingY._10,
  },
  accountOptions: {
    flexDirection: "column",
    gap: spacingY._15,
    marginTop: spacingY._30,
  },
  listIcon: {
    alignItems: "center",
    justifyContent: "center",
    height: verticalScale(50),
    width: verticalScale(50),
    borderRadius: radius._10,
  },
  listItem: {
    flexDirection: "row",
    gap: spacingX._10,
    alignItems: "center",
  },
});
export default profile;
