"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import Link from "next/link";
import { toast } from "sonner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function SvgToPngConverterPage() {
  // File input state
  const [svgFile, setSvgFile] = useState<File | null>(null);
  const [svgUrl, setSvgUrl] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");
  
  // Canvas and image references
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Conversion settings
  const [scale, setScale] = useState<number>(1);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const [preserveAspectRatio, setPreserveAspectRatio] = useState<boolean>(true);
  const [transparentBackground, setTransparentBackground] = useState<boolean>(true);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  
  // Output state
  const [pngUrl, setPngUrl] = useState<string>("");
  const [isConverting, setIsConverting] = useState<boolean>(false);
  
  // Active tab
  const [activeTab, setActiveTab] = useState("upload");
  
  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "image/svg+xml") {
      setSvgFile(file);
      setFileName(file.name.replace(/\.svg$/, ""));
      const url = URL.createObjectURL(file);
      setSvgUrl(url);
      loadSvgDimensions(url);
      
      // Reset output state
      setPngUrl("");
    } else if (file) {
      toast.error("Please select a valid SVG file.");
      resetFile();
    }
  };
  
  // Load SVG dimensions to use as default output settings
  const loadSvgDimensions = (url: string) => {
    const img = new Image();
    img.onload = () => {
      setWidth(img.naturalWidth);
      setHeight(img.naturalHeight);
    };
    img.src = url;
  };
  
  // Handle URL input
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const input = (e.target as HTMLFormElement).svgUrl.value;
    if (!input) return;
    
    if (input.match(/^https?:\/\/.+\.svg$/i)) {
      fetch(input, { mode: 'cors' })
        .then(response => {
          if (!response.ok) throw new Error("Failed to fetch SVG");
          return response.blob();
        })
        .then(blob => {
          // Extract filename from URL
          const urlParts = input.split('/');
          const urlFileName = urlParts[urlParts.length - 1].replace(/\.svg$/, "");
          setFileName(urlFileName);
          
          // Create a File object from the Blob
          const file = new File([blob], urlFileName + ".svg", { type: "image/svg+xml" });
          setSvgFile(file);
          const url = URL.createObjectURL(file);
          setSvgUrl(url);
          loadSvgDimensions(url);
          
          // Reset output state
          setPngUrl("");
          
          setActiveTab("convert");
        })
        .catch(error => {
          toast.error("Failed to fetch SVG from URL. Make sure it's accessible and a valid SVG.");
          console.error(error);
        });
    } else {
      toast.error("Please enter a valid URL to an SVG file (must end with .svg)");
    }
  };
  
  // Update width while preserving aspect ratio
  const handleWidthChange = (newWidth: number) => {
    setWidth(newWidth);
    if (preserveAspectRatio && height > 0) {
      const aspectRatio = width / height;
      setHeight(Math.round(newWidth / aspectRatio));
    }
  };
  
  // Update height while preserving aspect ratio
  const handleHeightChange = (newHeight: number) => {
    setHeight(newHeight);
    if (preserveAspectRatio && width > 0) {
      const aspectRatio = width / height;
      setWidth(Math.round(newHeight * aspectRatio));
    }
  };
  
  // Handle scale change from slider
  const handleScaleChange = (value: number[]) => {
    const newScale = value[0];
    setScale(newScale);
    
    if (imgRef.current) {
      const originalWidth = imgRef.current.naturalWidth;
      const originalHeight = imgRef.current.naturalHeight;
      
      setWidth(Math.round(originalWidth * newScale));
      setHeight(Math.round(originalHeight * newScale));
    }
  };
  
  // Convert SVG to PNG
  const convertToPng = async () => {
    if (!svgUrl || !canvasRef.current) return;
    
    setIsConverting(true);
    
    try {
      // Create an image to draw on canvas
      const img = new Image();
      img.crossOrigin = "anonymous";
      
      img.onload = () => {
        if (!canvasRef.current) return;
        
        const canvas = canvasRef.current;
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        
        // Set background if not transparent
        if (!transparentBackground) {
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, width, height);
        }
        
        // Draw the SVG image
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get PNG data URL
        const pngDataUrl = canvas.toDataURL("image/png");
        setPngUrl(pngDataUrl);
        
        setIsConverting(false);
      };
      
      img.onerror = () => {
        toast.error("Failed to load SVG for conversion");
        setIsConverting(false);
      };
      
      img.src = svgUrl;
    } catch (error) {
      console.error("Conversion error:", error);
      toast.error("Failed to convert SVG to PNG");
      setIsConverting(false);
    }
  };
  
  // Download converted PNG
  const downloadPng = () => {
    if (!pngUrl) return;
    
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `${fileName || "converted"}.png`;
    link.click();
  };
  
  // Reset the file input
  const resetFile = () => {
    setSvgFile(null);
    setSvgUrl("");
    setFileName("");
    setPngUrl("");
    setWidth(0);
    setHeight(0);
    setScale(1);
  };
  
  // Cleanup URLs on unmount
  useEffect(() => {
    return () => {
      if (svgUrl) URL.revokeObjectURL(svgUrl);
    };
  }, [svgUrl]);
  
  return (
    <div className="container py-12 space-y-12">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">SVG to PNG Converter</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Convert SVG vector graphics to PNG raster images with customizable size and background options.
        </p>
        <div className="flex items-center gap-2">
          <Link href="/blog/svg-to-png-converter" className="text-sm underline underline-offset-4">
            Learn about SVG and PNG formats
          </Link>
        </div>
      </div>

      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="upload">Upload SVG</TabsTrigger>
            <TabsTrigger value="convert" disabled={!svgFile}>Convert to PNG</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upload" className="space-y-6 pt-4">
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="svgFile">Upload SVG File</Label>
                    <Input
                      id="svgFile"
                      type="file"
                      accept=".svg,image/svg+xml"
                      onChange={handleFileChange}
                      className="cursor-pointer"
                    />
                    <p className="text-xs text-muted-foreground">
                      Upload an SVG file to convert to PNG
                    </p>
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center my-6">
                      <div className="flex-grow h-px bg-muted"></div>
                      <span className="px-3 text-sm text-muted-foreground">OR</span>
                      <div className="flex-grow h-px bg-muted"></div>
                    </div>
                  </div>
                  
                  <form onSubmit={handleUrlSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="svgUrl">Enter SVG URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="svgUrl"
                          type="url"
                          name="svgUrl"
                          placeholder="https://example.com/image.svg"
                          className="flex-1"
                        />
                        <Button type="submit">Fetch</Button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Link must be a direct URL to an SVG file
                      </p>
                    </div>
                  </form>
                  
                  {svgUrl && (
                    <div className="mt-6 space-y-4">
                      <Label>Preview</Label>
                      <div className="border rounded-md p-4 flex justify-center bg-checkerboard">
                        <img
                          ref={imgRef}
                          src={svgUrl}
                          alt="SVG Preview"
                          className="max-w-full max-h-[300px] object-contain"
                        />
                      </div>
                      
                      <div className="flex justify-between">
                        <Button variant="outline" onClick={resetFile}>
                          Clear
                        </Button>
                        <Button onClick={() => setActiveTab("convert")}>
                          Next: Configure Output
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="convert" className="space-y-6 pt-4">
            {svgUrl && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Output Settings</h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="scale">Scale</Label>
                      <div className="flex items-center space-x-2">
                        <Slider
                          id="scale"
                          min={0.1}
                          max={5}
                          step={0.1}
                          value={[scale]}
                          onValueChange={handleScaleChange}
                        />
                        <span className="w-12 text-center">{scale}x</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="width">Width (px)</Label>
                        <Input
                          id="width"
                          type="number"
                          min="1"
                          value={width}
                          onChange={(e) => handleWidthChange(parseInt(e.target.value) || 0)}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (px)</Label>
                        <Input
                          id="height"
                          type="number"
                          min="1"
                          value={height}
                          onChange={(e) => handleHeightChange(parseInt(e.target.value) || 0)}
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="preserveAspectRatio"
                        checked={preserveAspectRatio}
                        onCheckedChange={setPreserveAspectRatio}
                      />
                      <Label htmlFor="preserveAspectRatio" className="cursor-pointer">
                        Preserve aspect ratio
                      </Label>
                    </div>
                    
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Switch
                          id="transparentBackground"
                          checked={transparentBackground}
                          onCheckedChange={setTransparentBackground}
                        />
                        <Label htmlFor="transparentBackground" className="cursor-pointer">
                          Transparent background
                        </Label>
                      </div>
                      
                      {!transparentBackground && (
                        <div className="space-y-2">
                          <Label htmlFor="backgroundColor">Background Color</Label>
                          <div className="flex space-x-2">
                            <div 
                              className="w-10 h-10 rounded-md border"
                              style={{ backgroundColor }}
                            ></div>
                            <Input
                              id="backgroundColor"
                              type="color"
                              value={backgroundColor}
                              onChange={(e) => setBackgroundColor(e.target.value)}
                              className="w-full h-10"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                    
                    <div className="pt-4 space-x-3 flex">
                      <Button onClick={convertToPng} disabled={isConverting}>
                        {isConverting ? "Converting..." : "Convert to PNG"}
                      </Button>
                      
                      <Button
                        variant="outline"
                        onClick={() => setActiveTab("upload")}
                      >
                        Back
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Output</h3>
                  
                  <div className="border rounded-md p-4 flex justify-center items-center bg-checkerboard min-h-[200px]">
                    {pngUrl ? (
                      <img
                        src={pngUrl}
                        alt="Converted PNG"
                        className="max-w-full max-h-[300px] object-contain"
                      />
                    ) : (
                      <div className="text-muted-foreground text-center">
                        <p>PNG preview will appear here after conversion</p>
                      </div>
                    )}
                  </div>
                  
                  {pngUrl && (
                    <div className="flex justify-center pt-2">
                      <Button onClick={downloadPng}>
                        Download PNG
                      </Button>
                    </div>
                  )}
                  
                  {/* Hidden canvas for conversion */}
                  <canvas ref={canvasRef} className="hidden"></canvas>
                </div>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </Card>
      
      {/* FAQ Section */}
      <div className="space-y-6 mt-12">
        <h2 className="text-2xl font-bold tracking-tight text-center">Frequently Asked Questions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">What's the difference between SVG and PNG?</h3>
            <p className="text-muted-foreground">SVG (Scalable Vector Graphics) is a vector format that can scale to any size without quality loss. PNG (Portable Network Graphics) is a raster format with fixed dimensions and better browser compatibility.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Why convert SVG to PNG?</h3>
            <p className="text-muted-foreground">Convert to PNG when you need wider compatibility, fixed dimensions, or when working with platforms that don't support SVG files. PNGs are ideal for logos, icons, and images that need transparency.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Why is my conversion quality low?</h3>
            <p className="text-muted-foreground">For best quality, use higher resolution settings when converting complex SVGs. Setting appropriate width and height values ensures your PNG has sufficient detail for your intended use.</p>
          </Card>
          <Card className="p-6">
            <h3 className="text-lg font-medium mb-2">Is my SVG data secure when using this tool?</h3>
            <p className="text-muted-foreground">Yes. All processing happens in your browser. Your SVG files are never uploaded to any server, ensuring your data remains private and secure.</p>
          </Card>
        </div>
      </div>
      
      <style jsx global>{`
        .bg-checkerboard {
          background-image: linear-gradient(45deg, #f0f0f0 25%, transparent 25%),
                           linear-gradient(-45deg, #f0f0f0 25%, transparent 25%),
                           linear-gradient(45deg, transparent 75%, #f0f0f0 75%),
                           linear-gradient(-45deg, transparent 75%, #f0f0f0 75%);
          background-size: 20px 20px;
          background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
        }
      `}</style>
    </div>
  );
} 