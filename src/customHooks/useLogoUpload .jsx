import { useState } from "react";
import axios from "axios";

const useLogoUpload = (cloudName) => {
  const [logoUrl, setLogoUrl] = useState("");
  const [uploadingLogoUrl, setUploadingLogoUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "Escudos"); // Reemplaza con tu upload preset de Cloudinary

      try {
        const response = await axios.post(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          formData
        );
        setUploadingLogoUrl(response.data.secure_url);
        setFieldValue("logo", response.data.secure_url);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveFile = () => {
    setUploadingLogoUrl("");
  };

  return {
    logoUrl,
    setLogoUrl,
    uploadingLogoUrl,
    isUploading,
    handleFileChange,
    handleRemoveFile,
  };
};

export default useLogoUpload;
