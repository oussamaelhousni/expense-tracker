import BackButton from "@/components/BackButton";
import Button from "@/components/Button";
import Input from "@/components/Input";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { colors, spacingX, spacingY } from "@/constants/theme";
import { useAuth } from "@/contexts/authContext";
import Feather from "@expo/vector-icons/Feather";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, StyleSheet, View } from "react-native";
const login = () => {
  const router = useRouter();
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please provide both email and password");
      return;
    }
    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);
    if (!res.success) {
      Alert.alert("Error", res.msg);
    }
  };
  return (
    <ScreenWrapper>
      <View style={[styles.container]}>
        <BackButton />
        <View style={styles.textSection}>
          <Typo fontWeight={800} color="white" size={30}>
            Hey,
          </Typo>
          <Typo fontWeight={800} color="white" size={30}>
            Welcome back
          </Typo>
        </View>
        <View style={styles.form}>
          <Typo size={16} color={colors.textLighter}>
            Log now to track all your expenses.
          </Typo>
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
              <Feather name="at-sign" size={24} color={colors.neutral300} />
            }
            onChangeText={(val) => setPassword(val)}
            secureTextEntry={true}
          />
          <Pressable
            style={{ alignSelf: "flex-end" }}
            onPress={() => console.log("click")}
          >
            <Typo size={14}>Forget your password?</Typo>
          </Pressable>
          <Button loading={isSubmitting} onPress={handleSubmit}>
            <Typo size={15} color={colors.neutral900} fontWeight={"800"}>
              Login
            </Typo>
          </Button>

          <View style={styles.footer}>
            <Typo size={14}>Do not have an account ? </Typo>
            <Pressable
              onPress={() => {
                router.push("/register");
              }}
            >
              <Typo color={colors.primary} size={14}>
                Signup
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

export default login;
