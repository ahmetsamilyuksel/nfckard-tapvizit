"use client";

import { useRef } from "react";
import { QRCodeSVG } from "qrcode.react";

interface Props {
  url: string;
  title: string;
  label: string;
  onClose: () => void;
  primaryColor: string;
}

export default function QRModal({ url, title, label, onClose, primaryColor }: Props) {
  const svgRef = useRef<HTMLDivElement>(null);

  const handleDownload = () => {
    const svgEl = svgRef.current?.querySelector("svg");
    if (!svgEl) return;

    const svgData = new XMLSerializer().serializeToString(svgEl);
    const canvas = document.createElement("canvas");
    const size = 400;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, size, size);
      ctx.drawImage(img, 0, 0, size, size);
      const link = document.createElement("a");
      link.download = "qr-code.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div
      className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-bold text-gray-900">{title}</h3>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* QR */}
        <div className="flex flex-col items-center p-6 gap-4">
          <div
            ref={svgRef}
            className="p-4 rounded-2xl shadow-sm"
            style={{ backgroundColor: "#fff", border: `3px solid ${primaryColor}` }}
          >
            <QRCodeSVG
              value={url}
              size={220}
              fgColor="#111827"
              bgColor="#ffffff"
              level="H"
              includeMargin={false}
            />
          </div>
          <p className="text-xs text-gray-500 text-center break-all">{url}</p>
          <p className="text-xs text-gray-400 text-center">{label}</p>

          <button
            onClick={handleDownload}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: primaryColor }}
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            QR İndir (PNG)
          </button>
        </div>
      </div>
    </div>
  );
}
