import { firestore } from "@/config/firebase";
import { ResponseType, UserDataType } from "@/types";
import { doc, updateDoc } from "firebase/firestore";
import { uploadImageToCloudinary } from "./imageService";

export const updateUser = async (
  uid: string,
  data: UserDataType
): Promise<ResponseType> => {
  try {
    console.log(data.image && data.image.uri);
    if (data.image && data.image.uri) {
      const img = await uploadImageToCloudinary(data.image, "users");
      if (!img.success) {
        return { success: false, msg: "Failed to upload image" };
      }
      data.image = img.data;
      console.log("image", img);
    }
    const userRef = doc(firestore, "users", uid);
    await updateDoc(userRef, data);
    return { success: true, msg: "User updated successfully" };
  } catch (error: any) {
    return { success: false, msg: error.message };
  }
};
