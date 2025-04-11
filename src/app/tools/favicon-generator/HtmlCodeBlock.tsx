"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface HtmlCodeBlockProps {
  imageName: string;
}

export function HtmlCodeBlock({ imageName }: HtmlCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  const htmlCode = `<!-- Favicon -->
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png">

<!-- Apple Touch Icons -->
<link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
<link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
<link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">

<!-- PWA / Windows -->
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#ffffff">
<meta name="msapplication-TileColor" content="#ffffff">
<meta name="msapplication-TileImage" content="/ms-icon-144x144.png">`;

  const handleCopy = () => {
    navigator.clipboard.writeText(htmlCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h4 className="font-medium">HTML Code</h4>
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
        >
          {copied ? "Copied!" : "Copy Code"}
        </Button>
      </div>
      <div className="relative">
        <pre className="p-4 rounded-md bg-muted/50 text-xs overflow-x-auto font-mono">
          {htmlCode}
        </pre>
      </div>
    </div>
  );
} 