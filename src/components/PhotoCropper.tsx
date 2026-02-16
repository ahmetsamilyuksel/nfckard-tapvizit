"use client";

import { useState, useCallback, useRef } from "react";
import Cropper from "react-easy-crop";
import type { Area, Point } from "react-easy-crop";
import type { CardLayout } from "@/types";

interface Props {
  onPhotoSaved: (croppedDataUrl: string, originalDataUrl: string, zoom: number, position: { x: number; y: number }) => void;
  onClose: () => void;
  labelUpload: string;
  labelCrop: string;
  labelDone: string;
  labelCancel: string;
  initialZoom?: number;
  initialPosition?: { x: number; y: number };
  existingPhoto?: string;
  existingOriginalPhoto?: string;
  layout?: CardLayout;
}

async function getCroppedImg(imageSrc: string, pixelCrop: Area, isRect: boolean = false): Promise<string> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";

    image.onload = () => {
      const canvas = document.createElement("canvas");

      if (isRect) {
        // For rectangular crops (modern layout), keep original aspect ratio
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;
        const ctx = canvas.getContext("2d")!;
        // Fill with white background first (for transparent images)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );
      } else {
        // For round crops (classic, sidebar, minimal), make it square
        const size = Math.min(pixelCrop.width, pixelCrop.height);
        canvas.width = size;
        canvas.height = size;
        const ctx = canvas.getContext("2d")!;
        // Fill with white background first (for transparent images)
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          size,
          size
        );
      }

      resolve(canvas.toDataURL("image/jpeg", 0.9));
    };

    image.onerror = () => {
      reject(new Error("Failed to load image"));
    };

    image.src = imageSrc;
  });
}

export default function PhotoCropper({ onPhotoSaved, onClose, labelUpload, labelCrop, labelDone, labelCancel, initialZoom = 1, initialPosition = { x: 0, y: 0 }, existingPhoto, existingOriginalPhoto, layout = "classic" }: Props) {
  const [imageSrc, setImageSrc] = useState<string | null>(existingOriginalPhoto || existingPhoto || null);
  const [crop, setCrop] = useState<Point>(initialPosition);
  const [zoom, setZoom] = useState(initialZoom);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [step, setStep] = useState<"upload" | "crop">(existingOriginalPhoto || existingPhoto ? "crop" : "upload");
  const fileRef = useRef<HTMLInputElement>(null);

  // Determine crop shape and aspect ratio based on layout
  const cropShape = layout === "modern" ? "rect" : "round";
  const aspectRatio = layout === "modern" ? 16 / 9 : 1;

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("Fotoğraf çok büyük! Maksimum 10MB olmalı.");
      return;
    }

    try {
      // For HEIC/HEIF files, show message
      if (file.type === "image/heic" || file.type === "image/heif" || file.name.toLowerCase().endsWith('.heic') || file.name.toLowerCase().endsWith('.heif')) {
        alert("iPhone HEIC formatı tespit edildi. Lütfen iPhone'unuzun ayarlarından Kamera > Formatlar > En Uyumlu seçeneğini işaretleyin ve tekrar deneyin.");
        return;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        if (result && result.startsWith('data:image/')) {
          setImageSrc(result);
          setStep("crop");
        } else {
          alert("Fotoğraf yüklenemedi. Lütfen farklı bir fotoğraf deneyin.");
        }
      };
      reader.onerror = () => {
        alert("Fotoğraf okuma hatası. Lütfen tekrar deneyin.");
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Photo upload error:", error);
      alert("Fotoğraf yüklenirken bir hata oluştu.");
    }
  };

  const onCropComplete = useCallback((_: Area, croppedPixels: Area) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleDone = async () => {
    if (!imageSrc || !croppedAreaPixels) return;
    const cropped = await getCroppedImg(imageSrc, croppedAreaPixels, layout === "modern");
    onPhotoSaved(cropped, imageSrc, zoom, crop);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900">
            {step === "upload" ? labelUpload : labelCrop}
          </h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {step === "upload" ? (
          <div className="p-6">
            <button
              onClick={() => fileRef.current?.click()}
              className="w-full border-2 border-dashed border-gray-300 rounded-xl p-10 flex flex-col items-center gap-3 hover:border-sky-400 hover:bg-sky-50 transition-colors"
            >
              <div className="w-14 h-14 bg-sky-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-700">{labelUpload}</span>
              <span className="text-xs text-gray-400">JPG, PNG, WEBP – max 5MB</span>
            </button>
            <input
              ref={fileRef}
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/heic,image/heif"
              className="hidden"
              onChange={onFileChange}
            />
          </div>
        ) : (
          <>
            <div className="relative w-full bg-black" style={{ height: 320 }}>
              <Cropper
                image={imageSrc!}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                cropShape={cropShape as "rect" | "round"}
                showGrid={false}
                restrictPosition={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            </div>
            {/* Zoom slider */}
            <div className="px-6 pt-4 pb-2">
              <input
                type="range"
                min={1}
                max={3}
                step={0.01}
                value={zoom}
                onChange={(e) => setZoom(Number(e.target.value))}
                className="w-full accent-sky-500"
              />
            </div>
            <div className="flex gap-3 px-5 pb-5">
              <button
                onClick={() => { setStep("upload"); setImageSrc(null); }}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                {labelCancel}
              </button>
              <button
                onClick={handleDone}
                className="flex-1 py-2.5 bg-sky-600 text-white rounded-xl text-sm font-semibold hover:bg-sky-700 transition-colors"
              >
                {labelDone}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
