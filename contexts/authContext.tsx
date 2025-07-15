import { auth, firestore } from "@/config/firebase";
import { AuthContextType, UserType } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "@firebase/auth";
import { useRouter } from "expo-router";

import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be wrapped inside AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<UserType>(null);
  const router = useRouter();
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("firebase auth", user);
      if (user) {
        setUser({
          name: user.displayName,
          email: user.email,
          uid: user.uid,
          image: user.photoURL,
        });
        updateUserData(user.uid);
        router.replace("/profile");
      } else {
        setUser(null);
        router.replace("/welcome");
      }
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      return { success: true };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(firestore, "users", res?.user?.uid), {
        name,
        email,
        uid: res?.user?.uid,
      });
      return { success: true, message: "User created successfully" };
    } catch (error: any) {
      return { success: false, msg: error.message };
    }
  };

  const updateUserData = async (uid: string) => {
    try {
      const docRef = doc(firestore, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        const userData = {
          uid: data?.uid,
          email: data?.email,
          name: data?.name,
          image: data?.image || null,
        };
        setUser(userData);
      }
    } catch (error: any) {
      console.log("errror", error);
      //return { success: false, msg: error.message };
    }
  };

  const contextValue = { user, setUser, login, register, updateUserData };
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
