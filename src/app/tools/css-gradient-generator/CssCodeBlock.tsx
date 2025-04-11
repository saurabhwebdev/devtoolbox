"use client";

import { useState, useEffect } from "react";
import { CopyButton } from "./CopyButton";

interface CssCodeBlockProps {
  gradient: string;
  property: string;
  includeVendorPrefixes: boolean;
  includeFallback: boolean;
  fallbackColor: string;
}

export function CssCodeBlock({ 
  gradient, 
  property, 
  includeVendorPrefixes, 
  includeFallback, 
  fallbackColor 
}: CssCodeBlockProps) {
  const [cssCode, setCssCode] = useState<string>("");
  
  useEffect(() => {
    let code = "";
    
    // Add fallback solid color if requested
    if (includeFallback) {
      code += `${property}: ${fallbackColor};\n`;
    }
    
    // Add vendor prefixes if requested
    if (includeVendorPrefixes) {
      if (gradient.includes("linear-gradient")) {
        code += `${property}: -webkit-linear-gradient(${gradient.substring(16, gradient.length - 1)});\n`;
        code += `${property}: -moz-linear-gradient(${gradient.substring(16, gradient.length - 1)});\n`;
      } else if (gradient.includes("radial-gradient")) {
        code += `${property}: -webkit-radial-gradient(${gradient.substring(16, gradient.length - 1)});\n`;
        code += `${property}: -moz-radial-gradient(${gradient.substring(16, gradient.length - 1)});\n`;
      }
      // No vendor prefixes for conic gradients as they're not well supported in older browsers
    }
    
    // Add standard CSS gradient
    code += `${property}: ${gradient};`;
    
    setCssCode(code);
  }, [gradient, property, includeVendorPrefixes, includeFallback, fallbackColor]);
  
  return (
    <div className="relative overflow-hidden">
      <div className="bg-muted/80 border rounded-md p-4 font-mono text-xs overflow-auto max-h-[300px]">
        <pre className="whitespace-pre-wrap">{cssCode}</pre>
      </div>
      <div className="absolute top-2 right-2">
        <CopyButton text={cssCode} />
      </div>
    </div>
  );
} 