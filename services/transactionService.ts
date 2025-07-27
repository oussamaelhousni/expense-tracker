import { firestore } from "@/config/firebase";
import { ResponseType, TransactionType, WalletType } from "@/types";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { uploadImageToCloudinary } from "./imageService";
import { createOrUpdateWallet } from "./walletService";

export const createOrUpdateTransaction = async (
  transactionData: Partial<TransactionType>
) => {
  try {
    const { id, type, walletId, image, amount, category, uid, date } =
      transactionData;
    if (!amount || amount < 0 || !walletId || !type) {
      return { status: false, msg: "Invalid transaction data" };
    }
    if (!!id) {
      const oldTransactionRef = await getDoc(
        doc(firestore, "transactions", id)
      );
      const oldTransaction = oldTransactionRef.data() as TransactionType;
      const shouldRevert =
        oldTransaction.type !== type ||
        oldTransaction.walletId !== walletId ||
        Number(oldTransaction.amount) !== Number(amount);

      if (shouldRevert) {
        // TODO: create revert transaction
        const res = await reverAndUpdateWallet(
          oldTransaction,
          type,
          walletId,
          amount
        );
        if (!res.success) {
          return res;
        }
      }
    } else {
      // update wallet for new transaction
      // update wallet
      const res = await updateWalletForTransaction(walletId, amount, type);
      if (!res.success) return res;
    }

    if (image) {
      const res = await uploadImageToCloudinary(
        { uri: image },
        "transactionFolder"
      );
      if (!res.success) {
        return {
          success: false,
          msg: res.msg || "Failed to upload wallet ico",
        };
      }
      transactionData.image = res.data;
    }

    const transactionRef = !!id
      ? doc(firestore, "transactions", id as string)
      : doc(collection(firestore, "transactions"));

    await setDoc(
      transactionRef,
      { type, walletId, image, amount, category, uid, date },
      { merge: true }
    );

    console.log("What is this", {
      success: true,
      data: { ...transactionData },
      id: transactionRef.id,
    });
    return {
      success: true,
      data: { ...transactionData },
      id: transactionRef.id,
    };
  } catch (error: any) {
    console.log("Error creating or updating transaction:", error);
    return { success: false, msg: error.message };
  }
};

const updateWalletForTransaction = async (
  walletId: string,
  amount: number,
  type: string
) => {
  try {
    const walletRef = doc(firestore, "wallets", walletId);
    const walletSnapShot = await getDoc(walletRef);
    if (!walletSnapShot.exists()) {
      console.log("Error creating or updating wallet for new trsnaction:");
      return { success: false, msg: "Wallet not found" };
    }
    const walletData = walletSnapShot.data() as WalletType;
    if (type === "expense" && walletData.amount! < amount) {
      return { success: false, msg: "Select wallet don't have enough balance" };
    }
    const updatedType = type === "income" ? "totalIncome" : "totalExpense";
    const updatedWalletAmount =
      type === "income"
        ? Number(walletData.amount) + Number(amount)
        : Number(walletData.amount) - Number(amount);
    const updatedTotal =
      type === "income"
        ? Number(walletData.totalIncome) + Number(amount)
        : Number(walletData.totalExpenses) + Number(amount);
    await updateDoc(walletRef, {
      amount: updatedWalletAmount,
      [updatedType]: updatedTotal,
    });
    return { success: true };
  } catch (error: any) {
    console.log("Error creating or updating wallet for new trsnaction:", error);
    return { success: false, msg: error.message };
  }
};

export const deleteTransaction = async (
  transactionId: string
): Promise<ResponseType> => {
  try {
    const transactionRef = doc(firestore, "transactions", transactionId);
    const oldTransaction = await getDoc(transactionRef);

    if (!oldTransaction.exists()) {
      return { success: false, msg: "Transaction does not exists" };
    }

    const oldTransactionData = oldTransaction.data() as TransactionType;

    const wallet = (
      await getDoc(doc(firestore, "wallets", oldTransactionData.walletId))
    ).data();

    console.log("Goone delete wallet", wallet);
    const newWalletAmount =
      Number(wallet?.amount!) -
      (oldTransactionData.type === "income"
        ? Number(oldTransactionData.amount)
        : -Number(oldTransactionData.amount));

    const updatedExpenseIncometype =
      oldTransactionData.type === "expense" ? "totalExpenses" : "totalIncome";

    const newWalletTotal: number =
      wallet?.[updatedExpenseIncometype] ??
      0 - Number(oldTransactionData.amount);

    await createOrUpdateWallet({
      id: oldTransactionData.walletId,
      amount: newWalletAmount,
      [updatedExpenseIncometype]: newWalletTotal,
    });
    await deleteDoc(transactionRef);
    return { success: true, msg: "Wallet deleted with success" };
  } catch (error: any) {
    return { msg: error.message, success: false };
  }
};

export const reverAndUpdateWallet = async (
  oldTransaction: TransactionType,
  newTransactionType: string,
  newTransactionWalletId: string,
  newTransactionAmount: number
) => {
  try {
    const oldWallet = await getDoc(
      doc(firestore, "wallets", newTransactionWalletId)
    );

    let newWallet = await getDoc(
      doc(firestore, "wallets", oldTransaction.walletId)
    );

    if (!oldWallet.exists()) {
      return { msg: "Error update new transaction", success: false };
    }

    if (!newWallet.exists()) {
      return { msg: "Error update new transaction", success: false };
    }

    const walletData = oldWallet.data() as WalletType;
    let newWalletData = newWallet.data() as WalletType;

    const updatedTotalType =
      oldTransaction.type === "expense" ? "totalExpenses" : "totalIncome";

    const updateIncomeExpense =
      oldTransaction.type === "income"
        ? -Number(oldTransaction.amount)
        : Number(oldTransaction.amount);

    const revertedWalletAmount =
      Number(walletData.amount!) + Number(updateIncomeExpense);
    const revertedIncomeExpense =
      Number(walletData[updatedTotalType]!) - Number(oldTransaction.amount);

    if (newTransactionType === "expense") {
      // user convert to expense
      // user increase expense
      if (
        oldTransaction.walletId === newTransactionWalletId &&
        revertedWalletAmount < newTransactionAmount
      ) {
        return {
          msg: "The selected wallet does not have enough balance",
          success: false,
        };
      }
      if (newWalletData.amount! < newTransactionAmount) {
        return {
          msg: "The selected wallet does not have enough balance",
          success: false,
        };
      }
    }

    await createOrUpdateWallet({
      id: oldTransaction.walletId,
      amount: revertedWalletAmount,
      [updatedTotalType]: revertedIncomeExpense,
    });

    newWallet = await getDoc(
      doc(firestore, "wallets", oldTransaction.walletId)
    );
    newWalletData = newWallet.data() as WalletType;

    const newAmount =
      Number(newWalletData.amount!) + newTransactionType === "income"
        ? Number(newTransactionAmount)
        : -Number(newTransactionAmount);
    const totalExpenseType =
      newTransactionType === "income" ? "totalIncome" : "totalExpenses";
    const updatedTotal =
      Number(newWalletData[totalExpenseType]!) + Number(newTransactionAmount);
    await createOrUpdateWallet({
      id: newWallet.id,
      amount: newAmount,
      [totalExpenseType]: updatedTotal,
    });
    return { success: true };
  } catch (error: any) {
    console.log("Error updating reverted", error);
    return { msg: "Error update new transaction", success: false };
  }
};
