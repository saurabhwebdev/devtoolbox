"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { generateManifest } from "./manifest";

interface ManifestBlockProps {
  appName?: string;
}

export function ManifestBlock({ appName = "Your App" }: ManifestBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const manifest = generateManifest(appName);
  const manifestJson = JSON.stringify(manifest, null, 2);
  
  const handleCopy = () => {
    navigator.clipboard.writeText(manifestJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleDownload = () => {
    const blob = new Blob([manifestJson], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "manifest.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">Web App Manifest</h4>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleCopy}
          >
            {copied ? "Copied!" : "Copy"}
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      </div>
      <div className="relative">
        <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono">
          {manifestJson}
        </pre>
      </div>
    </div>
  );
} 