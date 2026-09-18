import { useState, useRef } from "react";
import {removeBackground} from "@imgly/background-removal"

export default function BackgroundRemover() {

  const [originalImage, setOriginalImage] = useState(null);
  const [processedImage, setProcessedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);


  const handleFileSelect = async (file) => {
    if (!file || !file.type.startsWith("image/")) {
      setError("Please select a valid image file");
      return;
    }

    // clear previous data
    setError(null);
    setProcessedImage(null);

    // create File reader
    const reader = new FileReader();

    reader.onload = (e) => {
      if(e.target && typeof e.target.result === "string") {
        setOriginalImage(e.target.result); // read image as string as assign it ot the original image
      }
    };

    reader.readAsDataURL(file);

    try {
      const blob = await removeBackground(file);
      const url = URL.createObjectURL(blob);
      setProcessedImage(url);
    } catch(err) {
      setError("Failed to process image. Please try another image.");
      console.log("Background removal error: ", err);
    } finally {
      setIsProcessing(false);
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault();
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  }

  const handleFileInputChange = (e) => {
    const file = e.target.file && e.target.files[0] ? e.targetfiles[0] : undefined;
    handleFileSelect(file);
  }

  const downloadImage = () => {
    if(!processedImage) return;

    const link = document.createElement("a");

    link.href = processedImage;
    link.download = "background-removed.png";
    link.click();
    URL.revokeObjectURL(processedImage);
  }

  return (
    <div className="min-h-screen
      bg-linear-to-br from-fuchsia-950
      via-neutral-900 to-purple-950 flex flex-col
      items-center justify-center p-4 gap-12
    ">
      <h1 className="text-7xl text-center
        bg-linear-to-r text-purple-200
      ">
        Background Remover
      </h1>
    </div>
  );
}