import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
const Register = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      Alert.alert("Error", "Please provide both email and password");
      return;
    }
  };
  return (
    <ScreenWrapper>
      <View style={[styles.container]}>
        <BackButton />
        <View style={styles.textSection}>
          <Typo fontWeight={800} color="white" size={30}>
            Let's
          </Typo>
          <Typo fontWeight={800} color="white" size={30}>
            get started
          </Typo>
        </View>
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Create an account to track your expenses.
          </Typo>
          <Input
            placeholder="Enter your name"
            icon={<AntDesign name="user" size={24} color={colors.neutral300} />}
            onChangeText={(val) => setName(val)}
          />
          <Input
            placeholder="Enter your email"
            icon={
              <Feather name="at-sign" size={24} color={colors.neutral300} />
            }
            onChangeText={(val) => setEmail(val)}
          />
          <Input
            placeholder="Enter your password"
            icon={
              <MaterialIcons
                name="password"
                size={24}
                color={colors.neutral300}
              />
            }
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
          />

          <Button loading={isSubmitting} onPress={handleSubmit}>
            <Typo size={15} color={colors.neutral900} fontWeight={"800"}>
              Sign Up
            </Typo>
          </Button>

          <View style={styles.footer}>
            <Typo size={14}>Already have an account ? </Typo>
            <Pressable
              onPress={() => {
                router.push("/login");
              }}
            >
              <Typo color={colors.primary} size={14}>
                Login
              </Typo>
            </Pressable>
          </View>
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
  textSection: {
    marginTop: spacingY._40,
  },
  form: {
    marginTop: spacingY._30,
    gap: spacingY._20,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Register;
