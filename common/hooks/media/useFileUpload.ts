import { uploadFile, S3File } from "@/utils/s3";
import { useState } from "react";

type UseFileUploadParams = {
  type: "";
};

export const useFileUpload = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleUpload = async (file: S3File) => {
    try {
      setIsLoading(true);
      const url = await uploadFile(file);
      setIsLoading(false);
      return url;
    } catch (err) {
      console.error(err);
    }
  };

  return { isLoading, handleUpload };
};
