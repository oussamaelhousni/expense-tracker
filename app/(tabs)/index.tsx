import Button from "@/components/Button";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { signOut } from "@firebase/auth";
import React from "react";
import { Text, View } from "react-native";
const index = () => {
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <View>
      <Text>index</Text>
      <Button onPress={logout}>
        <Typo>Log out</Typo>
      </Button>
    </View>
  );
};

export default index;
