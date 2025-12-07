import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { isFileAllowed } from "@/utils/image";

export const useImageUploader = (initialImages = [], multiple = false) => {
  const [images, setImages] = useState(initialImages);
  const [imageFiles, setImageFiles] = useState([]);
  const [removedImages, setRemovedImages] = useState([]);
  const handleImage = (e) => {
    e.preventDefault();
    const selectedFiles = Array.from(e.target.files);

    if (selectedFiles.length === 0) return;

    const validFiles = [];
    const validFilesData = [];

    for (const file of selectedFiles) {
      if (!isFileAllowed(file)) {
        toast.error("Please choose PNG, JPG, or PDF files only.");
        continue;
      }
      if (file.size > 2 * 1024 * 1024) {
        toast.error(`File ${file.name} exceeds 2MB. Skipping.`);
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
    const removedImg = images[index];
    // If image is an existing DB image (string URL), mark it for deletion
    if (typeof removedImg === "string" && removedImg.startsWith("http")) {
      setRemovedImages((prev) => [...prev, removedImg]);
      // Only remove from images array, don't touch imageFiles
      setImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      // It's a newly uploaded image (data URL), remove from both arrays
      // Calculate the actual index in imageFiles by counting non-URL images before this one
      const imageFilesIndex = images
        .slice(0, index)
        .filter(
          (img) => typeof img === "string" && img.startsWith("data:")
        ).length;

      setImages((prev) => prev.filter((_, i) => i !== index));
      setImageFiles((prev) => prev.filter((_, i) => i !== imageFilesIndex));
    }
  };

  const removeAllImages = () => {
    const existingImages = images.filter(
      (img) => typeof img === "string" && img.startsWith("http")
    );
    setRemovedImages((prev) => [...prev, ...existingImages]);
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
    setImages,
    removedImages,
  };
};
