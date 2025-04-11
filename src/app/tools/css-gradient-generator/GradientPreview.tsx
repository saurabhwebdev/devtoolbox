"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface GradientPreviewProps {
  gradient: string;
}

export function GradientPreview({ gradient }: GradientPreviewProps) {
  const [previewSize, setPreviewSize] = useState<"small" | "medium" | "large">("medium");
  
  const sizes = {
    small: "h-32",
    medium: "h-64",
    large: "h-96",
  };
  
  return (
    <div className="space-y-4">
      <div 
        className="w-full h-60 rounded-md border shadow-inner"
        style={{ background: gradient }}
      />
      
      <div className="flex gap-2 flex-wrap">
        <div 
          className="h-20 w-20 rounded-md border shadow-sm"
          style={{ background: gradient }}
        />
        <div 
          className="h-20 w-20 rounded-full border shadow-sm"
          style={{ background: gradient }}
        />
        <div 
          className="h-20 w-40 rounded-md border shadow-sm flex items-center justify-center bg-white dark:bg-gray-800"
        >
          <span 
            className="font-bold text-lg"
            style={{ 
              background: gradient,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent"
            }}
          >
            Text Fill
          </span>
        </div>
        <div 
          className="h-20 w-20 rounded-md shadow-sm"
          style={{ 
            border: "4px solid transparent",
            backgroundImage: gradient,
            backgroundOrigin: "border-box",
            backgroundClip: "content-box, border-box",
            boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
          }}
        />
      </div>
    </div>
  );
} 