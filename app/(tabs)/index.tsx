import Button from "@/components/Button";
import ScreenWrapper from "@/components/ScreenWrapper";
import Typo from "@/components/Typo";
import { auth } from "@/config/firebase";
import { signOut } from "@firebase/auth";
import React from "react";
const Home = () => {
  const logout = async () => {
    await signOut(auth);
  };
  return (
    <ScreenWrapper>
      <Typo>index</Typo>
      <Button onPress={logout}>
        <Typo>Log out</Typo>
      </Button>
    </ScreenWrapper>
  );
};

export default Home;
