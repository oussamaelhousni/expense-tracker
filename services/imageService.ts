import { ResponseType } from "@/types";
import axios from "axios";

export const getProfileImage = (file: any) => {
  if (file && typeof file === "string") return file;
  if (file && typeof file === "object") return file.uri;
  return require("../assets/images/defaultAvatar.png");
};

export const uploadImageToCloudinary = async (
  file: { uri: string } | string,
  folderName: string
): Promise<ResponseType> => {
  const url = `https://api-ap.cloudinary.com/v1_1/${process.env.EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;
  try {
    if (typeof file === "string") {
      return { success: true, data: file };
    }
    if (file && typeof file === "object") {
      const formData = new FormData();
      formData.append("file", {
        uri: file?.uri,
        type: "image/jpeg",
        name: file.uri.split("/").pop() || "file.jpeg",
      } as any);
      formData.append(
        "upload_preset",
        process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
      );
      formData.append("folder", folderName);

      const res = await axios.post(url, formData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });
      return { success: true, data: res?.data?.secure_url };
    }
    return { success: true };
  } catch (error: any) {
    return { success: false, msg: error.msg };
  }
};
