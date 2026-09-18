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