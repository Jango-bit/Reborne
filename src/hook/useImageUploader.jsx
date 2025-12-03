import { useState, useEffect } from "react";
// Assuming 'toast' and 'isFileAllowed' are available/imported
import toast from "react-hot-toast";
import { isFileAllowed } from "@/utils/image";

export const useImageUploader = (initialImages = [], multiple = false) => {
  const [images, setImages] = useState(initialImages);
  const [imageFiles, setImageFiles] = useState([]);

  const handleImage = (e) => {
    e.preventDefault();
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) return;

    const validFiles = [];
    const validFilesData = [];

    for (const file of selectedFiles) {
      if (!isFileAllowed(file)) {
        alert("Please choose PNG, JPG, or PDF files only.");
        continue;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert(`File ${file.name} exceeds 2MB. Skipping.`);
        continue;
      }
      validFiles.push(file);
    }

    if (validFiles.length === 0) return;

    // Read all valid files
    validFiles.forEach((file) => {
      const reader = new FileReader();
      reader.addEventListener("load", (e) => {
        validFilesData.push(e.target.result);

        // When all files are read
        if (validFilesData.length === validFiles.length) {
          if (multiple) {
            setImages((prev) => [...prev, ...validFilesData]);
            setImageFiles((prev) => [...prev, ...validFiles]);
          } else {
            setImages([validFilesData[0]]);
            setImageFiles([validFiles[0]]);
          }
        }
      });
      reader.readAsDataURL(file);
    });

    // Reset input
    e.target.value = "";
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const removeAllImages = () => {
    setImages([]);
    setImageFiles([]);
  };

  useEffect(() => {
    if (initialImages.length > 0) {
      setImages(initialImages);
    }
  }, []);

  // Return both array and single value for backward compatibility
  return {
    images,
    imageFiles,
    image: images[0] || "",
    imageFile: imageFiles[0] || null,
    handleImage,
    removeImage,
    removeAllImages,
  };
};
