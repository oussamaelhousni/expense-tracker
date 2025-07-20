import { firestore } from "@/config/firebase";
import { ResponseType, WalletType } from "@/types";
import { collection, doc, setDoc } from "firebase/firestore";
import { uploadImageToCloudinary } from "./imageService";

export const createOrUpdateWallet = async (
  wallet: Partial<WalletType>
): Promise<ResponseType> => {
  try {
    const walletToSave = { ...wallet };
    if (wallet.image) {
      const res = await uploadImageToCloudinary(wallet.image, "walletFolder");
      if (!res.success) {
        return {
          success: false,
          msg: res.msg || "Failed to upload wallet ico",
        };
      }
      walletToSave.image = res.data;
    }
    if (!wallet.id) {
      walletToSave.amount = 0;
      walletToSave.totalExpenses = 0;
      walletToSave.totalIncome = 0;
      walletToSave.created = new Date();
    }

    const walletRef = walletToSave.id
      ? doc(firestore, "wallets", wallet?.id as string)
      : doc(collection(firestore, "wallets"));

    await setDoc(walletRef, walletToSave, { merge: true });
    return { success: true, data: { ...walletToSave, id: walletRef.id } };
  } catch (error: any) {
    return { success: false, msg: error.message };
  }
};
