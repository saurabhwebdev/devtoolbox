"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { HtmlCodeBlock } from "./HtmlCodeBlock";
import { ManifestBlock } from "./ManifestBlock";
import JSZip from "jszip";
import { saveAs } from "file-saver";
import Link from "next/link";

export default function FaviconGeneratorPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [appName, setAppName] = useState("Your App");
  const [generationComplete, setGenerationComplete] = useState(false);
  
  const iconSizes = [16, 32, 48, 64, 72, 96, 128, 144, 152, 192, 384, 512];
  
  // Load data from localStorage on mount
  useEffect(() => {
    const savedAppName = localStorage.getItem('favicon_app_name');
    if (savedAppName) {
      setAppName(savedAppName);
    }
  }, []);
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (!file) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }
    
    if (!file.type.startsWith('image/')) {
      alert("Please select an image file");
      return;
    }
    
    setSelectedFile(file);
    setGenerationComplete(false);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const handleAppNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setAppName(newName);
    localStorage.setItem('favicon_app_name', newName);
  };
  
  const handleGenerate = () => {
    if (!selectedFile || !previewUrl) return;
    
    setIsGenerating(true);
    
    // Simulate processing time
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
    }, 1500);
  };
  
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setGenerationComplete(false);
  };
  
  const handleDownloadZip = async () => {
    if (!previewUrl) return;
    
    const zip = new JSZip();
    const img = new Image();
    
    // Create a promise to wait for the image to load
    const imgLoadPromise = new Promise<boolean>((resolve) => {
      img.onload = () => resolve(true);
      img.src = previewUrl;
    });
    
    await imgLoadPromise;
    
    // Create a folder for the icons
    const iconsFolder = zip.folder("favicon-package");
    
    // Use canvas to resize the image for each size
    for (const size of iconSizes) {
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(img, 0, 0, size, size);
        const dataUrl = canvas.toDataURL('image/png');
        
        // Strip the data URL prefix to get just the base64 data
        const base64Data = dataUrl.replace(/^data:image\/(png|jpg);base64,/, "");
        iconsFolder?.file(`favicon-${size}x${size}.png`, base64Data, {base64: true});
      }
    }
    
    // Add the HTML and manifest files
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

    const manifestContent = {
      name: appName,
      short_name: appName,
      description: `${appName} Progressive Web App`,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/favicon-192x192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any maskable"
        },
        {
          src: "/favicon-384x384.png",
          sizes: "384x384",
          type: "image/png"
        },
        {
          src: "/favicon-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ]
    };
    
    iconsFolder?.file('favicon-code.html', htmlCode);
    iconsFolder?.file('manifest.json', JSON.stringify(manifestContent, null, 2));
    
    // Add a README file
    iconsFolder?.file('README.txt', `Favicon Package
================

This package was generated with DevToolBox Favicon Generator

Installation Instructions:
1. Copy the favicon files to the root of your website
2. Add the HTML code to the <head> section of your website
3. For PWA support, include the manifest.json file

Generated for: ${appName}
Generated on: ${new Date().toLocaleDateString()}
`);
    
    // Generate and download the zip
    const content = await zip.generateAsync({type: "blob"});
    saveAs(content, "favicon-package.zip");
  };

  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">Favicon Generator</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Upload a 512x512 pixel image and get all the favicon sizes you need for your website or PWA.
        </p>
      </div>

      <Card className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Upload Image</h3>
              <p className="text-sm text-muted-foreground">
                For best results, upload a square image (512x512 pixels recommended).
                PNG or SVG with transparent background works best.
              </p>
              
              <div className="flex flex-col space-y-4">
                <label 
                  htmlFor="image-upload" 
                  className="border-2 border-dashed rounded-md p-6 text-center cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  {previewUrl ? (
                    <div className="flex flex-col items-center space-y-4">
                      <Image 
                        src={previewUrl}
                        alt="Preview" 
                        width={128} 
                        height={128}
                        className="rounded-md"
                      />
                      <span className="text-sm">Click to change image</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl">+</span>
                      <span>Click to upload image</span>
                      <span className="text-xs text-muted-foreground">SVG, PNG, JPG (max 2MB)</span>
                    </div>
                  )}
                  <input 
                    id="image-upload" 
                    type="file" 
                    className="hidden" 
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </label>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="app-name" className="block text-sm font-medium mb-1">
                      App/Website Name
                    </label>
                    <input
                      id="app-name"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md text-sm"
                      value={appName}
                      onChange={handleAppNameChange}
                      placeholder="Your App or Website Name"
                    />
                  </div>
                  
                  <div className="flex justify-between">
                    <Button 
                      variant="outline" 
                      onClick={handleReset}
                      disabled={!selectedFile}
                    >
                      Reset
                    </Button>
                    <Button
                      onClick={handleGenerate}
                      disabled={!selectedFile || isGenerating}
                    >
                      {isGenerating ? "Generating..." : "Generate Favicons"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preview</h3>
              
              {previewUrl ? (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Your favicon will be generated in these sizes:
                  </p>
                  
                  <div className="grid grid-cols-4 md:grid-cols-6 gap-4 p-4 border rounded-md bg-muted/20">
                    {iconSizes.map(size => (
                      <div key={size} className="flex flex-col items-center space-y-2">
                        {previewUrl && (
                          <div className="border rounded-md p-2 bg-white">
                            <Image 
                              src={previewUrl}
                              alt={`${size}x${size}`} 
                              width={size > 64 ? 64 : size} 
                              height={size > 64 ? 64 : size}
                              className="object-contain"
                            />
                          </div>
                        )}
                        <span className="text-xs text-muted-foreground">{size}x{size}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="border rounded-md p-4 bg-muted/20 space-y-2">
                    <h4 className="font-medium">Download Options</h4>
                    <p className="text-sm text-muted-foreground">
                      After generation, you will be able to download:
                    </p>
                    <ul className="text-sm list-disc pl-5 space-y-1">
                      <li>Individual PNG files for each size</li>
                      <li>ICO file for legacy browsers</li>
                      <li>Manifest file for PWA</li>
                      <li>HTML code to include in your page</li>
                    </ul>
                    
                    {generationComplete && (
                      <Button 
                        className="w-full mt-4" 
                        onClick={handleDownloadZip}
                      >
                        Download All Files (ZIP)
                      </Button>
                    )}
                  </div>
                  
                  {generationComplete && (
                    <div className="space-y-4">
                      <div className="border rounded-md p-4 bg-muted/20">
                        <HtmlCodeBlock imageName={selectedFile?.name || ""} />
                      </div>
                      
                      <div className="border rounded-md p-4 bg-muted/20">
                        <ManifestBlock appName={appName} />
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="border rounded-md p-8 bg-muted/20 flex items-center justify-center">
                  <p className="text-muted-foreground">
                    Upload an image to see previews
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      
      {/* FAQ Section */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold text-center">Frequently Asked Questions</h2>
        
        <Card className="p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What is a favicon?</h3>
              <p className="text-sm text-muted-foreground">
                A favicon is a small icon that represents your website in browser tabs, bookmarks, and history. 
                It helps users identify your site quickly and enhances your brand recognition.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Why do I need multiple sizes of favicons?</h3>
              <p className="text-sm text-muted-foreground">
                Different devices and platforms require different icon sizes. Browsers use 16x16 and 32x32 icons, 
                while mobile devices might use larger icons like 192x192 or 512x512 for home screen shortcuts and PWAs.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">What format should my original image be?</h3>
              <p className="text-sm text-muted-foreground">
                For best results, use a square PNG or SVG image with a transparent background. The recommended size is 512x512 pixels 
                to ensure high quality when scaling down to smaller sizes.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">How do I add these favicons to my website?</h3>
              <p className="text-sm text-muted-foreground">
                Download the ZIP package, extract the files to your website's root directory, and add the HTML code provided to the 
                <code className="bg-muted px-1 rounded">{'<head>'}</code> section of your HTML documents. For PWA support, include the manifest.json file.
              </p>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-lg font-medium">Is this tool free to use?</h3>
              <p className="text-sm text-muted-foreground">
                Yes, this favicon generator is completely free to use. There are no limitations on the number of favicons you can generate 
                or download. All processing happens in your browser - your images aren't uploaded to any server.
              </p>
            </div>
            
            <div className="mt-8 pt-6 border-t">
              <p className="text-sm text-center">
                Want to learn more about favicons and best practices?{' '}
                <Link href="/blog/favicon-generator" className="text-primary hover:underline">
                  Read our comprehensive guide
                </Link>
              </p>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
} 