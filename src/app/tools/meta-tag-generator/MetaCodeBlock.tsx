"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckIcon, CopyIcon } from "@radix-ui/react-icons";

interface MetaCodeBlockProps {
  title: string;
  description: string;
  keywords: string;
  author: string;
  canonicalUrl: string;
  ogTitle: string;
  ogDescription: string;
  ogUrl: string;
  ogImage: string;
  ogType: string;
  twitterCard: string;
  twitterSite: string;
  twitterCreator: string;
}

export function MetaCodeBlock({
  title,
  description,
  keywords,
  author,
  canonicalUrl,
  ogTitle,
  ogDescription,
  ogUrl,
  ogImage,
  ogType,
  twitterCard,
  twitterSite,
  twitterCreator,
}: MetaCodeBlockProps) {
  const [copied, setCopied] = useState(false);
  
  // Generate the meta tags code
  let metaTagsCode = '';
  
  // Basic SEO meta tags
  if (title) {
    metaTagsCode += `<title>${title}</title>\n`;
    metaTagsCode += `<meta name="title" content="${title}">\n`;
  }
  
  if (description) {
    metaTagsCode += `<meta name="description" content="${description}">\n`;
  }
  
  if (keywords) {
    metaTagsCode += `<meta name="keywords" content="${keywords}">\n`;
  }
  
  if (author) {
    metaTagsCode += `<meta name="author" content="${author}">\n`;
  }
  
  if (canonicalUrl) {
    metaTagsCode += `<link rel="canonical" href="${canonicalUrl}">\n`;
  }
  
  // Open Graph meta tags
  if (ogTitle || title) {
    metaTagsCode += `\n<!-- Open Graph / Facebook -->\n`;
    metaTagsCode += `<meta property="og:type" content="${ogType}">\n`;
    
    if (ogUrl || canonicalUrl) {
      metaTagsCode += `<meta property="og:url" content="${ogUrl || canonicalUrl}">\n`;
    }
    
    metaTagsCode += `<meta property="og:title" content="${ogTitle || title}">\n`;
    
    if (ogDescription || description) {
      metaTagsCode += `<meta property="og:description" content="${ogDescription || description}">\n`;
    }
    
    if (ogImage) {
      metaTagsCode += `<meta property="og:image" content="${ogImage}">\n`;
    }
  }
  
  // Twitter meta tags
  if (twitterCard) {
    metaTagsCode += `\n<!-- Twitter -->\n`;
    metaTagsCode += `<meta property="twitter:card" content="${twitterCard}">\n`;
    
    if (ogUrl || canonicalUrl) {
      metaTagsCode += `<meta property="twitter:url" content="${ogUrl || canonicalUrl}">\n`;
    }
    
    if (ogTitle || title) {
      metaTagsCode += `<meta property="twitter:title" content="${ogTitle || title}">\n`;
    }
    
    if (ogDescription || description) {
      metaTagsCode += `<meta property="twitter:description" content="${ogDescription || description}">\n`;
    }
    
    if (ogImage) {
      metaTagsCode += `<meta property="twitter:image" content="${ogImage}">\n`;
    }
    
    if (twitterSite) {
      metaTagsCode += `<meta property="twitter:site" content="${twitterSite}">\n`;
    }
    
    if (twitterCreator) {
      metaTagsCode += `<meta property="twitter:creator" content="${twitterCreator}">\n`;
    }
  }
  
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(metaTagsCode);
      setCopied(true);
      
      // Reset the copied state after 2 seconds
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  
  return (
    <div className="relative overflow-hidden">
      <div className="bg-muted/80 border rounded-md p-4 font-mono text-xs overflow-auto max-h-[300px]">
        <pre className="whitespace-pre-wrap">{metaTagsCode}</pre>
      </div>
      <div className="absolute top-2 right-2">
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleCopy}
          className="h-8 gap-1"
        >
          {copied ? (
            <>
              <CheckIcon className="h-3.5 w-3.5" />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <CopyIcon className="h-3.5 w-3.5" />
              <span>Copy</span>
            </>
          )}
        </Button>
      </div>
    </div>
  );
} 