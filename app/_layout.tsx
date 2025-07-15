import { AuthProvider } from "@/contexts/authContext";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{ headerShown: false }}></Stack>
    </AuthProvider>
  );
};

export default _layout;
