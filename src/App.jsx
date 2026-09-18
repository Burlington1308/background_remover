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

  const resetApp = () => {
    setOriginalImage(null);
    setProcessedImage(null);
    setIsProcessing(false);
    setError(null);
    if (fileInputRef.current)
        fileInputRef.current.value = "";
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

      <div className="w-full max-w-2xl bg-linear-to-r
        from-fuchsia-900 to-indigo-950 backdrop-blur-md
        border border-fuchsia-500/30 rounded-3xl p-4 sm:p-6
        shadow-2xl
      ">
        { !originalImage && (
          <div className="flex flex-col items-center justify-center
            h-96 mb-6 p-4 bg-linear-to-b from-indigo-950/40
            to-fuchsia-950/50 rounded-2xl opacity-80 hover:opacity-100
            hover;shadow-fuchsia-700 shadow-2xl transition-all duration-400
            text-center cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            <div className="text-4xl sm:text-5xl mb-4">📸</div>
            <div className="text-lg sm:text-xl text-fuchsia-200 mb-2">
              Drag & drop or click to upload an image
            </div>
            <div className="text-xs sm:text-sm text-fuchsia-400">
              JPG, PNG, WEBP supported
            </div>
            <input 
              type="file" 
              ref={fileInputRef}
              accept="image/"
              onChange={handleFileInputChange}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
}