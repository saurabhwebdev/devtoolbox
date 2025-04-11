"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { toast } from "sonner";
import { colord, extend } from "colord";
import { ClipboardCopy, Download, ImageIcon, AlertCircle, Check, Info } from "lucide-react";

// Define types for harmony methods
type HarmonyMethod = 
  | "complementary" 
  | "analogous" 
  | "triadic" 
  | "tetradic" 
  | "split-complementary" 
  | "monochromatic"
  | "shades";

// Define type for a color in the palette
interface PaletteColor {
  hex: string;
  rgb: string;
  hsl: string;
  name: string;
}

export default function ColorPaletteGeneratorPage() {
  // Base color state
  const [baseColor, setBaseColor] = useState<string>("#4f46e5");
  const [harmonyMethod, setHarmonyMethod] = useState<HarmonyMethod>("complementary");
  const [palette, setPalette] = useState<PaletteColor[]>([]);
  const [activeTab, setActiveTab] = useState("generator");
  const [showFaq, setShowFaq] = useState(false);
  
  // Image color extraction
  const [imageUrl, setImageUrl] = useState<string>("");
  const [imagePalette, setImagePalette] = useState<PaletteColor[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Load saved settings from localStorage
  useEffect(() => {
    try {
      const savedBaseColor = localStorage.getItem("colorPalette_baseColor");
      const savedHarmonyMethod = localStorage.getItem("colorPalette_harmonyMethod");
      
      if (savedBaseColor) setBaseColor(savedBaseColor);
      if (savedHarmonyMethod) setHarmonyMethod(savedHarmonyMethod as HarmonyMethod);
      
      // Generate palette on initial load if we have saved values
      if (savedBaseColor) {
        generatePalette(savedBaseColor, savedHarmonyMethod as HarmonyMethod || harmonyMethod);
      } else {
        generatePalette(baseColor, harmonyMethod);
      }
    } catch (error) {
      console.error("Error loading from localStorage:", error);
    }
  }, []);
  
  // Save settings to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem("colorPalette_baseColor", baseColor);
      localStorage.setItem("colorPalette_harmonyMethod", harmonyMethod);
    } catch (error) {
      console.error("Error saving to localStorage:", error);
    }
  }, [baseColor, harmonyMethod]);
  
  // Generate color palette based on harmony method
  const generatePalette = (color: string, method: HarmonyMethod) => {
    try {
      const base = colord(color);
      let colors: string[] = [];
      
      switch (method) {
        case "complementary":
          colors = [base.toHex(), base.rotate(180).toHex()];
          break;
        case "analogous":
          colors = [
            base.rotate(-30).toHex(),
            base.toHex(),
            base.rotate(30).toHex()
          ];
          break;
        case "triadic":
          colors = [
            base.toHex(),
            base.rotate(120).toHex(),
            base.rotate(240).toHex()
          ];
          break;
        case "tetradic":
          colors = [
            base.toHex(),
            base.rotate(90).toHex(),
            base.rotate(180).toHex(),
            base.rotate(270).toHex()
          ];
          break;
        case "split-complementary":
          colors = [
            base.toHex(),
            base.rotate(150).toHex(),
            base.rotate(210).toHex()
          ];
          break;
        case "monochromatic":
          colors = [
            colord(base.toHex()).lighten(0.3).toHex(),
            colord(base.toHex()).lighten(0.15).toHex(),
            base.toHex(),
            colord(base.toHex()).darken(0.15).toHex(),
            colord(base.toHex()).darken(0.3).toHex()
          ];
          break;
        case "shades":
          colors = [
            colord(base.toHex()).lighten(0.4).toHex(),
            colord(base.toHex()).lighten(0.2).toHex(),
            base.toHex(),
            colord(base.toHex()).darken(0.2).toHex(),
            colord(base.toHex()).darken(0.4).toHex()
          ];
          break;
        default:
          colors = [base.toHex()];
      }
      
      // Create the palette with all color formats
      const newPalette: PaletteColor[] = colors.map((hex, index) => {
        const c = colord(hex);
        return {
          hex: c.toHex(),
          rgb: c.toRgbString(),
          hsl: c.toHslString(),
          name: getColorName(index, method)
        };
      });
      
      setPalette(newPalette);
      toast.success(`${method.charAt(0).toUpperCase() + method.slice(1)} palette generated`);
    } catch (error) {
      console.error("Error generating palette:", error);
      toast.error("Error generating color palette");
    }
  };
  
  // Get a name for each color based on its position in the palette
  const getColorName = (index: number, method: HarmonyMethod): string => {
    switch (method) {
      case "complementary":
        return index === 0 ? "Base" : "Complement";
      case "analogous":
        if (index === 0) return "Left Analogous";
        if (index === 1) return "Base";
        return "Right Analogous";
      case "triadic":
        if (index === 0) return "Base";
        if (index === 1) return "Triad 1";
        return "Triad 2";
      case "tetradic":
        if (index === 0) return "Base";
        if (index === 1) return "Tetrad 1";
        if (index === 2) return "Tetrad 2";
        return "Tetrad 3";
      case "split-complementary":
        if (index === 0) return "Base";
        if (index === 1) return "Split 1";
        return "Split 2";
      case "monochromatic":
      case "shades":
        if (index === 0) return "Lightest";
        if (index === 1) return "Lighter";
        if (index === 2) return "Base";
        if (index === 3) return "Darker";
        return "Darkest";
      default:
        return `Color ${index + 1}`;
    }
  };
  
  // Handle base color change
  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setBaseColor(newColor);
    generatePalette(newColor, harmonyMethod);
  };
  
  // Handle harmony method change
  const handleHarmonyChange = (value: HarmonyMethod) => {
    setHarmonyMethod(value);
    generatePalette(baseColor, value);
  };
  
  // Copy color to clipboard
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        toast.success(`${label} copied to clipboard`);
      },
      (err) => {
        console.error("Could not copy text: ", err);
        toast.error("Failed to copy to clipboard");
      }
    );
  };
  
  // Handle image upload for color extraction
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    // Create file reader
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        const dataUrl = event.target.result as string;
        setImageUrl(dataUrl);
        extractColorsFromImage(dataUrl);
      }
    };
    reader.readAsDataURL(file);
  };
  
  // Extract color palette from image
  const extractColorsFromImage = (imgSrc: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const img = new Image();
    img.crossOrigin = "anonymous";
    
    img.onload = () => {
      // Resize canvas to image dimensions
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      
      // Draw image on canvas
      ctx.drawImage(img, 0, 0);
      
      // Get image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixels = imageData.data;
      
      // Sample pixels and count color frequencies
      const colorMap = new Map<string, number>();
      const sampleRate = 5; // Sample every 5th pixel to improve performance
      
      for (let i = 0; i < pixels.length; i += 4 * sampleRate) {
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        
        // Skip transparent pixels
        if (pixels[i + 3] < 128) continue;
        
        // Convert to hex and add to map
        const hex = colord({ r, g, b }).toHex();
        colorMap.set(hex, (colorMap.get(hex) || 0) + 1);
      }
      
      // Convert to array and sort by frequency
      const colors = Array.from(colorMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, 6) // Take top 6 colors
        .map(([hex]) => hex);
      
      // Create palette
      const extractedPalette: PaletteColor[] = colors.map((hex, index) => {
        const c = colord(hex);
        return {
          hex: c.toHex(),
          rgb: c.toRgbString(),
          hsl: c.toHslString(),
          name: `Extracted ${index + 1}`
        };
      });
      
      setImagePalette(extractedPalette);
      toast.success("Colors extracted from image");
    };
    
    img.onerror = () => {
      toast.error("Error loading image");
    };
    
    img.src = imgSrc;
  };
  
  // Trigger file input click
  const handleSelectImage = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // Export palette as JSON
  const exportPalette = (colors: PaletteColor[]) => {
    try {
      const data = JSON.stringify(colors, null, 2);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      
      const a = document.createElement('a');
      a.href = url;
      a.download = `color-palette-${Date.now()}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      
      toast.success("Palette exported as JSON");
    } catch (error) {
      console.error("Export error:", error);
      toast.error("Error exporting palette");
    }
  };
  
  return (
    <div className="container py-8 space-y-8">
      <div className="flex flex-col items-center text-center space-y-4">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Color Palette Generator</h1>
        <p className="max-w-[700px] text-muted-foreground">
          Generate harmonious color palettes from a base color or extract colors from an image.
        </p>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" asChild>
            <Link href="/blog/color-palette-generator">Read Guide</Link>
          </Button>
          <Button variant="outline" size="sm" onClick={() => setShowFaq(!showFaq)}>
            {showFaq ? "Hide FAQ" : "Show FAQ"}
          </Button>
        </div>
      </div>

      {showFaq && (
        <Card className="max-w-3xl mx-auto">
          <CardContent className="pt-6 pb-4">
            <div className="space-y-4 text-sm">
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  What are color harmonies?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Color harmonies are combinations of colors based on their position on the color wheel. 
                  Different harmonic relationships (complementary, analogous, etc.) create different visual effects and feelings.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  How do I use the image color extraction?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Click "Select Image" to upload an image, and the tool will analyze the image and extract the most prominent colors to create a palette.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  What's the difference between monochromatic and shades?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Monochromatic variations maintain the same hue but vary in saturation and lightness, 
                  while shades are simply lighter and darker versions of the same color.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Can I save the generated palettes?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Yes, you can export any palette as a JSON file by clicking the download button next to the palette.
                  Your base color and harmony method are also automatically saved in your browser.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  How can I use these colors in my project?
                </h3>
                <p className="mt-1 text-muted-foreground">
                  Click on any color box to copy its value in hex, RGB, or HSL format. You can then use these values in your CSS, design tools, or coding projects.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="generator" className="w-full max-w-3xl mx-auto" onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="generator">Generate from Color</TabsTrigger>
          <TabsTrigger value="extractor">Extract from Image</TabsTrigger>
        </TabsList>
        
        <TabsContent value="generator" className="p-4 border rounded-md mt-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="baseColor">Base Color</Label>
              <div className="flex space-x-2">
                <Input 
                  id="baseColor" 
                  type="color" 
                  value={baseColor} 
                  onChange={handleColorChange}
                  className="w-20 h-10 p-1 cursor-pointer"
                />
                <Input 
                  type="text" 
                  value={baseColor} 
                  onChange={(e) => {
                    setBaseColor(e.target.value);
                    if (/^#([0-9A-F]{3}){1,2}$/i.test(e.target.value)) {
                      generatePalette(e.target.value, harmonyMethod);
                    }
                  }}
                  className="font-mono"
                  placeholder="#RRGGBB"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Harmony Method</Label>
              <RadioGroup 
                value={harmonyMethod} 
                onValueChange={(value) => handleHarmonyChange(value as HarmonyMethod)}
                className="grid grid-cols-2 sm:grid-cols-3 gap-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="complementary" id="complementary" />
                  <Label htmlFor="complementary">Complementary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="analogous" id="analogous" />
                  <Label htmlFor="analogous">Analogous</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="triadic" id="triadic" />
                  <Label htmlFor="triadic">Triadic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tetradic" id="tetradic" />
                  <Label htmlFor="tetradic">Tetradic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="split-complementary" id="split-complementary" />
                  <Label htmlFor="split-complementary">Split-Complementary</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="monochromatic" id="monochromatic" />
                  <Label htmlFor="monochromatic">Monochromatic</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="shades" id="shades" />
                  <Label htmlFor="shades">Shades</Label>
                </div>
              </RadioGroup>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Generated Palette</Label>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportPalette(palette)}
                  className="flex items-center gap-1"
                >
                  <Download className="h-4 w-4" /> Export
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                {palette.map((color, index) => (
                  <div key={index} className="space-y-1">
                    <div 
                      className="w-full h-20 rounded-md cursor-pointer flex flex-col justify-end p-1 transition hover:scale-105"
                      style={{ backgroundColor: color.hex }}
                      onClick={() => copyToClipboard(color.hex, `${color.name} color (${color.hex})`)}
                    >
                      <span className="text-xs font-medium px-1 py-0.5 rounded bg-background bg-opacity-80 self-start">
                        {color.name}
                      </span>
                    </div>
                    <div className="space-y-1 text-xs font-mono">
                      <div className="flex justify-between">
                        <span>HEX</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 -mr-1" 
                          onClick={() => copyToClipboard(color.hex, `HEX: ${color.hex}`)}
                        >
                          <ClipboardCopy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="truncate">{color.hex}</div>
                      
                      <div className="flex justify-between">
                        <span>RGB</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 -mr-1" 
                          onClick={() => copyToClipboard(color.rgb, `RGB: ${color.rgb}`)}
                        >
                          <ClipboardCopy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="truncate">{color.rgb}</div>
                      
                      <div className="flex justify-between">
                        <span>HSL</span>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="h-4 w-4 -mr-1" 
                          onClick={() => copyToClipboard(color.hsl, `HSL: ${color.hsl}`)}
                        >
                          <ClipboardCopy className="h-3 w-3" />
                        </Button>
                      </div>
                      <div className="truncate">{color.hsl}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="extractor" className="p-4 border rounded-md mt-2">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Upload Image</Label>
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-center h-40 border-2 border-dashed rounded-md">
                  {imageUrl ? (
                    <div className="relative w-full h-full">
                      <img 
                        src={imageUrl} 
                        alt="Uploaded" 
                        className="w-full h-full object-contain"
                      />
                    </div>
                  ) : (
                    <div className="text-center cursor-pointer" onClick={handleSelectImage}>
                      <ImageIcon className="mx-auto h-12 w-12 text-muted-foreground" />
                      <p className="mt-1 text-sm text-muted-foreground">Click to select an image</p>
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="hidden"
                />
                
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={handleSelectImage}
                  className="flex items-center gap-1"
                >
                  <ImageIcon className="h-4 w-4" /> Select Image
                </Button>
              </div>
              
              <canvas ref={canvasRef} className="hidden" />
            </div>
            
            {imagePalette.length > 0 && (
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <Label>Extracted Colors</Label>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportPalette(imagePalette)}
                    className="flex items-center gap-1"
                  >
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {imagePalette.map((color, index) => (
                    <div key={index} className="space-y-1">
                      <div 
                        className="w-full h-20 rounded-md cursor-pointer flex flex-col justify-end p-1 transition hover:scale-105"
                        style={{ backgroundColor: color.hex }}
                        onClick={() => copyToClipboard(color.hex, `${color.name} (${color.hex})`)}
                      >
                        <span className="text-xs font-medium px-1 py-0.5 rounded bg-background bg-opacity-80 self-start">
                          {color.name}
                        </span>
                      </div>
                      <div className="space-y-1 text-xs font-mono">
                        <div className="flex justify-between">
                          <span>HEX</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4 -mr-1" 
                            onClick={() => copyToClipboard(color.hex, `HEX: ${color.hex}`)}
                          >
                            <ClipboardCopy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="truncate">{color.hex}</div>
                        
                        <div className="flex justify-between">
                          <span>RGB</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4 -mr-1" 
                            onClick={() => copyToClipboard(color.rgb, `RGB: ${color.rgb}`)}
                          >
                            <ClipboardCopy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="truncate">{color.rgb}</div>
                        
                        <div className="flex justify-between">
                          <span>HSL</span>
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            className="h-4 w-4 -mr-1" 
                            onClick={() => copyToClipboard(color.hsl, `HSL: ${color.hsl}`)}
                          >
                            <ClipboardCopy className="h-3 w-3" />
                          </Button>
                        </div>
                        <div className="truncate">{color.hsl}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {imagePalette.length === 0 && imageUrl && (
              <div className="flex items-center justify-center h-20 text-muted-foreground">
                Extracting colors from image...
              </div>
            )}
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="text-center text-sm text-muted-foreground mt-8">
        <p>
          Need help with color theory? Check out our{" "}
          <Link href="/blog/color-palette-generator" className="underline underline-offset-2">
            guide to color palettes
          </Link>
        </p>
      </div>
    </div>
  );
} 